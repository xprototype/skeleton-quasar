/**
 */
export default {
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
        page: 1,
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
        selection: 'single'
      },

      filters: [],
      filter: '',
      sorting: '',

      tooltip: {
        delay: 600
      }
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {Boolean}
     */
    isFirstPage () {
      return this.pagination.page === 1
    },
    /**
     * @returns {Boolean}
     */
    isLastPage () {
      return this.pagination.page === this.pagination.pagesNumber
    }
  },
  /**
   */
  methods: {
    /**
     */
    setup () {
      this.data = []
      this.columns = []

      this.renderColumns()
      this.renderButtons()
    },
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
    },
    /**
     * @param {*} filter
     */
    search (filter) {
      this.filtering = filter
      this.fetchRecords()
    },
    /**
     * @param {Object} options
     */
    fetchRecords (options = {}) {
      this.loading = true
      this.$q.loading.show({ delay: 100 })

      const hide = () => {
        this.$q.loading.hide()
        this.loading = false
      }

      if (options.pagination) {
        this.pagination = options.pagination
      }
      if (!this.pagination.sortBy) {
        this.pagination.sortBy = this.displayKey
        this.pagination.descending = false
      }
      this.sorting = this.pagination.sortBy
      this.filters = [this.sorting]

      const parameters = {
        pagination: this.pagination,
        sorter: this.sorting,
        filter: this.filtering
      }

      try {
        if (typeof this.service === 'function') {
          return this
            .service(parameters, this.filters)
            .then(this.successFetchRecords)
            .catch(this.errorFetchRecords)
            .finally(hide)
        }

        return this.service
          .search(parameters, this.filters)
          .then(this.successFetchRecords)
          .catch(this.errorFetchRecords)
          .finally(hide)
      } catch (error) {
        hide()
      }
    },
    /**
     * @param {Object} response
     */
    successFetchRecords (response) {
      this.data = response.rows
      this.pagination.pagesNumber = response.pagesNumber
      this.pagination.page = response.page

      this.pagination.rowsNumber = response.rowsNumber

      if (!this.triggerHook) {
        return
      }
      this.triggerHook('fetch:records')
    },
    /**
     * // @param {Object} error
     */
    errorFetchRecords (/* error */) {
      this.data = []
    },
    /**
     */
    previousPage () {
      this.fetchRecords({ pagination: { ...this.pagination, page: this.pagination.page - 1 } })
    },
    /**
     */
    nextPage () {
      this.fetchRecords({ pagination: { ...this.pagination, page: this.pagination.page + 1 } })
    },
    /**
     * @param {Object} column
     */
    sortData (column) {
      this.fetchRecords({ pagination: this.pagination })
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
