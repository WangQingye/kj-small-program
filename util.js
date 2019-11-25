import store from './store/store.js'
const BaseUrl = "https://kjapi.sinmore.vip";
const testToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ1ZDE0OTQxZTVmY2VjYTk3NmZlNjkwZGZmMmExM2FjMjU5NjY1ZWU5MDU0OGEzZGQ0NmQ0MjQ2YzY0ZjMwOTlmNjU2YzU0ZjIzOWUxNTkzIn0.eyJhdWQiOiIzIiwianRpIjoiNDVkMTQ5NDFlNWZjZWNhOTc2ZmU2OTBkZmYyYTEzYWMyNTk2NjVlZTkwNTQ4YTNkZDQ2ZDQyNDZjNjRmMzA5OWY2NTZjNTRmMjM5ZTE1OTMiLCJpYXQiOjE1NzM0NjIxNDEsIm5iZiI6MTU3MzQ2MjE0MSwiZXhwIjoxNjA1MDg0NTQxLCJzdWIiOiIxIiwic2NvcGVzIjpbImFwaSJdfQ.Q7a46UwlW1waDOvgsdS39VWeeugYGksYjYUszmLQfNrzdcOd7Z_Uhp4J9pEyzJDjqm8LjEy4BfWvNYS9ayNnSya44WTDonwKwzEvRXKhk6O7BMHzwzB-VVR1uj0our_YRZ6-kR9x9lOaz7HnQkVKaNI-R5B2mxT95Qto10uddum_oZrlA0BWZe07wP9RUTKwwxRYoIHs8fMwAZWmaynWuzeZ444InKN-ustkXi3A3qOWDRdg1OkZDPjV6_kgpA4OBtNUZfOEc7VVXZtOOhyiboThMyz98Gx2cQgvIDjKklUv0Q39TY6qr5BvwFrZW1O1xtXClYU5pfKxQWt5D3QJNpecD3ax-P8VDWtjlOqpE_-Lf_DDkXbUTAndxsLcCsQz5DUG_8aoyEBztBdRYHdLrUB9VfpXQWsMkuFaq4uiV8tM3pKW0R-keXpr_fOY8wFVUON8aN0eU2IEWpDyUwx1T4OaJKXSy--YbOtKnYUgAMSbBR9tQVV7Kcl5YhZ-mXVBuMoV5X--zybvitWtclL_oBV5ZF2ssf7rfAhyo4g6h-JClQVcVHDgE61AszTN_c5XTsXgFkxa6SKQMTy5ABBfobS1X4f4ylmhJx7RmR4wsBrwZKF8mBEr9ap3Lr7yrOOwHCpzZXEymgWNhczpkS1SrvxsP_jC5bWYCURx-XFftPs'
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
			'Authorization': 'Bearer ' + testToken,
			// 'Authorization': 'Bearer ' + store.state.userToken.api_token,
			'Accept': 'application/json'
		}
	});
	if (needLoading) wx.hideLoading()
	if (!err && res.statusCode == 200) {
		return res.data;
	} else {
		let title = err || res.data.error_msg || '请求失败，请稍后再试';
		if (res.data.errors) {
			for (let key in res.data.errors) {
				title = res.data.errors[key][0];
				break;
			}
		}
		uni.showToast({
			title,
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
		setTimeout(()=>{
			return finish();
		}, time)
	}
}
export default {
	myRequest,
	myToast
}
