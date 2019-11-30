<template>
	<view class="notice" >
		<view class="iconfont ad">&#xe611;</view>
		<swiper vertical="true" autoplay="false" duration="500" interval="4000">
			<swiper-item v-for="(item,index) in text"
				:key="index">
				<view @tap="showText(item)">{{ item}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				text:[
					'西柚失物招领小程序正式上线了!欢迎各位同学使用~',
					'有任何问题可以向我们反馈,感谢你们的支持',
				]
			}
		},
		methods:{
			showText(e){
				uni.showModal({
					title:'公告',
					content:e,
					showCancel:false
				})
			},
		}
	}
</script>

<style scoped>
	.notice{
		width: 100%;
		height: 20;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin:10px 0;
		background: #fdfced;
		color: #fa7a37;
	}
	.notice .ad{
		font-size: 20px;
		flex: 1;
		text-align: center;
	}
	.notice swiper{
		flex: 5;
		box-sizing: border-box;
		width: 100%;
		height: 20px;
		margin: 5px 0;
		font-size: 14px;
		padding: 2px 10px;
		display: flex;
		flex-wrap: nowrap;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color:#555;
	}
	swiper-item{
		line-height: 20px;
	}
</style>
