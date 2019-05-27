<template>
  <v-container fluid>
    <v-layout column>
      <v-flex v-for="(item, index) in items" :key="item.expires_at + index" class="my-1">
        <flight-item :order="false" :flight="item"></flight-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { GET_USER_FLIGHTS } from '../store/modules/aviasales/action-types'
import { mapActions } from 'vuex'
import FlightItem from '../components/flight/FlightItem.vue'

export default {
  name: 'user-flight',
  data: () => ({
    items: []
  }),
  methods: {
    ...mapActions('Aviasales', {
      getFlights: GET_USER_FLIGHTS
    })
  },
  components: {
    'flight-item': FlightItem
  },
  mounted () {
    this.getFlights(this.$store.state.Auth.user._id)
      .then(response => {
        this.items = response
      })
  }
}
</script>

<style scoped>

</style>
