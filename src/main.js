import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible.js'

Vue.config.productionTip = false

//引入axios
import axios from "axios" 
//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
 let ret = ''
 for (let it in data) {
  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
 }
 return ret
}]
//然后再修改原型链
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
