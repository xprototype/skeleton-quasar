export default {
  /**
   * @param {Array} scopes
   */
  actionScopes (scopes) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].scopes = scopes
    }
    return this
  },

  /**
   * @param {Array} positions
   */
  actionPositions (positions) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].positions = positions
    }
    return this
  },

  /**
   * @param {string} scope
   */
  actionScopeJust (scope) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].scopes = [scope]
    }
    return this
  },

  /**
   * @param {string} scope
   */
  actionScopeExcept (scope) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].scopes = this.scopes.filter(item => item !== scope)
    }
    return this
  },

  /**
   * @param {Number} order
   */
  actionOrder (order) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].order = order
    }
    return this
  },

  /**
   * @param {string} label
   */
  actionLabel (label) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.label = label
    }
    return this
  },

  /**
   * @param {string} icon
   */
  actionIcon (icon = '') {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.icon = icon
    }
    return this
  },

  /**
   * @param {string} color
   */
  actionColor (color) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.color = color
    }
    return this
  },

  /**
   * @param {string} textColor
   */
  actionTextColor (textColor) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.textColor = textColor
    }
    return this
  },

  /**
   * @param {Boolean} disabled
   */
  actionDisabled (disabled = true) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].attrs.disabled = disabled
    }
    return this
  },

  /**
   * @returns {Prototype}
   */
  actionFloatRight () {
    return this.actionAddClassName('button-position-right')
  },

  /**
   * @returns {Prototype}
   */
  actionFloatLeft () {
    return this.actionAddClassName('button-position-left')
  },

  /**
   * @returns {Prototype}
   */
  actionNoMinWidth () {
    return this.actionAddClassName('q-btn-no-min-width')
  },

  /**
   * @param {string} className
   */
  actionAddClassName (className) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      if (!this.__actions[id].class) {
        this.__actions[id].class = []
      }
      this.__actions[id].class.push(className)
    }
    return this
  },

  /**
   * @param {Boolean} hidden
   */
  actionHidden (hidden = true) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].hidden = hidden
    }
    return this
  },

  /**
   * @param {Array} actions
   * @returns {default}
   */
  actionDropdown (actions) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].dropdown = true
      if (!Array.isArray(actions)) {
        actions = []
      }
      this.__actions[id].actions = actions
    }
    return this
  },

  /**
   * @param {Function} validate
   */
  actionValidate (validate) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].validate = validate
    }
    return this
  },

  /**
   * @param {Function} configure
   */
  actionConfigure (configure) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].configure = configure
    }
    return this
  },

  /**
   * @param {string} event
   * @param {Function} handler
   */
  actionOn (event, handler) {
    const id = this.__currentAction
    if (this.__actions[id]) {
      this.__actions[id].on[event] = handler
    }
    return this
  }
}
