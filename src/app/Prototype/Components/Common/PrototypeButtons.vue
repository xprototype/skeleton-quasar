<template>
  <div class="q-btn-section">
    <template v-for="button in buttons">
      <template v-if="button.dropdown">
        <q-btn-dropdown
          v-on="button.listeners"
          :key="button.$key"
          split
          :ref="`form:button-${button.$key}`"
          v-bind="{ ...button.attrs, ...override }"
        />
      </template>
      <template v-else>
        <q-btn
          :ref="`form:button-${button.$key}`"
          :key="button.$key"
          v-if="!button.hidden"
          v-bind="{ ...button.attrs, ...override }"
          v-on="button.listeners"
        />
      </template>
    </template>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'PrototypeButtons',
  /**
   */
  props: {
    buttons: {
      type: [Array, Object],
      default: () => ([])
    },
    override: {
      type: Object,
      default: () => ({})
    },
    context: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .q-btn-section
    button
      margin-right 10px
</style>
