/**
 * @mixin {TableColumns}
 */
export default {
  /**
   */
  methods: {
    /**
     */
    configure () {
      let field
      Object.keys(this.columns).forEach(key => {
        if (this.columns[key].$configure && typeof this.columns[key].$configure === 'function') {
          field = this.columns[key].$configure.call(this, this.columns[key], this.scope)
          if (!field || field['$key'] !== this.components[key]['$key']) {
            throw Error('The configure return must be the field')
          }
          this.columns[key] = field
        }
      })
    },
    /**
     * @param {string} field
     * @returns {String|*}
     */
    parseFieldLabel (field) {
      if (field.$layout.tableLabel) {
        return field.$layout.tableLabel
      }
      return this.$lang([
        `domains.${this.domain}.fields.${field.$key}.__label`,
        `domains.${this.domain}.fields.${field.$key}`,
        `prototype.fields.${field.$key}`
      ])
    },
    /**
     * @param {Object} field
     * @returns {Array|*}
     */
    parseFieldOptions (field) {
      if (!field.attrs.options) {
        return []
      }
      if (!Array.isArray(field.attrs.options)) {
        return field.attrs.options
      }
      const map = (option) => {
        if (typeof option === 'object' && option.label) {
          option.label = this.$lang(option.label, option.label)
        }
        return option
      }
      return field.attrs.options.map(map)
    },
    /**
     * @param {string} ignore
     * @param {boolean} primaryKeyLast
     */
    renderColumns (ignore = undefined, primaryKeyLast = false) {
      const filter = (column) => column[ignore] !== true

      const reduce = (accumulator, field) => {
        const label = this.parseFieldLabel(field)
        const options = this.parseFieldOptions(field)
        accumulator.push({
          label: label,
          options: options,
          $remoteKey: field.$layout.tableRemoteKey || field.$key,
          $type: field.$type,
          name: field.$layout.tableName || field.$key,
          field: field.$key,
          $primaryKey: field.$primaryKey,
          required: field.$layout.tableRequired,
          style: `width: ${field.$layout.tableWidth}`,
          align: field.$layout.tableAlign || 'left',
          sortable: field.$layout.tableSortable,
          format: field.$layout.tableFormat,
          upper: field.attrs.upperCase,
          hidden: field.$layout.tableHidden,
          __order: field.$layout.tableOrder
        })
        return accumulator
      }

      const sort = (a, b) => {
        if (primaryKeyLast && b.$primaryKey) {
          return -1
        }
        if (a.__order < b.__order) {
          return -1
        }
        if (a.__order > b.__order) {
          return 1
        }
        return 0
      }

      this.columns = Object.values(this.$util.clone(this.fields())).filter(filter).reduce(reduce, []).sort(sort)

      this.visibleColumns = this.columns.filter(column => !column.hidden).map(column => column.name)
    }
  }
}
