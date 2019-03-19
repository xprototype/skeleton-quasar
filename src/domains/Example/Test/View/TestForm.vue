<template>
  <prototype-form v-bind="{scope: $route.meta.scope}" />
</template>

<script type="text/javascript">
import PrototypeForm from 'src/app/Prototype/Components/PrototypeForm'
import Test from '../Prototype/Test'

export default {
  name: 'TestForm',
  provide: Test.build().provide(),
  components: { PrototypeForm }
}
</script>

<style scoped>

</style>
