import PrototypeButtonParse from './Buttons/PrototypeButtonParse'
import PrototypeButtonDropdown from './Buttons/PrototypeButtonDropdown'
import PrototypeButtonSingle from './Buttons/PrototypeButtonSingle'

/**
 * @typedef {PrototypeButtons}
 */
export default {
  name: 'PrototypeButtons',
  /**
   */
  mixins: [
    PrototypeButtonParse, PrototypeButtonDropdown, PrototypeButtonSingle
  ],
  /**
   */
  props: {
    buttons: {
      type: [Array, Object],
      default: () => ([])
    },
    position: {
      type: String,
      default: ''
    },
    scope: {
      type: String,
      default: ''
    },
    context: {
      type: Object,
      default: undefined
    },
    override: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  computed: {
    /**
     */
    actions () {
      return Object.values(this.buttons)
        .filter((button) => button.positions && button.positions.includes(this.position))
        .map((button) => this.parseButton(button))
    }
  },
  /**
   */
  methods: {
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
        ref: this.buttonRef(button.$key),
        class: button.class,
        attrs: { ...button.attrs },
        on: { ...button.listeners }
      }
      if (button.dropdown) {
        return this.renderButtonDropdown(h, data)
      }
      return this.renderButtonSingle(h, data)
    },
    /**
     * @param {string} key
     */
    buttonRef (key) {
      return `form:button-${key}`
    }
  },
  /**
   * @param {Function} h
   */
  render (h) {
    const data = {
      class: 'app-form-buttons'
    }
    const children = Object.values(this.actions).map((button) => this.renderButton(h, button))

    return h('div', data, children)
  }
}
