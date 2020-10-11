import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import router from './router';
import jQuery from 'jquery';
import 'bootstrap';
import 'popper.js';
import './assets/app.css';

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')