<template>
  <div class="fixed-center text-center">
    <p>
      <!--suppress HtmlUnknownTarget -->
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
        alt=""
      >
    </p>
    <p class="text-faded">
      Sorry, nothing here...<strong>(404)</strong>
    </p>
    <q-btn
      @click="$router.push('/')"
      color="secondary"
      style="width:200px;"
    >
      Go back
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
