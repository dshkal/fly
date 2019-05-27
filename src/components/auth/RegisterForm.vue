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
    <v-radio-group v-model="gender" row>
      <v-radio label="Male" value="male"></v-radio>
      <v-radio label="Female" value="female"></v-radio>
    </v-radio-group>
    <v-text-field
      label="Name"
      v-model="name"
      :rules="[v => !!v || 'Field is required']"
    ></v-text-field>
    <v-text-field
      label="Surname"
      v-model="surname"
      :rules="[v => !!v || 'Field is required']"
    ></v-text-field>
    <v-btn block class="my-2" color="primary" type="submit">Register</v-btn>
  </v-form>
</template>

<script>
import { REGISTER } from '../../store/modules/auth/action-types'
import { mapActions } from 'vuex'

export default {
  name: 'register-form',
  data () {
    return {
      email: '',
      password: '',
      gender: 'male',
      name: '',
      surname: ''
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
        let { email, password, gender, name, surname } = this
        let payload = {
          email,
          password,
          gender,
          name,
          surname
        }
        this.registerAction(payload)
          .then(() => {
            if (this.token) {
              this.$router.push('/')
            }
          })
      }
    },
    ...mapActions('Auth', {
      registerAction: REGISTER
    })
  }
}
</script>

<style scoped>

</style>
