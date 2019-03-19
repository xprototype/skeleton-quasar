<template>
  <prototype-table v-bind="{scope: 'index'}" />
</template>

<script type="text/javascript">
import Test from '../Prototype/Test'

export default {
  name: 'TestTable',
  provide: Test.build().provide()
}
</script>
