<template>
  <prototype-form v-bind="{ scope: $route.meta.scope }" />
</template>

<script type="text/javascript">
import Test from 'src/domains/Example/Test/Prototype/Test'

export default {
  name: 'TestForm',
  provide: Test.build().provide()
}
</script>

<style scoped>

</style>
