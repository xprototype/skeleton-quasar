import * as Validators from 'vuelidate/lib/validators'

/**
 */
export default {
  /**
   */
  validations () {
    const reduceValidation = (accumulator, key) => {
      if (!Object.keys(this.components[key].$validations).length) {
        return accumulator
      }
      const $validations = this.components[key].$validations
      Object.keys($validations).forEach(validator => {
        if (!$validations[validator]) {
          return
        }
        if (typeof $validations[validator] === 'function') {
          return
        }
        if (Validators[validator]) {
          let action = Validators[validator]
          if (Array.isArray($validations[validator])) {
            action = action.apply(null, $validations[validator])
          }
          $validations[validator] = action
          return
        }
        throw Error(`Invalid validator ${validator}`)
      })
      accumulator[key] = $validations
      return accumulator
    }
    const record = Object.keys(this.components).reduce(reduceValidation, {})
    return { record }
  },
  /**
   */
  watch: {
    /**
     * @param {Boolean} status
     * @param {Boolean} previous
     */
    '$v.$invalid' (status, previous) {
      if (!this.buttons) {
        return
      }
      Object.keys(this.buttons).forEach((key) => {
        if (!this.buttons[key].validate) {
          return
        }
        if (typeof this.buttons[key].validate !== 'function') {
          return
        }
        this.buttons[key].validate.call(this, this.buttons[key], !status)
      })
    }
  }
}
