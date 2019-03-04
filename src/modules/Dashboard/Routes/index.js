import $store from 'src/store'
import { children, route } from 'src/app/Router'

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
      route('/dashboard/test', () => import('src/domains/Example/Test/View/TestTable'))
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
