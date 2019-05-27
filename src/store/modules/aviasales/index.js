import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const initialState = {
  countries: [],
  cities: [],
  airlines: [],
  flights: {},
  search: {}
}

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters
}
