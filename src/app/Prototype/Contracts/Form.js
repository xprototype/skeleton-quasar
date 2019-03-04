import FormComponents from './Form/FormComponents'
import FormError from './Form/FormError'
import FormFetch from './Form/FormFetch'
import FormField from './Form/FormField'
import FormRecord from './Form/FormRecord'
import FormValidation from './Form/FormValidation'

/**
 */
export default {
  /**
   */
  mixins: [
    FormComponents, FormError, FormFetch, FormField, FormRecord, FormValidation
  ],
  /**
   */
  props: {
    sections: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  inject: [
    'sections'
  ],
  /**
   */
  data: () => ({
    components: {},
    record: {},
    payload: {},
    segments: {},
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
  },
  /**
   */
  created () {
    if (!this.attrs[this.primaryKey]) {
      return
    }
    this.fetchRecord(this.attrs[this.primaryKey])
  }
}
