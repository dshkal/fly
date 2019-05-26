import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// modules
import Aviasales from './modules/aviasales'
import Auth from './modules/auth'

Vue.use(Vuex)

const initialState = {
  splash: false,
  error: {
    show: false,
    message: ''
  }
}

export default new Vuex.Store({
  state: initialState,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState({ key: 'fly' })],
  modules: {
    Aviasales,
    Auth
  }
})
