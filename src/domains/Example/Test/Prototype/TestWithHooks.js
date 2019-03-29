import Test from './Test'
import { path } from 'src/domains/Example/Test/Routes'
import { gender } from 'src/domains/Common/options'

/**
 * @type {TestWithHooks}
 */
export default class TestWithHooks extends Test {
  /**
   * @type {string}
   */
  static path = '/dashboard/test-with-hooks'

  /**
   * @type {string}
   */
  static domain = 'example.test'

  /**
   * TestWithHooks constructor.
   */
  construct () {
    // construct the parent
    super.construct()
    // configure some fields
    this.configureFields()
    // configure some actions
    this.configureActions()
    // configure some  hooks
    this.configureHooks()
  }

  /**
   */
  configureFields () {
    this.field('active')
      .fieldIsCheckbox({ label: 'if checked will hide "Description"' })
      .fieldFormWidth(45)
      .fieldFormOrder(3, true)
      .fieldOn('input', function ({ $event }) {
        this.setFieldLayout('description', 'formHidden', $event)
      })

    this.field('gender')
      .fieldIsRadio(gender(TestWithHooks.domain))
      .fieldFormOrder(4, true)
      .fieldFormWidth(55)
      .fieldOn('input', function ({ $event }) {
        this.setFieldLayout('active', 'formHidden', $event === 'male')
      })

    this.field('description').fieldOn('input', this.changeDescriptionLabel)
  }

  /**
   */
  configureActions () {
    this.action('cancel')
      .actionColor('red')
      .actionTextColor('white')

    this.action('goToTest')
      .actionScopes(['index', 'create', 'read', 'update'])
      .actionPositions(['form-footer'])
      .actionIcon('send')
      .actionColor('yellow')
      .actionOrder(2)
      .actionLabel(this.$lang(`domains.example.test.actions.goToTest`))
      .actionOn('click', function ({ $event, context }) {
        this.$log('~> $event', $event)
        this.$log('~> context', context)
        this.$browse(path)
      })
  }

  /**
   */
  configureHooks () {
    /**
     */
    this.hook('fetch:record', function () {
      this.$message.toast(this.$lang(`domains.${this.domain}.messages.record`), { position: 'top-right' })
      if (this.record.active === undefined) {
        this.setRecord('active', false)
      }
    })

    /**
     */
    this.hook('fetch:records', function () {
      this.$message.toast(this.$lang(`domains.${this.domain}.messages.records`), { position: 'top-left' })
    })
  }

  /**
   * @param $event
   * @param field
   */
  changeDescriptionLabel ({ $event, field }) {
    if (!field.originalLabel) {
      field.originalLabel = field.label
    }
    let label = $event
    if (!label) {
      label = field.originalLabel
      field.originalLabel = undefined
    }
    field.label = label
  }
}
