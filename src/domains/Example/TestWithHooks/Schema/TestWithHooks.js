import Test from 'src/domains/Example/Test/Schema/Test'
import { path } from 'src/domains/Example/Test/Route'
import { gender } from 'src/domains/Common/options'
import { POSITIONS, SCOPES, scopes } from 'src/app/Agnostic/enum'

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
   * @type {string}
   */
  grouping = 'sections'

  /**
   * TestWithHooks constructor.
   */
  construct () {
    // construct the parent
    super.construct()
    // configure some fields
    this.setupFields()
    // configure some actions
    this.setupActions()
    // configure some  hooks
    this.setupHooks()
  }

  /**
   */
  setupFields () {
    this.getField('name')
      .fieldFormDefaultValue('William')

    this.addField('active')
      .fieldIsCheckbox({ label: 'active.label' })
      .fieldFormWidth(45)
      .fieldFormOrder(3, true)
      .fieldOn('input', function ({ $event }) {
        this.setFieldLayout('description', 'formHidden', $event)
      })

    this.addField('gender')
      .fieldIsRadio(gender)
      .fieldFormOrder(4, true)
      .fieldFormWidth(55)
      .fieldOn('input', function ({ $event }) {
        this.setFieldLayout('active', 'formHidden', $event === 'male')
      })

    this.getField('description')
      .fieldOn('input', this.configureChangeDescription)
  }

  /**
   */
  setupActions () {
    this.getAction('cancel')
      .actionColor('red')
      .actionTextColor('white')

    this.addAction('goToTest')
      .actionScopes(scopes())
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
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
  setupHooks () {
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

    this.hook('mounted', function () {
      if (this.scope === SCOPES.SCOPE_ADD) {
        this.errors['description'] = ['Houston, we have a problem']
      }
    })
  }

  /**
   * @param $event
   * @param field
   */
  configureChangeDescription ({ $event, field }) {
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
