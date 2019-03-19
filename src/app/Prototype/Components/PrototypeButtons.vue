<template>
  <div class="app-form-buttons">
    <template v-for="button in actions">
      <template v-if="button.dropdown">
        <q-btn-dropdown
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
  /**
   */
  props: {
    buttons: {
      type: [Array, Object],
      default: () => ([])
    },
    position: {
      type: String,
      default: ''
    },
    scope: {
      type: String,
      default: ''
    },
    context: {
      type: Object,
      default: undefined
    },
    override: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  computed: {
    actions () {
      return Object.values(this.buttons)
        .filter((button) => button.positions && button.positions.includes(this.position))
        .map((button) => {
          let action = button
          if (button.configure && typeof button.configure === 'function') {
            const clone = this.$util.clone(button)
            const parameters = { context: this.context, position: this.position, scope: this.scope }
            action = button.configure.call(this, clone, parameters)
          }
          return {
            ...action,
            attrs: this.parseAttrs(action),
            listeners: this.parseListeners(action)
          }
        })
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Object} action
     * @returns {Object}
     */
    parseAttrs (action) {
      return { ...action.attrs, ...this.override }
    },
    /**
     * @param {Object} action
     * @returns {Object}
     */
    parseListeners (action) {
      if (typeof action.listeners !== 'object') {
        return action.listeners
      }
      let context = {}
      if (this.context) {
        context = this.$util.clone(this.context)
      }
      const reduce = (listeners, key) => {
        listeners[key] = ($event) => action.listeners[key]($event, { context })
        return listeners
      }
      return Object.keys(action.listeners).reduce(reduce, {})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .app-form-buttons
    button
      margin-right 10px
</style>
