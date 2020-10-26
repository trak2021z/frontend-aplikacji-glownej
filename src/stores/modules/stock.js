import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    stock: null,
    stocks: null,
}

const actions = {
    async getStocksAction({commit}) {
        return axios.get('stocks/', {headers: authHeader()})
            .then(response => {
                commit('setStocks', response.data);
                return response
            })
            .catch(error => {
                return error.response
            });
    },
    async buyStock({commit}, {stockId, quantity}) {
        return axios.post( `stocks/${stockId}/buy/`, {quantity: quantity}, {headers: authHeader()})
            .then(response => {
                commit('setStock', response.data);
                return response
            })
            .catch(error => {
                return error.response
            });
    },
    async sellStock({commit}, {userStockId, quantity}) {
        return axios.post( `user/stocks/${userStockId}/sell/`, {quantity: quantity}, {headers: authHeader()})
            .then(response => {
                commit('setStock', response.data);
                return response
            })
            .catch(error => {
                return error.response
            });
    },
}

const getters = {
    allStocks: state => state.stocks,
    getStock: state => state.stock
}

const mutations = {
    setStocks: (state, stocks) => {
        state.stocks = stocks;
    },
    setStock: (state, stock) => {
        state.stock = stock;
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}