import Dynamic from '../Contracts/Dynamic'
import Form from '../Contracts/Form'
import PrototypeButtons from 'src/app/Prototype/Components/PrototypeButtons'
import PrototypeFormComponents from 'src/app/Prototype/Components/Form/PrototypeComponents'

/**
 * @typedef PrototypeForm
 */
export default {
  /**
   */
  name: 'PrototypeForm',
  /**
   */
  mixins: [
    Dynamic, Form
  ],
  /**
   */
  components: {
    PrototypeFormComponents,
    PrototypeButtons
  },
  /**
   */
  methods: {
    /**
     * @param {Function} h
     */
    renderForm (h) {
      const data = { class: 'app-form-wrapper' }
      const children = [
        this.renderFormBody(h),
        this.renderPrototypeButtons(h, 'form-footer', { record: this.record })
      ]

      return h('div', data, children)
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderFormBody (h) {
      const data = {
        class: 'app-form-body'
      }
      const children = [
        this.renderFormBodyComponents(h, this.getComponents())
      ]
      if (this.hasGroups) {
        Object.keys(this.groups).forEach((key) => {
          const data = {
            key: key,
            class: 'app-form-body with-section'
          }

          const children = this.renderFormBodySection(h, key, this.groups[key])
          if (!children) {
            return
          }
          children.push(h('div', data, children))
        })
      }

      return h('div', data, children)
    },
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
     * @param {Function} h
     */
    renderFormDebuggers (h) {
      if (!this.debuggers) {
        return
      }

      return h('div', [
        h('app-debugger', { attrs: { label: 'Record', inspect: this.record } }),
        h('app-debugger', { attrs: { label: 'Components', inspect: this.components } }),
        h('app-debugger', { attrs: { label: 'Buttons', inspect: this.buttons } })
      ])
    }
  },
  /**
   * @param {Function} h
   */
  render (h) {
    const data = {
      class: 'PrototypeForm',
      attrs: {
        padding: true
      }
    }
    const children = [
      this.renderForm(h),
      this.renderFormDebuggers(h)
    ]

    return h('q-page', data, children)
  }
}
