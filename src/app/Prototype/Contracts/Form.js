import * as Validators from 'vuelidate/lib/validators'
import { clone } from 'src/app/Util'
import FormField from './Form/FormField'

/**
 */
export default {
  mixins: [
    FormField
  ],
  props: {
    sections: {
      type: Object,
      default: () => ({})
    }
  },
  inject: [
    'sections'
  ],
  /**
   */
  validations () {
    const reduceValidation = (accumulator, key) => {
      if (!Object.keys(this.components[key].$validations).length) {
        return accumulator
      }
      const $validations = this.components[key].$validations
      Object.keys($validations).forEach(validator => {
        if (!$validations[validator]) {
          return
        }
        if (typeof $validations[validator] === 'function') {
          return
        }
        if (Validators[validator]) {
          let action = Validators[validator]
          if (Array.isArray($validations[validator])) {
            action = action.apply(null, $validations[validator])
          }
          $validations[validator] = action
          return
        }
        throw Error(`Invalid validator ${validator}`)
      })
      accumulator[key] = $validations
      return accumulator
    }
    const record = Object.keys(this.components).reduce(reduceValidation, {})
    return { record }
  },
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
  computed: {
    header () {
      const scope = this.$lang([
        `domains.${this.domain}.scope.${this.scope}`,
        `prototype.scope.${this.scope}`
      ])
      if (this.form.title) {
        return `${this.form.title} ( ${scope} )`
      }
      return `${this.$lang(`domains.${this.domain}.form.title`)} ( ${scope} )`
    },
    /**
     * @returns {boolean}
     */
    hasErrors () {
      return Object.keys(this.errors).filter((key) => this.errors[key]).length > 0
    },
    /**
     * @returns {*}
     */
    componentsBare () {
      const reduce = (accumulator, key) => {
        const field = this.components[key]
        if (!field.section) {
          accumulator[key] = field
        }
        return accumulator
      }
      return Object.keys(this.components).reduce(reduce, {})
    },
    hasSegments () {
      return Object.keys(this.segments).length > 0
    }
  },
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
    },
    /**
     */
    getComponents (value) {
      const reduce = (accumulator, key) => {
        const field = this.components[key]
        if (field.section === value) {
          accumulator[key] = field
        }
        return accumulator
      }
      return Object.keys(this.components).reduce(reduce, {})
    },
    /**
     */
    configure () {
      let field
      Object.keys(this.components).forEach(key => {
        if (this.components[key].$configure && typeof this.components[key].$configure === 'function') {
          field = this.components[key].$configure.call(this, this.components[key], this.scope)
          if (!field || field['$key'] !== this.components[key]['$key']) {
            throw Error('The configure return must be the field')
          }
          this.components[key] = field
        }
      })
    },
    /**
     * @param {Object} field
     * @returns {String|*}
     */
    parseFieldLabel (field) {
      if (field.$layout.formLabel) {
        return field.$layout.formLabel
      }
      return this.$lang([
        `domains.${this.domain}.fields.${field.$key}.__label`,
        `domains.${this.domain}.fields.${field.$key}`,
        `prototype.fields.${field.$key}`
      ])
    },
    /**
     * @param {Object} field
     * @returns {Array|*}
     */
    parseFieldOptions (field) {
      if (!field.attrs.options) {
        return []
      }
      if (!Array.isArray(field.attrs.options)) {
        return field.attrs.options
      }
      const map = (option) => {
        if (typeof option === 'object' && option.label) {
          option.label = this.$lang(
            [option.label, `domains.${this.domain}.fields.${field.$key}.${option.label}`.replace(/\//g, '.')],
            option.label
          )
        }
        return option
      }
      return field.attrs.options.map(map)
    },
    /**
     * @param field
     * @returns {*}
     */
    parseFieldActions (field) {
      if (!Array.isArray(field.attrs.actions)) {
        return field.attrs.actions
      }
      const map = (action) => {
        if (action.handler && typeof action.handler === 'function') {
          action.original = action.handler
          action.handler = ($event, parameters) => this.fieldApplyAction(
            $event,
            field,
            action,
            true,
            clone(parameters)
          )
        }
        return action
      }
      return field.attrs.actions.map(map)
    },
    /**
     * @param {Object} field
     */
    parseFieldAfter (field) {
      if (!Array.isArray(field.attrs.after)) {
        return
      }
      const map = (action) => {
        if (action.handler && typeof action.handler === 'function') {
          action.original = action.handler
          action.handler = ($event) => this.fieldApplyAction($event, field, action)
        }
        return action
      }
      return field.attrs.after.map(map)
    },
    /**
     */
    renderComponents () {
      this.segments = this.sections()
      const fields = clone(this.fields())
      this.components = Object.values(fields).sort(this.sortComponents).reduce(this.reduceComponents, {})
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @returns {number}
     */
    sortComponents (a, b) {
      if (a.$layout.formOrder < b.$layout.formOrder) {
        return -1
      }
      if (a.$layout.formOrder > b.$layout.formOrder) {
        return 1
      }
      return 0
    },
    /**
     * @param {Array} components
     * @param {Object} field
     * @returns {*}
     */
    reduceComponents (components, field) {
      const hasScopes = field.scopes && Array.isArray(field.scopes)
      if (this.scope && hasScopes && !field.scopes.includes(this.scope)) {
        return components
      }
      field.listeners = {}
      Object.keys(field.on).forEach((event) => {
        field.listeners[event] = ($event) => this.fieldApplyListener(field.$key, event, $event)
      })
      const reduce = (required, validator) => {
        if (typeof field.$validations[validator] === 'function') {
          field.$validations[validator] = field.$validations[validator].bind(this)
        }
        if (required) {
          return true
        }
        return validator === 'required'
      }
      field.$required = Object.keys(field.$validations).reduce(reduce, false)

      field.label = this.parseFieldLabel(field)
      if (field.attrs.options) {
        field.attrs.options = this.parseFieldOptions(field)
      }
      if (field.attrs.actions) {
        field.attrs.actions = this.parseFieldActions(field)
      }
      if (field.attrs.after) {
        field.attrs.after = this.parseFieldAfter(field)
      }

      components[field.$key] = field

      return components
    },
    /**
     */
    renderErrors () {
      const reduceErrors = (errors, field) => {
        errors[field.$key] = ''
        return errors
      }
      this.errors = Object.values(this.components).reduce(reduceErrors, {})
    },
    /**
     */
    renderRecord () {
      const reduceRecord = (record, field) => {
        record[field.$key] = field.attrs.value
        return record
      }
      this.record = Object.values(this.components).reduce(reduceRecord, {})

      Object.values(this.components).forEach((field) => {
        this.$watch(`record.${field.$key}`, function () {
          if (this.fetching) {
            return
          }
          if (field.$required) {
            this.$v.record[field.$key].$touch()
          }
        })
      })
    },
    /**
     * @param {Number|String} id
     * @returns {Promise}
     */
    fetchRecord (id) {
      this.$q.loading.show({ delay: 100 })
      return this.service
        .read(id)
        .then(this.successFetchRecord)
        .catch(this.errorFetchRecord)
        .finally(() => this.$q.loading.hide())
    },
    /**
     * @returns {*}
     */
    getRecord () {
      const reduce = (accumulator, key) => {
        accumulator = this.$util.apply(accumulator, key, this.record[key])
        return accumulator
      }
      return Object.keys(this.record).reduce(reduce, clone(this.payload))
    },
    /**
     * @param {Object} record
     */
    successFetchRecord (record) {
      this.fetching = true
      this.payload = clone(record)
      Object.keys(this.record).forEach((key) => {
        this.record[key] = this.$util.prop(record, key)
      })
      this.fetching = false

      if (!this.triggerHook) {
        return
      }
      this.triggerHook('fetch:record')
    },
    /**
     */
    errorFetchRecord (/* error */) {
      // this.$error.report(error)
    },
    /**
     * @param {string} $key
     * @param {string} listener
     * @param {*} $event
     */
    fieldApplyListener ($key, listener, $event) {
      if (!Array.isArray(this.components[$key].on[listener])) {
        throw Error(`The event '${listener}' is not an array`)
      }
      this.components[$key].on[listener].forEach((callable) => {
        callable.call(this, { $event, field: this.components[$key] })
      })
    },
    /**
     * @param {Object} $event
     * @param {Object} field
     * @param {Object} action
     * @param {Boolean} stop
     * @param {Object} parameters
     */
    fieldApplyAction ($event, field, action, stop = false, parameters = {}) {
      if (stop && $event && $event.stopPropagation) {
        $event.preventDefault()
        $event.stopPropagation()
      }
      if (typeof action !== 'object') {
        return
      }
      if (typeof action.original !== 'function') {
        return
      }
      action.original.call(this, { $event, field, ...parameters })
    },
    /**
     * @param {string} key
     */
    hasError (key) {
      if (this.errors[key]) {
        return true
      }
      if (this.$v.record[key] === undefined) {
        return false
      }
      return this.$v.record[key].$error
    },
    /**
     * @param {Object} field
     * @returns {string}
     */
    htmlLabel (field) {
      // Se o field não possuir label, ele não exibe (*)
      if (!field.label) {
        return ''
      }
      return `${field.label} ${field.$required ? '*' : ''}`
    },
    /**
     * @param {Object} field
     * @returns {Array}
     */
    classNames (field) {
      const classNames = [`field width-${field.$layout.formWidth} height-${field.$layout.formHeight}`]
      if (this.hasError(field.$key)) {
        classNames.push('error')
      }
      return classNames
    },
    /**
     * @param {Object} field
     * @returns {string}
     */
    htmlErrorMessage (field) {
      const errorMessages = []

      const validations = this.$v.record[field.$key]
      if (validations) {
        Object.keys(validations.$params).forEach((validation) => {
          if (!validations[validation]) {
            let translation = `domains.${this.domain}.validations.${validation}`.replace(/\//g, '.')
            if (!this.$te(translation)) {
              translation = `validation.${validation}`
            }
            errorMessages.push(this.$t(translation, validations.$params[validation]))
          }
        })
      }

      if (this.errors[field.$key]) {
        errorMessages.push(this.errors[field.$key])
      }

      return errorMessages.join(' / ')
    },
    /**
     * @returns {number}
     */
    tabIndex () {
      if (!this.counter) {
        this.counter = 0
      }
      this.counter++
      return this.counter
    },
    /**
     * @param {Object} field
     */
    ref (field) {
      return `form:component-${field.$layout.formOrder}`
    },
    /**
     * @param {Object} field
     */
    next (field) {
      const order = field.$layout.formOrder + 1
      const components = Object.keys(this.components).length
      for (let index = order; index < components; index++) {
        const ref = this.$util.ref(`form:component-${index}`)
        if (!ref) {
          continue
        }
        let key = ref.$attrs.component
        if (this.components[key] && this.components[key].$layout && this.components[key].$layout.formHidden) {
          continue
        }
        if (ref.focus && typeof ref.focus === 'function') {
          window.setTimeout(ref.focus, 300)
          return
        }
        if (ref.show && typeof ref.show === 'function') {
          window.setTimeout(ref.show, 300)
          return
        }
      }
      if (!this.form) {
        return
      }
      // set focus in standard screen action
      const action = this.$util.ref(`form:button-${this.form.action}`)
      if (action) {
        window.setTimeout(() => action.$el.focus(), 500)
      }
    },
    /**
     * @param {string} name
     */
    componentFocus (name) {
      if (!this.components[name]) {
        return
      }
      const index = this.components[name].$layout.formOrder
      const ref = this.$util.ref(`form:component-${index}`)
      if (!ref) {
        return
      }
      const focusable = ['focus', 'show']
      let done = false
      focusable.forEach((key) => {
        if (done) {
          return
        }
        if (ref[key] && typeof ref[key] === 'function') {
          done = true
          window.setTimeout(ref[key], 300)
        }
      })
    }
  },
  /**
   */
  watch: {
    /**
     * @param {Boolean} status
     * @param {Boolean} previous
     */
    '$v.$invalid' (status, previous) {
      if (!this.buttons) {
        return
      }
      Object.keys(this.buttons).forEach(key => {
        if (!this.buttons[key].validate) {
          return
        }
        if (typeof this.buttons[key].validate !== 'function') {
          return
        }
        this.buttons[key].validate.call(this, this.buttons[key], !status)
      })
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
