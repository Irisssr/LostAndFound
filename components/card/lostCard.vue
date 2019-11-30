<template>
	<view>
		<view class="card">
			<view class="stucard" 
				:class="cardtype==='stuCard'?'selected':''"
				@tap="sendCardType('stuCard')">学生卡</view>
			<view class="idcard"
				:class="cardtype==='idCard'?'selected':''"
				@tap="sendCardType('idCard')">身份证</view>
		</view>
		<view v-if="cardtype=='stuCard'">
			<lostStuCard></lostStuCard>
		</view>
		<view v-if="cardtype==='idCard'">
			<lostIDCard></lostIDCard>
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapState } from 'vuex'
	import lostStuCard from '@/components/card/lostStuCard.vue'
	import lostIDCard from '@/components/card/lostIDCard.vue'
	export default {
		components:{
			lostStuCard,
			lostIDCard
		},
		computed:{
			...mapState({
				cardtype:state=>state.cardType
			})
		},
		methods: {
			sendCardType(type){
				this.$store.commit('getCardType',type)
			}
		}
	}
</script>

<style scoped>
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
