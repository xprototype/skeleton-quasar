import PrototypeField from './PrototypeField'

/**
 * @typedef {PrototypeFormComponents}
 */
export default {
  /**
   */
  name: 'PrototypeFormComponents',
  /**
   */
  mixins: [
    PrototypeField
  ],
  /**
   */
  props: {
    fields: {
      type: Object,
      default: () => ({})
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
