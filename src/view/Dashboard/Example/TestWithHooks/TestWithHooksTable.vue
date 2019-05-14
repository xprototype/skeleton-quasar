<template>
  <prototype-table v-bind="bind" />
</template>

<script type="text/javascript">
import PrototypeView from 'src/app/Agnostic/View/Prototype'
import TestWithHooks from 'src/domains/Example/TestWithHooks/Schema/TestWithHooks'

/**
 * @typedef {TestWithHooksTable}
 */
export default {
  /**
   */
  extends: PrototypeView,
  /**
   */
  name: 'TestWithHooksTable',
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
