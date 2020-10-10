import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import jQuery from 'jquery'
import 'popper.js'
import './assets/app.css'

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
