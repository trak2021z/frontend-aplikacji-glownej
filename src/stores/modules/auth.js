import axios from 'axios';

const state = {
    token: ''
}

const actions = {
    async register({commit}, user) {
        console.log(process.env.VUE_APP_BACKEND_URI);
        return axios.post( 'rest-auth/registration/', user)
            .then(response => {
                commit('setToken', response.data.token)
                return response.status
            })
            .catch(error => {
                return error.response.status
            });
    }
}

const getters = {
    getToken: state => {
        return state.token
    },
}

const mutations = {
    setToken: (state, token) => (state.token = token)
}
export default {
    state,
    getters,
    actions,
    mutations
}