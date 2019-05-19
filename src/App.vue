<template>
  <v-app>
    <v-app-bar
      flat
      color="transparent"
      class="navbar"
    >
      <v-btn icon>
        <img :src="require('./assets/turkish-airlines.svg')" width="52" height="52" alt="">
      </v-btn>
    </v-app-bar>
    <router-view></router-view>
    <splash></splash>
  </v-app>
</template>

<script>
import Splash from './components/Splashscreen.vue'
import { TOGGLE_SPLASH } from './store/action-types'
import { GET_COUNTRIES_LIST, GET_AIRLINES_LIST, GET_CITIES_LIST } from './store/modules/aviasales/action-types'
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: {
    splash: {
      get () {
        return this.$store.state.splash
      },
      set (value) {
        this.toggleSplash(value)
      }
    }
  },
  methods: {
    async init () {
      // this.splash = true
      await this.getCountriesList()
      await this.getCitiesList()
      await this.getAirlinesList()
      setTimeout(() => {
        this.splash = false
      }, 4000)
      return true
    },
    ...mapMutations({
      toggleSplash: TOGGLE_SPLASH
    }),
    ...mapActions('Aviasales',{
      getCountriesList: GET_COUNTRIES_LIST,
      getCitiesList: GET_CITIES_LIST,
      getAirlinesList: GET_AIRLINES_LIST
    })
  },
  components: {
    'splash': Splash
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
