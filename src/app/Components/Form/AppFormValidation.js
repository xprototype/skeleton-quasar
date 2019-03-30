import { parseValidations } from 'src/app/Prototype/Contracts/Helper/validation'

/**
 * @mixin {AppFormValidation}
 */
export default {
  /**
   */
  validations () {
    const record = Object.keys(this.schema).reduce(this.reduceValidations, {})
    return { record }
  },
  /**
   */
  props: {
    /**
     */
    status: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Object} record
     * @param {string} key
     * @return {*}
     */
    reduceValidations (record, key) {
      const validations = this.$util.prop(this.schema, `${key}.validate`)
      if (!validations) {
        return record
      }
      record[key] = parseValidations(this.$util.clone(validations))
      return record
    },
    /**
     * @return {Object}
     */
    parseValidationsErrors () {
      const reducer = (errors, key) => {
        if (!this.$v.record[key]) {
          return errors
        }

        if (!this.$v.record[key].$error) {
          return errors
        }

        let params = this.$v.record[key].$params
        if (!params) {
          params = { required: true }
        }
        errors[key] = [...this.parseValidationsParams(params)]

        return errors
      }

      return Object.keys(this.schema).reduce(reducer, {})
    },
    /**
     * @param params
     */
    parseValidationsParams (params) {
      return Object.keys(params).map((rule) => this.$t(`validation.${rule}`, params[rule]))
    },
    /**
     * @returns {boolean}
     */
    checkValidationsCustom (errors) {
      const reducer = (accumulator, key) => {
        const error = errors[key]
        if (!error) {
          return accumulator
        }
        if (Array.isArray(error) && error.length > 0) {
          accumulator++
        } else if (typeof error === 'object' && Object.values(error).length > 0) {
          accumulator++
        } else if (String(error).length > 0) {
          accumulator++
        }
        return accumulator
      }
      return Object.keys(errors).reduce(reducer, 0) > 0
    }
  }
}
