import Dynamic from '../Contracts/Dynamic'
import Table from '../Contracts/Table'
import PrototypeButtons from 'src/app/Prototype/Components/PrototypeButtons'

/**
 * @typedef {PrototypeTable}
 */
export default {
  name: 'PrototypeTable',
  /**
   */
  components: {
    PrototypeButtons
  },
  /**
   */
  mixins: [
    Dynamic, Table
  ],
  methods: {
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderTableWrapper (h) {
      const attrs = {
        ...this.bind,
        data: this.data,
        columns: this.columns,
        visibleColumns: this.visibleColumns,
        loading: this.loading
      }

      const props = {
        pagination: this.pagination,
        selected: this.selected
      }

      const on = {
        'update:pagination': (pagination) => { this.pagination = pagination },
        'update:selected': (selected) => { this.selected = selected }
      }

      const scopedSlots = {
        'top': (props) => {
          return this.renderTableTop(h, props)
        },
        'body-cell-id': (props) => {
          return this.renderTableCellButtons(h, props)
        },
        'pagination': (props) => {
          return this.renderTablePagination(h, props)
        }
      }

      return h('q-table', { class: 'PrototypeTable', props, attrs, on, scopedSlots })
    },
    /**
     * @param {Function} h
     * @param {Object} props
     * @returns {*}
     */
    renderTableTop (h, props) {
      return [
        this.renderTableColumnsSelector(h),
        h('q-space'),
        this.renderPrototypeButtonsCompact(h, 'table-top', { records: this.selected }),
        h('q-space'),
        this.renderTableSearch(h)
      ]
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderTableColumnsSelector (h) {
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
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderTableSearch (h) {
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
    },
    /**
     * @param {Function} h
     * @param {Object} props
     * @returns {*}
     */
    renderTableCellButtons (h, props) {
      const data = {
        style: { position: 'relative' }
      }
      const children = [
        props.row[this.primaryKey],
        this.renderPrototypeButtonsCompact(h, 'table-cell', { record: props.row })
      ]

      return h('q-td', data, children)
    },
    /**
     * @param {Function} h
     * @param {Object} props
     * @returns {*}
     */
    renderTablePagination (h, props) {
      const texts = [
        props.pagination.rowsPerPage * (props.pagination.page - 1) + 1, '-'
      ]
      let fragment = props.pagination.rowsPerPage * (props.pagination.page)
      if (props.isLastPage) {
        fragment = props.pagination.rowsNumber
      }
      texts.push(fragment)
      texts.push('/')
      texts.push(props.pagination.rowsNumber)

      const button = {
        round: true, dense: true, flat: true, textColor: 'grey-8'
      }

      const previous = {
        attrs: { ...button, disable: props.isFirstPage, icon: 'chevron_left' },
        on: { click: this.previousPage }
      }

      const next = {
        attrs: { ...button, disable: props.isLastPage, icon: 'chevron_right' },
        on: { click: this.nextPage }
      }

      return [
        h('span', { class: 'q-table__bottom-item' }, texts.join(' ')),
        h('q-btn', previous),
        h('span', { class: 'text-center' }, `${props.pagination.page} / ${props.pagination.pagesNumber}`),
        h('q-btn', next)
      ]
    },
    /**
     * @param {Function} h
     */
    renderTableDebuggers (h) {
      if (!this.debuggers) {
        return
      }

      return h('div', [
        h('app-debugger', { attrs: { label: 'Data', inspect: this.data } }),
        h('app-debugger', { attrs: { label: 'Columns', inspect: this.columns } }),
        h('app-debugger', { attrs: { label: 'Buttons', inspect: this.buttons } })
      ])
    }
  },
  /**
   * @param {Function} h
   */
  render (h) {
    const data = {
      attrs: { padding: true }
    }
    const children = [
      this.renderTableWrapper(h),
      this.renderTableDebuggers(h)
    ]

    return h('q-page', data, children)
  }
}
