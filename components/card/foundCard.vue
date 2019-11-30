<template>
	<view class="listening">
		<view class="stuCard_box">
			<view>输入证件号后,后台为您监听,若找到信息会自动为您推送消息模板</view>
		</view>
		<text class="listen">选择监听的证件号类型</text>
		<view class="card">
			<view class="stucard" 
				:class="cardtype==='stuCard'?'selected':''"
				@tap="sendCardType('stuCard')">学生卡</view>
			<view class="idcard"
				:class="cardtype==='idCard'?'selected':''"
				@tap="sendCardType('idCard')">身份证</view>
		</view>
		<form @submit="formSubmit" report-submit-timeout="10000"  report-submit="true" >
			<view class="stuCard_text">
				<text>证件号:</text>
				<input type="idcard" name="input" placeholder="输入你需要监听的证件号"
					v-model="listen_num"/>
			</view>
			<button type="default" form-type="submit">确认监听</button>
		</form>
	</view>
</template>

<script>
	import { mapState} from 'vuex'
	export default {
		data() {
			return {
				listen_num:'',
				animationData:{}
			};
		},
		computed:{
			...mapState({
				sessionKey:state=>state.sessionKey,
				cardtype:state=>state.cardType,
				userInfo:state=>state.userInfo
			})
		},
		methods:{
			move(){
				let animation=uni.createAnimation({
					duration:500,
					timingFunction:'ease-in-out'
				})
				animation.scale(1).step();
				this.animationData=animation.export();
			},
			sendCardType(type){
				this.$store.commit('getCardType',type)
			},
			formSubmit(e){
				let that=this;
				if(!this.sessionKey) return uni.showToast({
					title:'请先完成授权!',
					icon:'none'
				})
				let formId=e.detail.formId;
				if(this.listen_num=='') return uni.showToast({
					title:'不能为空',
					icon:'none'
				})
				this.$api.listen({
					sessionKey:this.sessionKey,
					formId:formId,
					lisType:this.cardtype,
					lisNum:this.listen_num
				}).then(res=>{
					if(res.code=='1024'){
						uni.showToast({
							title:'信息提交成功,正在为您监听中...',
							icon:'none'
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						let id=res.cards[0].id
						uni.navigateTo({
							url:'/pages/foundCard/foundCard?id='+id
						})
					}
					this.listen_num='';
				})
			}
		},
		onShow(){
			this.move();
		}
	}
</script>
<style scoped>
	.listening{
		padding:0 10px;
	}
	.listen{
		font-size: 14px;
		padding-left:5px;
	}
	.stuCard_box{
		width: 300px;
		height: 150px;
		margin:10px auto;
		border:1px dashed #ccc;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #2C405A;
		text-indent: 2em;
		position: relative;
	}	
	.stuCard_text{
		padding: 10px;
	}
	.stuCard_text input{
		border-bottom: 1px solid #ccc;
		width: 100%;
		height: 40px;
		padding-left:5px;
		font-size: 16px;
	}
	button{
		background: #4588aa;
	}
	.card{
		height: 40px;
		display: flex;
		justify-content: space-between;
		padding:0 50px;
		margin:20px 0;
	}
	.card view{
		width: 100px;
		height: 100%;
		text-align: center;
		line-height: 40px;
		border-radius: 20px;
		border:1px solid #ccc;
	}
	.card .selected{
		border: 1px solid #4588aa;
	}
</style>
