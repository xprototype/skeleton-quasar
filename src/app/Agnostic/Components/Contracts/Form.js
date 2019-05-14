import FormComponents from 'src/app/Agnostic/Components/Contracts/Form/FormComponents'
import FormError from 'src/app/Agnostic/Components/Contracts/Form/FormError'
import FormFetch from 'src/app/Agnostic/Components/Contracts/Form/FormFetch'
import FormField from 'src/app/Agnostic/Components/Contracts/Form/FormField'
import FormRecord from 'src/app/Agnostic/Components/Contracts/Form/FormRecord'
import FormValidation from 'src/app/Agnostic/Components/Contracts/Form/FormValidation'

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
    initialize () {
      this.record = {}
      this.components = {}

      this.renderComponents()
      this.renderErrors()
      this.renderRecord()
      this.renderButtons()
    }
  }
}
