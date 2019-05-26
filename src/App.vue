<template>
  <v-app
    dark
  >
    <v-app-bar
      flat
      color="transparent"
      class="navbar"
    >
      <v-btn icon to="/">
        <img :src="require('./assets/logo-white.svg')" width="32" height="32" alt="">
      </v-btn>
      <v-spacer></v-spacer>
      <template v-if="token">
<!--        <v-btn icon @click="exit">-->
<!--          <v-icon>exit_to_app</v-icon>-->
<!--        </v-btn>-->
        <v-btn icon @click="drawer = true">
          <v-icon>apps</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn icon to="/auth">
          <v-icon>account_circle</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-content>
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </v-content>
    <splash></splash>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      light
      color="white"
    >
      <v-list dense>
        <v-list-item link to="/user-flight">
          <v-list-item-icon>
            <v-icon>flight</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My flights</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="exit">
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-snackbar
      v-model="error.show"
      color="red"
      :timeout="4000"
    >
      {{ error.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Splash from './components/Splashscreen.vue'
import { TOGGLE_SPLASH } from './store/action-types'
import { LOGOUT } from './store/modules/auth/action-types'
import { SET_ERROR } from './store/action-types'
import { GET_COUNTRIES_LIST, GET_AIRLINES_LIST, GET_CITIES_LIST } from './store/modules/aviasales/action-types'
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left',
      drawer: false
    }
  },
  computed: {
    splash: {
      get () {
        return this.$store.state.splash
      },
      set (value) {
        this.toggleSplash(value)
      }
    },
    token () {
      return this.$store.state.Auth.token
    },
    error: {
      get () {
        return this.$store.state.error
      },
      set (value) {
        this.setError(value)
      }
    }
  },
  methods: {
    async init () {
      this.splash = true
      // получение общей информации (городаб страны и авиакомпании)
      await this.getCountriesList()
      await this.getCitiesList()
      await this.getAirlinesList()
      setTimeout(() => {
        this.splash = false
      }, 4000)
      return true
    },
    exit () {
      this.logout()
      this.$router.push('/')
    },
    ...mapMutations({
      toggleSplash: TOGGLE_SPLASH
    }),
    ...mapActions('Aviasales',{
      getCountriesList: GET_COUNTRIES_LIST,
      getCitiesList: GET_CITIES_LIST,
      getAirlinesList: GET_AIRLINES_LIST
    }),
    ...mapMutations('Auth', {
      logout: LOGOUT
    }),
    ...mapMutations({
      setError: SET_ERROR
    })
  },
  beforeRouteUpdate (to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
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
