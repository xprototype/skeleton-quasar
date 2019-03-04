export default {
  /**
   * @param {Array} scopes
   * @returns {Prototype}
   */
  fieldScopes (scopes) {
    const id = this.__currentField
    if (this.__fields[id]) {
      this.__fields[id].scopes = scopes
    }
    return this
  },

  /**
   * @param value
   * @returns {Prototype}
   */
  fieldSection (value) {
    const id = this.__currentField
    if (this.__fields[id]) {
      this.__fields[id].section = value
    }
    return this
  },

  /**
   * @param {Function} configure
   * @returns {Prototype}
   */
  fieldConfigure (configure) {
    const name = this.__currentField
    this.__fields[name].$configure = configure
    return this
  },

  /**
   * @param {string} type
   * @returns {Prototype}
   */
  fieldType (type) {
    return this.setAttrs({ type })
  },

  /**
   * @param {Boolean} primaryKey
   * @returns {Prototype}
   */
  fieldPrimaryKey (primaryKey = true) {
    const name = this.__currentField
    this.__fields[name].$primaryKey = primaryKey
    return this
  },

  /**
   * @param {string} alias
   * @param {Function} handler
   * @returns {Prototype}
   */
  fieldValidations (alias, handler) {
    const name = this.__currentField
    this.__fields[name].$validations[alias] = handler
    return this
  },

  /**
   * @param {Boolean} required
   * @returns {Prototype}
   */
  fieldRequired (required = true) {
    const name = this.__currentField
    this.__fields[name].$validations['required'] = required
    return this
  },

  /**
   * @param {Number} minLength
   * @returns {Prototype}
   */
  fieldValidateMinLength (minLength = 3) {
    const name = this.__currentField
    this.__fields[name].$validations['minLength'] = [minLength]
    return this
  },

  /**
   * @param {Number} maxLength
   * @returns {Prototype}
   */
  fieldValidateMaxLength (maxLength = 10) {
    const name = this.__currentField
    this.__fields[name].$validations['maxLength'] = [maxLength]
    return this
  },

  /**
   * @param {string} event
   * @param {Function} callable
   * @returns {Prototype}
   */
  fieldOn (event, callable) {
    return this.setOn(event, callable)
  },

  /**
   * @param {string} reference
   * @param {Number} order
   * @private
   */
  __fieldOrderUpdate (reference, order) {
    Object.keys(this.__fields).forEach((key) => {
      if (key === this.__currentField) {
        return
      }
      const field = this.__fields[key]
      if (field.$layout[reference] < order) {
        return
      }
      field.$layout[reference] = field.$layout[reference] + 1
    })
  }
}
