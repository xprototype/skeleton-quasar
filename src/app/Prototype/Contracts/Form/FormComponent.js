import { clone } from 'src/app/Util'

/**
 * @mixin {FieldComponent}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Object} field
     * @returns {*}
     */
    parseField (field) {
      if (this.fieldApplyListener) {
        field.listeners = {}
        Object.keys(field.on).forEach((event) => {
          field.listeners[event] = ($event) => this.fieldApplyListener(field.$key, event, $event)
        })
      }

      const parseValidations = (required, validator) => {
        if (typeof field.$validations[validator] === 'function') {
          field.$validations[validator] = field.$validations[validator].bind(this)
        }
        if (required) {
          return true
        }
        return validator === 'required'
      }
      field.$required = Object.keys(field.$validations).reduce(parseValidations, false)

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

      if (field.attrs.label) {
        field.attrs.label = this.$lang(
          [
            `domains.${this.domain}.fields.${field.$key}.${field.attrs.label}`,
            `domains.${this.domain}.${field.attrs.label}`,
            field.attrs.label
          ],
          field.attrs.label
        )
      }
      if (!field.parseInput) {
        field.parseInput = (value) => value
      }
      return field
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
    }
  }
}
