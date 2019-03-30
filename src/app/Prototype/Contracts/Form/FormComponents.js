import { clone } from 'src/app/Util'
import FormComponent from 'src/app/Prototype/Contracts/Form/FormComponent'

/**
 * @mixin {FieldComponents}
 */
export default {
  /**
   */
  mixins: [
    FormComponent
  ],
  /**
   */
  computed: {
    /**
     * @returns {boolean}
     */
    hasGroups () {
      return Object.keys(this.groups).length > 0
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
     */
    renderComponents () {
      this.groups = this.sections()
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

      components[field.$key] = this.parseField(field)

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
