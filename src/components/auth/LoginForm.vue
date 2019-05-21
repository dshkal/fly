<template>
  <v-form ref="form" lazy-validation @submit.prevent="submitHandler">
    <v-text-field
      label="Email"
      v-model="email"
      type="email"
      :rules="[v => !!v || 'Field is required']"
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      type="password"
      :rules="[v => !!v || 'Field is required']"
    ></v-text-field>
    <v-btn block class="my-2" color="primary" type="submit">Login</v-btn>
  </v-form>
</template>

<script>
import { LOGIN } from '../../store/modules/auth/action-types'
import { mapActions } from 'vuex'

export default {
  name: 'login-form',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    token () {
      return this.$store.state.Auth.token
    }
  },
  methods: {
    submitHandler () {
      if (this.$refs.form.validate()) {
        let { email, password } = this
        let payload = {
          email,
          password
        }
        this.loginAction(payload)
          .then(() => {
            if (this.token) {
              this.$router.push('/')
            }
          })
      }
    },
    ...mapActions('Auth', {
      loginAction: LOGIN
    })
  }
}
</script>

<style scoped>

</style>
