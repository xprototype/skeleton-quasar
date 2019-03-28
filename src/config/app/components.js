const attrs = { dense: true }

export default {
  input: {
    is: 'q-input',
    attrs: { ...attrs }
  },
  text: {
    is: 'q-input',
    attrs: {
      type: 'textarea',
      rows: 4,
      ...attrs
    }
  },
  password: {
    is: 'q-input',
    attrs: { ...attrs }
  },
  image: {
    is: 'q-input',
    attrs: { ...attrs }
  },
  select: {
    is: 'q-select',
    attrs: { ...attrs }
  }
}
