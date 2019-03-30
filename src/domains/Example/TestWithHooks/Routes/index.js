import { crud } from 'src/app/Router'
import { testWithHooksForm, testWithHooksTable } from './components'

/**
 * @type {string}
 */
export const path = '/dashboard/test'

/**
 * @param {AppRouter} router
 * @returns {Array}
 */
export default (router) => {
  return [
    ...crud('/dashboard/test-with-hooks', testWithHooksTable, testWithHooksForm)
  ]
}
