<template>
  <q-page padding>
    <q-table
      class="PrototypeTable"
      :data="data"
      :columns="columns"
      :visible-columns="visibleColumns"
      :pagination.sync="pagination"
      :loading="loading"
      v-bind="bind"
      @request="fetchRecords"
    >
      <template v-slot:top="props">
        <q-select
          v-model="visibleColumns"
          :display-value="$q.lang.table.columns"
          multiple
          borderless
          dense
          options-dense
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
        />

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />

        <q-space />

        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          :placeholder="$t('prototype.table.search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </q-page>
</template>

<script type="text/javascript">
import Proto from '../Contracts/Proto'
import Table from '../Contracts/Table'

/**
 * @typedef {PrototypeTable}
 */
export default {
  name: 'PrototypeTable',
  /**
   */
  mixins: [
    Proto, Table
  ]
}
</script>

<style lang="stylus">
  .PrototypeTable

    &.q-table__container.q-table--horizontal-separator
      .q-table__middle.scroll
        max-height calc(100vh - 200px)

      &.fullscreen
        .q-table__middle.scroll
          max-height calc(100vh - 105px)

    .q-table thead > tr:nth-child(1) > th
      position sticky
      cursor default
      zoom 1
      top 0
      z-index 1000
      color #828282
      height 48px
      background linear-gradient(180deg, #fff 47px, #ddd 1px)
</style>
