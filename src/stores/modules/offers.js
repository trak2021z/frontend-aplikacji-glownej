import axios from 'axios';
import authHeader from "@/stores/modules/auth-header";

const state = {
    offers: null,
    buy_offers: null,
    sell_offers: null,
}

const actions = {
    //GET
    async getOffersAction({commit}) {
        const response = await axios.get('user/offers/', {headers: authHeader()})

        commit('setBuyOffers', response.data.buy_offers);
        commit('setSellOffers', response.data.sell_offers);

        let offers_all = response.data.buy_offers;
        if(response.data.sell_offers != null && response.data.sell_offers){
            offers_all.concat( response.data.sell_offers);
            offers_all.forEach(function setType(item) {
                if(item.stock) item.offer_type = 'buy';
                else {
                    item.offer_type = 'sell';
                    item.stock = item.user_stock;
                }
            });
        }
        
        offers_all.sort(function(a,b) {return (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0);} );
        offers_all.reverse();
        this.dispatch('getUserAction');
        this.dispatch('getUserStocksAction');
        commit('setOffers', offers_all);

        return response.data;
    },
    //POST
    async addBuyOfferAction({ commit }, data) {
        const response = await axios.post(`buyoffer/`, 
        {stock:data.stock, unit_price:data.unit_price, stock_amount:data.stock_amount}, 
        {headers: authHeader()});
        let offer = response.data;
        offer.offer_type = 'buy';

        const date = offer.created.split('T')
        const time = date[1].split('.')
        offer.created = date[0] + " " + time[0];
        const STATUS_TYPES = ['open','expired','closed']
        offer.status_name = STATUS_TYPES[(offer.status-1)];
        commit('updateOffers', offer);

        return response;
    },
    async addSellOfferAction({ commit }, data) {
        const response = await axios.post(`selloffer/`, 
        {user_stock:data.user_stock, unit_price:data.unit_price, stock_amount:data.stock_amount}, 
        {headers: authHeader()});
        
        let offer = response.data;
        offer.offer_type = 'sell';

        const date = offer.created.split('T')
        const time = date[1].split('.')
        offer.created = date[0] + " " + time[0];
        const STATUS_TYPES = ['open','expired','closed']
        offer.status_name = STATUS_TYPES[(offer.status-1)];
        commit('updateOffers', offer);

        return response;
    },
    //DELETE
    async deleteBuyOfferAction({ commit }, id) {
        const response = await axios.delete(`buyoffer/${id}`, {headers: authHeader()});
        let offer = response.data;
        offer.offer_type = 'buy';

        const date = offer.created.split('T')
        const time = date[1].split('.')
        offer.created = date[0] + " " + time[0];
        const STATUS_TYPES = ['open','expired','closed']
        offer.status_name = STATUS_TYPES[(offer.status-1)];
        commit('updateOffers', offer);

        return response;
    },
    async deleteSellOfferAction({ commit }, id) {
        const response = await axios.delete(`selloffer/${id}`, {headers: authHeader()});
        let offer = response.data;
        offer.offer_type = 'sell';

        const date = offer.created.split('T')
        const time = date[1].split('.')
        offer.created = date[0] + " " + time[0];
        const STATUS_TYPES = ['open','expired','closed']
        offer.status_name = STATUS_TYPES[(offer.status-1)];
        commit('updateOffers', offer);

        return response;
    },
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
    removeBuyOffers: (state, id) =>{
        state.buy_offers = state.buy_offers.filter(buy_offers => buy_offers.pk !== id);
    },
    removeSellOffers: (state, id) =>{
        state.sell_offers = state.sell_offers.filter(sell_offers => sell_offers.pk !== id);
    },
    removeOffers: (state, id) => {
        state.offers = state.offers.filter(offers => offers.pk != id);
    },
    updateOffers: (state, updatedOffer) => {
        if(state.offers){
            const index = state.offers.findIndex(offer => offer.pk === updatedOffer.pk);

            if(index > -1) {
                state.offers.splice(index, 1, updatedOffer);
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