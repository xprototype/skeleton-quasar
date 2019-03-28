import PrototypeError from 'src/app/Prototype/Components/Form/PrototypeError'

/**
 * @typedef {PrototypeFormComponents}
 */
export default {
  name: 'PrototypeFormComponents',
  /**
   */
  components: {
    PrototypeError
  },
  /**
   */
  props: {
    fields: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    validations: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  data: () => ({
    record: {}
  }),
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} field
     */
    renderField (h, field) {
      const key = field.$key

      const error = this.hasError(key)
      const style = {
        display: field.$layout.formHidden ? 'none' : ''
      }
      const data = {
        key: key,
        class: this.fieldClass(field.$layout.formWidth, field.$layout.formHeight, error),
        domProps: { style }
      }

      const children = [
        this.renderFieldLabel(h, field),
        this.renderFieldComponent(h, field),
        this.renderFieldError(h, key, error)
      ]

      return h('div', data, children)
    },
    /**
     * @param {Function} h
     * @param {Object} field
     * @returns {*}
     */
    renderFieldLabel (h, field) {
      return h('label', { domProps: { innerHTML: this.labelContent(field) } })
    },
    /**
     * @param {Function} h
     * @param {Object} field
     * @returns {*}
     */
    renderFieldComponent (h, field) {
      const key = field.$key

      return h(field.is, {
        ref: this.componentRef(field),
        domProps: { tabIndex: this.componentTabIndex(), value: this.record[key] },
        props: { value: this.record[key] },
        attrs: { ...field.attrs },
        on: { ...field.listeners, input: ($event) => this.componentInput($event, field) }
      })
    },
    /**
     * @param {Function} h
     * @param {string} key
     * @param {boolean} error
     * @returns {*}
     */
    renderFieldError (h, key, error) {
      return h('prototype-error', { attrs: { show: error, message: this.errorContent(key) } })
    },
    /**
     * @param {string|number} width
     * @param {string|number} height
     * @param {Boolean} error
     * @returns {Array}
     */
    fieldClass (width, height, error = false) {
      const classNames = [`field width-${width} height-${height}`]
      if (error) {
        classNames.push('has-error')
      }
      return classNames
    },
    /**
     * @param {Object} field
     * @returns {string}
     */
    labelContent (field) {
      // Se o field não possuir label, ele não exibe (*)
      return (!field.label) ? '' : `${field.label} ${field.$required ? '*' : ''}`
    },
    /**
     * @param {Object} field
     */
    componentRef (field) {
      return `form:component-${field.$layout.formOrder}`
    },
    /**
     * @returns {number}
     */
    componentTabIndex () {
      if (!this.counter) {
        this.counter = 0
      }
      this.counter++
      return this.counter
    },
    /**
     * @param {Object} $event
     * @param {Object} component
     */
    componentInput ($event, component) {
      this.record[component.$key] = component.parseInput($event)
      this.$emit('input', component.$key, component.parseInput($event))
      if (component.listeners.input) {
        component.listeners.input($event)
      }
    },
    /**
     * @param {string} key
     */
    hasError (key) {
      if (this.errors[key]) {
        return true
      }
      const record = this.$util.prop(this.validations, 'record', {})
      if (record[key] === undefined) {
        return false
      }
      return record[key].$error
    },
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
    }
  },
  /**
   */
  watch: {
    /**
     * @param value
     */
    value: {
      deep: true,
      handler (value) {
        this.record = this.$util.clone(value)
      }
    }
  },
  /**
   */
  created () {
    this.counter = 1
    this.record = this.$util.clone(this.value)
  },
  /**
   * @param {Function} h
   * @returns {*}
   */
  render (h) {
    // console.log('~> render', this.$options.name, JSON.stringify(this.record))
    const data = { class: 'form form-grid' }
    const children = Object.values(this.fields).map((field) => this.renderField(h, field))
    return h('div', data, children)
  }
}
