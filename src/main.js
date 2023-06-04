/* eslint-disable no-console */
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'
import vSelect from 'vue-select'
import store from './store'

import FlagIcon from 'vue-flag-icon'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(FlagIcon)

sync(store, router)
const stores = require('store')

router.beforeEach((to, from, next) => {
  if (stores.get('userData') && to.path === '/login') {
      next('/dashboard')
  } else if (!stores.get('userData') && to.path !== '/login') {
      next({
        path: '/login'
      })
  }
  else {
    next()
  }
})

new Vue({
  router,
  store,
  vuetify,
  vSelect,
  render: h => h(App)
}).$mount('#app')
