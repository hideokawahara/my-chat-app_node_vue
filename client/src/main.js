import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

// import VuePeerJS from "vue-peerjs";
// import Peer from "peerjs";


Vue.use(BootstrapVue)

// Vue.use(VuePeerJS, new Peer({}))

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
