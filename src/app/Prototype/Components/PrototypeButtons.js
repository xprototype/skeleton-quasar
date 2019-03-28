export default {
  name: 'PrototypeButtons',
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
     * @param {Function} h
     * @param {Object} data
     * @returns {*}
     */
    renderButtonDropdown (h, data) {
      // TODO: implement dropdown items
      /*
      <q-list link>
        <q-item
          v-bind="button.attrs"
          v-for="(action, key) in button.actions"
          :key="key"
          v-close-overlay
          @click.native="action.native"
        >
          <q-item-main>
            <q-item-tile label>{{ action.label }}</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      */
      data.attrs.split = true
      return h('q-btn-dropdown', data)
    },
    /**
     * @param {Function} h
     * @param {Object} data
     * @returns {*}
     */
    renderButtonSingle (h, data) {
      return h('q-btn', data)
    },
    /**
     * @param {string} key
     */
    buttonRef (key) {
      return `form:button-${key}`
    },
    /**
     * @param {Object} button
     * @returns {Object}
     */
    parseAttrs (button) {
      return { ...button.attrs, ...this.override }
    },
    /**
     * @param {Object} button
     * @returns {Object}
     */
    parseListeners (button) {
      if (typeof button.listeners !== 'object') {
        return button.listeners
      }
      let context = {}
      if (this.context) {
        context = this.$util.clone(this.context)
      }
      const reduce = (listeners, key) => {
        listeners[key] = ($event) => button.listeners[key]($event, { context })
        return listeners
      }
      return Object.keys(button.listeners).reduce(reduce, {})
    },
    /**
     * @param {Object} button
     */
    parseButton (button) {
      let action = button
      if (button.configure && typeof button.configure === 'function') {
        const clone = this.$util.clone(button)
        const parameters = { context: this.context, position: this.position, scope: this.scope }
        action = button.configure.call(this, clone, parameters)
      }
      return {
        ...action,
        attrs: this.parseAttrs(action),
        listeners: this.parseListeners(action)
      }
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
