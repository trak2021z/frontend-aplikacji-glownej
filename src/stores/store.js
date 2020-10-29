import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import stock from './modules/stock'
import company from "./modules/company";
import transactions from "./modules/transactions";
import offers from "./modules/offers";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        user,
        stock,
        company,
        transactions,
        offers
    }
});

