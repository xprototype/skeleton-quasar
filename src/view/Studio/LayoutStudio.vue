<!--suppress HtmlUnknownTarget -->
<template>
  <q-layout view="lHr lpR lff">
    <q-header
      elevated
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="left = !left"
        />

        <q-toolbar-title>
          Quasar Studio
        </q-toolbar-title>

        <div class="qc-brand-image-container">
          <img
            class="qc-brand-image"
            src="statics/quasar-logo.png"
            alt="logo"
          >
        </div>

        <a
          href="https://v1.quasar-framework.org"
          class="qc-brand-link"
        >
          <small>Quasar v{{ $q.version }}</small>
        </a>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="right = !right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      side="left"
      bordered
    >
      <div
        class="q-expansion-item__content relative-position"
        style=""
      >
        <!-- href="/vue-components/input"-->
        <!-- Input Textfield-->
        <!-- href="/vue-components/select"-->
        <!-- Select-->
        <!-- href="/vue-components/radio"-->
        <!-- Radio-->
        <!-- href="/vue-components/checkbox"-->
        <!-- Checkbox-->
        <!-- href="/vue-components/toggle"-->
        <!-- Toggle-->
        <!-- href="/vue-components/button-toggle"-->
        <!-- Button Toggle-->
        <!-- href="/vue-components/option-group"-->
        <!-- Option Group-->
        <!-- href="/vue-components/slider"-->
        <!-- Slider-->
        <!-- href="/vue-components/range"-->
        <!-- Range-->
        <!-- href="/vue-components/time"-->
        <!-- Time Picker-->
        <!-- href="/vue-components/date"-->
        <!-- Date Picker-->
      </div>
    </q-drawer>

    <q-drawer
      v-model="right"
      side="right"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <studio-canvas />
    </q-page-container>

    <q-footer
      elevated
      class="bg-grey-4 text-grey-10"
    >
      <q-toolbar>
        <small>Footer</small>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script type="text/javascript">
import StudioCanvas from 'src/view/Studio/StudioCanvas'

/**
 */
export default {
  /**
   */
  components: {
    StudioCanvas
  },
  /**
   * @returns {Object}
   */
  data () {
    return {
      left: true,
      right: false
    }
  }
}
</script>

<style lang="stylus">
  @import '~src/css/quasar.variables.styl'

  .qc-brand-link
    color #fff
    text-decoration none

  .qc-brand-image-container
    margin 0 10px

    .qc-brand-image
      height 36px
      transition-duration 0.6s
      transition-property transform

      &:hover
        transform rotate(360deg)

  .q-header
    background linear-gradient(0deg, #23364b 20%, #1b263a 95%)
</style>
