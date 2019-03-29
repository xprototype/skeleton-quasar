<template>
  <div id="q-app">
    <q-ajax-bar
      color="red"
      size="3px"
    />
    <router-view />
    <a
      class="github-fork-ribbon left-top fixed"
      href="https://github.com/xprototype/skeleton-quasar"
      data-ribbon="Fork me on GitHub"
      title="Fork me on GitHub"
    >Fork me on GitHub
    </a>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style
  lang="stylus"
  scoped
>
  .github-fork-ribbon.left-top:before
    background-color #333
</style>
