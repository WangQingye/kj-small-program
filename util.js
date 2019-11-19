import store from './store/store.js'
const BaseUrl = "https://kjapi.sinmore.vip";
async function myRequest(api, data, method, needToken = true, needLoading = true) {
	if (needLoading) wx.showLoading({
		mask: true,
		title: '加载中',
	});
	let [err, res] = await uni.request({
		url: BaseUrl + api,
		method,
		data,
		header: {
			'Authorization': 'Bearer ' + store.state.userToken.api_token
		}
	});
	if (needLoading) wx.hideLoading()
	if (!err && res.statusCode == 200) {
		return res.data;
	} else {
		uni.showToast({
			title: err || res.data.error_msg || '请求失败，请稍后再试',
			duration: 2000,
			icon: 'none'
		})
	}
}
export default {
	myRequest
}
