import TableColumns from './Table/TableColumns'
import TableFetch from './Table/TableFetch'

/**
 * @typedef {Table}
 */
export default {
  /**
   */
  mixins: [
    TableColumns, TableFetch
  ],
  /**
   */
  props: {
    size: {
      type: Number,
      default: 10
    }
  },
  /**
   */
  data () {
    return {
      data: [],
      columns: [],
      visibleColumns: [],
      pagination: {
        sortBy: this.primaryKey,
        descending: false,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        pagesNumber: 1,
        rowsPerPage: this.service ? this.service.size : this.size
      },
      selected: [],
      loading: false,

      bind: {
        rowsPerPageOptions: [],
        dense: false,
        grid: false,
        rowKey: this.primaryKey,
        separator: 'horizontal',
        selection: 'multiple'
      },

      filters: [],
      filter: this.$route.query.search ? String(this.$route.query.search) : '',
      sorter: '',

      tooltip: {
        delay: 600
      }
    }
  },
  /**
   */
  methods: {
    /**
     */
    initialize () {
      this.data = []
      this.columns = []

      this.renderColumns()
      this.renderButtons()
    },
    /**
     */
    getSelected () {
      if (!Array.isArray(this.selected)) {
        return
      }
      if (this.selected.length < 1) {
        this.$message.info('', this.$lang('prototype.table.noItemSelected'))
        return
      }
      return this.selected[0]
    }
  }
}
