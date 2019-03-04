export default {
  /**
   * @param {Number} formWidth
   * @returns {Prototype}
   */
  fieldFormWidth (formWidth) {
    return this.setLayout({ formWidth })
  },

  /**
   * @param {Boolean} disable
   * @returns {Prototype}
   */
  fieldFormDisabled (disable = true) {
    return this.setAttrs({ disable })
  },

  /**
   * @param {Number} formHeight
   * @returns {Prototype}
   */
  fieldFormHeight (formHeight) {
    return this.setLayout({ formHeight })
  },

  /**
   * @param {Boolean} formHidden
   * @returns {Prototype}
   */
  fieldFormHidden (formHidden = true) {
    return this.setLayout({ formHidden })
  },

  /**
   * @param {string} formName
   * @returns {Prototype}
   */
  fieldFormName (formName) {
    return this.setLayout({ formName })
  },

  /*
  * @param {Boolean} type
  * @returns {Prototype}
  */
  fieldFormAutofocus (autofocus = true) {
    return this.setAttrs({ autofocus })
  },

  /**
   * @param {*} value
   * @returns {Prototype}
   */
  fieldFormDefaultValue (value) {
    return this.setAttrs({ value })
  },

  /**
   */
  fieldFormErrorHide () {
    this.setLayout({ formError: false })
  },

  /**
   */
  fieldFormErrorShow () {
    this.setLayout({ formError: true })
  },

  /**
   * @param {Boolean} upperCase
   * @returns {Prototype}
   */
  fieldFormUpperCase (upperCase = true) {
    return this.setAttrs({ upperCase })
  },

  /**
   * @param {Number} order
   * @param {boolean} updateOthers
   * @returns {Prototype}
   */
  fieldFormOrder (order, updateOthers = false) {
    this.setLayout({ formOrder: order })
    if (updateOthers) {
      this.__fieldOrderUpdate('formOrder', order)
    }
    return this
  }
}
