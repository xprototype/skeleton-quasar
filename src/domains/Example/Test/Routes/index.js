import { crud } from 'src/app/Router'
import { testForm, testTable, testWithHooksForm, testWithHooksTable } from './components'

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
    ...crud(path, testTable, testForm),
    ...crud('/dashboard/test-with-hooks', testWithHooksTable, testWithHooksForm),
    ...crud('/dashboard/test-custom-components', testWithHooksTable, testWithHooksForm)
  ]
}
