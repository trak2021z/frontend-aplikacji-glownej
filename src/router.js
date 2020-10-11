import Vue from 'vue';
import Register from "@/components/Register";
import Router from "vue-router";

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
    ]
})

export default router