import { children, redirect, route } from 'src/app/Router'
import { fallback } from 'src/config'

/**
 * @param {AppRouter} router
 * @returns {Array}
 */
export default (router) => {
  const routes = [
    redirect('/', fallback),
    children('/auth', () => import('src/modules/Auth/Components/AuthLayout'), [
      redirect('', fallback),
      route(fallback, () => import('src/view/Auth/AuthSigin')),
      route('/auth/register', () => import('src/view/Auth/AuthRegister'))
    ])
  ]

  router.add(routes)
}
