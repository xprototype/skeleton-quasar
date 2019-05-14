import PrototypeButton from './Buttons/PrototypeButton'
import PrototypeButtonParse from './Buttons/PrototypeButtonParse'

/**
 * @typedef {PrototypeButtons}
 */
export default {
  name: 'PrototypeButtons',
  /**
   */
  mixins: [
    PrototypeButtonParse, PrototypeButton
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
