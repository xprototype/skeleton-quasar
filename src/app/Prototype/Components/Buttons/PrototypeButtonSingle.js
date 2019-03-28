/**
 * @typedef {PrototypeButtonSingle}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} data
     * @returns {*}
     */
    renderButtonSingle (h, data) {
      return h('q-btn', data)
    }
  }
}
