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

    this.schema = this.$parent.$options.schema

    const record = this.parseRecordAppForm(this.schema)
    this.$emit('input', { ...record, ...this.value })
  }
}
