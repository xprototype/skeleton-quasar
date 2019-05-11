import Basic from './Basic'

/**
 * @typedef {FormDynamic}
 */
export default {
  /**
   */
  mixins: [
    Basic
  ],
  /**
   */
  props: {
    grouping: {
      type: String,
      default: () => 'sections'
    },
    path: {
      type: String,
      default: () => ''
    },
    domain: {
      type: String,
      default: () => ''
    },
    table: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Object,
      default: () => ({})
    },
    settings: {
      type: Object,
      default: () => ({})
    },
    primaryKey: {
      type: String,
      default: () => 'id'
    },
    displayKey: {
      type: String,
      default: () => ''
    },
    service: {
      type: [Object, Function],
      default: () => ({})
    },
    fields: {
      type: Function,
      default: () => ({})
    },
    sections: {
      type: Function,
      default: () => () => ({})
    },
    actions: {
      type: Function,
      default: () => ({})
    },
    hooks: {
      type: Function,
      default: () => ({})
    }
  }
}
