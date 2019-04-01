<template>
  <q-list padding>
    <q-item-label header>
      {{ header }}
    </q-item-label>
    <template v-for="(item, index) in menu">
      <q-expansion-item
        v-if="item.children"
        :key="`expansion-item-${index}`"
        :icon="item.icon"
        :label="item.label"
        :caption="item.sublabel"
      >
        <dashboard-menu-item
          v-for="(element, key) in item.children"
          :key="key"
          :item="element"
          @click="click"
        />
      </q-expansion-item>

      <dashboard-menu-item
        v-else
        :key="`menu-item-${index}`"
        :item="item"
        @click="click"
      />
    </template>
  </q-list>
</template>

<script type="text/javascript">
import DashboardMenuItem from 'src/modules/Dashboard/Components/DashboardMenuItem'

/**
 */
export default {
  /**
   */
  name: 'DashboardMenu',
  /**
   */
  components: { DashboardMenuItem },
  /**
   */
  props: {
    header: {
      type: String,
      default: ''
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Object} item
     */
    click (item) {
      this.$emit('click', item)
    }
  }
}
</script>

<style
  lang="stylus"
  scoped
>
  >>> .q-expansion-item__content
    .q-item.q-item-type
      padding 8px 16px 8px 24px
</style>
