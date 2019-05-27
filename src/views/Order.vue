<template>
  <v-container fluid fill-height>
    <v-layout
      align-center
      justify-center
    >
      <v-flex xs12 md4>
        <v-card
          light
          color="white"
        >
          <v-toolbar primary color="purple" dark>
            <v-toolbar-title>Order your ticket</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              lazy-validation
              @submit.prevent="submitHandler"
            >
              <v-layout row wrap>
                <v-flex xs12 md6 class="px-1"><v-text-field label="Name" readonly :value="user.name"></v-text-field></v-flex>
                <v-flex xs12 md6 class="px-1"><v-text-field label="Surname" readonly :value="user.surname"></v-text-field></v-flex>
                <v-flex xs12 md6 style="color: #000;">
                  To pay: <span style="color: #000;" class="font-weight-medium subheading">${{flight.price}}</span>
                </v-flex>
                <v-flex xs12 md6 class="py-2">
                  <v-btn block type="submit" color="purple" dark>Order</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { ORDER } from '../store/modules/aviasales/action-types'
import { mapActions } from 'vuex'

export default {
  name: 'order',
  computed: {
    user () {
      return this.$store.state.Auth.user
    },
    flights () {
      return this.$store.state.Aviasales.flights
    },
    search () {
      return this.$store.state.Aviasales.search
    },
    items () {
      return this.search.destination && this.flights.data[this.search.destination] ? this.flights.data[this.search.destination].flights : []
    },
    flight () {
      return this.items.find(item => item.id === parseInt(this.$route.params.id))
    }
  },
  methods: {
    submitHandler () {
      let { name, surname, gender } = this.user
      console.log(surname)
      this.orderAction({
        user_id: this.$store.state.Auth.user._id,
        name,
        surname,
        gender,
        flight: this.flight
      })
        .then(() => {
          this.$router.push('/success')
        })
    },
    ...mapActions('Aviasales', {
      orderAction: ORDER
    })
  },
}
</script>

<style scoped>

</style>
