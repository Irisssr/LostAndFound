<template>
	<view>
		<!-- 照片 -->
		<view class="corCard_box" v-if="photo.length===0"
			@tap="postPhone">
			<view>
				<view class="corCard_btn iconfont">&#xe61a;</view>
				<view class="corCard_text">
					<view>点击拍照识别</view>
					<view>智能填入学生卡/身份证信息</view>
				</view>
			</view>
		</view>
		<view v-else class="corPhoto" @tap="getPreview">
			<i @tap="deletePhoto" class="iconfont">&#xe6f0;</i>
			<view class="scanImg" v-show="isScan"></view>
			<image :src="photo[0]" mode="aspectFit"></image>
		</view>
		<!-- 信息 -->
		<form class="corMessage" report-submit @submit="formSubmit">
			<view>
				姓名:<input type="text" v-model="stuName"/>
				学号:<input type="number" v-model="stuNum">
			</view>
			<Relation @sendRelation='getRelation'></Relation>
			<view class="cor_input">
				<input v-if="relationType==='place'" type="text"
					placeholder="填写指定地点"  v-model="relation">
				<input v-if="relationType==='qq'" type="number"
					placeholder="填写qq"  v-model="relation">
				<input type="number" v-if="relationType==='tel'" 
					placeholder="填写联系电话"  v-model="relation">
			</view>
			<button class="cor_btn" type="default" form-type="submit">确认</button>
		</form>
	</view>
</template>

<script>
	import { mapState} from 'vuex'
	import Relation from '@/components/publish/relationType.vue' 
	
	export default {
		data() {
			return {
				photo:[],
				stuMsg:[],
				relation:'',
				stuName:'',
				stuNum:'',
				isScan:true,
				relation:'',
				relationType:''
			};
		},
		computed:{
			...mapState({
				sessionKey:state=>state.sessionKey,
				cardType:state=>state.cardType,
			})
		},
		components:{
			Relation
		},
		methods:{
			getRelation(data){
				this.relationType=data.relationType;
			},
			postPhone(){
				let that=this;
				that.isScan=true;
				if(!this.sessionKey) return uni.showToast({
					title:'请先授权',
					icon:'none'
				})
				uni.chooseImage({
					count:1,
					success:(res)=>{
						that.photo=res.tempFilePaths
						this.$api.pubCor(that.photo[0],{
							sessionKey:that.sessionKey,
							type:that.cardType	
						}).then(res=>{
							let data=JSON.parse(res).data.ret
							that.stuMsg=data;
							that.stuName=data[0].word;
							that.stuNum=data[2].word;
							that.isScan=false;
						})
					}
				})
			},
			deletePhoto(){
				this.photo=[];
				this.image='';
				this.stuResult=[]
			},
			getPreview(){
				uni.previewImage({
					current:0,
					urls:this.photo
				})
			},
			formSubmit(e){
				let that=this;
				if(!that.sessionKey){
					uni.showToast({
						title: '请先完成授权!',
						icon:'none'
					});
					return false;
				}
				if(that.stuName===''||that.stuNum===''){
					return uni.showToast({
						title:'请录入信息!',
						icon:'none'
					})
				}
				if(that.relation===''||that.relationType===''){
					return uni.showToast({
						title:'请填写联系方式',
						icon:'none'
					})
					return false;
				}
				if(that.relationType==='tel'){
					if(!(/^1[3456789]\d{9}/.test(that.relation))){
						uni.showToast({
							title:'手机号有误,请重填!',
							icon:'none'
						})
						return false;
					}
				}
				this.$api.pubCard({
					sessionKey:that.sessionKey,
					cardType:that.cardType,
					cardNum:that.stuNum,
					cardName:that.stuName,
					relation:that.relationType+':'+that.relation
				}).then(res=>{
					console.log(res)
					if(res.code===1){
						uni.showToast({
							title:res.msg
						})
						that.stuName='';
						that.stuNum='';
						that.stuMsg=[];
						that.relation='';
						that.photo=[]
					}
				})
			}
		}
	}
</script>
