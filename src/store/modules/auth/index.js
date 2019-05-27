import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const initialState = {
  user: null,
  token: null
}

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters
}
