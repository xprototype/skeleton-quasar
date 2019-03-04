/* eslint-disable no-underscore-dangle */
import components from 'src/config/app/components'

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
  scopes = ['index', 'add', 'view', 'edit']

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

    this.init()

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
