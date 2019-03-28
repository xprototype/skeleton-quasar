import FormComponents from './Form/FormComponents'
import FormError from './Form/FormError'
import FormFetch from './Form/FormFetch'
import FormField from './Form/FormField'
import FormRecord from './Form/FormRecord'
import FormValidation from './Form/FormValidation'

/**
 * @typedef {Form}
 */
export default {
  /**
   */
  mixins: [
    FormComponents, FormError, FormFetch, FormField, FormRecord, FormValidation
  ],
  /**
   */
  data: () => ({
    components: {},
    record: {},
    payload: {},
    groups: {},
    errors: {}
  }),
  /**
   */
  methods: {
    /**
     */
    setup () {
      this.record = {}
      this.components = {}

      this.renderComponents()
      this.renderErrors()
      this.renderRecord()
      this.renderButtons()
    }
  }
}
