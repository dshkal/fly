<template>
  <v-layout row wrap>
    <v-flex xs12>
      <fly-card></fly-card>
    </v-flex>
    <v-flex xs12>
      <template v-if="isEmpty(items)">
        <p class="headline font-weight-thin text-xs-center">Sorry, we can`t find a flight for this destination</p>
      </template>
      <template v-else>
        <v-container>
          <v-layout column>
            <v-flex v-for="(item, index) in items" :key="item.expires_at + index" class="my-1">
              <flight-item :flight="item"></flight-item>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import FlyCard from '../components/home/FlyCard.vue'
import FlightItem from '../components/flight/FlightItem.vue'

export default {
  name: 'flight',
  data () {
    return {}
  },
  computed: {
    flights () {
      return this.$store.state.Aviasales.flights
    },
    search () {
      return this.$store.state.Aviasales.search
    },
    items () {
      return this.search.destination && this.flights.data[this.search.destination] ? this.flights.data[this.search.destination].flights : []
    },
  },
  methods: {
    isEmpty (obj) {
      for(let key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }
  },
  components: {
    'fly-card': FlyCard,
    'flight-item': FlightItem
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
