/**
 * @typedef {Button}
 */
export default {
  /**
   */
  data: () => ({
    buttons: {}
  }),
  /**
   */
  methods: {
    /**
     */
    renderButtons () {
      this.buttons = this.actions()
        .filter(this.buttonFilter)
        .sort(this.buttonSort)
        .reduce(this.buttonReduce, {})
    },
    /**
     * @param {Object} action
     * @returns {boolean}
     */
    buttonFilter (action) {
      return action.scopes && action.scopes.includes(this.scope)
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @returns {number}
     */
    buttonSort (a, b) {
      return a.order - b.order
    },
    /**
     * @param {Object} buttons
     * @param {Object} button
     * @returns {Object}
     */
    buttonReduce (buttons, button) {
      button.listeners = {}
      Object.keys(button.on).forEach(key => {
        button.listeners[key] = ($event, params) => this.buttonApplyListener(button.$key, key, $event, params)
      })
      if (Array.isArray(button.actions)) {
        button.actions = button.actions.map((action) => {
          action.handler = action.click.bind(this)
          return action
        })
      }

      const label = this.$lang([
        `domains.${this.domain}.actions.${button.$key}.label`,
        `prototype.actions.${button.$key}.label`
      ])
      if (label) {
        button.attrs.label = label
      }

      buttons[button.$key] = button
      return buttons
    },
    /**
     * @param {string} $key
     * @param {string} event
     * @param {Object} $event
     * @param {*} parameters
     */
    buttonApplyListener ($key, event, $event, parameters = {}) {
      this.buttons[$key].on[event].call(this, { $event, ...parameters })
    }
  }
}
