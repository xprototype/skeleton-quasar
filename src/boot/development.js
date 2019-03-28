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

  /**
   */
  Object.defineProperty(Vue.prototype, '$log', {
    get () {
      return process.env.NODE_ENV !== 'production' ? console.log : () => undefined
    }
  })
}
