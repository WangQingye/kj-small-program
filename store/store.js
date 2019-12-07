import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		userToken: {
			api_token: '',
			is_business: 0
		},
		isLogin: false,
		needFresh: false,
		orderAddress: null,
		scoreAddress: null,
		userAddress: ['', '', '', ''],
		scoreGood: null
	},
	mutations: {
		saveUserInfo(state, info) {
			state.userInfo = info;
		},
		saveUserToken(state, token) {
			state.userToken = token;
		},
		saveIsLogin(state, isLogin) {
			state.isLogin = isLogin;
		},
		saveNeedFresh(state, needFresh) {
			state.needFresh = needFresh;
		},
		saveOrderAddress(state, orderAddress) {
			state.orderAddress = orderAddress;
		},
		saveUserAddress(state, address) {
			state.userAddress[address.index] = address.address;
		},
		saveScoreAddress(state, scoreAddress) {
			state.scoreAddress = scoreAddress;
		},
		saveScoreGood(state, scoreGood) {
			state.scoreGood = scoreGood;
		},
		resetStore(state) {
			state = {
				userInfo: {},
				userToken: {
					api_token: '',
					is_business: 0
				},
				isLogin: false,
				needFresh: false,
				orderAddress: null,
				scoreAddress: null,
				userAddress: ['', '', '', '']
			}
		}
	},
	actions: {}
})

export default store
