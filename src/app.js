import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// import styles
import 'vuetify/dist/vuetify.min.css'

// import plugins and util
import vuetify from './plugins/vuetify'
import * as filters from './util/filters'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App)
})
