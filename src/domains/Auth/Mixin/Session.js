/**
 */
export default {
  /**
   */
  data: () => ({
    userId: 'id'
  }),
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    user () {
      if (!this.$store.getters['auth/getUser']) {
        return ''
      }
      const user = this.$store.getters['auth/getUser']
      return String(user[this.userId])
    }
  }
}
