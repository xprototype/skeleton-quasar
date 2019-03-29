import PrototypeError from './PrototypeError'
import PrototypeFieldComponent from './PrototypeFieldComponent'
import PrototypeFieldLabel from './PrototypeFieldLabel'
import PrototypeFieldError from './PrototypeFieldError'

/**
 * @typedef {PrototypeFormComponents}
 */
export default {
  name: 'PrototypeFormComponents',
  /**
   */
  mixins: [
    PrototypeFieldLabel, PrototypeFieldComponent, PrototypeFieldError
  ],
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
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} field
     */
    renderField (h, field) {
      const key = field.$key

      const error = this.fieldHasError(key)
      const data = {
        key: key,
        class: this.fieldClass(field.$layout.formWidth, field.$layout.formHeight, error),
        style: { display: field.$layout.formHidden ? 'none' : '' }
      }

      const children = [
        this.renderFieldLabel(h, field),
        this.renderFieldComponent(h, field),
        this.renderFieldError(h, key, error)
      ]

      return h('div', data, children)
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
     * @param {string} key
     */
    fieldHasError (key) {
      if (this.errors[key]) {
        return true
      }
      const record = this.$util.prop(this.validations, 'record', {})
      if (record[key] === undefined) {
        return false
      }
      return record[key].$error
    }
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
