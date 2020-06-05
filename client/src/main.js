import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
// import VueScrollTo from 'vue-scrollto'
var VueScrollTo = require('vue-scrollto');



Vue.use(BootstrapVue)
Vue.use(VueScrollTo)

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
