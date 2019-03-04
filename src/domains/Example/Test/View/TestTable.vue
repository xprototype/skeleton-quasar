<template>
  <prototype-table v-bind="{scope: 'index'}" />
</template>

<script type="text/javascript">
import PrototypeTable from 'src/app/Prototype/Components/PrototypeTable'
import Test from '../Prototype/Test'

export default {
  name: 'TestTable',
  provide: Test.build().provide(),
  components: { PrototypeTable }
}
</script>
