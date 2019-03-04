// noinspection NpmUsedModulesInstalled
import VueRouter from 'vue-router'
import { sessionGuest, sessionUser, sessionCheck } from 'src/app/Session'

/**
 * @typedef {AppRouter}
 */
export default class AppRouter extends VueRouter {
  /**
   * @param {Array} routes
   */
  add (routes) {
    this.addRoutes(routes)
  }

  /**
   * @param {Function} callable
   * @returns {Function}
   */
  beforeEach (callable) {
    return super.beforeEach(callable)
  }

  /**
   * @param {Function} callable
   * @returns {Function}
   */
  afterEach (callable) {
    return super.afterEach(callable)
  }

  /**
   * @returns {Object|undefined}
   */
  user () {
    return sessionUser()
  }

  /**
   * @returns {boolean}
   */
  guest () {
    return sessionGuest()
  }

  /**
   * @param {RegExp} regex
   */
  protect (regex) {
    this.beforeEach((to, from, next) => {
      if (!regex.test(to.path)) {
        return next()
      }

      sessionCheck()
        .then(() => next())
        .catch(() => this.exit(to.path))
    })
  }

  /**
   * @param {String} redirect
   */
  exit (redirect = '') {
    const route = { path: '/auth/register' }
    if (redirect) {
      route.query = { redirect }
    }
    return this.push(route)
  }
}
