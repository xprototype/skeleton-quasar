/**
 * @mixin {FormFetch}
 */
export default {
  /**
   */
  methods: {
    /**
     */
    loadingShow () {
      this.$q.loading.show({ delay: 100 })
    },
    /**
     */
    loadingHide () {
      this.$q.loading.hide()
    },
    /**
     * @param {Number|String} id
     * @returns {Promise}
     */
    fetchRecord (id) {
      this.loadingShow()

      this.triggerHook('request:record', { id })
        .then(this.successFetchRecord)
        .catch(this.errorFetchRecord)
    },
    /**
     * @param {Object} record
     */
    successFetchRecord (record) {
      this.loadingHide()

      this.fetching = true
      this.$payload = this.$util.clone(record)
      const recordName = this.$options.recordName || 'record'
      Object.keys(this[recordName]).forEach((key) => {
        this[recordName][key] = this.$util.prop(record, key)
      })
      this.fetching = false

      if (!this.triggerHook) {
        return
      }
      this.triggerHook('fetch:record')
    },
    /**
     */
    errorFetchRecord (/* error */) {
      this.loadingHide()

      // this.$error.report(error)
    }
  },
  /**
   */
  mounted () {
    this.fetchRecord(this.$route.params[this.primaryKey])
  }
}
