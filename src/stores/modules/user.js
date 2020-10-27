import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    user: null
}

const actions = {
    async getUserAction({commit}) {
        const response = await axios.get('rest-auth/user/', {headers: authHeader()})

        commit('setUser', response.data);

        return response.data;
    }
}

const getters = {
    getUser: state => {
        return state.user;
    }
}

const mutations = {
    setUser: (state, user) => {
        state.user = user;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}