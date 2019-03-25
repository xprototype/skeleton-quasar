<template>
  <div>
    <p class="textContent">
      {{ input }}
    </p>
    <span>{{ counter }}</span>
    <q-btn
      id="myButton"
      @click="increment()"
    />
  </div>
</template>

<script>
export default {
  name: 'ButtonDemo',
  data () {
    return {
      counter: 0,
      input: 'rocket muffin'
    }
  },
  methods: {
    increment () {
      this.counter++
    }
  }
}
</script>
