import axios from 'axios';

const state = {
    token: localStorage.getItem('token') || ''
}

const actions = {
    async register({commit}, user) {
        return axios.post( 'rest-auth/registration/', user)
            .then(response => {
                commit('setToken', response.data.token)
                return response.status
            })
            .catch(error => {
                return error.response.status
            });
    },
    async login({commit}, user) {
        return axios.post( 'rest-auth/login/', user)
            .then(response => {
                commit('setToken', response.data.token)
                return response.status
            })
            .catch(error => {
                return error.response.status
            });
    },
    clearToken ({ commit }) {
        commit('setToken', null)
    }


}

const getters = {
    getToken: state => {
        return state.token
    },
    isAuthenticated: state => !!state.token,
}

const mutations = {
    setToken: (state, token) => {
        state.token = token;
        localStorage.token = token;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}