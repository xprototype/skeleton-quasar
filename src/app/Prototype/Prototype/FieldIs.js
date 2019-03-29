export default {
  /**
   * @param {Object} options
   * @returns {Prototype}
   */
  fieldAsPrimaryKey (options = {}) {
    options = {
      tableWith: '80px',
      formWidth: 100,
      tableShow: true,
      key: 'id',
      label: '',
      hiddenForm: false,
      ...options
    }
    return this.field(options.key, options.label, Number)
      .fieldTableWidth(options.tableWith)
      .fieldFormWidth(options.formWidth)
      .fieldTableShow(options.tableShow)
      .fieldFormHidden(options.hiddenForm)
      .fieldFormDisabled(true)
      .fieldPrimaryKey()
  },

  /**
   * @param {Object} attrs
   * @returns {Prototype}
   */
  fieldIsInput (attrs = {}) {
    this.setComponent('input')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Prototype}
   */
  fieldIsNumber (attrs = {}) {
    this.setComponent('number')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Prototype}
   */
  fieldIsPassword (attrs = {}) {
    this.setComponent('password')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Prototype}
   */
  fieldIsEmail (attrs = {}) {
    this.setComponent('email')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Number} rows
   * @param {Object} attrs
   * @returns {Prototype}
   */
  fieldIsText (rows = 4, attrs = {}) {
    this.setComponent('text')
    this.setAttrs({ ...attrs, rows })
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Prototype}
   */
  fieldIsCheckbox (attrs = {}) {
    this.setComponent('checkbox')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Array} options
   * @param {Object} attrs
   * @returns {Prototype}
   */
  fieldIsRadio (options = undefined, attrs = {}) {
    if (!Array.isArray(options)) {
      options = [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    }
    this.setComponent('radio')
    this.setAttrs({ ...attrs, options })
    return this
  },

  /**
   * @param {Array} options
   * @param {Object} attrs
   * @returns {Prototype}
   */
  fieldIsSelect (options, attrs = {}) {
    this.setComponent('select')
    this.setAttrs({ ...attrs, options })
    this.setLayout({
      tableFormat (value/* , row */) {
        return options.find((option) => option.value === value).label
      }
    })
    return this
  }
}
