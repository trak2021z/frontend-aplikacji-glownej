import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import stock from './modules/stock'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        user,
        stock
    }
});

