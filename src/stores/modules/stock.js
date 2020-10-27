import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    stock: null,
    stocks: null,
    userStocks: null
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
    async getUserStocksAction({commit}) {
        return axios.get('user/stocks/', {headers: authHeader()})
            .then(response => {
                commit('setUserStocks', response.data);
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
                commit('subUserStockAmount', response.data);
                return response
            })
            .catch(error => {
                return error.response
            });
    },
}

const getters = {
    allStocks: state => state.stocks,
    getStock: state => state.stock,
    allUserStocks: state => state.userStocks
}

const mutations = {
    setStocks: (state, stocks) => {
        state.stocks = stocks;
    },
    setStock: (state, stock) => {
        state.stock = stock;
    },
    setUserStocks: (state, userStocks) => {
        state.userStocks = userStocks;
    },
    addUserStockAmount: (state, userStockUpdate) => {
        const index = state.userStocks.findIndex(userStock => userStock.pk === userStockUpdate.pk);

        if(index > -1){
            state.userStocks.splice(index, 1, userStockUpdate);
        } else {
            state.userStocks.push(userStockUpdate);
        }
    },
    subUserStockAmount: (state, stockUpdate) => {
        const index = state.userStocks.findIndex(userStock => userStock.stock.pk === stockUpdate.stock.pk);

        if(index > -1){
            const updatedStock = state.userStocks[index];
            updatedStock.stock_amount -= stockUpdate.amount;
            if(updatedStock.stock_amount < 1){
                state.userStocks.splice(index, 1);
            } else {
                state.userStocks.splice(index, 1, updatedStock);
            }
        }
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}