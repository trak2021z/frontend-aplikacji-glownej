import Vue from 'vue';
import Router from "vue-router";
import Register from "@/components/Register";
import CompaniesList from "@/components/CompaniesList";
import Company from "@/components/Company";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Register
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/companies',
            name: 'companies',
            component: CompaniesList
        },
        {
            path: '/company',
            name: 'company',
            component: Company
        },
        {
            path: '*',
            name: 'home',
            component: Register
        },
    ]
})

export default router

