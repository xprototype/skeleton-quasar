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
  size = 30

  /**
   * @type {string}
   */
  separator = '='

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
    return this.put('', record)
  }

  /**
   * @param {object} record
   */
  save (record) {
    return record.id ? this.update(record) : this.create(record)
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
    const size = prop(parameters, 'pagination.rowsPerPage', this.size)
    const order = prop(parameters, 'sorter', '')

    const then = (response) => {
      const rows = prop(response, 'content')
      const current = prop(response, 'currentPage')
      const pages = prop(response, 'totalPages')
      return {
        pagesNumber: pages,
        page: current,
        rows: rows
      }
    }

    const fragments = [
      `page=${page}`,
      `size=${size}`,
      `order=${order}`
    ]

    const filter = prop(parameters, 'filter')
    if (!Array.isArray(filters)) {
      filters = []
    }
    if (filter && filters.length) {
      fragments.push(`search=${filters.map((field) => `field${this.separator}${filter}`)}`)
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
