import Basic from './Basic'

/**
 * @typedef {Static}
 */
export default {
  /**
   */
  mixins: [
    Basic
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
  ]
}
