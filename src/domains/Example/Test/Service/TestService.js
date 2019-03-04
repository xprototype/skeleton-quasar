import Rest from 'src/app/Services/Rest'

/**
 * @type {TestService}
 */
export default class TestService extends Rest {
  /**
   * @type {String}
   */
  static resource = '/example/test'

  /**
   * @param {Object} parameters
   * @param {Array} filters
   * @returns {Promise}
   */
  search (parameters = {}, filters = []) {
    return new Promise((resolve) => {
      const page = parameters.pagination.page
      const sortBy = parameters.pagination.sortBy
      const descending = parameters.pagination.descending
      const rowsPerPage = parameters.pagination.rowsPerPage

      const rowsNumber = 32
      const pagesNumber = Math.ceil(rowsNumber / rowsPerPage)
      let length = rowsPerPage
      if (page === pagesNumber) {
        length = rowsNumber % (pagesNumber - 1)
      } else if (page > pagesNumber) {
        length = 0
      }

      const generator = (v, i) => {
        const counter = (page - 1) * rowsPerPage + i + 1
        return {
          id: counter,
          name: `Test ${counter}`
        }
      }

      window.setTimeout(() => {
        resolve({
          rowsPerPage: rowsPerPage,
          rowsNumber: rowsNumber,
          pagesNumber: pagesNumber,
          sortBy: sortBy,
          descending: descending,
          page: page,
          rows: Array.from({ length }, generator)
        })
      }, 1000)
    })
  }
}
