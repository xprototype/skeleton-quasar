/**
 * @typedef {FormField}
 */
const FormField = {
  methods: {
    /**
     * @param {string} component
     * @param {Object} attrs
     */
    setFieldAttrs (component, attrs) {
      Object.keys(attrs).forEach((attr) => this.setFieldAttr(component, attr, attrs[attr]))
      return this
    },
    /**
     * @param {string} component
     * @param {string} attr
     * @param {*} value
     */
    setFieldAttr (component, attr, value) {
      this.components[component].attrs[attr] = value
      return this
    },
    /**
     * @param {string} component
     * @returns {Object}
     */
    getFieldAttrs (component) {
      return this.components[component].attrs
    },
    /**
     * @param {string} component
     * @param {string} attr
     * @returns {*}
     */
    getFieldAttr (component, attr) {
      return this.components[component].attrs[attr]
    },
    /**
     * @param {string} component
     * @param {Object} layouts
     */
    setFieldLayouts (component, layouts) {
      Object.keys(layouts).forEach((attr) => this.setFieldLayout(component, attr, layouts[attr]))
      return this
    },
    /**
     * @param {string} component
     * @param {string} layout
     * @param {*} value
     */
    setFieldLayout (component, layout, value) {
      this.components[component].$layout[layout] = value
      return this
    },
    /**
     * @param {string} component
     * @returns {Object}
     */
    getFieldLayouts (component) {
      return this.components[component].$layout
    },
    /**
     * @param {string} component
     * @param {string} attr
     * @returns {*}
     */
    getFieldLayout (component, attr) {
      return this.getFieldLayouts(component)[attr]
    },
    /**
     * @param {string} component
     * @param {Boolean} error
     * @param {string} [message
     */
    setFieldError (component, error = true, message = '') {
      if (!error) {
        this.errors[component] = ''
        return
      }
      let fallback = message
      const paths = [`domains.${this.domain}.errors.${component}`]
      if (message.split('.').length > 1) {
        paths.push(message)
        fallback = ''
      }
      this.errors[component] = this.$lang(paths, fallback)
    }
  }
}
export default FormField
