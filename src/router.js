import Vue from "vue";
import Router from "vue-router";
/****/
import login from '@/views/home/login'
import homeIndex from '@/views/home/index'
import project from '@/views/projectMain'
import profile from '@/views/home/profile'
import {getCookie} from '@/assets/scripts/storageFn.js'

Vue.use(Router);

const router = new Router({
    //mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/',
            name: 'homeIndex',
            component: homeIndex,
            children:[
                {path:"project", component: project},
                {path:"profile", component: profile}
            ]
        }
        // {
        //     path: "/about",
        //     name: "about",
        //     component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
        // }
    ]
})

//路由跳转前判断(登录权限)
router.beforeEach((to, from, next) => {
    let userid = getCookie("userid");

    if(userid){ //有登录权限
        //console.log("有登陆权限");
        if(to.path=='/login'){
            next('/project');
        }else if(to.path=='/'){
            next('/project');
        }else{
            next();
        }

    }else{ //没有登录权限
        //console.log("没有登陆权限");
        if(to.path=='/login'){
            next();
        }else if(to.path=='/'){
            next();
        }else{//不然就跳转到登录；
            next('/login');
        }
    }

}) 

export default router;
