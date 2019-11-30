<template>
	<view class="mypublish"
		@tap.stop="toInfo(goodMsg.id)">
		<view class="myleft">
			<image :src="'https://www.gongsir.club:8081/'+goodMsg.goodImage" mode="aspectFill"></image>
		</view>
		<view class="myright">
			<view class="mytitle">{{ goodMsg.goodTitle}}</view>
			<view class="mybtn">
				<view class="mytext">{{ goodMsg.goodTexts}}</view>
				<view class="delete" @tap.stop="remove(goodMsg.id)">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				page:1,
				limit:8
			}
		},
		props:{
			goodMsg:{
				type:Object
			}
		},
		computed:{
			...mapState({
				sessionKey:state=>state.sessionKey
			})
		},
		methods:{
			remove(id){
				let that=this;
				this.$api.mydele({
					id:id,
					page:that.page,
					limit:that.limit,
					sessionKey:that.sessionKey
				}).then(res=>{
					that.goods=res.goods;
					uni.showToast({
						title:res.msg
					})
				})
			},
			toInfo(id){
				uni.navigateTo({
					url:'../../pages/Info/Info'+id
				})
			},
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
</style>
