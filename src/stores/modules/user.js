import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    user: null,
    userStocks: null
}

const actions = {
    async getUserAction({commit}) {
        const response = await axios.get('rest-auth/user/', {headers: authHeader()})

        commit('setUser', response.data);

        return response.data;
    },

    async getUserStockAction({commit}) {
        const response = await axios.get('user/stocks/', {headers: authHeader()})

        commit('setUserStocks', response.data);

        return response.data;
    }
}

const getters = {
    getUser: state => {
        return state.user;
    },
    getStock: state => {
        return state.userStocks;
    }
}

const mutations = {
    setUser: (state, user) => {
        state.user = user;
    },
    setUserStocks: (state, userStocks) => {
        state.userStocks = userStocks;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}