import Test from './Test'
import { path } from 'src/domains/Example/Test/Routes'

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

    // configure some actions
    this.configureActions()

    // configure some  hooks
    this.configureHooks()
  }

  /**
   */
  configureActions () {
    this.action('cancel')
      .actionColor('red')
      .actionTextColor('white')

    this.action('go-to-test')
      .actionScopes(['index', 'create', 'read', 'update'])
      .actionPositions(['form-footer'])
      .actionIcon('send')
      .actionColor('yellow')
      .actionOrder(2)
      .actionLabel(this.$lang(`domains.${TestWithHooks.domain}.actions.goToTest`))
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
      this.$message.toast(this.$lang(`domains.${this.domain}.messages.record`))
    })

    /**
     */
    this.hook('fetch:records', function () {
      this.$message.toast(this.$lang(`domains.${this.domain}.messages.records`))
    })
  }
}
