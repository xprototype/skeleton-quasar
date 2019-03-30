import Vue from 'vue'
import $store from 'src/store'
import AppRouter from 'src/app/Router/AppRouter'
import auth from 'src/modules/Auth/Routes'
import dashboard from 'src/modules/Dashboard/Routes'

Vue.use(AppRouter)

// noinspection JSCheckFunctionSignatures, JSClosureCompilerSyntax
const router = new AppRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 })
})

router.beforeEach((to, from, next) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  const transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

  $store.dispatch('dashboard/setTransition', transitionName).then(next)
})

auth(router)
dashboard(router)

export default router
