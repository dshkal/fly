import { api } from './instances'
import store from '../store'

// класс для обращения к АПИ
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
  static findCheap ({ origin, destination, depart_date, return_date }) {
    return new Promise((resolve, reject) => {
      api.post('find', {
        origin,
        destination,
        depart_date,
        return_date
      })
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new Error(err))
        })
    })
  }
  static findMonth ({ origin, destination, depart_date, return_date }) {
    return new Promise((resolve, reject) => {
      api.post('find-for-month', {
        origin,
        destination,
        depart_date,
        return_date
      })
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new Error(err))
        })
    })
  }
  static login (email, password) {
    return new Promise((resolve, reject) => {
      api.post('/login', {username: email, password})
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new Error(err))
        })
    })
  }
  static register (user) {
    return new Promise((resolve, reject) => {
      api.post('/register', user)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new Error(err))
        })
    })
  }
  static order (payload) {
    return new Promise((resolve, reject) => {
      api.post('/order-flight', payload, {
        headers: {
          authorization: store.state.Auth.token
        }
      })
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
