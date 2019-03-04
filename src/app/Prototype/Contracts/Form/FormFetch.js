import { clone } from 'src/app/Util'

export default {
  /**
   */
  methods: {
    /**
     * @param {Number|String} id
     * @returns {Promise}
     */
    fetchRecord (id) {
      this.$q.loading.show({ delay: 100 })
      return this.service
        .read(id)
        .then(this.successFetchRecord)
        .catch(this.errorFetchRecord)
        .finally(() => this.$q.loading.hide())
    },
    /**
     * @param {Object} record
     */
    successFetchRecord (record) {
      this.fetching = true
      this.payload = clone(record)
      Object.keys(this.record).forEach((key) => {
        this.record[key] = this.$util.prop(record, key)
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
      // this.$error.report(error)
    }
  }
}
