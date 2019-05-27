import * as constants from './action-types'

export default {
  [constants.SET_USER] (state, user) {
    state.user = user
  },
  [constants.SET_TOKEN] (state, token) {
    state.token = token
  },
  [constants.LOGOUT] (state) {
    state.user = null
    state.token = null
    localStorage.clear()
  }
}
