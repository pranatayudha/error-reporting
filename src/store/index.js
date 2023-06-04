/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'
import detail from './detail'



localforage.config({
  name: 'error reporting',
  version: 1.0,
})

Vue.use(Vuex)
Vue.config.devtools = true

const qs = require('qs')

export default new Vuex.Store({
  modules: {
    detail
  },
  state: {

  },
  getters: {

  },
  mutations: {
    
  },
  actions: {
    
  }
})
