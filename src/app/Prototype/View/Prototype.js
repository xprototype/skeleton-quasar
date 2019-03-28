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
        key: this.$util.uniqueKey(),
        scope: this.$route.meta.scope,
        ...provide
      }
    },
    /**
     */
    prototype () {
      this.updateBind(this.$options.prototype.build().provide())
    }
  },
  watch: {
    '$route.fullPath' () {
      if (this.prototype) {
        this.prototype()
      }
    }
  },
  /**
   */
  created () {
    this.prototype()
  }
}
