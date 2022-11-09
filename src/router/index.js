import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// @代表src文件夹
// 导入组件
// import Recommend from '@/views/Recommend'
// import Singer from '@/views/Singer'
// import Rank from '@/views/Rank'
// import Search from '@/views/Search'
// import Detail from '@/views/Detail'

//路由规则：数组，每一条是一个规则
const routes = [
    {
        path: '/',
        redirect: '/recommend',
        // component: HomeView
    },
    {
        path: '/recommend',
        //路由懒加载，也叫延迟加载，即在需要的时候进行加载，随用随载。
        component: (resolve) => import('../views/Recommend')
            .then((result) => {
                resolve(result)
            }),
        children: [
            {
                path: 'detail/:id/:type',
                component: (resolve) => import('../views/Detail')
                    .then((result) => {
                        resolve(result)
                    })
            }
        ]
    },
    {
        path: '/singer',
        // component: Singer,
        component: (resolve) => import('../views/Singer')
            .then((result) => {
                resolve(result)
            }),
        children: [
            {
                path: 'detail/:id/:type',
                component: (resolve) => import('../views/Detail')
                    .then((result) => {
                        resolve(result)
                    })
            }
        ]
    },
    {
        path: '/rank',
        // component: Rank,
        component: (resolve) => import('../views/Rank')
            .then((result) => {
                resolve(result)
            }),
        children: [
            {
                path: 'detail/:id/:type',
                component: (resolve) => import('../views/Detail')
                    .then((result) => {
                        resolve(result)
                    })
            }
        ]
    },
    {
        path: '/search',
        // component: Search,
        component: (resolve) => import('../views/Search')
            .then((result) => {
                resolve(result)
            })
    },
    {
        path: '/user',
        // component: User,
        component: (resolve) => import('../views/User')
            .then((result) => {
                resolve(result)
            })
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkActiveClass: 'myStyle',
})

export default router
