<template>
	<view>
		<!-- ta的信息分类 -->
		<TypeTabbar @sendtabbar="getTabbar"></TypeTabbar>
		<!-- 关于我的发布 -->
		<view class="pub_goodList">
			<!-- 普通信息类发布 -->
			<view class="pub_goodInfo" :animation="animationData1">
				<GoodInfo v-for="(item,index) in goods" :key="index"
					:goodMsg="item"
					:ismy="true"
					@sendCardId="getCardId"></GoodInfo>
				<view class="nonemsg">{{loadingText1}}</view> 
			</view>
			<!-- 卡证信息发布 -->
			<view class="pub_goodCard" :animation="animationData2">
				<GoodCard v-for="(item,index) in goods"  :key="index"
					:cardsList="item"
					:ismy="true"
					@sendCardId="getCardId"></GoodCard>
				<view class="nonemsg">{{loadingText2}}</view> 
			</view>
		</view>
	</view>
</template>
<script>
	import { mapState,mapMutations} from 'vuex'
	
	import TypeTabbar from '@/components/user/typetabbar.vue'
	import GoodCard from '@/components/user/goodCard.vue'
	import GoodInfo from '@/components/user/goodInfo.vue'
	
	export default {
		data(){
			return{
				goods:[],
				count:'',
				page:1,
				limit:8,
				cpage:1,
				type:'msg',
				animationData1:{},
				animationData2:{},
				loadingText1:'',
				loadingText2:''
			}
		},
		computed:{
			...mapState({
				sessionKey:state=>state.sessionKey,
				userInfo:state=>state.userInfo,
				goodList:state=>state.goodsList
			})
		},
		components:{
			TypeTabbar,
			GoodCard,
			GoodInfo
		},
		methods:{
			...mapMutations([
				'getMsgList',
				'getpubUser'
			]),
			getTabbar(data){
				if(data.typetabbar){
					this.getMessage()
				}else{
					this.getCard()
				}
			},
			getCardId(data){
				let that=this;
				uni.showModal({
					title:'是否确定删除',
					content:'删除的数据不再恢复',
					success:(res)=>{
						if(res.confirm){
							this.$api.mycardel({
								id:data.id,
								sessionKey:that.sessionKey,
								page:1,
								limit:that.limit
							}).then(res=>{
								that.goods=res.goods;
								console.log(res.goods)
								uni.showToast({
									title:res.msg
								})
							})
						}
					}
				})
			},
			getCard(){//动画
				this.type='card';
				this.cpage=1;
				this.getMyCard();
				let animation1=uni.createAnimation({
					timingFunction:'ease-in-out',
					duration:500,
				})
				let animation2=uni.createAnimation({
					timingFunction:'ease-in-out',
					duration:500,
				})
				
				animation1.rotateY(-180).step();
				animation2.rotateY(0).step();
				
				this.animationData1=animation1.export();
				this.animationData2=animation2.export();
			},
			getMessage(){//动画
				this.type='msg';
				this.page=1;
				this.getAllData();
				let animation1=uni.createAnimation({
					timingFunction:'ease-in-out',
					duration:500,
				})
				let animation2=uni.createAnimation({
					timingFunction:'ease-in-out',
					duration:500,
				})
				animation1.rotateY(0).step();
				animation2.rotateY(-180).step();
				
				this.animationData1=animation1.export();
				this.animationData2=animation2.export();
			},
			remove(id){//删除
				let that=this;
				uni.showModal({
					title:'是否确定删除',
					content:'删除的数据不再恢复',
					success:(res)=>{
						if(res.confirm){
							this.$api.mydele({
								id:id,
								page:1,
								limit:that.limit,
								sessionKey:that.sessionKey
							}).then(res=>{
								that.goods=res.goods;
								uni.showToast({
									title:res.msg
								})
							})
						}
					}
				})
				
			},
			toInfo(id){//信息详情
				uni.navigateTo({
					url:'../Info/Info?id='+id
				})
			},
			getAllData(){//获取信息数据
				let that=this;
				uni.showLoading({
					title:'加载中...'
				})
				this.$api.mypublish({
					sessionKey:that.sessionKey,
					page:that.page,
					limit:that.limit
				}).then(res=>{
					that.count=res.count
					if(res.goods.length==0){
						that.loadingText1='您还没有发布过信息'
					}
					that.getAllMsgList();
					that.goods=res.goods
				})
				uni.hideLoading();
			},
			getAllMsgList(){
				let that=this;
				this.$api.mypublish({
					sessionKey:that.sessionKey,
					page:1,
					limit:that.count
				}).then(res=>{
					that.getMsgList(res.goods);
					that.getpubUser(res.goods[0].user)
				})
			},
			getMoreData(){//加载更多
				let that=this;
				that.page++;
				uni.showLoading({
					title:'加载中...'
				})
				this.$api.mypublish({
					sessionKey:that.sessionKey,
					page:that.page,
					limit:that.limit
				}).then(res=>{
					if(res.goods.length===0){
						uni.hideLoading()
						that.loadingText1='已加载完全部';
						that.page--;
						return false;
					}else{
						that.goods=that.goods.concat(res.goods)
					}
				})
			},
			getMyCard(){//获取卡证数据
				let that=this;
				uni.showLoading({
					title:'加载中...'
				})
				this.$api.myCard({
					sessionKey:that.sessionKey,
					page:that.cpage,
					limit:that.limit
				}).then(res=>{
					console.log(res)
					if(res.cards.length==0){
						that.loadingText2='您还没有发布过卡证信息'
					}
					that.goods=res.cards;
				})
				uni.hideLoading();
			},
			getMoreCard(){
				let that=this;
				uni.showLoading({
					title:'加载中...'
				})
				that.cpage++;
				this.$api.myCard({
					sessionKey:that.sessionKey,
					page:that.cpage,
					limit:that.limit
				}).then(res=>{
					if(res.cards.length==0){
						that.cpage--;
						uni.showToast({
							title:'加载完全部',
							icon:'none'
						})
					}else{
						that.goods=this.goods.concat(res.cards);
					}
					uni.hideLoading();
				})
			}
		},
		onLoad() {
			this.$api.isLogin();
			this.getAllData();
		},
		onReachBottom() {
			if(this.type==='msg'){
				setTimeout(()=>{
					this.getMoreData()
				},500)
			}else if(this.type==='card'){
				setTimeout(()=>{
					this.getMoreCard()
				},500)
			}
		},
		onPullDownRefresh() {
			if(this.type==='msg'){
				this.page=1;
				this.getAllData();
			}else if(this.type==='card'){
				this.cpage=1;
				this.getMyCard();
			}
		}
	}
</script>

<style scoped>
.mypublish{
	height: 100px;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left:5px;
	box-shadow: 2px 0px 5px #ccc;
	margin:5px 0;
}
.myleft{
	width: 90px;
	height: 90px;
	border-radius: 5px;
}
.myleft image{
	width: 100%;
	height: 100%;
}
.myright{
	width: 70%;
	margin-left:10px;
	height: 100%;
	position: relative;
}
.myright .mytitle{
	line-height: 40px;
	padding-left:5px;
	border-bottom:1px dashed #ccc;
}
.myright .mybtn{
	z-index: 22;
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	color: #333333;
}
.myright .mytext{
	overflow: hidden;
	display: flex;
	flex-wrap: wrap;
	width: 150px;
	height: 30px;
	overflow: hidden;
	padding:10px 5px;
}
.mybtn .delete{
	margin:0 10px;
	border:1px solid #4588aa;
	border-radius: 5px;
	padding: 2px 8px;
}
.myright .goodType{
	position: absolute;
	top:0;
	right:0;
	border-top-left-radius: 12px;
	border-bottom-left-radius:12px;
	font-size: 12px;
	color:#fff;
	padding:4px 10px;
}
.type-lost{
	background: #DD524D;
}
.type-found{
	background: #FF8000;
}
.nonemsg{
	margin-top:80px;
	color: #C0C0C0;
	text-align: center;
}
</style>
