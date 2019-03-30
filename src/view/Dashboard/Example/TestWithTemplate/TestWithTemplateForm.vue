<template>
  <app-form
    v-model="record"
    @submit="actionSubmit"
  >
    <template v-slot:body="schema">
      <app-field
        as="input"
        name="id"
        v-model="record.id"
        :label="$t('example.textWithTemplateForm.fields.id')"
        width="100"
        :readonly="true"
      />
      <app-field
        as="input"
        v-model="record.name"
        name="name"
        :label="$t('example.textWithTemplateForm.fields.name')"
        width="50"
      />
      <app-field
        as="number"
        v-model="record.age"
        name="age"
        :label="$t('example.textWithTemplateForm.fields.age')"
        width="50"
      />
      <app-field
        as="checkbox"
        v-model="record.active"
        name="active"
        :label="$t('example.textWithTemplateForm.fields.active')"
        width="45"
        :hidden="activeHidden"
        @input="configureChangeActive"
      />
      <app-field
        as="radio"
        v-model="record.gender"
        name="gender"
        :label="$t('example.textWithTemplateForm.fields.gender')"
        width="55"
        @input="configureChangeGender"
      />
      <app-field
        as="text"
        v-model="record.description"
        name="description"
        :label="descriptionLabel"
        :hidden="descriptionHidden"
        @input="configureChangeDescription"
      />
    </template>
    <template v-slot:buttons>
      <app-button
        icon="reply"
        label="Back"
        @click="actionBack"
      />
      <app-button
        icon="cancel"
        label="Cancel"
        position="right"
        @click="actionCancel"
      />
      <app-button
        primary
        submit
        icon="save"
        label="Save"
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
    number: {},
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
  data: () => ({
    record: {},
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
      window.alert(JSON.stringify(this.record))
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
     * @param {string} description
     */
    configureChangeDescription (description) {
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
