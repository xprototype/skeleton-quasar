export default [
  {
    label: 'Alternar Tela Cheira',
    icon: 'fullscreen',
    handler () {
      if (this.$q && this.$q.fullscreen) {
        // noinspection JSCheckFunctionSignatures
        this.$q.fullscreen.toggle()
      }
    }
  },
  {
    label: 'Sair',
    icon: 'power_settings_new',
    handler () {
      this.$store.dispatch('auth/logout').then(() => this.$router.push('/auth'))
    }
  }
]
