import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    stock: null,
    stocks: null,
}

const actions = {
    async getStocksAction({commit}) {
        const response = await axios.get('stocks/', {headers: authHeader()})

        commit('setStocks', response.data);

        return response.data;
    },
    async buyStock({commit}, form) {
        return axios.post( 'stocks/' + form.id + '/buy/', form, {headers: authHeader()})
            .then(response => {
                commit('getStock', response.data);
                return response.status
            })
            .catch(error => {
                return error.response.status
            });
    },
    async sellStock({commit}, form) {
        return axios.post( 'user/stocks/' + form.id + '/sell/', form, {headers: authHeader()})
            .then(response => {
                commit('getStock', response.data);
                return response.status
            })
            .catch(error => {
                return error.response.status
            });
    },
}

const getters = {
    getStocks: state => {
        return state.stocks;
    },
    getStock: state => {
        return state.stock;
    }
}

const mutations = {
    setStocks: (state, stocks) => {
        state.stocks = stocks;
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}