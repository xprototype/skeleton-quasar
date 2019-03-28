<template>
  <prototype-form v-bind="bind" />
</template>

<script type="text/javascript">
import PrototypeView from 'src/app/Prototype/View/Prototype'
import TestWithHooks from 'src/domains/Example/Test/Prototype/TestWithHooks'

/**
 * @typedef {TestWithHooksForm}
 */
export default {
  /**
   */
  extends: PrototypeView,
  /**
   */
  name: 'TestWithHooksForm',
  /**
   */
  prototype: TestWithHooks
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  scoped
>
</style>
