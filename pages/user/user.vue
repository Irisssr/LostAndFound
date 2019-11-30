<template>
	<!-- 用户 -->
	<view>
		<!-- 遮罩 -->
		<view class="mask" v-show="isNum" @tap="isMask"></view>
		<!-- 用户信息 -->
		<view class="user">
			<view class="userInfo">
				<view class="user_avatar">
					<img :src="userInfo.userHead">
				</view>
				<view class="user_name" v-show="userInfo.userName">{{userInfo.userName}}</view>
				<view class="user_stunum" v-if="userInfo.stuNum"
					@tap="editNum">
					<span class="iconfont">&#xe62d;</span>
					学号:{{userInfo.stuNum}}
				</view>
				<view class="user_stunum" v-else @tap="editNum">[请绑定学号]</view>
			</view>
		</view>
		<!-- 更新学号 -->
		<view class="bindingStu" v-show="isNum">
			<input type="number" v-model="card_num" placeholder="请填写学号">
			<button type="default" @tap="bindStuNum">确认更新</button>
		</view>
		<!-- 相关信息列表 -->
		<view class="userList" :animation="animationData">
			<button class="listItem" @tap="myPublish">
				<span class="iconfont">&#xe618;</span>
				<span>我的发布</span>
			</button>
			<button class="listItem" @tap="toAbout">
				<span class="iconfont">&#xe62e;</span>
				<span>关于我们</span>
			</button>
			<button class="listItem" @tap="toQun">
				<span class="iconfont">&#xe694;</span>
				<span>信息群号</span>
			</button>
			<button class="listItem" open-type="share">
				<span class="iconfont">&#xe8b0;</span>
				<span>分享该小程序</span>
			</button>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations} from 'vuex'
	export default {
		data(){
			return{
				isNum:false,
				qqQun:'750503541',
				card_num:'',
				animationData:{}
			}
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				sessionKey:state=>state.sessionKey
			})
		},
		methods: {
			...mapMutations([
				'getstuNum'
			]),
			toQun(){
				uni.setClipboardData({
					data:this.qqQun
				})
			},
			myPublish(){
				if(!this.sessionKey){
					return uni.showToast({
						title:'请先授权',
						icon:'none'
					})
				}
				uni.navigateTo({
					url:'../myPublish/myPublish'
				})
			},
			toAbout(){
				uni.navigateTo({
					url:'../about/about'
				})
			},
			isMask(){
				this.isNum=false;
			},
			editNum(){
				this.isNum=true;
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
					stuNum:that.card_num,
					sessionKey:that.sessionKey,
					userName:that.userInfo.userName,
					userHead:that.userInfo.userHead
				}).then(res=>{
					that.getstuNum({stuNum:that.card_num});
					uni.showToast({
						title: res.msg
					})
					that.card_num='';
					that.isNum=false;
				})
			}
		},
		onLoad() {
			this.$api.isLogin();
		},
		onShow() {
			let animation=uni.createAnimation({
				duration:800,
				timingFunction:'ease-in-out'
			})
			animation.opacity(1).translateY(0).step();
			this.animationData=animation.export();
		},
		onHide() {
			let animation=uni.createAnimation({
				duration:800,
				timingFunction:'ease-in-out'
			})
			animation.opacity(0).translateY(90).step();
			this.animationData=animation.export();
		},
		onShareAppMessage(e) {
			if(e.from==='button'){
				console.log(e.target)
				return{
					title:'西柚失物招领小程序',
					page:'/pages/login/login',
					success:res=>{
						uni.showToast({
							title:'分享成功,感谢您的支持~',
							icon:'none'
						})
					}
				}
			}
		}
	}
</script>

<style>
.mask{
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.4);
	top:0;
	left:0;
	z-index: 112;
}
.user{
	height: 200px;
	width: 100%;
	position: relative;
	background: linear-gradient(top,#4588aa,#57bbae);
	overflow: hidden;
	color: #fff;
}
.user .userInfo{
	z-index: 55;
	height: 100%;
	width:100%;
	position: absolute;
	top:0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.userInfo .user_avatar{
	width: 80px;
	height: 80px;
	border:3px solid #fff;
	box-shadow: 0px 0px 8px #8ff1ee;
	border-radius: 50%;
}
.userInfo .user_avatar img{
	border-radius: 50%;
	width: 100%;
	height: 100%;
}
.user .user_name{
	font-size: 16px;
	text-align: center;
	padding:5px 0;
}
.user .user_stunum{
	font-size: 14px;
	text-align: center;
	padding:5px 0;
	font-weight: 200;
}
.userList{
	opacity: 0;
	transform: translateY(90);
	width: 90%;
	height: 100%;
	margin:20px auto;
	padding:10px;
	border:1px solid #C0C0C0;
	border-radius: 5px;
	box-shadow: 2px 2px 2px #C0C0C0;
	color:#555;
}
.userList .listItem{
	--height:50px;
	border-bottom: 1px solid #ccc;
	height: var(--height);
	line-height: var(--height);
	text-align: left;
}
.userList .listItem span{
	padding:0 5px;
}
.listItem .iconfont{
	font-size: 20px;
	color: #3F536E;
}
.bindingStu{//绑定几个学号弹框
	position: fixed;
	width: 300px;
	height: 200px;
	left:50%;
	top:50%;
	margin-left:-150px;
	margin-top:-100px;
	background: #fff;
	border-radius: 10px;
	padding: 10px;
	box-sizing: border-box;
	z-index: 112;
	font-size: 15px;
}
.bindingStu button{
	box-shadow: 0px 0px 4px #4588aa;
	margin:10px 0;
	background: #fff;
}
.bindingStu input{
	margin:30px 0;
	padding: 5px 5px;
	border-bottom: 1px solid #ccc;
	font-size: 18px;
}
</style>
