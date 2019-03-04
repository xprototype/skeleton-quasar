/**
 * @type {Service}
 */
export default class Service {
  /**
   * @param {*} options
   */
  constructor (options) {
    this.options = options
  }

  /**
   * @param {*} options
   */
  static build (options) {
    return new this(options)
  }
}
