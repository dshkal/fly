<template>
  <v-container fluid fill-height>
    <v-layout
      align-center
      justify-center
    >
     <v-flex xs12 md10>
       <fly-card></fly-card>
     </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FlyCard from '../components/home/FlyCard.vue'

export default {
  name: 'home',
  components: {
    'fly-card': FlyCard
  }
}
</script>

<style scoped>
</style>
