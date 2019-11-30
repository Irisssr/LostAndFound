<template>
	<view>
		<Search></Search>
		<view class="item" v-if="list">
			<listItem v-for="(item,index) in list"
				:key="index" :userItem="item"></listItem>
		</view>
		<view class="item-none" >
			无此类信息
		</view>
	</view>
</template>

<script>
	import listItem from '@/components/listItem.vue'
	import Search from '@/components/index/search.vue'
	import { mapState} from 'vuex'
	import Time from '@/common/time.js'
	
	export default {
		data() {
			return {
				type:null,
				page:1,
				limit:8,
				list:[]
			}
		},
		components:{
			listItem,
			Search
		},
		methods: {
			getTypeList(){
				uni.showLoading({
					title: '加载中...'
				})
				this.$api.classify({
					sessionKey:this.sessionKey,
					class:this.type,
					page:this.page,
					limit:this.limit
				}).then(res=>{
					this.list=res.goods;
					uni.hideLoading();
				})
			},
			setTitle(){
				let setTitle=(title)=>{
					uni.setNavigationBarTitle({
					    title: title
					});
				}
				switch (this.type){
					case 'learn':
						setTitle('学习类');
						break;
					case 'elec':
						setTitle('电子类');
						break;
					case 'daily':
						setTitle('生活类');
						break;
					case 'other':
						setTitle('其他类');
						break;
					default:
						break;
				}
			}
		},
		onLoad(e) {
			this.type=e.type;
			this.setTitle();
			this.getTypeList();
		}
	}
</script>

<style scoped>
	.item-none{
		padding-top:80px;
		text-align: center;
		color: #C0C0C0;
	}
</style>
