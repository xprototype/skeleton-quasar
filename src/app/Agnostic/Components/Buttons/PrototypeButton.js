import PrototypeButtonDropdown from './PrototypeButtonDropdown'
import PrototypeButtonSingle from './PrototypeButtonSingle'

/**
 * @type {PrototypeButton}
 */
export default {
  /**
   */
  mixins: [
    PrototypeButtonDropdown, PrototypeButtonSingle
  ],
  /**
   */
  methods: {
    /**
     * @param {string} key
     */
    buttonRef (key) {
      return `form:button-${key}`
    },
    /**
     * @param {Function} h
     * @param {Object} button
     * @returns {*}
     */
    renderButton (h, button) {
      if (button.hidden) {
        return
      }

      const data = {
        key: button.$key,
        ref: button.reference ? this.buttonRef(button.reference) : undefined,
        class: button.class,
        attrs: { ...button.attrs },
        on: { ...button.listeners },
        style: button.style
      }
      if (button.dropdown) {
        return this.renderButtonDropdown(h, data)
      }
      return this.renderButtonSingle(h, data)
    }
  }
}
