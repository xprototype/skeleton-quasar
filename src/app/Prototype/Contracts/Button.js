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
      const filter = (action) => {
        return action.scopes && action.scopes.includes(this.scope)
      }

      const sort = (a, b) => {
        return a.order - b.order
      }

      const reduce = (buttons, button) => {
        button.listeners = {}
        Object.keys(button.on).forEach(key => {
          button.listeners[key] = ($event, parameters) => this.buttonApplyListener(
            button.$key,
            key,
            $event,
            parameters
          )
        })
        if (Array.isArray(button.actions)) {
          button.actions = button.actions.map((action) => {
            action.handler = action.click.bind(this)
            return action
          })
        }
        buttons[button.$key] = button
        return buttons
      }

      this.buttons = this.$util.clone(this.actions()).filter(filter).sort(sort).reduce(reduce, {})
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
