import config from '@/request/config.js'

const http={} 

http.checkSession=()=>{
	 uni.checkSession({
		success:(res)=>{
		},
		fail:(err)=>{
			uni.showToast({
				title:'登录已失效,请重新登录',
				icon:'none'
			})
			uni.reLaunch({
				url:'/pages/login/login'
			})
		}
	})
}

http.request=(url,method,data)=>{
	return uni.request({
		url:config.baseURL+url,
		method:method,
		header:config.header,
		data:data,
		dataType:'json'
	}).then(res=>{
		if(res[1].statusCode&&res[1].statusCode==200){
			return res[1].data
		}else if(res[1].statusCode==401){
			uni.showToast({
				title:'登录已失效,请重新登录',
				icon:'none'
			})
			uni.reLaunch({
				url:'/pages/login/login'
			})
		}
		else{
			throw res[1].data
		}
	}).catch(error=>{
		console.log(error)
		switch(error.code){
			case 401:
				console.log(error)
				uni.showToast({
					title:'登录已失效,请重新登录',
					icon:'none'
				})
				uni.reLaunch({
					url:'/pages/login/login'
				})
				break;
			default:
				console.log(error)
				return Promise.reject();
				break;
		}
	})
}

http.upload=(url,file,data)=>{
	return uni.uploadFile({
		url:config.baseURL+url,
		filePath:file,
		name:'file',
		formData:data
	}).then(res=>{
		if(res[1].statusCode&&res[1].statusCode==200){
			return res[1].data;
		}else{
			throw res[1]
		}
	}).catch(error=>{
		switch(error.code){
			case 401:
			console.log(error);
				break;
			default:
				uni.showToast({
					title:error.errmsg,
					icon:'none'
				})
				return Promise.reject()
				break;
		}
	})
}

export default http
