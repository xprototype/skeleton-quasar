export default {

  /**
   * @param {Number|String} tableWidth
   * @returns {Prototype}
   */
  fieldTableWidth (tableWidth) {
    return this.setLayout({ tableWidth })
  },

  /**
   * @param {Boolean} show
   * @returns {Prototype}
   */
  fieldTableShow (show = true) {
    return this.setLayout({ tableHidden: !show })
  },

  /**
   * @param {Boolean} tableRequired
   * @returns {Prototype}
   */
  fieldTableRequired (tableRequired) {
    return this.setLayout({ tableRequired })
  },

  /**
   * @param {string} tableName
   * @returns {Prototype}
   */
  fieldTableName (tableName) {
    return this.setLayout({ tableName })
  },

  /**
   * @param {string} tableAlign
   * @returns {Prototype}
   */
  fieldTableAlign (tableAlign) {
    return this.setLayout({ tableAlign })
  },

  /**
   * @param {Boolean} tableSortable
   * @returns {Prototype}
   */
  fieldTableSortable (tableSortable) {
    return this.setLayout({ tableSortable })
  },

  /**
   * @param {Number} order
   * @param {boolean} updateOthers
   * @returns {Prototype}
   */
  fieldTableOrder (order, updateOthers = false) {
    this.setLayout({ tableOrder: order })
    if (updateOthers) {
      this.__fieldOrderUpdate('tableOrder', order)
    }
    return this
  }
}
