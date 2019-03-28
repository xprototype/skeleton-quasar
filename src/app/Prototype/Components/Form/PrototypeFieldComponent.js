/**
 * @typedef {PrototypeFieldComponent}
 */
export default {
  /**
   */
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    validations: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  data: () => ({
    record: {}
  }),
  /**
   */
  methods: {
    /**
     * @param {Object} field
     */
    componentRef (field) {
      return `form:component-${field.$layout.formOrder}`
    },
    /**
     * @returns {number}
     */
    componentTabIndex () {
      if (!this.counter) {
        this.counter = 0
      }
      this.counter++
      return this.counter
    },
    /**
     * @param {Object} $event
     * @param {Object} component
     */
    componentInput ($event, component) {
      this.record[component.$key] = component.parseInput($event)
      this.$emit('input', component.$key, component.parseInput($event))
      if (component.listeners.input) {
        component.listeners.input($event)
      }
    },
    /**
     * @param {Function} h
     * @param {Object} field
     * @returns {*}
     */
    renderFieldComponent (h, field) {
      const key = field.$key

      return h(field.is, {
        ref: this.componentRef(field),
        domProps: { tabIndex: this.componentTabIndex(), value: this.record[key] },
        props: { value: this.record[key] },
        attrs: { ...field.attrs },
        on: { ...field.listeners, input: ($event) => this.componentInput($event, field) }
      })
    }
  },
  /**
   */
  watch: {
    /**
     * @param value
     */
    value: {
      deep: true,
      handler (value) {
        this.record = this.$util.clone(value)
      }
    }
  },
  /**
   */
  created () {
    this.counter = 1
    this.record = this.$util.clone(this.value)
  }
}
