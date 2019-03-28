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
      @click="home"
      color="secondary"
      style="width:200px;"
    >
      Go back
    </q-btn>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Error404',
  methods: {
    home () {
      this.$browse('/')
    }
  }
}
</script>
