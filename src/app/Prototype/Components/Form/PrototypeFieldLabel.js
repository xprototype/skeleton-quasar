/**
 * @typedef {PrototypeFieldLabel}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} field
     * @returns {*}
     */
    renderFieldLabel (h, field) {
      return h('label', { domProps: { innerHTML: this.labelContent(field) } })
    },
    /**
     * @param {Object} field
     * @returns {string}
     */
    labelContent (field) {
      // Se o field não possuir label, ele não exibe (*)
      return (!field.label) ? '' : `${field.label} ${field.$required ? '*' : ''}`
    }
  }
}
