<template>
  <q-page
    class="flex row items-center justify-center"
    padding
  >
    <q-card class="app-register-card rounded-borders vertical-bottom no-shadow">
      <q-card-section class="text-center">
        <div>
          <img
            alt=""
            class="app-login-logo"
            src="statics/quasar-logo.png"
          >
        </div>
        <div class="app-beauty-label text-h6">
          Quasar Skeleton
        </div>
        <small>Just an example about the possibilities</small>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <form @submit.prevent="attempt">
          <div class="row">
            <div class="col-6 q-pa-sm">
              <q-input
                dense
                standout
                float-label="First Name"
                v-model="form.firstName"
                :before="[{icon: 'person'}]"
                type="text"
              >
              </q-input>
            </div>
            <div class="col-6 q-pa-sm">
              <q-input
                dense
                standout
                float-label="Last Name"
                v-model="form.lastName"
                :before="[{icon: 'person'}]"
                type="text"
              />
            </div>
            <div class="col-12 q-pa-sm">
              <q-input
                dense
                standout
                placeholder="you@mail.com"
                type="email"
                v-model="form.email"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-pa-sm">
              <q-input
                dense
                standout
                placeholder="+62 1234 567 890"
                type="phone"
              >
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-pa-sm">
              <small>
                * by login or register you are agree with our terms and conditions.
              </small>
            </div>
            <!--
              <div class="col-12 q-pa-sm">
                <q-input
                  dense
                  standout
                  float-label="Birthday"
                  v-model="form.birthday"
                  :before="[{icon: 'calendar_today'}]"
                  type="email"
                />
              </div>
              <div class="col-12 q-pa-sm">
                <q-input
                  dense
                  standout
                  float-label="Gender"
                  v-model="form.gender"
                  :before="[{icon: 'calendar_today'}]"
                  type="email"
                />
              </div>
            -->
          </div>
          <hr>
          <div class="q-pa-sm full-width">
            <div class="row q-gutter-sm">
              <div class="col">
                <q-btn
                  outline
                  to="/auth/login"
                  class="full-width rounded-borders"
                  color="primary"
                  label="Log In"
                  size="md"
                  type="button"
                />
              </div>
              <div class="col">
                <q-btn
                  class="full-width rounded-borders"
                  color="primary"
                  label="Register"
                  size="md"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script type="text/javascript">
// noinspection ES6CheckImport
import { email, required } from 'vuelidate/lib/validators'
import { minLengthThree } from 'src/app/Util/Validation'

import AuthService from 'src/domains/Auth/Service/AuthService'

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
      // this.$browse(`/auth/confirm/${response.activation}`)
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

<style lang="stylus" scoped>
  @import '~src/css/quasar.variables.styl'

  .app-register-card
    max-width 420px

  .app-login-logo
    height 96px

  .app-beauty-label
    color $primary
</style>
