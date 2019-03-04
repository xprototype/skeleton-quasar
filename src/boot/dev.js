/**
 * @param Vue
 * @returns {Vue}
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$dev', {
    get () {
      return process.env.app.APP_DEV
    }
  })
}
