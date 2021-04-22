import Vue from 'vue'
import App from './App'
// 导入request对象
import request from './utils/request.js'
Vue.config.productionTip = false

App.mpType = 'app'
// 挂载到vue原型上
Vue.prototype.$request = request
const app = new Vue({
    ...App
})
app.$mount()
