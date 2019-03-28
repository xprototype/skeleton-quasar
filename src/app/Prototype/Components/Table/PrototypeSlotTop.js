/**
 * @param {Function} h
 * @returns {*}
 */
export const renderTableColumnsSelector = function (h) {
  const attrs = {
    'display-value': this.$q.lang.table.columns,
    'multiple': true,
    'borderless': true,
    'dense': true,
    'options-dense': true,
    'emit-value': true,
    'map-options': true,
    'options': this.columns,
    'option-value': 'name'
  }
  const props = {
    value: this.visibleColumns
  }
  const style = {
    'min-width': '150px'
  }
  const on = {
    input: (visibleColumns) => { this.visibleColumns = visibleColumns }
  }

  return h('q-select', { attrs, props, on, style })
}

/**
 * @param {Function} h
 * @returns {*}
 */
export const renderTableSearch = function (h) {
  const attrs = {
    dense: true,
    debounce: 300,
    placeholder: this.$t('prototype.table.search')
  }
  const props = {
    value: this.filter
  }
  const on = {
    input: (filter) => {
      this.filter = filter
      this.search()
    }
  }
  const scopedSlots = {
    append: () => h('q-icon', { attrs: { name: 'search' } })
  }

  return h('q-input', { attrs, props, on, scopedSlots })
}
