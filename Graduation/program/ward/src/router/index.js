import {createRouter, createWebHashHistory} from 'vue-router'

import index from "../views/index.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: {
                path: "/login"
            }
        },
        {
            path: "/index",
            name: "index",
            component: index,
            children: [{
                path: "wardEnv",
                component: () => import('../views/wardEnv/wardEnv.vue')

            }, {
                path: "wardInfo",
                component: () => import('../views/wardInfo/wardInfo.vue')

            },{
                path: "video",
                component: () => import('../views/wardEnv/video.vue')

            },{
                path: "userInfo",
                component: () => import('../views/user/userInfo.vue')

            },{
                path:"wardAdmit",
                component:()=>import('../views/wardInfo/wardAdmit.vue')
            },{
                path:"wardLeave",
                component:()=>import('../views/wardInfo/wardLeave.vue')
            },{
                path:"wardInfoChange",
                component:()=>import('../views/wardInfo/wardInfoChange.vue')
            },{
                path:"wardDetail",
                component:()=>import('../views/wardEnv/wardDetail.vue')
            },{
                path:"addUser",
                component:()=>import('../views/user/addUser.vue')
            }
            ]
        },
        {
            path: "/login",
            name:"login",
            component: () => import("../views/user/login.vue"),
        },
    ]
})

export default router
