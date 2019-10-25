import store from './store/store.js'
const BaseUrl = "https://xgbapi.zcoming.com";
async function myRequest(api,data,method,needToken = true) {
		if (needToken) data.token = store.state.token
		let [ err, res ] = await uni.request({
			url: BaseUrl + api,
			method,
			data,
		});
		if (!err && res.data.error_code == 0) {
			return res.data;
		} else {
			uni.showToast({
				title: err || res.data.error_msg || '请求失败，请稍后再试',
				duration: 2000,
				icon:'none'
			})
		}
}
export default {
	myRequest
}