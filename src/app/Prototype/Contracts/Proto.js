import Trigger from './Hook'
import Session from './Session'
import Button from './Button'

/**
 */
export default {
  /**
   */
  mixins: [
    Trigger, Session, Button
  ],
  /**
   */
  inject: [
    'path',
    'domain',
    'table',
    'form',
    'settings',
    'primaryKey',
    'displayKey',
    'service',
    'fields',
    'actions',
    'hooks'
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
    }
  }
}
