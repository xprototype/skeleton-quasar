import Trigger from './Hook'
import Button from './Button'

/**
 * @typedef {Basic}
 */
export default {
  /**
   */
  mixins: [
    Trigger, Button
  ],
  /**
   */
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  /**
   */
  computed: {
    /**
     */
    debuggers () {
      return this.$store.getters['app/getDebuggers']
    }
  },
  /**
   */
  methods: {
    /**
     * @override
     */
    setup () {
      // will override by specialists
    },
    /**
     * @override
     */
    configure () {
      // will override by specialists
    },
    /**
     * @param {String} field
     * @returns {String|*}
     */
    parseFieldLabel (field) {
      if (field.$layout.tableLabel) {
        return field.$layout.tableLabel
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
          option.label = this.$lang(option.label, option.label)
        }
        return option
      }
      return field.attrs.options.map(map)
    },
    /**
     * @override
     */
    setFieldAttrs () {
      // will override by specialists
    },
    /**
     * @override
     */
    setFieldAttr () {
      // will override by specialists
    },
    /**
     * @override
     */
    setFieldLayouts () {
      // will override by specialists
    },
    /**
     * @override
     */
    setFieldLayout () {
      // will override by specialists
    },
    /**
     * @override
     */
    getFieldAttrs () {
      // will override by specialists
    },
    /**
     * @override
     */
    getFieldAttr () {
      // will override by specialists
    },
    /**
     * @override
     */
    getFieldLayouts () {
      // will override by specialists
    },
    /**
     * @override
     */
    getFieldLayout () {
      // will override by specialists
    },
    /**
     * @param {Function} h
     * @param {string} position
     * @param {Object} context
     * @param {Object} override
     * @returns {*}
     */
    renderPrototypeButtons (h, position, context, override = {}) {
      const attrs = {
        scope: this.scope,
        buttons: this.buttons,
        context: context,
        position: position,
        override: override
      }
      const data = {
        attrs
      }
      return h('prototype-buttons', data)
    },
    /**
     * @param {Function} h
     * @param {string} position
     * @param {Object} context
     * @returns {*}
     */
    renderPrototypeButtonsCompact (h, position, context) {
      const override = { round: true, dense: true, label: '' }
      return this.renderPrototypeButtons(h, position, context, override)
    }
  }
}
