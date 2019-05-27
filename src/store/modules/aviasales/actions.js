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
  },
  async [constants.FIND_CHIPS] ({commit}, { origin, destination, depart_date, return_date }) {
    try {
      let response = await API.findCheap({ origin, destination, depart_date, return_date })
      let { flights } = response.data
      commit(constants.SET_FLIGHTS, flights)
    } catch (e) {
      console.error(e.message)
    }
  },
  async [constants.FIND_FOR_MONTH] ({commit, dispatch}, { origin, destination, depart_date, return_date }) {
    try {
      let arrayOfFlights = []
      let arrayOfFlightsOfEveryDay = []
      let index = 0
      let id = 1
      let response = await API.findMonth({ origin, destination, depart_date, return_date })
      let cheap = await API.findCheap({ origin, destination, depart_date, return_date })
      cheap = cheap.data.flights
      let { flights } = response.data
      if (cheap.data[destination]) {
        for (let key in cheap.data[destination]) {
          if (cheap.data[destination].hasOwnProperty(key)) {
            cheap.data[destination][key]['id'] = id
            arrayOfFlights = [...arrayOfFlights, cheap.data[destination][key]]
            id++
          }
        }
      }
      id = 0
      for (let key in flights.data) {
        if (flights.data.hasOwnProperty(key) && index < 20) {
          flights.data[key]['id'] = 0
          arrayOfFlightsOfEveryDay = [...arrayOfFlightsOfEveryDay, flights.data[key]]
          index++
          id++
        }
      }
      flights.data = {
        [destination]: {
          flights: depart_date ? (flights.data[depart_date] ? [...arrayOfFlights, flights.data[depart_date]] : arrayOfFlights) : [...arrayOfFlights, ...arrayOfFlightsOfEveryDay]
        }
      }
      commit(constants.SET_FLIGHTS, flights)
    } catch (e) {
      console.error(e.message)
    }
  },
  async [constants.ORDER] ({commit}, payload) {
    try {
      let response = await API.order(payload)
      console.log(response)
    } catch (e) {
      console.error(e.message)
    }
  },
  async [constants.GET_USER_FLIGHTS] ({commit}, id) {
    try {
      let response = await API.getUserFlights(id)
      return response.data.map(item => item.flight)
    } catch (e) {
      console.error(e.message)
    }
  }
}
