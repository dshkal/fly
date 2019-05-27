<template>
  <v-card flat color="transparent">
    <v-card-title v-if="!isFlightPage" class="justify-center">Search for cheap flights</v-card-title>
    <v-card-text>
      <v-subheader v-if="!isFlightPage" class="justify-center">The best way to buy cheap flights</v-subheader>
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="submitHandler"
      >
        <v-layout
          row
          wrap
          align-center
          justify-center
        >
          <v-flex xs12 :md3="!isFlightPage" :md2="isFlightPage" :class="{'px-3': isFlightPage}">
            <v-autocomplete
              :items="cities"
              prepend-icon="flight_takeoff"
              label="From"
              item-text="name"
              item-value="code"
              v-model="origin"
              hide-selected
              :rules="[v => !!v || 'Field is required']"
              color="white"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 :md3="!isFlightPage" :md2="isFlightPage" :class="{'px-3': isFlightPage}">
            <v-autocomplete
              :items="cities"
              prepend-icon="flight_land"
              item-text="name"
              item-value="code"
              label="To"
              v-model="destination"
              :rules="[v => !!v || 'Field is required']"
              color="white"
              hide-selected
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 :md3="!isFlightPage" :md2="isFlightPage" :class="{'px-3': isFlightPage}">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              color="primary"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="depart_date"
                  label="Depart date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  color="white"
                ></v-text-field>
              </template>
              <v-date-picker v-model="depart_date" @input="menu = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 :md3="!isFlightPage" :md2="isFlightPage" :class="{'px-3': isFlightPage}">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="return_date"
                  label="Return date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  color="white"
                ></v-text-field>
              </template>
              <v-date-picker v-model="return_date" @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 :md3="!isFlightPage" :md2="isFlightPage" class="pt-1" :class="{'px-3': isFlightPage}">
            <v-btn type="submit" color="primary" style="width: 100%">Find ticket</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { FIND_FOR_MONTH, SET_SEARCH } from '../../store/modules/aviasales/action-types'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'fly-card',
  data () {
    return {
      origin: 'IEV',
      destination: '',
      depart_date: '',
      return_date: '',
      menu: false,
      menu1: false
    }
  },
  computed: {
    cities () {
      return this.$store.state.Aviasales.cities
    },
    isFlightPage () {
      return this.$route.name === 'flight'
    },
    search: {
      get () {
        return this.$store.state.Aviasales.search
      },
      set (val) {
        this.setSearch(val)
      }
    }
  },
  watch: {
    search (newValue) {
      if (this.isFlightPage && newValue.destination) {
        for (let key in this) {
          if (this.hasOwnProperty(key) && newValue.hasOwnProperty(key)) {
            this[key] = newValue[key]
          }
        }
      }
    }
  },
  methods: {
    submitHandler () {
      if (this.$refs.form.validate()) {
        let payload = {
          origin: this.origin,
          destination: this.destination,
          depart_date: this.depart_date,
          return_date: this.return_date
        }
        this.findMonthAction(payload).then(() => {
          if (!this.isFlightPage) this.$router.push('/flight')
          this.search = payload
        })
      }
    },
    ...mapActions('Aviasales', {
      findMonthAction: FIND_FOR_MONTH
    }),
    ...mapMutations('Aviasales', {
      setSearch: SET_SEARCH
    })
  },
  mounted () {
    if (this.isFlightPage && this.search.destination) {
      for (let key in this) {
        if (this.hasOwnProperty(key) && this.search.hasOwnProperty(key)) {
          this[key] = this.search[key]
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
