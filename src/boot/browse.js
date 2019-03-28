// noinspection NpmUsedModulesInstalled
import { openURL } from 'quasar'

/**
 * @param Vue
 * @returns {Vue}
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$browse', {
    get () {
      /**
       * @param {string|number|object} target
       * @param {*} options
       */
      return (target, options = undefined) => {
        if (typeof target === 'string' && options && options.blank) {
          openURL(`${process.env.build.PUBLIC_PATH}/${target}`.replace(/(\/)\/+/g, '/'))
          return
        }

        if (typeof target === 'number') {
          this.$router.go(target)
          return
        }

        if (typeof target === 'string') {
          target = { path: target, query: {} }
        }

        if (options === true || (options && typeof options === 'object' && options.keep)) {
          target.query = {
            ...target.query,
            ...this.$route.query
          }
        }
        this.$router.push(target)
      }
    }
  })
}
