import { clone } from 'src/app/Util'

export default {
  /**
   */
  methods: {
    /**
     */
    renderRecord () {
      const reduceRecord = (record, field) => {
        record[field.$key] = field.attrs.value
        return record
      }
      this.record = Object.values(this.components).reduce(reduceRecord, {})

      Object.values(this.components).forEach((field) => {
        this.$watch(`record.${field.$key}`, function () {
          if (this.fetching) {
            return
          }
          if (field.$required) {
            this.$v.record[field.$key].$touch()
          }
        })
      })
    },
    /**
     * @returns {*}
     */
    getRecord () {
      const reduce = (accumulator, key) => {
        accumulator = this.$util.apply(accumulator, key, this.record[key])
        return accumulator
      }
      return Object.keys(this.record).reduce(reduce, clone(this.payload))
    }
  }
}
