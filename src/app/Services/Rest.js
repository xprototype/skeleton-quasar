import API from './API'
import { prop } from 'src/app/Util'

/**
 * @type {Rest}
 * @link https://labs.omniti.com/labs/jsend
 */
export default class Rest extends API {
  /**
   * @type {string}
   */
  static resource = ''

  /**
   * @type {Rest}
   * @private
   */
  static __instance = undefined

  /**
   * @type {string}
   */
  id = 'id'

  /**
   * @type {Number}
   */
  size = 10

  /**
   * @type {string}
   */
  separator = '='

  /**
   * @type {string}
   */
  conector = '|'

  /**
   * @param {string} resource
   * @param {Object} http
   * @param {Object} options
   */
  constructor (resource, http = null, options = {}) {
    super(Rest.normalize(Rest.base, resource), http, options)
  }

  /**
   * @param {Object} options
   * @param {Object} http
   * @returns {this}
   */
  static build (options = {}, http = null) {
    return new this(this.resource, http, options)
  }

  /**
   * @param {Object} options
   * @param {Object} http
   * @returns {this}
   */
  static instance (options = {}, http = null) {
    if (!this.__instance) {
      this.__instance = this.build(options, http)
    }
    return this.__instance
  }

  /**
   * @param {Object} record
   * @returns {Promise}
   */
  create (record) {
    return this.post('', record)
  }

  /**
   * @param {Object} record
   * @returns {Promise}
   */
  update (record) {
    return this.patch(`/${this.__getId(record)}`, record)
  }

  /**
   * @param {String|Object} record
   * @returns {Promise}
   */
  read (record) {
    return this.get(`/${this.__getId(record)}`)
  }

  /**
   * @param {Object} record
   * @returns {Promise}
   */
  destroy (record) {
    return this.delete(`/${this.__getId(record)}`)
  }

  /**
   * @param {Object} parameters
   * @param {Array} filters
   * @returns {Promise}
   */
  search (parameters = {}, filters = []) {
    const page = prop(parameters, 'pagination.page', 1)
    const sortBy = prop(parameters, 'pagination.sortBy')
    const descending = prop(parameters, 'pagination.descending')
    const rowsPerPage = prop(parameters, 'pagination.rowsPerPage', this.size)

    const order = prop(parameters, 'sorter', '')

    const then = (response) => {
      const rows = prop(response, 'rows')
      const pagesNumber = prop(response, 'pages')
      const rowsNumber = prop(response, 'total')
      return {
        rowsPerPage,
        sortBy,
        descending,
        page,
        rowsNumber,
        pagesNumber,
        rows
      }
    }

    const fragments = [`page=${page}`, `size=${rowsPerPage}`]

    if (order) {
      fragments.push(`order=${order}`)
    }

    const filter = prop(parameters, 'filter')
    if (!Array.isArray(filters)) {
      filters = []
    }

    const search = filters.map((field) => `${field}${this.separator}${filter}`).join(this.conector)
    if (search) {
      fragments.push(`search=${search}`)
    }

    let queryString = '?' + fragments.join('&')

    return this.read(queryString).then(then)
  }

  /**
   * @param {Object} options
   */
  setOptions (options = {}) {
    this.options = {
      ...this.options,
      ...options
    }
  }

  /**
   * @param {String|Object} record
   * @returns {string}
   */
  __getId (record) {
    if (typeof record === 'object') {
      return record[this.id]
    }
    return String(record)
  }
}
