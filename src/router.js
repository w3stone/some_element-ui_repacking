import Vue from "vue";
import Router from "vue-router";
/****/
import homeIndex from '@/views/index'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/index',
            name: 'homeIndex',
            component: homeIndex
        }
    ]
})

export default router;
