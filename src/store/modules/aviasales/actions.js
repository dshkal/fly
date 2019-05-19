import API from '../../../api'
import * as constants from './action-types'

export default {
  async [constants.GET_COUNTRIES_LIST] ({commit}) {
    try {
      let response = await API.getCountriesList()
      let { countries } = response.data
      commit(constants.SET_COUNTRIES, countries)
      return true
    } catch (e) {
      console.error(e.message)
    }
  },
  async [constants.GET_CITIES_LIST] ({commit}) {
    try {
      let response = await API.getCitiesList()
      let { cities } = response.data
      commit(constants.SET_CITIES, cities)
      return true
    } catch (e) {
      console.error(e.message)
    }
  },
  async [constants.GET_AIRLINES_LIST] ({commit}) {
    try {
      let response = await API.getAirlinesList()
      let { airlines } = response.data
      commit(constants.SET_AIRLINES, airlines)
      return true
    } catch (e) {
      console.error(e.message)
    }
  }
}
