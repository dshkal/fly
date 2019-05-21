<template>
  <v-container fluid fill-height>
    <v-layout
      align-center
      justify-center
    >
      <v-flex xs12 md4>
        <auth-card></auth-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthCard from '../components/auth/AuthCard.vue'

export default {
  name: 'auth',
  components: {
    'auth-card': AuthCard
  }
}
</script>

<style scoped>

</style>
