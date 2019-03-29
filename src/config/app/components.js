const attrs = { dense: true }

export default {
  input: {
    is: 'q-input',
    attrs: { ...attrs }
  },
  number: {
    is: 'q-input',
    attrs: {
      type: 'number',
      ...attrs
    }
  },
  password: {
    is: 'q-input',
    attrs: {
      type: 'number',
      ...attrs
    }
  },
  email: {
    is: 'q-input',
    attrs: {
      type: 'email',
      ...attrs
    }
  },
  text: {
    is: 'q-input',
    attrs: {
      type: 'textarea',
      rows: 4,
      ...attrs
    }
  },
  checkbox: {
    is: 'q-checkbox',
    attrs: { ...attrs }
  },
  radio: {
    is: 'q-option-group',
    attrs: {
      inline: true,
      ...attrs
    }
  },
  select: {
    is: 'q-select',
    attrs: { ...attrs }
  }
}
