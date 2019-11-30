<template>
	<view class="mycard">
		<view v-if="cardsList.cardType==='stuCard'" class="stucard">学生卡</view>
		<view v-if="cardsList.cardType==='idCard'" class="idcard">身份证</view>
		<view>姓名:{{ cardsList.cardName}}</view>
		<view>卡号:{{ cardsList.cardNum}}</view>
		<view class="relation">
			<view>
				<span>{{relation[0]}}:&nbsp;</span>
				<span>{{relation[1]}}</span>
			</view>
			<span class="iconfont cut" @tap="cut" v-if="relation[0]=='qq'">&#xe606;复制</span>
			<span class="iconfont cut" @tap="cut" v-if="relation[0]=='tel'">&#xe603;复制</span>
			<span v-show="ismy" class="carddel" @tap="cardDel(cardsList.id)">删除</span>
		</view>
	</view>
</template>

<script>
	import { mapState} from 'vuex'
	export default{
		props:{
			cardsList:{
				type:Object
			},
			ismy:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				relation:''
			}
		},
		computed:{
			...mapState({
				sessionKey:state=>state.sessionKey
			})
		},
		methods:{
			cut(){
				uni.setClipboardData({
					data:this.relation[1]
				})
			},
			cardDel(id){
				this.$emit('sendCardId',{id:id,sessionKey:this.sessionKey})
			}
		},
		mounted() {
			this.relation=this.cardsList.relation.split(':');
		}
	}
</script>
<style scoped>
	.mycard{
		margin-top:5px;
	}
</style>

