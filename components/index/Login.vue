<template>
	<view class="login" v-if="isMask">
		<view class="stuNum">
			<input type="number" v-model="card_num" placeholder="请填写学号">
		</view>
		<button type="default" @tap="bindStuNum">确认绑定</button>

	</view>
</template>

<script>
	import { mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				card_num:'',
				isNum:false,
				isMask:true,
			};
		},
		computed:{
			...mapState({
				sessionKey:state=>state.sessionKey,
				userInfo:state=>state.userInfo
			})
		},
		methods:{
			...mapMutations([
				'getonLogin',
				'getSession'
			]),
			getLogin(e){//登录
				if(!e.detail.userInfo){
					return uni.showToast({
						title:'授权失败',
						icon:'none'
					})
				}
				let user=e.detail.userInfo;
				let that=this;
				this.getonLogin({userName:user.nickName,userHead:user.avatarUrl})
				uni.login({
					provider:'weixin',
					success:(res)=>{
						let code=res.code;
						this.$api.onlogin({
							code:code,
							nickName:user.nickName,
							headImg:user.avatarUrl
						}).then(res=>{
							console.log(res)
							that.isLogin=false;
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
							that.getSession({sessionKey:res.sessionKey})
							// if(!this.userInfo.stuNum){
							console.log(res)
							if(res.code===-1){
								that.isNum=true;
							}else{
								that.isMask=false;
								that.isNum=false;
								uni.showToast({
									title:res.msg,
									icon:'none'
								})
								this.$emit('gologin',{ login:true})
							}
						})
					}
				})
			},
			bindStuNum(){
				let that=this;
				if(that.card_num===''){
					return uni.showToast({
						title:'请填写学号',
						icon:'none'
					})
				}
				this.$api.bindNum({
					sessionKey:that.sessionKey,
					stuNum:that.card_num,
					userName:that.$store.state.userInfo.userName,
					userHead:that.$store.state.userInfo.userHead
				}).then(res=>{
					that.isNum=false;
					that.isMask=false;
					that.$store.commit('getstuNum',res.data.stuNum)
					uni.showToast({
						title:res.msg
					})
					this.$emit('gologin',{ login:true})
				})
			}
		},
		onLoad() {
			let that=this;
		}
	}
</script>

<style scoped>
.login{
	z-index: 999;
	position: fixed;
	top:0;
	left:0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0,0,0,0.5);
}
.login .stuNum{
	background: #fff;
	width: 200px;
	height: 100px;
	padding: 0 10px;
	border-radius: 5px;
}
.login .stuNum input{
	font-size: 16px;
	padding: 10px 5px;
}
</style>
