<template>
  <prototype-table v-bind="bind" />
</template>

<script type="text/javascript">
import PrototypeView from 'src/app/Prototype/View/Prototype'
import Test from 'src/domains/Example/Test/Prototype/Test'

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
