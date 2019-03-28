import AuthService from 'src/domains/Auth/Service/AuthService'

export default {
  /**
   */
  service: AuthService.build(),
  /**
   */
  data: () => ({
    recordDevelopment: {},
    loading: false
  }),
  /**
   */
  methods: {
    /**
     */
    attemptFail () {
      // override
      console.log('~> override attemptFail')
    },
    /**
     */
    attempting () {
      // override
      console.log('~> override attempting')
    },
    /**
     */
    attemptSuccess () {
      // override
      console.log('~> override attemptSuccess')
    },
    /**
     */
    attemptError () {
      // override
      console.log('~> override attemptError')
    },
    /**
     */
    attempt () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.attemptFail()
        return
      }
      this.setLoading(true)
      try {
        this.attempting()
          .then((response) => response.data)
          .then(this.attemptSuccess)
          .catch(this.attemptError)
          .finally(() => this.setLoading(false))
      } catch (e) {
        console.error(`You need implement 'attempting' and return a promise`)
      }
    },
    /**
     * @param {boolean} loading
     */
    setLoading (loading) {
      this.loading = !!loading
    },
    /**
     * @param {string} path
     */
    follow (path) {
      if (this.$route.query.redirect) {
        path = this.$route.query.redirect
      }
      this.$browse(path)
    },
    /**
     */
    fillRecordDevelopment () {
      Object.keys(this.recordDevelopment).forEach((key) => {
        this.record[key] = this.recordDevelopment[key]
        console.log('~> recordDevelopment:', key, '=>', this.record[key])
      })
    }
  },
  /**
   */
  mounted () {
    if (!this.$dev && this.recordDevelopment && this.record) {
      return
    }
    this.fillRecordDevelopment()
  }
}
