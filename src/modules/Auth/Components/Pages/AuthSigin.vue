<!--suppress HtmlUnknownTarget -->
<template>
  <q-page
    class="flex row items-center justify-center"
    padding
  >
    <q-card class="app-login-card">
      <q-card-section class="text-center">
        <div>
          <img
            alt=""
            class="app-login-logo"
            src="statics/quasar-logo.png"
          >
        </div>
        <div class="app-beauty-label">
          Quasar Skeleton
        </div>
        <small>Just an example about the possibilities</small>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <form @submit.prevent="attempt">
          <div class="row">
            <div class="col-12 q-pa-sm">
              <q-input
                label="Login"
                type="email"
                v-model="record.login"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-pa-sm q-pb-md">
              <q-input
                label="Password"
                type="password"
                v-model="record.password"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
              </q-input>
            </div>
          </div>
          <hr>
          <div class="q-pa-sm">
            <q-btn
              class="full-width"
              color="primary"
              label="Sign In"
              size="md"
              type="submit"
            />
          </div>
        </form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script type="text/javascript">
// noinspection ES6CheckImport
import { required } from 'vuelidate/lib/validators'
import AuthAttempt from 'src/modules/Auth/Components/Mixins/AuthAttempt'

export default {
  name: 'AuthLogin',
  /**
   */
  mixins: [
    AuthAttempt
  ],
  /**
   */
  data: () => ({
    recordDevelopment: {
      login: 'you@gmail.com',
      password: '@aq1sw2de3'
    },
    record: {
      login: '',
      password: ''
    }
  }),
  /**
   */
  validations () {
    return {
      record: {
        login: { required },
        password: { required }
      }
    }
  },
  /**
   */
  methods: {
    /**
     */
    attempting () {
      return this.$service.login(this.record.login, this.record.password)
    },
    /**
     * @param {Object} response
     */
    attemptSuccess (response) {
      this.$store.dispatch('auth/login', response).then(() => this.follow('/dashboard'))
    },
    /**
     */
    attemptError () {
      this.$message.error(this.$t('auth.sigin.error'))
    }
  },
  /**
   */
  created () {
    if (!this.$store.getters['app/getClipboard']) {
      return
    }

    const credentials = this.$store.getters['app/getClipboard']
    const setCredentials = () => {
      if (credentials.login) {
        this.record.login = credentials.login
      }
      if (credentials.password) {
        this.record.password = credentials.password
      }
    }
    this.$store.dispatch('app/clearClipboard').then(setCredentials)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~src/css/quasar.variables.styl'

  .app-login-card
    max-width 420px

  .app-login-logo
    height 96px

  .app-beauty-label
    color $primary
</style>
