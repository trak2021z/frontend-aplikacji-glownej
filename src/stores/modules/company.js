import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    company: null,
    companies: null
}

const actions = {
    async getCompanyAction({commit}, id) {
        return axios.get('company/' + id, {headers: authHeader()})
            .then(response => {
                commit('setCompany', response.data);
                return response
            })
            .catch(error => {
                return error.response
            });
    },
    async getCompaniesAction({commit}) {
        return axios.get('company/', {headers: authHeader()})
            .then(response => {
                commit('setCompanies', response.data);
                return response
            })
            .catch(error => {
                return error.response
            });
    }
}

const getters = {
    getCompany: state => {
        return state.company;
    },
    allCompanies: state => {
        return state.companies;
    }
}

const mutations = {
    setCompany: (state, company) => {
        state.company = company;
    },
    setCompanies: (state, companies) => {
        state.companies = companies;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}