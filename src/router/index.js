import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

// route-level code splitting
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
const Flight = () => import(/* webpackChunkName: "Flight" */ '../views/Flight.vue')
const Auth = () => import(/* webpackChunkName: "Auth" */ '../views/Auth.vue')
const Order = () => import(/* webpackChunkName: "Auth" */ '../views/Order.vue')
const Success = () => import(/* webpackChunkName: "Auth" */ '../views/Success.vue')

// настраиваем пути(роуты) приложения
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/flight',
    name: 'flight',
    component: Flight
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '/order/:id',
    name: 'order',
    component: Order,
    beforeEnter (to, from, next) {
      if (store.state.Auth.token) {
        next()
      } else {
        next('/auth')
      }
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    beforeEnter (to, from, next) {
      if (store.state.Auth.token) {
        next('/')
      } else {
        next()
      }
    }
  }
]

export default new Router({routes, mode: 'history'})
