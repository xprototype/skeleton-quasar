import { route } from 'src/app/Router'
import { testWithTemplateForm, testWithTemplateTable } from './components'

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
    route('/dashboard/test-with-template/form', testWithTemplateForm),
    route('/dashboard/test-with-template/table', testWithTemplateTable)
  ]
}
