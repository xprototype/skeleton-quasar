<template>
  <div class="q-btn-section">
    <template v-for="button in buttons">

      <template v-if="button.dropdown">
        <q-btn-dropdown
          class="btn-report"
          v-on="button.listeners"
          :key="button.$key"
          split
          :ref="`form:button-${button.$key}`"
          v-bind="button.attrs"
        />
      </template>

      <template v-else>
        <q-btn
          :ref="`form:button-${button.$key}`"
          :key="button.$key"
          v-if="!button.hidden"
          v-bind="button.attrs"
          v-on="button.listeners"
        />
      </template>

    </template>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'PrototypeButtons',
  props: {
    buttons: {
      type: [Array, Object],
      default: () => ([])
    }
  }
}
</script>

<style scoped>

</style>
