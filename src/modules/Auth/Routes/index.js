import { children, redirect, route } from 'src/app/Router'

/**
 * @param {AppRouter} router
 * @returns {Array}
 */
export default (router) => {
  const routes = [
    redirect('/', '/auth/sigin'),
    children('/auth', () => import('src/modules/Auth/Components/AuthLayout'), [
      redirect('', '/auth/sigin'),
      route('/auth/sigin', () => import('src/view/Auth/AuthSigin')),
      route('/auth/register', () => import('src/view/Auth/AuthRegister'))
    ])
  ]

  router.add(routes)
}
