import Vue from 'vue'
import App from './App'
// import cuCustom from './colorui/components/cu-custom.vue'
// Vue.component('cu-custom',cuCustom)

import validCode from './components/validCode.vue'

Vue.component('validcode',validCode)

import store from './store'
Vue.prototype.$store = store
import http from './components/http/http.js'
Vue.prototype.$http = http;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()





