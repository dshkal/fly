import * as constants from './action-types'

export default {
  [constants.SET_COUNTRIES] (state, countries) {
    state.countries = countries
  },
  [constants.SET_CITIES] (state, cities) {
    state.cities = cities
  },
  [constants.SET_AIRLINES] (state, airlines) {
    state.airlines = airlines
  }
}
