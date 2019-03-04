// noinspection NpmUsedModulesInstalled
import { Cookies } from 'quasar'
import $store from 'src/store'
import AuthService from 'src/domains/Auth/AuthService'
import { setToken } from 'src/config/service/standard'

/**
 * @returns {Object|undefined}
 */
export const sessionUser = function () {
  return $store.getters['auth/getUser']
}

/**
 * @returns {boolean}
 */
export const sessionGuest = function () {
  const user = $store.getters['auth/getUser']
  if (user === undefined) {
    return true
  }
  return Object.keys(user).length === 0
}

/**
 * @returns {Promise}
 */
export const sessionCheck = function () {
  return new Promise(function (resolve, reject) {
    // debugger

    if (!Cookies.has('usi')) {
      // eslint-disable-next-line prefer-promise-reject-errors
      $store.dispatch('auth/logout').then(() => reject('There is no cookie to identify session'))
      return
    }

    const identifier = Cookies.get('usi')
    if (identifier === null) {
      // eslint-disable-next-line prefer-promise-reject-errors
      $store.dispatch('auth/logout').then(() => reject('The session is down'))
      return
    }

    if (!sessionGuest()) {
      resolve(sessionUser())
      return
    }

    setToken(identifier)

    const success = (response) => {
      $store.dispatch('auth/update', response.data).then(() => resolve(response))
    }
    AuthService.build().me().then(success)
  })
}
