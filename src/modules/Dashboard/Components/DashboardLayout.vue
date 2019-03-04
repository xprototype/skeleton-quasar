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

        <small>Quasar v{{ $q.version }}</small>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
      elevated
    >
      <q-img
        class="absolute-top"
        src="assets/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar
            size="56px"
            class="q-mb-sm"
          >
            <!--suppress HtmlUnknownTarget -->
            <img
              src="assets/avatar.png"
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

      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item-label header>
            {{ appName }}
          </q-item-label>
          <q-item
            v-for="(menu, index) in appDrawer"
            :key="index"
            @click.native="menuOpen(menu)"
            clickable
          >
            <q-item-section
              v-if="menu.icon"
              avatar
            >
              <q-icon :name="menu.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ menu.label }}</q-item-label>
              <q-item-label
                v-if="menu.sublabel"
                caption
              >
                {{ menu.sublabel }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
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
  </q-layout>
</template>

<script type="text/javascript">
export default {
  name: 'DashboardLayout',
  /**
   */
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    appName () {
      return this.$store.getters['app/getName']
    },
    /**
     * @returns {Array}
     */
    appDrawer () {
      return this.$store.getters['app/getDrawer']
    },
    transitionName () {
      return this.$store.getters['dashboard/getTransition']
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Object} menu
     */
    menuOpen (menu) {
      this.$router.push(menu.path)
    },
    /**
     */
    logout () {
      this.$router.push('/auth/sigin')
    },
    /**
     * @param {Element} element
     */
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height
    },
    /**
     * @param {Element} element
     */
    enter (element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },
    /**
     * @param {Element} element
     */
    afterEnter (element) {
      element.style.height = 'auto'
    }
  }
}
</script>

<style lang="stylus">
  @import '~src/css/quasar.variables.styl'

  .qc-action-logout
    position absolute
    top 0
    right: 20px

  .q-header
    background linear-gradient(130deg, $primary 20%, $secondary 95%)
</style>
