<template>
  <q-page padding>
    <div class="app-form-wrapper">
      <div class="app-form-body">
        <prototype-form-components
          v-bind="{ fields: getComponents(), errors }"
          v-model="record"
        />
      </div>

      <template v-if="hasSegments">
        <div
          v-for="(segment, key) in segments"
          :key="key"
          class="app-form-body with-section"
        >
          <div
            class="app-form-section"
            :key="`${key}-section`"
          >
            <div class="app-form-section-title">
              <q-icon name="notes" />
              <span>{{ segment }}</span>
            </div>
            <prototype-form-components
              v-bind="{ fields: getComponents(key), errors }"
              v-model="record"
            />
          </div>
        </div>
      </template>
    </div>

    <prototype-buttons v-bind="{ buttons }" />
  </q-page>
</template>

<script type="text/javascript">
import Proto from '../Contracts/Proto'
import Form from '../Contracts/Form'
import PrototypeButtons from 'src/app/Prototype/Components/Common/PrototypeButtons'
import PrototypeFormComponents from 'src/app/Prototype/Components/Form/PrototypeComponents'

/**
 * @typedef PrototypeForm
 */
export default {
  name: 'PrototypeForm',
  mixins: [
    Proto, Form
  ],
  components: {
    PrototypeFormComponents,
    PrototypeButtons
  }
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
  .PrototypeForm

    .app-form-wrapper
      margin -10px -15px -10px -15px
      height: calc(100vh - 228px)
      overflow: auto
      background: #ffffff

      .app-form-section
        border: 1px solid #ddd
        border-radius: 3px
        margin: 0 5px 10px 5px

        .app-form-section-title
          padding: 5px 10px
          color: #a8a8a8
          border-bottom: 1px solid #ddd

          span
            font-size: 12px
            margin: 0 6px

        .form.form-grid
          padding: 5px 5px 0 5px

      .app-form-body
        padding: 10px 20px

    .field label
      color: #3c3c3c
      margin 0 0 5px 0
      display block

    .error
      label
        color: #cc3c3b

      >>> .q-input, >>> .q-datetime-input
        border-color: #f79483

      >>> .q-if-focused
        box-shadow: 0 0 3px 1px rgba(247, 148, 131, 0.4)

      >>> .q-if:before, >>> .q-if:after
        border-color: #f79483

    >>> .q-input, >>> .q-datetime-input
      border-width: 1px
      border-style: solid
      border-color: #ddd
      border-radius: 3px
      padding: 7px 10px

    .field-error
      min-height: 20px
      padding: 4px 0 0 0
      color: #c73b3a
</style>
