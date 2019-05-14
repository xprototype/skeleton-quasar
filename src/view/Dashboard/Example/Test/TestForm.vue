<template>
  <prototype-form v-bind="bind" />
</template>

<script type="text/javascript">
import PrototypeView from 'src/app/Agnostic/View/Prototype'
import Test from 'src/domains/Example/Test/Schema/Test'

/**
 * @typedef {TestForm}
 */
export default {
  /**
   */
  extends: PrototypeView,
  /**
   */
  name: 'TestForm',
  /**
   */
  prototype: Test
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
</style>
