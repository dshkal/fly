<template>
  <v-card
    color="white"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle color="black" style="align-items: center; display: flex">
          <img :src="airlineLogo" class="mr-2"/>
          {{flight.airline}} {{flight.flight_number}}
        </v-list-item-subtitle>
        <v-list-item-title class="mb-1">
          <span class="font-weight-medium">Departure:</span> <span class="font-weight-thin">{{ flight.departure_at | formatDate }} {{ flight.departure_at | formatTime }}</span>
        </v-list-item-title>
        <v-list-item-title>
          <span class="font-weight-medium">Returned:</span> <span class="font-weight-thin">{{ flight.return_at | formatDate }} {{ flight.return_at | formatTime }}</span>
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        {{airlineName}} arline
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-title class="font-weight-medium">
          ${{flight.price}}
        </v-list-item-title>
      </v-list-item-action>
      <v-list-item-action v-if="order">
        <v-btn icon color="primary" large :to="`/order/${flight.id}`">
          <v-icon medium>monetization_on</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'flight-item',
  props: {
    flight: {
      type: Object,
      required: true
    },
    order: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    airlineLogo () {
      return `http://pics.avs.io/40/32/${this.flight.airline}.png`
    },
    airlineName () {
      return this.$store.getters['Aviasales/getAirlinesByCode'](this.flight.airline).name
    },
    token () {
      return this.$store.state.Auth.token
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
