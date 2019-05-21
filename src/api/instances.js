// создаем инстанс АПИ
import axios from 'axios'
// api instance
const api = axios.create({
  baseURL: process.env.API
})

export { api }
