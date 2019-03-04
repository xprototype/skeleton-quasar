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
        Object.keys(button.on).forEach(event => {
          button.listeners[event] = ($event) => this.buttonApplyListener(button.$key, event, $event)
        })
        if (Array.isArray(button.actions)) {
          button.actions = button.actions.map((action) => {
            // noinspection JSPrimitiveTypeWrapperUsage
            action.native = action.click.bind(this)
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
     * @param {*} $event
     */
    buttonApplyListener ($key, event, $event) {
      this.buttons[$key].on[event].apply(this, $event)
    }
  }
}
