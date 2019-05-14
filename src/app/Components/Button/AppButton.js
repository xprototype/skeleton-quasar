import PrototypeButton from 'src/app/Agnostic/Components/Buttons/PrototypeButton'

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
    reset: {
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
    let type = 'button'
    if (this.$props.submit) {
      type = 'submit'
    }
    const on = {}
    if (this.$props.reset) {
      // TODO: don't use "this.$parent.$parent"
      on.click = ($event) => this.$parent.$parent.$emit('form:reset', $event)
    }

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
      listeners: { ...on, ...this.$listeners }
    }

    return this.renderButton(h, button)
  }
}
