/**
 * @type {AppFormComponent}
 */
export default {
  /**
   */
  props: {
    /**
     */
    value: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  data: () => ({
    /**
     */
    schema: {},
    /**
     */
    record: {}
  }),
  /**
   */
  computed: {
    /**
     */
    debuggers () {
      return this.$store.getters['app/getDebuggers']
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Object} schema
     * @returns {Object}
     */
    parseRecordAppForm (schema) {
      Object.keys(schema).forEach((key) => {
        this.$watch(`record.${key}`, function () {
          if (this.fetching) {
            return
          }
          if (schema[key].validate) {
            this.$v.record[key].$touch()
          }
          if (this.$v.record[key] && this.$v.record[key].$dirty) {
            this.updateStatusAppForm()
          }
        })
      })

      return Object.keys(schema).reduce((record, key) => {
        record[key] = schema[key].default
        return record
      }, {})
    },
    /**
     */
    updateStatusAppForm () {
      this.$emit('form:status', this.parseValidationsErrors())
    },
    /**
     * @return {Boolean}
     */
    hasErrorAppForm () {
      this.$v.$touch()
      let errors = {}
      if (typeof this.status === 'object') {
        errors = { ...this.status }
      }

      this.updateStatusAppForm()

      if (this.$v.$error) {
        return true
      }
      return !!this.checkValidationsCustom(errors)
    },
    /**
     * @param {Object} payload
     */
    resetAppForm (payload = undefined) {
      if (payload) {
        this.$payload = this.$util.clone(payload)
      }
      this.$emit('input', this.$util.clone(this.$payload))
    }
  },
  /**
   */
  watch: {
    /**
     */
    value: {
      imediate: true,
      deep: true,
      handler (value) {
        this.record = value
      }
    }
  },
  /**
   */
  created () {
    this.$hasError = this.hasErrorAppForm
    this.$reset = this.resetAppForm

    this.schema = this.$parent.$options.schema

    const record = this.parseRecordAppForm(this.schema)

    this.$payload = { ...record, ...this.value }

    this.$emit('input', { ...record, ...this.value })
  }
}
