import { yesNo } from 'src/domains/Common/options'

/**
 * @typedef {FieldIs}
 */
export default {
  /**
   * @param {Object} options
   * @returns {Schema}
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
    return this.addField(options.key, options.label, Number)
      .fieldTableWidth(options.tableWith)
      .fieldFormWidth(options.formWidth)
      .fieldTableShow(options.tableShow)
      .fieldFormHidden(options.hiddenForm)
      .fieldFormDisabled(true)
      .fieldPrimaryKey()
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsInput (attrs = {}) {
    this.setComponent('input')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsNumber (attrs = {}) {
    this.setComponent('number')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsPassword (attrs = {}) {
    this.setComponent('password')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsEmail (attrs = {}) {
    this.setComponent('email')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Number} rows
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsText (rows = 4, attrs = {}) {
    this.setComponent('text')
    this.setAttrs({ ...attrs, rows })
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsCheckbox (attrs = {}) {
    this.setComponent('checkbox')
    this.setAttrs({ ...attrs })
    return this
  },

  /**
   * @param {Array} options
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsRadio (options = undefined, attrs = {}) {
    if (!Array.isArray(options)) {
      options = yesNo
    }
    this.setComponent('radio')
    this.setAttrs({ ...attrs, options })
    return this
  },

  /**
   * @param {Array} options
   * @param {Object} attrs
   * @returns {Schema}
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
