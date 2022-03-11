import Vue from 'vue'
import Vuex from 'vuex'

import posts from './modules/posts'
import account from './modules/account'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { posts, account }
})
