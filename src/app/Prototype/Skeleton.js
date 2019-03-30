import Base from 'src/app/Prototype/Base'
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
   * @param {string} $key
   * @param {string} label
   * @param {*} type
   * @returns {Prototype}
   */
  field ($key, label = '', type = undefined) {
    this.__currentField = $key
    if (this.__fields[$key]) {
      return this
    }

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
   * @param {string} id
   * @param {string} label
   */
  action (id, label = '') {
    this.__currentAction = id
    if (this.__actions[id]) {
      return this
    }

    const color = 'white'
    const textColor = 'grey-10'

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
      on: { click: handler }
      // configure: (button, context) => button
    }
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
   * @param id
   * @param label
   * @returns {*}
   */
  section (id, label) {
    this.__sections[id] = label
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
      path: this.constructor.path,
      domain: this.constructor.domain,
      settings: {
        toast: this.toast
      },
      table: Object.assign(table, this.table),
      form: Object.assign(form, this.form),
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      service: this.service,
      hooks: () => this.hooks(),
      actions: () => this.actions(),
      sections: () => this.sections(),
      fields: () => this.fields()
    }
  }
}
