/**
 * @mixin Report
 */
export default {
  /**
   */
  data: () => ({
    bind: {}
  }),
  /**
   */
  methods: {
    /**
     * @param provide
     */
    updateBind (provide) {
      this.bind = {
        scope: this.$route.meta.scope,
        ...provide
      }
    }
  },
  /**
   */
  created () {
    this.updateBind(this.$options.prototype.build().provide())
  }
}
