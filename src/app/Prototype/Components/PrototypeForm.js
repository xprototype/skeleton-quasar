import Dynamic from '../Contracts/Dynamic'
import Form from '../Contracts/Form'
import PrototypeButtons from 'src/app/Prototype/Components/PrototypeButtons'
import PrototypeFormComponents from 'src/app/Prototype/Components/Form/PrototypeComponents'
import PrototypeBody from 'src/app/Prototype/Components/Form/PrototypeBody'

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
    Dynamic, Form, PrototypeBody
  ],
  /**
   */
  components: {
    PrototypeFormComponents,
    PrototypeButtons
  },
  /**
   */
  data: () => ({
    groupSelected: ''
  }),
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
      if (this.hasSections) {
        children.push(this.renderFormBodySections(h, this.groups))
      }
      if (this.hasTabs) {
        children.push(this.renderFormBodyTabs(h, this.groups))
      }

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
