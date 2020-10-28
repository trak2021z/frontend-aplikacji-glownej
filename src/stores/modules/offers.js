import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    offers: null,
    buy_offers: null,
    sell_offers: null,
}

const actions = {
    async getOffersAction({commit}) {
        const response = await axios.get('user/offers/', {headers: authHeader()})

        commit('setBuyOffers', response.data.buy_offers);
        commit('setSellOffers', response.data.sell_offers);

        let offers_all = response.data.buy_offers.concat( response.data.sell_offers);
        offers_all.forEach(function setType(item) {
            if(item.stock) item.offer_type = 'buy';
            else {
                item.offer_type = 'sell';
                item.stock = item.user_stock;
            }
        });
        offers_all.sort(function(a,b) {return (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0);} );
        offers_all.reverse();
        commit('setOffers', offers_all);

        return response.data;
    }
}

const getters = {
    getOffers: state => {
        return state.offers;
    },
    getBuyOffers: state => {
        return state.buy_offers;
    },
    getSellOffers: state => {
        return state.sell_offers;
    }
}

const mutations = {
    setOffers: (state, offers) => {
        state.offers = offers;
    },
    setBuyOffers: (state, buy_offers) => {
        state.buy_offers = buy_offers;
    },
    setSellOffers: (state, sell_offers) => {
        state.sell_offers = sell_offers;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}