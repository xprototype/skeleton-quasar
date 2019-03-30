import PrototypeError from './PrototypeError'

/**
 * @typedef {PrototypeFieldError}
 */
export default {
  /**
   */
  props: {
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  components: {
    PrototypeError
  },
  /**
   */
  methods: {
    /**
     * @param {string} key
     * @returns {string}
     */
    errorContent (key) {
      const errorMessages = []
      const forEach = (validation) => {
        if (!validations[validation]) {
          let translation = `domains.${this.domain}.validations.${validation}`.replace(/\//g, '.')
          if (!this.$te(translation)) {
            translation = `validation.${validation}`
          }
          errorMessages.push(this.$t(translation, validations.$params[validation]))
        }
      }

      const validations = this.$util.prop(this.validations, `record.${key}`)
      if (validations) {
        Object.keys(validations.$params).forEach(forEach)
      }
      if (this.errors[key]) {
        errorMessages.push(this.errors[key])
      }
      return errorMessages.join(' / ')
    },
    /**
     * @param {Function} h
     * @param {string} key
     * @param {boolean} error
     * @returns {*}
     */
    renderFieldError (h, key, error) {
      return h('prototype-error', { attrs: { show: error, message: this.errorContent(key) } })
    }
  }
}
