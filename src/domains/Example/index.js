import test from 'src/domains/Example/Test/Route'
import testWithHooks from 'src/domains/Example/TestWithHooks/Route'
import testWithTemplate from 'src/domains/Example/TestWithTemplate/Route'

/**
 * @param {AppRouter} router
 * @returns {Array}
 */
export const routes = (router) => [
  ...test(router),
  ...testWithHooks(router),
  ...testWithTemplate(router)
]
