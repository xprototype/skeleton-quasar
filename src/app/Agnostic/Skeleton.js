import Base from 'src/app/Agnostic/Base'
import field from 'src/config/app/field'

/**
 * @typedef {Skeleton}
 */
export default class Skeleton extends Base {
  /**
   * @type {Boolean}
   */
  safe = true

  /**
   * @type {string}
   */
  grouping = 'none'

  /**
   * @param {string} $key
   * @param {string} label
   * @param {*} type
   * @returns {Schema}
   */
  addField ($key, label = '', type = undefined) {
    if (this.__fields[$key]) {
      throw new Error(`Field '${$key}' already exists`)
    }
    this.__currentField = $key

    let is = this.is
    const attrs = { value: undefined, disable: false }

    const keydown = function ({ $event, field }) {
      if (!field.chars) {
        return
      }

      const key = String($event.key)
      if (key.length > 1) {
        return
      }
      const regex = new RegExp(field.chars)
      if (!regex.test(key)) {
        $event.preventDefault()
        $event.stopPropagation()
      }
    }

    const on = {
      keydown: [keydown]
    }
    const order = Object.keys(this.__fields).length
    const options = { label, order, type, scopes: this.scopes }

    this.__fields[$key] = field($key, options, attrs, on)
    this.setComponent(is)
    return this
  }

  /**
   * @param {string} $key
   * @returns {Schema}
   */
  getField ($key) {
    if (!this.__fields[$key]) {
      throw new Error(`Field '${$key}' not exists`)
    }
    this.__currentField = $key
    return this
  }

  /**
   * @param {string} id
   * @param {string} label
   * @returns {Schema}
   */
  addAction (id, label = '') {
    if (this.__actions[id]) {
      throw new Error(`Action '${id}' already exists`)
    }
    this.__currentAction = id

    const color = this.constructor.buttons.color // 'white'
    const textColor = this.constructor.buttons.textColor // 'grey-10'

    const prototype = this
    const handler = function ({ context }) {
      if (!prototype[id]) {
        return
      }
      if (typeof prototype[id] === 'function') {
        prototype[id].call(this, context)
      }
    }

    this.__actions[id] = {
      $key: id,
      order: Object.keys(this.__actions).length,
      hidden: false,
      dropdown: false,
      validate: undefined,
      scopes: this.scopes,
      attrs: { id, label, color, textColor, disabled: false },
      on: { click: handler },
      positions: []
      // configure: (button, context) => button
    }
    return this
  }

  /**
   * @param id
   * @return {Schema}
   */
  getAction (id) {
    if (!this.__actions[id]) {
      throw new Error(`Action '${id}' not exists`)
    }
    this.__currentAction = id
    return this
  }

  /**
   * @returns {Object}
   */
  hook (name, handler) {
    this.__hooks[name] = handler
    return this
  }

  /**
   * @returns {Object}
   */
  hooks () {
    if (this.safe) {
      return this.$clone(this.__hooks)
    }
    return this.__hooks
  }

  /**
   * @returns {Object}
   */
  fields () {
    if (this.safe) {
      return this.$clone(this.__fields)
    }
    return this.__fields
  }

  /**
   * @returns {Object}
   */
  sections () {
    if (this.safe) {
      return this.$clone(this.__sections)
    }
    return this.__sections
  }

  /**
   * @returns {Array}
   */
  actions () {
    if (this.safe) {
      return this.$clone(Object.values(this.__actions))
    }
    return Object.values(this.__actions)
  }

  /**
   * @param {string} id
   * @param {string|Object} options
   * @returns {Skeleton}
   */
  section (id, options = undefined) {
    if (!options) {
      options = `domains.${this.constructor.domain}.sections.${id}`
    }
    if (typeof options === 'string') {
      options = {
        label: this.$lang(`${options}`)
      }
    }
    this.__sections[id] = options
    return this
  }

  /**
   * @returns {Object}
   */
  array () {
    const fields = () => this.fields()
    return {
      domain: this.constructor.domain,
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      fields: this.arrayFields ? this.arrayFields(fields) : fields
    }
  }

  /**
   * @returns {Object}
   */
  remote (options = {}) {
    const fields = () => this.fields()
    const sections = () => this.sections()
    const search = (parameters, filters) => {
      return this.service.search(parameters, filters)
    }

    const remote = {
      domain: this.constructor.domain,
      modalOptions: this.searchModalOptions,
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      title: this.remoteTitle || this.titleTable,
      service: this.remoteSearch || search,
      sections: this.removeSections || sections,
      fields: this.remoteFields || fields
    }

    return Object.assign(remote, options)
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {Object}
   */
  tableEvents () {
    return {}
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {Object}
   */
  formEvents () {
    return {}
  }

  /**
   * @returns {Object}
   */
  provide () {
    const table = {
      title: this.titleTable,
      on: this.tableEvents()
    }
    const form = {
      title: this.titleForm,
      on: this.formEvents()
    }
    return {
      grouping: this.grouping,
      path: this.constructor.path,
      domain: this.constructor.domain,
      settings: {
        toast: this.toast
      },
      table: Object.assign(table, this.table),
      form: Object.assign(form, this.form),
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      hooks: () => this.hooks(),
      actions: () => this.actions(),
      sections: () => this.sections(),
      fields: () => this.fields()
    }
  }
}
