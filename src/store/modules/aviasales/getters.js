const getAirlinesByCode = state => code => state.airlines.find(line => line.code === code)

export default {
  getAirlinesByCode
}
