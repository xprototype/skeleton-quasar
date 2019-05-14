import { crud } from 'src/app/Router'
import { testForm, testTable } from './components'

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
    ...crud(path, testTable, testForm)
  ]
}
