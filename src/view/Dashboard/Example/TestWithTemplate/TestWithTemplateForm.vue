<template>
  <app-form
    ref="form"
    v-model="storage"
    :status="status"
    @form:status="eventStatus"
    @form:submit="actionSubmit"
    @form:reset="actionReset"
  >
    <template v-slot:body="schema">
      <app-field
        as="input"
        name="id"
        v-model="storage.id"
        :errors="errors.id"
        :label="$t('example.textWithTemplateForm.fields.id')"
        width="100"
        :hidden="false"
        :readonly="true"
      />
      <app-field
        as="input"
        v-model="storage.name"
        :errors="errors.name"
        name="name"
        :label="$t('example.textWithTemplateForm.fields.name')"
        width="50"
      />
      <app-field
        as="number"
        v-model="storage.age"
        :errors="errors.age"
        name="age"
        :label="$t('example.textWithTemplateForm.fields.age')"
        width="50"
      />
      <app-field
        as="checkbox"
        v-model="storage.active"
        :errors="errors.active"
        name="active"
        :label="$t('example.textWithTemplateForm.fields.active')"
        width="45"
        :hidden="activeHidden"
        @input="configureChangeActive"
      />
      <app-field
        as="radio"
        v-model="storage.gender"
        :errors="errors.gender"
        name="gender"
        :label="$t('example.textWithTemplateForm.fields.gender')"
        width="55"
        @input="configureChangeGender"
      />
      <app-field
        as="text"
        v-model="storage.description"
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
        primary
        submit
        icon="save"
        :label="$t('prototype.actions.save.label')"
        position="right"
      />
      <app-button
        icon="cancel"
        :label="$t('prototype.actions.cancel.label')"
        position="right"
        @click="actionCancel"
      />
      <app-button
        reset
        icon="360"
        :label="$t('prototype.actions.reset.label')"
        color="red"
        text-color="white"
        position="right"
      />
    </template>
    <template v-slot:debuggers="schema">
      <app-debugger
        label="Record"
        v-bind="{ inspect: storage }"
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
import Form from 'src/app/Prototype/View/Form'
import FormFetch from 'src/app/Prototype/Contracts/Form/FormFetch'

import { gender } from 'src/domains/Common/options'

/**
 * @typedef {TestWithTemplateForm}
 */
export default {
  /**
   */
  extends: Form,
  /**
   */
  mixins: [
    FormFetch
  ],
  /**
   */
  name: 'TestWithTemplateForm',
  /**
   */
  recordName: 'storage',
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
  data: () => ({
    storage: {},
    errors: {},
    status: {
      description: []
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
     * @return {Promise}
     */
    attempt ($event) {
      return this.$service
        .create(this[this.$options.recordName])
        .then(this.success)
        .catch(this.fail)
    },
    /**
     * @param response
     */
    success (response) {
      if (this.debuggers) {
        window.alert(JSON.stringify(response))
      }
      this.$message.success(this.$lang(`prototype.operations.create.success`))
    },
    /**
     */
    fail () {
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
    this.hook('fetch:record', function () {
      window.setTimeout(() => { this.status.description = ['Houston, we have a problem'] }, 500)
    })

    this.descriptionLabel = this.$t('example.textWithTemplateForm.fields.description')
  },
  /**
   */
  mounted () {
    this.fetchRecord(1)
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
</style>
