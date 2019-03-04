import { clone } from 'src/app/Util'

export default {
  /**
   */
  computed: {
    /**
     * @returns {boolean}
     */
    hasSegments () {
      return Object.keys(this.segments).length > 0
    }
  },
  /**
   */
  methods: {
    /**
     */
    configure () {
      let field
      Object.keys(this.components).forEach(key => {
        if (this.components[key].$configure && typeof this.components[key].$configure === 'function') {
          field = this.components[key].$configure.call(this, this.components[key], this.scope)
          if (!field || field['$key'] !== this.components[key]['$key']) {
            throw Error('The configure return must be the field')
          }
          this.components[key] = field
        }
      })
    },
    /**
     * @param {Object} field
     * @returns {String|*}
     */
    parseFieldLabel (field) {
      if (field.$layout.formLabel) {
        return field.$layout.formLabel
      }
      return this.$lang([
        `domains.${this.domain}.fields.${field.$key}.__label`,
        `domains.${this.domain}.fields.${field.$key}`,
        `prototype.fields.${field.$key}`
      ])
    },
    /**
     * @param {Object} field
     * @returns {Array|*}
     */
    parseFieldOptions (field) {
      if (!field.attrs.options) {
        return []
      }
      if (!Array.isArray(field.attrs.options)) {
        return field.attrs.options
      }
      const map = (option) => {
        if (typeof option === 'object' && option.label) {
          option.label = this.$lang(
            [option.label, `domains.${this.domain}.fields.${field.$key}.${option.label}`.replace(/\//g, '.')],
            option.label
          )
        }
        return option
      }
      return field.attrs.options.map(map)
    },
    /**
     * @param field
     * @returns {*}
     */
    parseFieldActions (field) {
      if (!Array.isArray(field.attrs.actions)) {
        return field.attrs.actions
      }
      const map = (action) => {
        if (action.handler && typeof action.handler === 'function') {
          action.original = action.handler
          action.handler = ($event, parameters) => this.fieldApplyAction(
            $event,
            field,
            action,
            true,
            clone(parameters)
          )
        }
        return action
      }
      return field.attrs.actions.map(map)
    },
    /**
     * @param {Object} field
     */
    parseFieldAfter (field) {
      if (!Array.isArray(field.attrs.after)) {
        return
      }
      const map = (action) => {
        if (action.handler && typeof action.handler === 'function') {
          action.original = action.handler
          action.handler = ($event) => this.fieldApplyAction($event, field, action)
        }
        return action
      }
      return field.attrs.after.map(map)
    },
    /**
     */
    renderComponents () {
      this.segments = this.sections()
      const fields = clone(this.fields())
      this.components = Object.values(fields).sort(this.sortComponents).reduce(this.reduceComponents, {})
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @returns {number}
     */
    sortComponents (a, b) {
      if (a.$layout.formOrder < b.$layout.formOrder) {
        return -1
      }
      if (a.$layout.formOrder > b.$layout.formOrder) {
        return 1
      }
      return 0
    },
    /**
     * @param {Array} components
     * @param {Object} field
     * @returns {*}
     */
    reduceComponents (components, field) {
      const hasScopes = field.scopes && Array.isArray(field.scopes)
      if (this.scope && hasScopes && !field.scopes.includes(this.scope)) {
        return components
      }
      field.listeners = {}
      Object.keys(field.on).forEach((event) => {
        field.listeners[event] = ($event) => this.fieldApplyListener(field.$key, event, $event)
      })
      const reduce = (required, validator) => {
        if (typeof field.$validations[validator] === 'function') {
          field.$validations[validator] = field.$validations[validator].bind(this)
        }
        if (required) {
          return true
        }
        return validator === 'required'
      }
      field.$required = Object.keys(field.$validations).reduce(reduce, false)

      field.label = this.parseFieldLabel(field)
      if (field.attrs.options) {
        field.attrs.options = this.parseFieldOptions(field)
      }
      if (field.attrs.actions) {
        field.attrs.actions = this.parseFieldActions(field)
      }
      if (field.attrs.after) {
        field.attrs.after = this.parseFieldAfter(field)
      }

      components[field.$key] = field

      return components
    },
    /**
     * @param {string} section
     */
    getComponents (section = undefined) {
      if (section === undefined) {
        const reduce = (accumulator, key) => {
          const field = this.components[key]
          if (!field.section) {
            accumulator[key] = field
          }
          return accumulator
        }
        return Object.keys(this.components).reduce(reduce, {})
      }

      const reduce = (accumulator, key) => {
        const field = this.components[key]
        if (field.section === section) {
          accumulator[key] = field
        }
        return accumulator
      }
      return Object.keys(this.components).reduce(reduce, {})
    },
    /**
     * @param {string} $key
     * @param {string} listener
     * @param {*} $event
     */
    fieldApplyListener ($key, listener, $event) {
      if (!Array.isArray(this.components[$key].on[listener])) {
        throw Error(`The event '${listener}' is not an array`)
      }
      this.components[$key].on[listener].forEach((callable) => {
        callable.call(this, { $event, field: this.components[$key] })
      })
    },
    /**
     * @param {Object} $event
     * @param {Object} field
     * @param {Object} action
     * @param {Boolean} stop
     * @param {Object} parameters
     */
    fieldApplyAction ($event, field, action, stop = false, parameters = {}) {
      if (stop && $event && $event.stopPropagation) {
        $event.preventDefault()
        $event.stopPropagation()
      }
      if (typeof action !== 'object') {
        return
      }
      if (typeof action.original !== 'function') {
        return
      }
      action.original.call(this, { $event, field, ...parameters })
    },
    /**
     * @param {string} name
     */
    componentFocus (name) {
      if (!this.components[name]) {
        return
      }
      const index = this.components[name].$layout.formOrder
      const ref = this.$util.ref(`form:component-${index}`)
      if (!ref) {
        return
      }
      const focusable = ['focus', 'show']
      let done = false
      focusable.forEach((key) => {
        if (done) {
          return
        }
        if (ref[key] && typeof ref[key] === 'function') {
          done = true
          window.setTimeout(ref[key], 300)
        }
      })
    }
  }
}
