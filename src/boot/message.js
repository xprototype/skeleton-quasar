import 'siiimple-toast'
import 'siiimple-toast/dist/style.css'

const base = {
  position: 'bottom|left',
  margin: 15,
  delay: 0,
  duration: 3000
}

/**
 * @param {string} message
 * @param options
 */
export const toast = (message, options = {}) => {
  window.siiimpleToast.message(message, Object.assign(base, options))
}

/**
 * @param {string} message
 * @param options
 */
export const success = (message, options = {}) => {
  window.siiimpleToast.success(message, Object.assign(base, options))
}

/**
 * @param {string} message
 * @param options
 */
export const error = (message, options = {}) => {
  window.siiimpleToast.alert(message, Object.assign(base, options))
}

/**
 * @param Vue
 * @returns {Object}
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$message', {
    get () {
      return {
        toast, success, error
      }
    }
  })
}
