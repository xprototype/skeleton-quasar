import { crud } from 'src/app/Router'

/**
 * @type {string}
 */
export const path = '/dashboard/test'

/**
 * @returns {Promise}
 */
export const table = () => import('src/view/Dashboard/Example/Test/TestTable')

/**
 * @returns {Promise}
 */
export const form = () => import('src/view/Dashboard/Example/Test/TestForm')

/**
 * @param {AppRouter} router
 * @returns {Array}
 */
export default (router) => {
  return crud(path, table, form)
}
