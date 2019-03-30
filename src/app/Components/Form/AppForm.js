import AppFormComponent from './AppFormComponent'
import AppFormRender from './AppFormRender'
import AppFormValidation from './AppFormValidation'

/**
 * @type {AppForm}
 */
export default {
  /**
   */
  name: 'AppForm',
  /**
   */
  mixins: [
    AppFormComponent, AppFormRender, AppFormValidation
  ]
}
