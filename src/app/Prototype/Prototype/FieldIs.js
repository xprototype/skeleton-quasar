export default {
  /**
   * @param {Boolean} upperCase
   * @returns {Prototype}
   */
  fieldIsInput (upperCase = true) {
    this.setComponent('input')
    return this.setAttrs({ upperCase })
  },

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
   * @param {Array} options
   * @returns {Prototype}
   */
  fieldIsSelect (options) {
    this.setComponent('select')
    this.setAttrs({ options })
    this.fieldOn('input', function ({ field }) {
      this.next(field)
    })
    this.setLayout({
      tableFormat (value/* , row */) {
        return options.find((option) => option.value === value).label
      }
    })
    return this
  },

  /**
   * @returns {Prototype}
   */
  fieldIsColorPicker () {
    return this.setComponent('colorPicker')
  },

  /**
   * @param {Number} rows
   * @returns {Prototype}
   */
  fieldIsText (rows = 3) {
    this.setComponent('text')
    return this.setAttrs({ rows })
  },

  /**
   * @returns {Prototype}
   */
  fieldIsPassword () {
    return this.setComponent('password')
  },

  /**
   * @returns {Prototype}
   */
  fieldIsImage () {
    return this.setComponent('password')
  },

  /**
   * @returns {Prototype}
   */
  fieldIsRadio () {
    return this.setComponent('radio')
  },

  /**
   * @returns {Prototype}
   */
  fieldIsHtml () {
    return this.setComponent('html')
  },

  /**
   * @returns {Prototype}
   */
  fieldIsFile () {
    return this.setComponent('file')
  },

  /**
   * @returns {Prototype}
   */
  fieldIsEmail () {
    return this.setComponent('input')
  }
}
