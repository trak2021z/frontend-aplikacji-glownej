import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    transactions: null
}

const actions = {
    async getTransactionsAction({commit}) {
        const response = await axios.get('transaction/', {headers: authHeader()})

        commit('setTransactions', response.data);

        return response.data;
    }
}

const getters = {
    getTransactions: state => {
        return state.transactions;
    }
}

const mutations = {
    setTransactions: (state, transactions) => {
        state.transactions = transactions;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}