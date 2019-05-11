/**
 * @typedef {PrototypeBody}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} fields
     * @returns {*}
     */
    renderFormBodyComponents (h, fields) {
      const data = {
        domProps: { value: this.record },
        props: { value: this.record },
        attrs: { fields: fields, errors: this.errors, validations: this.$v },
        on: { input: (field, value) => { this.record[field] = value } }
      }

      return h('prototype-form-components', data)
    },
    /**
     * @param {Function} h
     * @param {Object} groups
     * @returns {*}
     */
    renderFormBodySections (h, groups) {
      const children = []
      Object.keys(groups).forEach((key) => {
        const data = {
          key: key,
          class: 'app-form-body with-section'
        }

        const kid = this.renderFormBodySection(h, key, groups[key].label)
        if (!kid) {
          return
        }
        children.push(h('div', data, [kid]))
      })
      return children
    },
    /**
     * @param {Function} h
     * @param {string} key
     * @param {string} title
     * @returns {*}
     */
    renderFormBodySection (h, key, title) {
      const _title = (title) => {
        const data = { class: 'app-form-section-title' }
        const children = [h('q-icon', { attrs: { name: 'notes' } }), h('span', title)]

        return h('div', data, children)
      }

      const components = this.getComponents(key)
      if (!components) {
        return
      }

      const data = { key: `${key}-section`, class: 'app-form-section' }
      const children = [_title(title), this.renderFormBodyComponents(h, components)]

      return h('div', data, children)
    },
    /**
     * @param h
     * @param groups
     * @return {*[]}
     */
    renderFormBodyTabs (h, groups) {
      const tabs = []
      const panes = []
      Object.keys(groups).forEach((key) => {
        if (!this.groupSelected) {
          this.groupSelected = key
        }
        const tab = {
          attrs: {
            key: key,
            name: key,
            slot: 'title',
            label: groups[key].label,
            keepAlive: true
          }
        }
        tabs.push(h('q-tab', tab))

        const pane = {
          attrs: {
            key: key,
            name: key
          }
        }
        const children = [
          this.renderFormBodyComponents(h, this.getComponents(key))
        ]
        panes.push(h('q-tab-panel', pane, children))
      })

      const tabsData = {
        domProps: { value: this.groupSelected },
        prop: { value: this.groupSelected },
        on: { input: ($event) => { this.groupSelected = $event } },
        attrs: {
          value: this.groupSelected,
          color: 'primary',
          swipeable: true,
          align: 'justify'
        }
      }

      const panelsData = {
        domProps: { value: this.groupSelected },
        prop: { value: this.groupSelected },
        on: { input: ($event) => { this.groupSelected = $event } },
        attrs: {
          value: this.groupSelected,
          animated: true
        }
      }

      return [h('q-tabs', tabsData, tabs), h('q-separator'), h('q-tab-panels', panelsData, panes)]
    }
  }
}
