import util from 'src/app/Util'

/**
 * @param Vue
 * @returns {Vue}
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$util', {
    get () {
      const base = util(this)
      if (this.$options && this.$options.util) {
        return Object.assign({}, base, this.$options.util)
      }
      if (this.$props && this.$props.util) {
        return Object.assign({}, base, this.$props.util)
      }
      return base
    }
  })
}
