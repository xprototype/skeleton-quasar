import Base from 'src/app/Prototype/Base'

/**
 * @typedef {Skeleton}
 */
export default class Skeleton extends Base {
  /**
   * @param {string} name
   * @param {string} label
   * @param {*} type
   * @returns {Prototype}
   */
  field (name, label = '', type = undefined) {
    this.__currentField = name
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
    this.__fields[name] = {
      is: '',
      attrs,
      on,
      $key: name,
      $type: type,
      $validations: {},
      $layout: {
        formLabel: label,
        formWidth: 100,
        formHeight: 1,
        formHidden: false,
        formOrder: order,
        formError: true,
        tableLabel: label,
        tableWidth: 'auto',
        tableHidden: true,
        tableRequired: false,
        tableAlign: 'left',
        tableSortable: true,
        tableOrder: order,
        tableFormat: undefined
      },
      scopes: this.scopes,
      chars: ''
    }
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
    return this.__hooks
  }

  /**
   * @returns {Object}
   */
  fields () {
    return this.__fields
  }

  /**
   * @returns {Object}
   */
  sections () {
    return this.__sections
  }

  /**
   * @returns {Array}
   */
  actions () {
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
