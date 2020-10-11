import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate';
import 'bootstrap'
import jQuery from 'jquery'
import 'popper.js'
import './assets/app.css'

Vue.use(Vuelidate);

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
