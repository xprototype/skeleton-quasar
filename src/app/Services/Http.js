import standard from 'src/config/service/standard'
import Service from 'src/app/Services/Service'

/**
 * @type {Http}
 */
export default class Http extends Service {
  /**
   * @param {string} path
   * @param {Object} http
   * @param {Object} options
   */
  constructor (path, http = null, options = {}) {
    super(options)
    this.path = path
    this.http = http || standard
  }

  /**
   * @param {{data: String|Object}} response
   * @returns {Object}
   */
  static then (response) {
    if (!response.data) {
      return {}
    }
    if (typeof response.data === 'string') {
      return JSON.parse(response.data)
    }
    return response.data
  }

  /**
   * @param {Object} options
   * @param {string} path
   */
  static build (options, path) {
    return new this(options, path)
  }

  /**
   * @param {string} start
   * @param {string} end
   * @returns {string}
   */
  static normalize (start, end) {
    return `${start}${end}`.replace(/([^:]\/)\/+/g, '$1')
  }

  /**
   * @param {string} url
   * @returns {*|AxiosPromise<any>}
   */
  get (url) {
    return this.http.get(Http.normalize(this.path, url)).then(Http.then)
  }

  /**
   * @param {string} url
   * @param {Object} data
   * @returns {*|AxiosPromise<any>}
   */
  post (url, data) {
    return this.http.post(Http.normalize(this.path, url), data).then(Http.then)
  }

  /**
   * @param {string} url
   * @param {Object} data
   * @returns {*|AxiosPromise<any>}
   */
  put (url, data) {
    return this.http.put(Http.normalize(this.path, url), data).then(Http.then)
  }

  /**
   * @param {string} url
   * @param {Object} data
   * @returns {*|AxiosPromise<any>}
   */
  patch (url, data) {
    return this.http.patch(Http.normalize(this.path, url), data).then(Http.then)
  }

  /**
   * @param {string} url
   * @returns {*|AxiosPromise<any>}
   */
  delete (url) {
    return this.http.delete(Http.normalize(this.path, url)).then(Http.then)
  }
}
