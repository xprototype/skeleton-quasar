import Sortable from 'sortablejs'

let sortable

export default {
  bind (el, binding) {
    const options = {
      ...binding.value.options,
      onUpdate: function () {
        binding.value.handle(this.toArray())
      }
    }

    sortable = Sortable.create(el, options)
  },

  unbind () {
    sortable.destroy()
  }
}
