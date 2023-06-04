import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Detail from './views/detail/Detail.vue'
import Server from './views/Server.vue'
import Histories from './views/Histories.vue'
import Todo from './views/Todo.vue'
import All from './views/detail/All.vue'
import HawkID from './views/detail/Hawk-ID.vue'
import HawkAU from './views/detail/Hawk-AU.vue'
import HawkCC from './views/detail/Hawk-CC.vue'
import HawkSNTR from './views/detail/Hawk-SNTR.vue'
import HawkQCS from './views/detail/Hawk-QCS.vue'
import TMSAU from './views/detail/Tms-AU.vue'
import Main from './container/Main.vue'
import Login from './views/Login.vue'
import Report from './views/Report.vue'



Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        redirect: '/login',
        name: 'Main',
        component: Main,
        children: [
          {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
          },
          {
            path: '/detail',
            component: Detail,
            props: true,
            children: [
              {
                path: "",
                component: All
              },
              {
                path: "hawk-id",
                component: HawkID
              },
              {
                path: "hawk-au",
                component: HawkAU
              },
              {
                path: "hawk-cc",
                component: HawkCC
              },
              {
                path: "hawk-sntr",
                component: HawkSNTR
              },
              {
                path: "hawk-qcs",
                component: HawkQCS
              },
              {
                path: "tms-au",
                component: TMSAU
              }
            ]
          },
          {
            path: '/server',
            name: 'Server',
            component: Server
          },
          {
            path: '/histories',
            name: 'Histories',
            component: Histories
          },
          {
            path: '/todo',
            name: 'Todo',
            component: Todo
          },
          {
            path: '/report',
            name: 'Report',
            component: Report
          },
        ]
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
    ]
})
