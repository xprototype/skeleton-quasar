// noinspection NpmUsedModulesInstalled
import Vue from 'vue'
import { get, isEmpty, set } from 'lodash'

/**
 * @param {Object|Array} structure
 * @param {string} path
 * @param {*} fallback
 * @returns {*} Returns the resolved value
 */
export const prop = (structure, path, fallback = undefined) => {
  return get(structure, path, fallback)
}

/**
 * @param {Object|Array} structure
 * @param {string} path
 * @param {*} value
 * @returns {*}
 */
export const apply = (structure, path, value) => {
  return set(structure, path, value)
}

/**
 * @param {*} element
 * @param {Function} action
 * @returns {*}
 */
export const clone = (element, action = (value) => value) => {
  // Handle the 3 simple types, and null or undefined
  if (element === null || element === undefined || typeof element !== 'object') {
    return action(element)
  }

  // Handle Date
  if (element instanceof Date) {
    const date = new Date()
    date.setTime(element.getTime())
    return action(date)
  }

  // Handle Array
  if (element instanceof Array) {
    return element.map(item => clone(item, action))
  }

  // Handle Object
  if (element instanceof Object) {
    const reduce = (accumulate, property) => {
      accumulate[property] = clone(element[property], action)
      return accumulate
    }
    return Object.keys(element).reduce(reduce, {})
  }

  throw new Error('Unable to copy element! Its type isn\'t supported.')
}

/**
 * @param {Vue} $component
 * @param {string} name
 * @returns {*}
 */
export const ref = ($component, name) => {
  const component = $component.$refs[name]
  if (!component) {
    return null
  }
  if (Array.isArray(component) && component[0]) {
    return component[0]
  }
  return component
}

/**
 * @returns {string}
 */
export const uniqueKey = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

/**
 * @param {string} path
 * @param {Boolean} remote
 * @returns {string}
 */
export const statics = (path, remote = false) => {
  if (!remote) {
    return `${process.env.build.PUBLIC_PATH}statics/${path}`
  }
  return `${process.env.storage.URL}/${path}`
}

/**
 * @param {string} name
 * @param {*} component
 */
export const register = (name, component) => {
  Vue.component(name, component)
}

/**
 * @param {Object} value
 * @returns {boolean}
 */
export const empty = (value) => {
  return isEmpty(value)
}

/**
 * @param {*} value
 * @returns {boolean}
 */
export const isString = (value) => typeof value === 'string'

/**
 * @param {*} value
 * @returns {boolean}
 */
export const isObject = (value) => typeof value === 'object'

/**
 * @param {*} value
 * @returns {boolean}
 */
export const isNumber = (value) => typeof value === 'number'

/**
 * @param $component
 * @returns Object}
 */
export default function ($component) {
  return {
    ref: name => ref($component, name),
    statics: statics,
    prop: prop,
    apply: apply,
    clone: clone,
    uniqueKey: uniqueKey
  }
}
