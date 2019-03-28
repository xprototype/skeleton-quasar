import { Notify } from 'quasar'

/**
 * @param {Object} options
 * @param {Object} action
 * @returns {*}
 */
const base = (options, action = {}) => {
  const defaults = {
    color: '',
    textColor: '',
    icon: '',
    message: '',
    position: 'bottom-right',
    duration: 3000,
    actions: [
      {
        icon: 'close',
        color: 'white',
        handler: () => undefined,
        ...action
      }
    ]
  }
  return {
    ...defaults,
    ...options
  }
}

/**
 * @param {string} message
 * @param options
 */
export const toast = (message, options = {}) => {
  Notify.create(base({ message }))
}

/**
 * @param {string} message
 * @param options
 */
export const success = (message, options = {}) => {
  Notify.create(base({ message, color: 'positive' }))
}

/**
 * @param {string} message
 * @param options
 */
export const error = (message, options = {}) => {
  Notify.create(base({ message, color: 'negative' }))
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
