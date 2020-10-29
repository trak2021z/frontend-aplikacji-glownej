import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    stocks: null,
    userStocks: null
}

const actions = {
    async getStocksAction({commit}) {
        return axios.get('stocks/', {headers: authHeader()})
            .then(response => {
                commit('setStocks', response.data);
                return response;
            })
            .catch(error => {
                return error.response;
            });
    },
    async getUserStocksAction({commit}) {
        return axios.get('user/stocks/', {headers: authHeader()})
            .then(response => {
                commit('setUserStocks', response.data);
                return response;
            })
            .catch(error => {
                return error.response;
            });
    },
    async buyStock({commit}, {stockId, quantity}) {
        return axios.post( `stocks/${stockId}/buy/`, {quantity: quantity}, {headers: authHeader()})
            .then(response => {
                commit('updateUserStocks', response.data);
                commit('updateStocks', response.data.stock);
                return response;
            })
            .catch(error => {
                return error.response;
            });
    },
    async sellStock({commit}, {userStockId, quantity}) {
        return axios.post( `user/stocks/${userStockId}/sell/`, {quantity: quantity}, {headers: authHeader()})
            .then(response => {
                commit('updateUserStocks', response.data);
                commit('updateStocks', response.data.stock);
                return response;
            })
            .catch(error => {
                return error.response;
            });
    },
}

const getters = {
    allStocks: state => state.stocks,
    allUserStocks: state => state.userStocks
}

const mutations = {
    setStocks: (state, stocks) => {
        state.stocks = stocks;
    },
    setUserStocks: (state, userStocks) => {
        state.userStocks = userStocks;
    },
    updateStocks: (state, stockUpdate) => {
        if(state.stocks){
            const index = state.stocks.findIndex(stock => stock.pk === stockUpdate.pk);

            if(index > -1) {
                state.stocks.splice(index, 1, stockUpdate);
            }
        }
    },
    updateUserStocks: (state, stockUpdate) => {
        if(state.userStocks){
            const index = state.userStocks.findIndex(userStock => userStock.stock.pk === stockUpdate.stock.pk);

            if(index > -1) {
                if(stockUpdate.stock_amount < 1){
                    state.userStocks.splice(index, 1);
                } else {
                    state.userStocks.splice(index, 1, stockUpdate);
                }
            } else {
                    state.userStocks.push(stockUpdate);
            }
        }
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}