export default {
  /**
   */
  name: 'AppForm',
  /**
   */
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Object} schema
     * @returns {Object}
     */
    parseAppFormRecord (schema) {
      return Object.keys(schema).reduce((record, key) => {
        record[key] = schema[key].default
        return record
      }, {})
    },
    /**
     * @param {Object} schema
     * @returns {*}
     */
    renderAppFormBody (schema) {
      if (!this.$scopedSlots.body) {
        return
      }
      return this.$scopedSlots.body(schema)
    },
    /**
     * @param {Object} schema
     * @returns {*}
     */
    renderAppFormButtons (schema) {
      if (!this.$scopedSlots.buttons) {
        return
      }
      return this.$scopedSlots.buttons(schema)
    }
  },
  /**
   */
  created () {
    this.$schema = this.$parent.$options.schema
    const record = this.parseAppFormRecord(this.$schema)
    this.$emit('input', { ...record, ...this.value })
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
      h('div', { class: 'app-form-wrapper' }, [
        h('div', { class: 'app-form-body' }, [
          h('div', { class: 'form form-grid' }, this.renderAppFormBody(this.$schema))
        ]),
        h('div', { class: 'app-form-buttons' }, this.renderAppFormButtons(this.$schema))
      ])
    ]

    return h('q-page', data, children)
    /*
    <q-page padding>
      <form @submit.prevent="submit">
        <slot />
      </form>
    </q-page>
    */
  }
}
