<template>
  <q-page padding>
    <q-table
      class="PrototypeTable"
      :data="data"
      :columns="columns"
      :visible-columns="visibleColumns"
      :pagination.sync="pagination"
      :selected.sync="selected"
      :loading="loading"
      v-bind="bind"
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

        <prototype-buttons v-bind="{ buttons, override: { flat: true, dense: true, round: true, label: '' } }" />

        <q-space />

        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          :placeholder="$t('prototype.table.search')"
          @input="search()"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td style="position: relative">
          {{ props.row[primaryKey] }}

          <prototype-buttons v-bind="{ buttons, override: { dense: true, round: true, label: '' } }" />
        </q-td>
      </template>

      <template v-slot:pagination="props">
        <span class="q-table__bottom-item">
          {{ props.pagination.rowsPerPage * (props.pagination.page - 1) + 1 }}
          -
          <template v-if="props.isLastPage">
            {{ props.pagination.rowsNumber }}
          </template>
          <template v-else>
            {{ props.pagination.rowsPerPage * (props.pagination.page) }}
          </template>
          / {{ props.pagination.rowsNumber }}
        </span>
        <q-btn
          round
          dense
          flat
          text-color="grey-8"
          icon="chevron_left"
          :disable="props.isFirstPage"
          @click="previousPage"
        />
        <span class="text-center">
          {{ props.pagination.page }} / {{ props.pagination.pagesNumber }}
        </span>
        <q-btn
          round
          dense
          flat
          text-color="grey-8"
          icon="chevron_right"
          :disable="props.isLastPage"
          @click="nextPage"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script type="text/javascript">
import Proto from '../Contracts/Proto'
import Table from '../Contracts/Table'
import PrototypeButtons from 'src/app/Prototype/Components/Common/PrototypeButtons'

/**
 * @typedef {PrototypeTable}
 */
export default {
  name: 'PrototypeTable',
  components: { PrototypeButtons },
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
        height calc(100vh - 200px)

      &.fullscreen
        .q-table__middle.scroll
          height calc(100vh - 105px)

    .q-table thead > tr:nth-child(1) > th
      position sticky
      cursor default
      zoom 1
      top 0
      z-index 1000
      color #828282
      height 54px
      overflow hidden
      background linear-gradient(180deg, #fff 53px, #ddd 1px)

    .q-table
      .q-btn-section
        opacity 0
        transition-property opacity
        transition-duration 0.6s
        width 0
        position absolute
        top 0
        left 0
        height 54px
        overflow hidden

      tr:hover
        .q-btn-section
          opacity 1
          width 280px
          padding 10px
</style>
