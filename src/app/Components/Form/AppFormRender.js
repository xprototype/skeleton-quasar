/**
 * @mixin {AppFormRender}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} schema
     * @returns {*}
     */
    renderAppForm (h, schema) {
      const data = {
        class: 'app-form-wrapper',
        on: {
          submit: ($event) => {
            $event.preventDefault()
            $event.stopPropagation()
            this.$emit('form:submit', $event)
          }
        }
      }
      const children = [
        h('div', { class: 'app-form-body' }, [
          h('div', { class: 'form form-grid' }, this.renderAppFormBody(h, schema))
        ]),
        h('div', { class: 'app-form-buttons' }, this.renderAppFormButtons(h, schema))
      ]

      return h('form', data, children)
    },
    /**
     * @param {Function} h
     * @param {Object} schema
     * @returns {*}
     */
    renderAppFormBody (h, schema) {
      if (!this.$scopedSlots.body) {
        return
      }
      return this.$scopedSlots.body(schema)
    },
    /**
     * @param {Function} h
     * @param {Object} schema
     * @returns {*}
     */
    renderAppFormButtons (h, schema) {
      if (!this.$scopedSlots.buttons) {
        return
      }
      return this.$scopedSlots.buttons(schema)
    },
    /**
     * @param {Function} h
     * @param {Object} schema
     * @returns {*}
     */
    renderAppFormDebuggers (h, schema) {
      if (!this.debuggers) {
        return
      }
      if (this.$scopedSlots.debuggers) {
        return h('div', {}, this.$scopedSlots.debuggers(schema))
      }
      return h('div', {}, [h('app-debugger', { attrs: { label: 'Schema', inspect: schema } })])
    }
  },
  /**
   * @param {Function} h
   * @returns {*}
   */
  render (h) {
    if (typeof this.$parent.$options.schema !== 'object') {
      throw new Error('Schema is required')
    }

    const data = { class: 'PrototypeForm', attrs: { padding: true } }
    const children = [
      this.renderAppForm(h, this.schema),
      this.renderAppFormDebuggers(h, this.schema)
    ]

    return h('q-page', data, children)
  }
}
