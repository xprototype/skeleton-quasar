import { props, route } from 'src/app/Router'
import { testWithTemplateForm, testWithTemplateTable } from './components'
import TestWithTemplateService from '../Service/TestWithTemplateService'

/**
 * @param {AppRouter} router
 * @returns {Array}
 */
export default (router) => {
  const options = (route) => ({
    service: TestWithTemplateService.instance(),
    fallback: '/dashboard/test-with-template/table'
  })

  return [
    props('/dashboard/test-with-template/form', testWithTemplateForm, options),
    route('/dashboard/test-with-template/table', testWithTemplateTable)
  ]
}
