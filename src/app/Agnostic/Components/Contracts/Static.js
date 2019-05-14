import Basic from 'src/app/Agnostic/Components/Contracts/Basic'

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
    'fields',
    'actions',
    'hooks'
  ]
}
