import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const initialState = {
}

export default new Vuex.Store({
  state: initialState,
  actions,
  mutations,
  getters
})
