import Vue from 'vue';
import Router from "vue-router";
import Login from "@/components/Login";
import Register from "@/components/Register";
import CompaniesList from "@/components/CompaniesList";
import Company from "@/components/Company";
import store from './stores/store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/companies')
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
<<<<<<< HEAD
            component: Login
        },
        {
            path: '/login',
            name: 'login',
            component: Login
=======
            component: Register,
            beforeEnter: ifNotAuthenticated
>>>>>>> 4fb137b92ce5d2aeb25b72cd9787740e3884c742
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            beforeEnter: ifNotAuthenticated
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
            path: '*',
            name: 'home',
            component: Register,
            beforeEnter: ifNotAuthenticated
        },
    ]
})

export default router

