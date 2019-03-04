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
      // console.log('~> parameters', parameters)
      const page = parameters.pagination.page
      const sortBy = parameters.pagination.sortBy
      const descending = parameters.pagination.descending
      const rowsPerPage = parameters.pagination.rowsPerPage
      let length = 10
      if (page === 3) {
        length = 2
      }
      window.setTimeout(() => {
        resolve({
          rowsNumber: 22,
          pagesNumber: 3,
          sortBy: sortBy,
          descending: descending,
          page: page,
          rows: Array.from({ length }, (v, i) => {
            const counter = (page - 1) * rowsPerPage + i + 1
            return {
              id: counter,
              name: `Test ${counter}`
            }
          })
        })
      }, 1000)
    })
  }
}
