<template>
  <div class="PrototypeForm q-page-internal">
    <div class="q-page-internal-header">
      <label>{{ header }}</label>
    </div>

    <div class="app-form-wrapper">
      <div class="form form-grid app-form-body">
        <div
          v-for="field in componentsBare"
          :key="field.$key"
          v-show="!field.$layout.formHidden"
          :class="classNames(field)"
        >
          <label v-html="htmlLabel(field)" />
          <component
            :tabindex="tabIndex()"
            :is="field.is"
            :ref="ref(field)"
            :component="field.$key"
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
            <div class="form form-grid">
              <div
                v-for="field in getComponents(key)"
                :key="field.$key"
                v-show="!field.$layout.formHidden"
                :class="classNames(field)"
              >
                <label v-html="htmlLabel(field)" />
                <component
                  :tabindex="tabIndex()"
                  :is="field.is"
                  :ref="ref(field)"
                  :component="field.$key"
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
          </div>
        </div>
      </template>
    </div>

    <prototype-buttons v-bind="{ buttons }" />
  </div>
</template>

<script type="text/javascript">
import Proto from '../Contracts/Proto'
import Form from '../Contracts/Form'
import PrototypeButtons from 'src/app/Prototype/Components/Common/PrototypeButtons'
import PrototypeError from 'src/app/Prototype/Components/Form/PrototypeError'

/**
 * @typedef PrototypeForm
 */
export default {
  name: 'PrototypeForm',
  mixins: [
    Proto, Form
  ],
  components: {
    PrototypeError,
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
