<template>
  <div class="form form-grid">
    <div
      v-for="field in fields"
      :key="field.$key"
      v-show="!field.$layout.formHidden"
      :class="classNames(field)"
    >
      <label v-html="htmlLabel(field)" />
      <component
        :tabindex="tabIndex()"
        :ref="ref(field)"
        :is="field.is"
        v-model="record[field.$key]"
        v-bind="field.attrs"
        v-on="field.listeners"
      />
      <prototype-error
        v-if="field.$layout.formError"
        v-bind="{ errorShow: hasError(field.$key), errorMessage: htmlErrorMessage(field) }"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import PrototypeError from 'src/app/Prototype/Components/Form/PrototypeError'

export default {
  name: 'PrototypeFormComponents',
  /**
   */
  components: {
    PrototypeError
  },
  /**
   */
  props: {
    fields: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  data: () => ({
    record: {}
  }),
  /**
   */
  methods: {
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
     */
    ref (field) {
      return `form:component-${field.$layout.formOrder}`
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
    }
  },
  /**
   */
  watch: {
    record (record) {
      this.$emit('input', record)
    }
  },
  /**
   */
  created () {
    this.record = this.value
  }
}
</script>
