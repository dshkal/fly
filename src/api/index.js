import { api } from './instances'

class Api {
  static getCountriesList () {
    return new Promise((resolve, reject) => {
      api.get('/get-countries')
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new Error(err))
        })
    })
  }
  static getCitiesList () {
    return new Promise((resolve, reject) => {
      api.get('/get-cities')
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new Error(err))
        })
    })
  }
  static getAirlinesList () {
    return new Promise((resolve, reject) => {
      api.get('/get-airlines')
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new Error(err))
        })
    })
  }
}

export default Api
