<template>
  <prototype-table v-bind="bind" />
</template>

<script type="text/javascript">
import PrototypeView from 'src/app/Agnostic/View/Prototype'
import Test from 'src/domains/Example/Test/Schema/Test'

/**
 * @typedef {TestTable}
 */
export default {
  /**
   */
  extends: PrototypeView,
  /**
   */
  name: 'TestTable',
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
