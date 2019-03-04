// noinspection NpmUsedModulesInstalled
import { LocalStorage, SessionStorage } from 'quasar'

const parse = value => value === 'undefined' ? undefined : value

/**
 * @param {string} index
 * @param {Boolean} remember
 * @returns {*}
 */
export const read = (index, remember = false) => {
  if (remember) {
    return parse(LocalStorage.getItem(index))
  }
  return parse(SessionStorage.getItem(index))
}

/**
 * @param {string} index
 * @param {*} value
 * @param {boolean} remember
 * @returns {*}
 */
export const write = (index, value, remember = false) => {
  if (remember) {
    return LocalStorage.set(index, value)
  }
  return SessionStorage.set(index, value)
}

/**
 * @param {string} index
 * @param {boolean} remember
 * @returns {*}
 */
export const erase = (index, remember = false) => {
  if (remember) {
    return LocalStorage.remove(index)
  }
  return SessionStorage.remove(index)
}
