<template>
  <div class="field-error">
    <small
      v-show="errorShow"
      v-html="errorMessage"
    />
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'PrototypeError',
  /**
   */
  props: {
    errorShow: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    }
  }
}
</script>

<style
  lang="stylus"
  scoped
>
  @import '~src/css/quasar.variables.styl'

  .field-error
    min-height 20px
    padding 4px 0 0 0
    color $errorForeground
</style>
