import components from 'src/config/app/components'
import create from 'src/config/app/field'

import PrototypeField from 'src/app/Prototype/Components/Form/PrototypeField'
import FormComponent from 'src/app/Prototype/Contracts/Form/FormComponent'

/**
 * @type {AppField}
 */
export default {
  name: 'AppField',
  /**
   */
  mixins: [
    PrototypeField, FormComponent
  ],
  /**
   */
  props: {
    as: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      required: true
    }
  },
  /**
   */
  methods: {
    /**
     * @param $event
     */
    input ($event) {
      this.$emit('input', $event)
      if (this.$listeners.input) {
        this.$listeners.input($event)
      }
    },
    /**
     * @param {Function} h
     * @param {Object} field
     * @returns {*}
     */
    renderFieldComponent (h, field) {
      return h(field.is, {
        domProps: { tabindex: this.$attrs.tabindex, value: this.value },
        attrs: { ...field.attrs, value: this.value },
        on: { ...field.listeners, input: this.input }
      })
    },
    /**
     * @param {string} key
     * @returns {*}
     */
    errorContent (key) {
      return ''
    },
    /**
     * @returns {*}
     */
    schema () {
      // QPage, AppForm, TestWithTemplateForm
      return this.$util.prop(this.$parent, `$parent.$parent.$options.schema.${this.name}`, {})
    }
  },
  /**
   * @param {Function} h
   * @returns {*}
   */
  render (h) {
    let schema = this.schema()
    if (typeof schema !== 'object') {
      throw new Error('Schema is required')
    }

    if (schema.attrs === undefined) {
      schema.attrs = {}
    }

    let component = components[this.as]

    const attrs = { ...component.attrs, ...schema.attrs, ...this.$attrs, label: undefined }
    const on = { ...this.$listeners, input: this.input }

    const options = { label: this.$attrs.label, width: this.$attrs.width }
    const field = create(this.name, options, attrs, on)
    field.is = component.is

    return this.renderField(h, this.parseField(field))
  }
}
