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

<style scoped>

</style>
