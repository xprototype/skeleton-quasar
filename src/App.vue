<template>
  <div id="q-app">
    <q-ajax-bar
      color="red"
      size="3px"
    />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
