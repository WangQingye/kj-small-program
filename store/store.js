import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		isLogin: false,
		needFresh: false
	},
	mutations: {
		saveToken(state, token) {
			state.token = token;
		},
		saveIsLogin(state, isLogin) {
			state.isLogin = isLogin;
		},
		saveNeedFresh(state, needFresh) {
			state.needFresh = needFresh;
		}
	},
	actions: {
	}
})

export default store
