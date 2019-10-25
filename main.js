import Vue from 'vue'
import App from './App'
import util from "./util.js"
import store from './store/store.js'
Vue.config.productionTip = false
Vue.prototype.myRequest = util.myRequest;
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
