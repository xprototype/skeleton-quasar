<template>
  <q-page padding>
    <form @submit.prevent="attempt">
      <q-card class="app-auth-card">
        <q-card-title class="text-center">
          <img
            class="app-auth-logo"
            src="statics/register-logo.png"
            alt=""
          >
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <div class="row">
            <div class="col-12 q-pa-sm">
              <q-input
                float-label="First Name"
                v-model="form.firstName"
                :before="[{icon: 'person'}]"
                type="email"
              />
            </div>
            <div class="col-12 q-pa-sm">
              <q-input
                float-label="Last Name"
                v-model="form.lastName"
                :before="[{icon: 'person'}]"
                type="email"
              />
            </div>
            <div class="col-12 q-pa-sm">
              <q-input
                float-label="Birthday"
                v-model="form.birthday"
                :before="[{icon: 'calendar_today'}]"
                type="email"
              />
            </div>
            <div class="col-12 q-pa-sm">
              <q-input
                float-label="Gender"
                v-model="form.gender"
                :before="[{icon: 'calendar_today'}]"
                type="email"
              />
            </div>
          </div>
        </q-card-main>
      </q-card>
    </form>
  </q-page>
</template>

<script type="text/javascript">
import { email, required } from 'vuelidate/lib/validators'
import { minLengthThree } from 'src/app/Util/Validation'

import AuthService from 'src/domains/Auth/AuthService'

export default {
  name: 'AuthRegister',
  service: AuthService.build(),
  data: () => ({
    genderOptions: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ],
    done: false,
    form: {
      firstName: '',
      lastName: '',
      birthday: '',
      gender: '',
      email: '',
      query: ''
    }
  }),
  validations: {
    form: {
      firstName: { required, minLengthThree },
      lastName: { required, minLengthThree },
      birthday: { required },
      gender: { required },
      email: { required, email }
    }
  },
  methods: {
    /**
     */
    attempt () {
      this.$service
        .register(this.form)
        .then(this.success)
        .catch(this.error)
    },
    /**
     * @param {Object} response
     */
    info (response) {
      Object.keys(response).forEach(key => (this.form[key] = response[key]))
    },
    /**
     */
    success (/* response */) {
      this.done = true
      // this.$router.push(`/auth/confirm/${response.activation}`)
    },
    /**
     */
    error () {
      this.$util.fail(this.$t('auth.register.error'))
    }
  },
  created () {
    if (!this.$route.query.vendor) {
      return
    }
    const vendor = this.$route.query.vendor
    this.$service.info(vendor, this.$route.query).then(this.info)
  },
  mounted () {
    let query = this.$store.getters['app/getQuery']
    if (this.$route.query.redirect) {
      query = {
        partner: this.$route.query.partner,
        redirect: this.$route.query.redirect
      }
    }
    this.form.query = query

    if (!process.env.DEV) {
      return
    }
    const form = {
      firstName: 'John',
      lastName: 'Doe',
      birthday: '1998-07-08 00:00:00',
      gender: 'male',
      email: 'wilcorrea@gmail.com'
    }
    Object.keys(form).forEach(key => (this.form[key] = form[key]))
  }
}
</script>

<style lang="stylus">
</style>
