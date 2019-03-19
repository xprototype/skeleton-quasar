import { crud } from 'src/app/Router'

/**
 * @type {string}
 */
export const path = '/dashboard/test'

/**
 * @returns {Promise}
 */
export const table = () => import('src/domains/Example/Test/View/TestTable')

/**
 * @returns {Promise}
 */
export const form = () => import('src/domains/Example/Test/View/TestForm')

/**
 * @param {AppRouter} router
 * @returns {Array}
 */
export default (router) => {
  return crud(path, table, form)
}
