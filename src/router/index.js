import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

export default new Router({routes, mode: 'history'})
