import Vue from 'vue'
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

auth(router)
dashboard(router)

export default router
