import PrototypeButton from 'src/app/Prototype/Components/Buttons/PrototypeButton'
/**
 * @type {AppButton}
 */
export default {
  /**
   */
  name: 'AppButton',
  /**
   */
  mixins: [
    PrototypeButton
  ],
  /**
   */
  props: {
    name: {
      type: String,
      default: ''
    },
    hidden: {
      type: Boolean,
      required: false
    },
    dropdown: {
      type: Boolean,
      required: false
    },
    primary: {
      type: Boolean,
      required: false
    },
    submit: {
      type: Boolean,
      required: false
    },
    position: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'white'
    },
    textColor: {
      type: String,
      default: 'grey-10'
    }
  },
  /**
   * @param {Function} h
   */
  render (h) {
    const color = this.$props.primary ? 'primary' : this.color
    const type = this.$props.submit ? 'submit' : 'button'

    const classNames = []
    if (this.$attrs.class) {
      classNames.push(this.$attrs.class)
    }
    if (this.position) {
      classNames.push(`button-position-${this.position}`)
    }

    const button = {
      key: this.name || this.$util.uniqueKey(),
      class: classNames,
      attrs: { ...this.$attrs, ...this.$props, color, type },
      listeners: { ...this.$listeners }
    }

    return this.renderButton(h, button)
  }
}
