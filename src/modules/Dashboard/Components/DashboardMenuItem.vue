<template>
  <q-item
    @click.native="click"
    clickable
  >
    <q-item-section
      v-if="item.icon"
      avatar
    >
      <q-icon :name="item.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ item.label }}</q-item-label>
      <q-item-label
        v-if="item.sublabel"
        caption
      >
        {{ item.sublabel }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script type="text/javascript">
/**
 */
export default {
  /**
   */
  name: 'DashboardMenuItem',
  /**
   */
  props: {
    /**
     */
    item: {
      type: Object,
      required: true
    }
  },
  /**
   */
  methods: {
    /**
     */
    click () {
      this.$emit('click', this.item)
    }
  }
}
</script>

<style scoped>

</style>
