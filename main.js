import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 挂载全局方法
import config from "./common/config.js"
Vue.prototype.config=config

import lib from "./common/lib.js"
Vue.prototype.lib = lib
//跳转权限验证
import user from "./common/user.js"
Vue.prototype.user = user

//请求模块
import request from "./common/request.js"
Vue.prototype.$http = request

App.mpType = 'app'

const app = new Vue({
    ...App,
	config,
	lib
})
app.$mount()
