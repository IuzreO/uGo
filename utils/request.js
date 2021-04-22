export default function({url,method,data}){
	return new Promise((resolve,reject)=>{
		// 发送请求,异步操作
		uni.request({
			url:"https://api-hmugo-web.itheima.net/api/public/v1"+url, // 基地址拼接
			method,
			data
		}).then(res=>{
			resolve(res[1])
	})
	// 成功 resolve值
	// 失败 reject信息
})
}