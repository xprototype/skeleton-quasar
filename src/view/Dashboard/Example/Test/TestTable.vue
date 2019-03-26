<template>
  <prototype-table v-bind="{scope: 'index'}" />
</template>

<script type="text/javascript">
import Test from 'src/domains/Example/Test/Prototype/Test'

export default {
  name: 'TestTable',
  provide: Test.build().provide()
}
</script>
