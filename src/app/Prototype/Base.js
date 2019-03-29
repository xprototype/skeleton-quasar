/* eslint-disable no-underscore-dangle */
import components from 'src/config/app/components'
import { apply, clone } from 'src/app/Util'
import { lang } from 'src/app/Util/Lang'

/**
 * @typedef {Base}
 */
export default class Base {
  // http://jsfiddle.net/wilcorrea/q6m35asu

  /**
   * @type {string}
   */
  static domain = ''

  /**
   * @type {Array}
   */
  static searchHidden = ['ativo']

  /**
   * @type {string}
   */
  primaryKey = 'id'

  /**
   * @type {string}
   */
  displayKey = 'id'

  /**
   * @type {string}
   */
  titleForm = ''

  /**
   * @type {string}
   */
  titleTable = ''

  /**
   * @type {Service}
   */
  service = undefined

  /**
   * @type {String[]}
   */
  scopes = ['index', 'create', 'read', 'update']

  /**
   * @type {Object}
   */
  table = {}

  /**
   * @type {Object}
   */
  form = {
    action: 'save'
  }

  /**
   * @type {Object}
   */
  components = components

  /**
   * @type {string}
   */
  is = 'input'

  /**
   * @type {Array}
   */
  static mixins = []

  /**
   * @type {boolean}
   */
  i18n = true

  /**
   * @param {Object} options
   * @returns {this}
   */
  static build (options = {}) {
    return new this(options)
  }

  /**
   * @param {Object} options
   */
  constructor (options) {
    this.__hooks = {}
    this.__fields = {}
    this.__actions = {}
    this.__sections = {}

    this.__loaded = {}

    this.init()
    this.locale()

    if (this.defaults && typeof this.defaults === 'function') {
      this.defaults()
    }

    if (this.construct && typeof this.construct === 'function') {
      this.construct()
      return
    }

    throw new Error('Invalid `construct` method on prototype instance')
  }

  /**
   */
  init () {
    this.constructor.mixins.forEach(mixin => this.mixin(mixin))
  }

  /**
   */
  locale () {
    if (!this.i18n) {
      return
    }
    this.namespace = this.constructor.domain.replace(/\//, '.')
    const map = (piece) => piece.charAt(0).toUpperCase() + piece.substring(1)
    const domain = this.namespace.split('.').map(map).join('/')

    const locale = window.app.i18n.locale
    const path = `src/domains/${domain}/${locale}`
    if (this.__loaded[path]) {
      return
    }
    this.__loaded[path] = true

    const messages = require(`src/domains/${domain}/${locale}`)
    const translations = apply({}, `domains.${this.namespace}`, messages.default)

    window.app.i18n.mergeLocaleMessage(locale, translations)
  }

  /**
   * @param {Object} mixin
   */
  mixin (mixin) {
    if (typeof mixin !== 'object') {
      return
    }
    Object.keys(mixin).forEach(method => {
      if (this[method]) {
        return
      }
      if (typeof mixin[method] !== 'function') {
        return
      }
      this[method] = mixin[method].bind(this)
    })
  }

  /**
   * @param {String|Array} key
   * @param {string} [fallback]
   * @returns {String|Object}
   */
  $lang (key, fallback = '') {
    return lang(key, fallback)
  }

  /**
   * @param {*} element
   * @param {Function} action
   * @returns {*}
   */
  $clone (element, action = (value) => value) {
    return clone(element, action)
  }

  /**
   * @param {string} component
   * @returns {this}
   */
  setComponent (component) {
    const properties = this.components[component]
    if (!properties) {
      this.setIs(component)
      return this
    }
    this.setIs(properties.is)
    this.setAttrs(properties.attrs)
    // TODO: what?
    // this.setOn(properties.on)
    return this
  }

  /**
   * @param {Object} layout
   * @returns {this}
   */
  setLayout (layout) {
    const name = this.__currentField
    const field = this.__fields[name]
    this.__fields[name].$layout = Object.assign(field.$layout, layout)
    return this
  }

  /**
   * @param {string} component
   * @returns {this}
   */
  setIs (component) {
    const name = this.__currentField
    const field = this.__fields[name]
    field.is = component
    return this
  }

  /**
   * @param {string} chars
   * @returns {this}
   */
  setChars (chars) {
    const name = this.__currentField
    const field = this.__fields[name]
    field.chars = chars
    return this
  }

  /**
   * @param {Object} attrs
   * @returns {this}
   */
  setAttrs (attrs) {
    const name = this.__currentField
    const field = this.__fields[name]
    this.__fields[name].attrs = Object.assign(field.attrs, attrs)
    return this
  }

  /**
   * @param {string} event
   * @param {Function} callable
   * @param {Boolean} reset
   * @returns {this}
   */
  setOn (event, callable, reset = false) {
    const name = this.__currentField
    if (!this.__fields[name].on[event] || reset) {
      this.__fields[name].on[event] = []
    }
    this.__fields[name].on[event].push(callable)
    return this
  }
}
