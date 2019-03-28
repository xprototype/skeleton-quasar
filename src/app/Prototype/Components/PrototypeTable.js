import Dynamic from '../Contracts/Dynamic'
import Table from '../Contracts/Table'
import PrototypeSlots from 'src/app/Prototype/Components/Table/PrototypeSlots'

import PrototypeButtons from './PrototypeButtons'

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
    Dynamic, Table, PrototypeSlots
  ],
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderTable (h) {
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

      const scopedSlots = this.renderTableSlots(h)

      return h('q-table', { class: 'PrototypeTable', props, attrs, on, scopedSlots })
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
      this.renderTable(h),
      this.renderTableDebuggers(h)
    ]

    return h('q-page', data, children)
  }
}
