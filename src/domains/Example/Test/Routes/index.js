import { crud, route } from 'src/app/Router'
import { testForm, testTable, testWithHooksForm, testWithHooksTable, testWithTemplateForm } from './components'

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
    route('/dashboard/test-with-template', testWithTemplateForm)
  ]
}
