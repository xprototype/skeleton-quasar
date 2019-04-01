<!--suppress HtmlUnknownTarget -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-toggle
          v-if="$dev"
          v-model="debugging"
          label="Debugger"
          color="red"
        />

        <q-toggle
          v-if="$dev"
          v-model="studio"
          label="Studio"
          color="red"
        />

        <q-space />

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
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
      elevated
    >
      <q-img
        class="absolute-top"
        src="statics/images/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar
            size="56px"
            class="q-mb-sm"
          >
            <img
              src="~assets/avatar.png"
              alt=""
            >
          </q-avatar>
          <div class="text-weight-bold">
            User
          </div>
          <div>@user</div>
          <div class="qc-action-logout">
            <q-btn
              @click="logout"
              round
              icon="power_settings_new"
            />
          </div>
        </div>
      </q-img>

      <q-scroll-area class="q-layout-scroll">
        <dashboard-menu
          v-bind="{ header, menu }"
          @click="menuOpen"
        />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <transition
        :name="transitionName"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view />
      </transition>
    </q-page-container>

    <q-dialog
      style="z-index: 999999"
      v-model="studio"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="gradient overflow-hidden">
        <q-bar class="text-white">
          <q-space />

          <q-btn
            dense
            flat
            icon="close"
            v-close-popup
          />
        </q-bar>

        <q-card-section>
          <div style="position: relative">
            <studio-canvas />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script type="text/javascript">
import { fallback } from 'src/config'
import Transition from 'src/modules/General/Mixins/Transition'
import menu from 'src/modules/Dashboard/menu'

import StudioCanvas from 'src/view/Studio/StudioCanvas'
import DashboardMenu from 'src/modules/Dashboard/Components/DashboardMenu'

/**
 */
export default {
  /**
   */
  name: 'DashboardLayout',
  /**
   */
  components: {
    DashboardMenu,
    StudioCanvas
  },
  /**
   */
  mixins: [
    Transition
  ],
  /**
   */
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      debugging: false,
      studio: false
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    header () {
      return this.$store.getters['app/getName']
    },
    /**
     * @returns {Array}
     */
    menu () {
      return this.$store.getters['app/getDrawer']
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Object} menu
     */
    menuOpen (menu) {
      this.$browse(menu.path)
    },
    /**
     */
    logout () {
      this.$browse(fallback)
    }
  },
  /**
   */
  watch: {
    /**
     */
    '$route.query.studio': {
      imediate: true,
      handler () {
        this.studio = !!this.$route.query.studio
      }
    }
  },
  /**
   */
  created () {
    this.studio = !!this.$route.query.studio

    this.debugging = this.$store.getters['app/getDebuggers']
    this.$watch('debugging', (debugging) => {
      this.$store.dispatch('app/setDebuggers', debugging)
    })

    this.$store.dispatch('app/setDrawer', menu, { root: true })
  }
}
</script>

<style lang="stylus">
  @import '~src/css/quasar.variables.styl'

  .qc-action-logout
    position absolute
    top 0
    right: 20px

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

  .q-header, .gradient
    background linear-gradient(0deg, #23364b 20%, #1b263a 95%)

  .q-layout-scroll
    height calc(100% - 150px)
    margin-top 150px
    border-right 1px solid #ddd

    >>> .q-item.q-item-type
      color #2b2b2b
</style>
