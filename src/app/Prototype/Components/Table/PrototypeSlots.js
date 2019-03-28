import { renderTableColumnsSelector, renderTableSearch } from './PrototypeSlotTop'

/**
 * @typedef {PrototypeTop}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param h
     * @returns {*}
     */
    renderTableSlots (h) {
      return {
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
    renderTableColumnsSelector: renderTableColumnsSelector,
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderTableSearch: renderTableSearch,
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
    }
  }
}
