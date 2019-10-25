import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		isLogin: false
	},
	mutations: {
		saveToken(state, token) {
			state.token = token;
		},
		saveIsLogin(state, isLogin) {
			state.isLogin = isLogin;
		}
	},
	actions: {
	}
})

export default store
