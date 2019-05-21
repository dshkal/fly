import * as constants from './action-types'
import API from '../../../api'

export default {
  async [constants.LOGIN] ({commit}, payload) {
    try {
      let response = await API.login(payload.email, payload.password)
      let { user } = response.data
      commit(constants.SET_USER, user)
      commit(constants.SET_TOKEN, user.token)
    } catch (e) {
      console.error(e.message)
    }
  },
  async [constants.REGISTER] ({commit}, payload) {
    try {
      let response = await API.register(payload)
      let { user } = response.data
      commit(constants.SET_USER, user)
      commit(constants.SET_TOKEN, user.token)
    } catch (e) {
      console.error(e.message)
    }
  }
}
