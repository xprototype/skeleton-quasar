import $store from 'src/store'
import { children, fallback } from 'src/app/Router'
import example from 'src/domains/Example/Test/Routes'

/**
 * @returns {Promise}
 */
export const layout = () => import('src/modules/Dashboard/Components/DashboardLayout')

/**
 * @param {AppRouter} router
 * @returns {Array}
 */
export default (router) => {
  const routes = [
    children('/dashboard', layout, [
      fallback(() => import('src/modules/Dashboard/Components/Pages/Index')),
      ...example(router)
    ])
  ]

  // Always leave this as last one
  if (process.env.MODE !== 'ssr') {
    routes.push({
      path: '*',
      component: () => import('src/modules/Dashboard/Components/Pages/Error404')
    })
  }

  router.add(routes)

  router.beforeEach((to, from, next) => {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    const transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

    $store.dispatch('dashboard/setTransition', transitionName).then(next)
  })
}
