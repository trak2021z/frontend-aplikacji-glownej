import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import router from './router';
import jQuery from 'jquery';
import 'bootstrap';
import 'popper.js';
import './assets/css/app.css';
import './fai';
import './assets/css/app.css';
import './fai';
import axios from 'axios';
import store from './stores/store';
import JwPagination from 'jw-vue-pagination';

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URI;

Vue.use(Vuelidate);
Vue.component('jw-pagination', JwPagination);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')