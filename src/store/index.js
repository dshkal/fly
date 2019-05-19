import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// modules
import Aviasales from './modules/aviasales'

Vue.use(Vuex)

const initialState = {
  splash: false
}

export default new Vuex.Store({
  state: initialState,
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()],
  modules: {
    Aviasales
  }
})
