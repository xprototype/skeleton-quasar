import test from 'src/domains/Example/Test/Routes'
import testWithHooks from 'src/domains/Example/TestWithHooks/Routes'
import testWithTemplate from 'src/domains/Example/TestWithTemplate/Routes'

/**
 * @param {AppRouter} router
 * @returns {Array}
 */
export const routes = (router) => [
  ...test(router),
  ...testWithHooks(router),
  ...testWithTemplate(router)
]
