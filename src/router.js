import Vue from 'vue';
import Router from "vue-router";
import Login from "@/components/Login";
import Register from "@/components/Register";
import CompaniesList from "@/components/CompaniesList";
import Company from "@/components/Company";
import Stocks from "@/components/Stocks";
import User from "@/components/User";
import store from './stores/store';
import TradeHistory from "@/components/TradeHistory";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/stocks')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/stocks',
            name: 'stocks',
            component: Stocks,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/companies',
            name: 'companies',
            component: CompaniesList,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/company',
            name: 'company',
            component: Company,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/user',
            name: 'user',
            component: User,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/trades/history',
            name: 'tradesHistory',
            component: TradeHistory,
            beforeEnter: ifAuthenticated
        },
        {
            path: '*',
            name: 'default',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
    ]
})

export default router

