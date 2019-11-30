<template>
	<view>
		<tabarHead :title='titleHead'></tabarHead>
		<view v-if="msgType=='lost'">
			<publishLost></publishLost>
		</view>
		<view v-if="msgType=='found'">
			<publishFound></publishFound>
		</view>
	</view>
</template>

<script>
	import publishLost from '@/components/publish/publishLost.vue'
	import publishFound from '@/components/publish/publishFound.vue'
	import tabarHead from '@/components/tabarHead.vue'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				titleHead:{
					name1:'失物招领',
					name2:'寻物启事'
				}
			}
		},
		computed:{
			...mapState({
				msgType:state=>state.msgType
			})
		},
		components:{
			publishLost,
			publishFound,
			tabarHead
		},
		methods:{
			lostSubmit(){//发布
				let that=this;
				if(!that.sessionKey){
					uni.showToast({
						title: '请先完成授权!',
						icon:'none'
					});
					return false;
				}
			}
		},
		onLoad() {
			this.$api.isLogin();
		}
	}
</script>

