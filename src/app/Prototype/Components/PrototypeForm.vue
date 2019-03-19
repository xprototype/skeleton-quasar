<template>
  <q-page
    class="PrototypeForm"
    padding
  >
    <div class="app-form-wrapper">
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
              v-model="record"
              :fields="getComponents(key)"
              :validations="$v"
              :errors="errors"
            />
          </div>
        </div>
      </template>
      <div
        v-else
        class="app-form-body"
      >
        <prototype-form-components
          v-bind="{ fields: getComponents(), errors }"
          v-model="record"
        />
      </div>

      <prototype-buttons
        position="form-footer"
        :scope="scope"
        :buttons="buttons"
        :context="{ record }"
      />
    </div>
  </q-page>
</template>

<script type="text/javascript">
import Proto from '../Contracts/Proto'
import Form from '../Contracts/Form'
import PrototypeButtons from 'src/app/Prototype/Components/PrototypeButtons'
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
  @import '~src/css/quasar.variables.styl'

  .PrototypeForm

    .app-form-wrapper
      height calc(100vh - 95px)
      overflow auto
      background #ffffff
      border-radius 4px
      box-shadow 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)

      .app-form-section
        border 1px solid #ddd
        border-radius 3px
        margin 0 5px 10px 5px

        .app-form-section-title
          padding 5px 10px
          color #a8a8a8
          border-bottom 1px solid #ddd

          span
            font-size 12px
            margin 0 6px

        .form.form-grid
          padding 5px 5px 0 5px

      .app-form-body
        padding 10px
        height calc(100vh - 155px)
        border-bottom 1px solid #ddd
        overflow auto

      >>> .app-form-buttons
        padding 10px
</style>
