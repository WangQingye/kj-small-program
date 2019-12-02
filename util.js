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
			'Authorization': 'Bearer ' + store.state.userToken.api_token,
			'Accept': 'application/json'
		}
	});
	if (needLoading) wx.hideLoading()
	if (!err && res.statusCode == 200) {
		return res.data;
	} else if (res.statusCode == 401) {
		store.commit('resetStore');
		uni.showToast({
			title: '登录信息过期,请重新登录',
			duration: 1500,
			icon: 'none'
		})
		setTimeout(() => {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}, 1500);
	} else {
		uni.showToast({
			title: err || res.data.error_msg || '请求失败，请稍后再试',
			duration: 2000,
			icon: 'none'
		})
	}
}

function myToast(text, time = 2000, finish) {
	uni.showToast({
		title: text,
		duration: time,
		icon: 'none'
	})
	if (finish) {
		setTimeout(() => {
			return finish();
		}, time)
	}
}
export default {
	myRequest,
	myToast
}
