export default {
  /**
   * @param {Array} scopes
   * @returns {Schema}
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
   * @returns {Schema}
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
   * @returns {Schema}
   */
  fieldConfigure (configure) {
    const name = this.__currentField
    this.__fields[name].$configure = configure
    return this
  },

  /**
   * @param {string} type
   * @returns {Schema}
   */
  fieldType (type) {
    return this.setAttrs({ type })
  },

  /**
   * @param {Boolean} primaryKey
   * @returns {Schema}
   */
  fieldPrimaryKey (primaryKey = true) {
    const name = this.__currentField
    this.__fields[name].$primaryKey = primaryKey
    return this
  },

  /**
   * @param {string} alias
   * @param {Function} handler
   * @returns {Schema}
   */
  fieldValidations (alias, handler) {
    const name = this.__currentField
    this.__fields[name].$validations[alias] = handler
    return this
  },

  /**
   * @param {Boolean} required
   * @returns {Schema}
   */
  fieldRequired (required = true) {
    const name = this.__currentField
    this.__fields[name].$validations['required'] = required
    return this
  },

  /**
   * @param {Number} minLength
   * @returns {Schema}
   */
  fieldValidateMinLength (minLength = 3) {
    const name = this.__currentField
    this.__fields[name].$validations['minLength'] = [minLength]
    return this
  },

  /**
   * @param {Number} maxLength
   * @returns {Schema}
   */
  fieldValidateMaxLength (maxLength = 10) {
    const name = this.__currentField
    this.__fields[name].$validations['maxLength'] = [maxLength]
    return this
  },

  /**
   * @param {string} event
   * @param {Function} callable
   * @returns {Schema}
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
