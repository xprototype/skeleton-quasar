import Prototype from 'src/app/Prototype/Prototype'
import TestService from '../Service/TestService'

/**
 * @type {Test}
 */
export default class Test extends Prototype {
  /**
   * @type {string}
   */
  static domain = 'example/test'

  /**
   * @type {string}
   */
  primaryKey = 'id'

  /**
   * @type {string}
   */
  displayKey = 'name'

  /**
   * @type {TestService}
   */
  service = TestService.build()

  /**
   * Basico constructor.
   */
  construct () {
    this.fieldAsPrimaryKey()

    this.field('name')
      .fieldTableShow()
      .fieldRequired()
      .fieldFormWidth(100)
      .fieldFormAutofocus()
  }
}
