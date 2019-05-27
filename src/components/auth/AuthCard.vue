<template>
  <v-card color="white" light>
    <v-toolbar flat color="white">
      <v-tabs
        v-model="active"
        grow
      >
        <v-tab href="#login">Login</v-tab>
        <v-tab href="#register">Register</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-card-text>
      <v-tabs-items
        v-model="active"
      >
        <v-tab-item value="login">
          <login-form></login-form>
        </v-tab-item>
        <v-tab-item value="register">
          <register-form></register-form>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

export default {
  name: 'auth-card',
  data () {
    return {
      active: 'login'
    }
  },
  components: {
    'login-form': LoginForm,
    'register-form': RegisterForm
  }
}
</script>

<style scoped>

</style>
