<template>
  <app-form v-model="record">
    <template v-slot:body="schema">
      <app-field
        as="input"
        name="id"
        label="Id"
        width="100"
        v-model="record.id"
      />
      <app-field
        as="input"
        name="name"
        label="Name"
        width="50"
        v-model="record.name"
      />
      <app-field
        as="number"
        name="age"
        label="Age"
        width="50"
        v-model="record.age"
      />
      <app-field
        as="checkbox"
        name="active"
        label="Active"
        width="45"
        v-model="record.active"
      />
      <app-field
        as="radio"
        name="gender"
        label="Gender"
        width="55"
        v-model="record.gender"
      />
      <app-field
        as="text"
        name="description"
        label="Description"
        v-model="record.description"
      />
    </template>
    <template v-slot:buttons>
      <pre>ok</pre>
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
    record: {}
  })
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
</style>
