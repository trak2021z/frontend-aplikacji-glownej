import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    stocks: null
}

const actions = {
    async getStocksAction({commit}) {
        const response = await axios.get('stocks/', {headers: authHeader()})

        commit('setStocks', response.data);
        return response.data;
    },
}

const getters = {
    getStocks: state => {
        return state.stocks;
    }
}

const mutations = {
    setStocks: (state, stocks) => {
        state.stocks = stocks;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}