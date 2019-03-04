// noinspection NpmUsedModulesInstalled
import { Notify } from 'quasar'

/**
 * @param {string} message
 */
export const success = (message) => {
  Notify.create({
    message: message,
    color: 'positive',
    icon: 'thumb_up'
  })
}

/**
 * @param {string} message
 */
export const fail = (message) => {
  Notify.create({
    message: message,
    color: 'warning',
    icon: 'thumb_down'
  })
}

/**
 * @param {string} message
 */
export const error = (message) => {
  Notify.create({
    message: message,
    color: 'negative',
    icon: 'warning'
  })
}
