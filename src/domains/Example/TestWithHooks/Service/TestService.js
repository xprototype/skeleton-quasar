import TestService from 'src/domains/Example/Test/Service/TestService'

/**
 * @type {TestService}
 */
export default class TestServiceWithHooks extends TestService {
  /**
   * @type {String}
   */
  static resource = '/example/test-with-hooks'
}
