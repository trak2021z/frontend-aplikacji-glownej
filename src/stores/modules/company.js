import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    company: null,
    companies: null
}

const actions = {
    async getCompanyAction({commit}, id) {
        const response = await axios.get('company/' + id, {headers: authHeader()})

        commit('setCompany', response.data);

        return response.data;
    },
    async getCompaniesAction({commit}) {
        const response = await axios.get('company/', {headers: authHeader()})

        commit('setCompanies', response.data);

        return response.data;
    }
}

const getters = {
    getCompany: state => {
        return state.company;
    },
    getCompanies: state => {
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