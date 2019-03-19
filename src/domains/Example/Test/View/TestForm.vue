<template>
  <prototype-form v-bind="{ scope: $route.meta.scope }" />
</template>

<script type="text/javascript">
import Test from '../Prototype/Test'

export default {
  name: 'TestForm',
  provide: Test.build().provide()
}
</script>

<style scoped>

</style>
