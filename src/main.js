import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import VueFullpage from 'vue-fullpage.js'
import VueParticles from 'vue-particles'

import './assets/css/global.css'
import './assets/vendors/font-awesome/css/font-awesome.min.css'
import './assets/vendors/font-awesome/fonts/fontawesome-webfont.eot'
import './assets/vendors/font-awesome/fonts/fontawesome-webfont.svg'
import './assets/vendors/font-awesome/fonts/fontawesome-webfont.ttf'
import './assets/vendors/font-awesome/fonts/fontawesome-webfont.woff'
import './assets/vendors/font-awesome/fonts/fontawesome-webfont.woff2'
import './assets/vendors/font-awesome/fonts/FontAwesome.otf'
// import './utils/rem'
import axios from 'axios'

import * as filter from './plugins/filter'
Object.keys(filter).forEach(item => {
  Vue.filter(item, filter[item])
})

// axios.defaults.baseURL = 'http://39.98.185.210:90/api/'
axios.defaults.baseURL = 'http://127.0.0.1:90/api/'
// axios请求拦截
axios.interceptors.request.use(config => {
  // console.log(window.sessionStorage.getItem('token'))
  // 为请求头添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token') || null
  // config.headers.token = window.sessionStorage.getItem('token') || null
  return config
})

Vue.prototype.$http = axios
Vue.use(VueFullpage)
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
