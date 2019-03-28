import Prototype from 'src/app/Prototype/Prototype'
import TestService from '../Service/TestService'
import { path } from '../Routes'

/**
 * @type {Test}
 */
export default class Test extends Prototype {
  /**
   * @type {string}
   */
  static path = path

  /**
   * @type {string}
   */
  static domain = 'example.test'

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
   * Test constructor.
   */
  construct () {
    this.fieldAsPrimaryKey()

    this.field('name')
      .fieldTableShow()
      .fieldFormWidth(50)
      .fieldFormAutofocus()
      .fieldOn('input', function () {
        console.log('~> arguments', arguments)
      })

    this.field('age')
      .fieldIsNumber()
      .fieldRequired()
      .fieldFormWidth(50)

    this.field('description')
      .fieldIsText()

    this.action('edit')
      .actionConfigure(function (button, { context, scope, position }) {
        // console.table({ scope, position })
        // if is not grid, avoid
        if (scope !== 'index' || position !== 'table-cell') {
          return button
        }
        // hidden button if id is even
        const record = this.$util.prop(context, 'record', {})
        if (record.id % 2 === 0) {
          button.hidden = true
        }
        return button
      })
  }
}
