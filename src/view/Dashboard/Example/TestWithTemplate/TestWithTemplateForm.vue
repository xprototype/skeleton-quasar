<template>
  <app-form
    ref="form"
    v-model="record"
    :status="status"
    @form:status="eventStatus"
    @form:submit="actionSubmit"
  >
    <template v-slot:body="schema">
      <app-field
        as="input"
        name="id"
        v-model="record.id"
        :errors="errors.id"
        :label="$t('example.textWithTemplateForm.fields.id')"
        width="100"
        :readonly="true"
      />
      <app-field
        as="input"
        v-model="record.name"
        :errors="errors.name"
        name="name"
        :label="$t('example.textWithTemplateForm.fields.name')"
        width="50"
      />
      <app-field
        as="number"
        v-model="record.age"
        :errors="errors.age"
        name="age"
        :label="$t('example.textWithTemplateForm.fields.age')"
        width="50"
      />
      <app-field
        as="checkbox"
        v-model="record.active"
        :errors="errors.active"
        name="active"
        :label="$t('example.textWithTemplateForm.fields.active')"
        width="45"
        :hidden="activeHidden"
        @input="configureChangeActive"
      />
      <app-field
        as="radio"
        v-model="record.gender"
        :errors="errors.gender"
        name="gender"
        :label="$t('example.textWithTemplateForm.fields.gender')"
        width="55"
        @input="configureChangeGender"
      />
      <app-field
        as="text"
        v-model="record.description"
        :errors="status.description"
        name="description"
        :label="descriptionLabel"
        :hidden="descriptionHidden"
        @input="configureChangeDescription"
      />
    </template>
    <template v-slot:buttons>
      <app-button
        icon="reply"
        :label="$t('prototype.actions.back.label')"
        @click="actionBack"
      />
      <app-button
        icon="cancel"
        :label="$t('prototype.actions.cancel.label')"
        position="right"
        @click="actionCancel"
      />
      <app-button
        primary
        submit
        icon="save"
        :label="$t('prototype.actions.save.label')"
        position="right"
      />
    </template>
    <template v-slot:debuggers="schema">
      <app-debugger
        label="Record"
        v-bind="{ inspect: record }"
      />
      <app-debugger
        label="Schema"
        v-bind="{ inspect: schema }"
      />
      <app-debugger
        label="Errors"
        v-bind="{ inspect: errors }"
      />
    </template>
  </app-form>
</template>

<script type="text/javascript">
import { gender } from 'src/domains/Common/options'

/**
 * @typedef {TestWithTemplateForm}
 */
export default {
  /**
   */
  name: 'TestWithTemplateForm',
  /**
   */
  schema: {
    id: {},
    name: {
      default: 'William'
    },
    age: {
      validate: {
        required: true
      }
    },
    active: {
      default: false
    },
    gender: {
      attrs: {
        options: gender
      }
    },
    description: {}
  },
  /**
   */
  computed: {
    /**
     */
    debuggers () {
      return this.$store.getters['app/getDebuggers']
    }
  },
  /**
   */
  data: () => ({
    record: {},
    errors: {},
    status: {
      description: ['Tá com pau mano!']
    },
    activeHidden: false,
    descriptionLabel: '',
    descriptionHidden: false
  }),
  /**
   */
  methods: {
    /**
     * @param {Object} $event
     */
    actionSubmit ($event) {
      if (this.$refs.form.$hasError(this.forceError)) {
        this.$message.error(this.$t('prototype.actions.save.validation'))
        return
      }
      if (this.debuggers) {
        window.alert(JSON.stringify(this.record))
      }
      this.$message.success(this.$lang(`prototype.operations.create.success`))
    },
    /**
     */
    actionBack () {
      this.$browse(-1)
    },
    /**
     */
    actionCancel () {
      this.$browse('/dashboard/test-with-template/table')
    },
    /**
     * @param {Object} errors
     */
    eventStatus (errors) {
      this.errors = errors
    },
    /**
     * @param {string} description
     */
    configureChangeDescription (description) {
      this.status.description = undefined

      if (!this.originalLabel) {
        this.originalLabel = this.descriptionLabel
      }
      let descriptionLabel = description
      if (!descriptionLabel) {
        descriptionLabel = this.originalLabel
        this.originalLabel = undefined
      }
      this.descriptionLabel = descriptionLabel
    },
    /**
     * @param {boolean} active
     */
    configureChangeActive (active) {
      this.descriptionHidden = active
    },
    /**
     * @param {string} gender
     */
    configureChangeGender (gender) {
      this.activeHidden = gender === 'male'
    }
  },
  /**
   */
  created () {
    this.descriptionLabel = this.$t('example.textWithTemplateForm.fields.description')
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
</style>
