import * as constants from './action-types'
import { SET_ERROR } from '../../action-types'
import API from '../../../api'

export default {
  async [constants.LOGIN] ({commit, ro}, payload) {
    try {
      let response = await API.login(payload.email, payload.password)
      let { user } = response.data
      commit(constants.SET_USER, user)
      commit(constants.SET_TOKEN, user.token)
    } catch (e) {
      commit(SET_ERROR, {
        show: true,
        message: 'Wrong password or username'
      }, {root: true})
    }
  },
  async [constants.REGISTER] ({commit}, payload) {
    try {
      let response = await API.register(payload)
      let { user } = response.data
      commit(constants.SET_USER, user)
      commit(constants.SET_TOKEN, user.token)
    } catch (e) {
      commit(SET_ERROR, {
        show: true,
        message: 'User with this email already exist'
      }, {root: true})
    }
  }
}
