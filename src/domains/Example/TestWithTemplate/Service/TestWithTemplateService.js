import TestService from 'src/domains/Example/Test/Service/TestService'

/**
 * @type {TestWithTemplateService}
 */
export default class TestWithTemplateService extends TestService {
  /**
   * @type {String}
   */
  static resource = '/example/test-with-template'
}
