import * as constants from './action-types'

export default {
  [constants.TOGGLE_SPLASH] (state, value) {
    state.splash = value
  },
  [constants.SET_ERROR] (state, payload) {
    state.error = payload
  }
}
