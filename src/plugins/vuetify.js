import Vue from 'vue'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const options = {
  theme: {
    dark: false
  },
  icons: {
    iconfont: 'mdi'
  }
}

export default new Vuetify(options)
