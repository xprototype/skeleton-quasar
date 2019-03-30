<template>
  <div class="canvas">
    <div
      class="PrototypeForm"
      @click="unSelect"
    >
      <div class="app-form-wrapper wrapper">
        <div class="app-form-body">
          <div class="form form-grid">
            <template v-for="component in components">
              <app-field
                :key="component.name"
                v-bind="component"
                :class="{ selected: component.name === selected.name }"
                @click.native="select(component, $event)"
              />
            </template>
          </div>
        </div>
        <div class="app-form-buttons">
          <app-button
            primary
            icon="save"
            label="Save"
          />
        </div>
      </div>
    </div>
    <div
      class="properties shadow-1"
      :class="{ open: selected.name }"
    >
      <q-tabs
        v-model="tab"
        no-caps
      >
        <q-tab
          name="properties"
          label="Properties"
        />
        <q-tab
          name="raw"
          label="Raw"
        />
      </q-tabs>
      <div
        v-show="tab === 'properties'"
        class="properties-tab"
      >
        <app-field
          as="input"
          name="name"
          label="Name"
          v-model="selected.name"
          readonly
        />
        <app-field
          as="input"
          name="label"
          label="Label"
          v-model="selected.label"
        />
        <app-field
          as="number"
          name="width"
          label="Width"
          v-model="selected.width"
        />
      </div>
      <div
        v-show="tab === 'raw'"
        class="properties-tab"
      >
        <pre>{{ selected }}</pre>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
/**
 */
export default {
  /**
   */
  name: 'StudioCanvas',
  /**
   */
  data: () => ({
    components: [
      {
        as: 'input',
        name: 'id',
        label: 'id',
        value: undefined,
        width: 100
      },
      {
        as: 'input',
        name: 'name',
        label: 'Name',
        value: undefined,
        width: 50
      },
      {
        as: 'input',
        name: 'age',
        label: 'Age',
        value: undefined,
        width: 50
      }
    ],
    tab: 'properties',
    selected: {}
  }),
  /**
   */
  methods: {
    /**
     * @param {Object} component
     * @param {Object} $event
     */
    select (component, $event) {
      $event.stopPropagation()
      if (this.selected.name === component.name) {
        this.selected = {}
        return
      }
      this.selected = component
    },
    /**
     */
    unSelect () {
      this.selected = {}
    }
  }
}
</script>

<style
  lang="stylus"
  scoped
>
  .canvas
    background white !important
    border-width 1px
    border-style solid
    border-color white
    border-radius 3px
    width 1000px
    margin 0 auto

    .PrototypeForm

      .wrapper
        position relative
        background linear-gradient(-90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px) 0 0 / 20px 20px

      .field
        border-width 1px
        border-style dotted
        border-color transparent
        border-radius 2px

      .field:hover
        background rgba(255, 255, 255, 0.1)
        border-color #c7c7c7
        background #f8f8f8

      .field.selected
        background rgba(255, 255, 255, 0.6)
        border-color #a8a8a8
        background #efefef

      .field, .field >>> *
        cursor pointer !important

      .field.selected, .field.selected >>> *
        cursor move !important

    .properties
      background #fff
      border-radius 2px 0 0 2px
      position absolute
      top -45px
      width 300px
      right -15px
      height calc(100vh - 3px)
      transform translateX(350px)
      transition all 0.3s

    .properties.open
      transform translateX(0)

    .properties-tab
      padding 10px
      & > div
        margin-bottom 15px
</style>
