import API from 'src/app/Services/API'
import { fake, uniqueKey } from 'src/app/Util'

/**
 * @type {AuthService}
 */
export default class AuthService extends API {
  /**
   * @param {*} data
   * @param {string} status
   * @returns {Promise<any>}
   */
  fake (data = undefined, status = 'success') {
    return fake({ status, data })
  }

  /**
   * @param {string} login
   * @param {string} password
   * @returns {Promise}
   */
  login (login, password) {
    // return this.post(`/auth/sigin`, {login, password})
    return this.fake({
      token: uniqueKey(),
      menus: [
        {
          label: 'Home',
          sublabel: '',
          icon: 'home',
          path: '/dashboard'
        },
        {
          label: 'Simple Test',
          sublabel: 'Just a simple test ; )',
          icon: 'code',
          path: '/dashboard/test'
        },
        {
          label: 'Test With Hooks',
          sublabel: 'Demo to show declare hooks',
          icon: 'code',
          path: '/dashboard/test-with-hooks'
        },
        {
          label: 'Test Template Form',
          sublabel: 'Using form control with template',
          icon: 'code',
          path: '/dashboard/test-with-template/form'
        },
        {
          label: 'Test Template Table',
          sublabel: 'Using table control with template',
          icon: 'code',
          path: '/dashboard/test-with-template/table'
        }
      ]
    })
  }

  /**
   */
  logout () {
    // return this.get(`/auth/logout`)
    return this.fake()
  }

  /**
   * @param {Object} form
   * @returns {Promise}
   */
  register (form) {
    return this.post(`/auth/register`, form)
  }

  /**
   * @param {string} login
   * @returns {Promise}
   */
  remember (login) {
    return this.post(`/auth/remember`, { login })
  }

  /**
   * @param {string} password
   * @param {string} confirm
   * @param {Object} payload
   * @returns {Promise}
   */
  confirm (password, confirm, payload) {
    return this.post(`/auth/confirm`, Object.assign(payload, { password, confirm }))
  }

  /**
   */
  me () {
    return this.get(`/auth/me`)
  }

  /**
   * @param {string} activation
   * @returns {Promise}
   */
  activate (activation) {
    return this.get(`/auth/activate/${activation}`)
  }

  /**
   * @param {string} token
   * @returns {Promise}
   */
  reset (token) {
    return this.get(`/auth/reset/${token}`)
  }

  /**
   * @param {string} token
   * @returns {Promise}
   */
  state (token) {
    return this.get(`/auth/state/${token}`)
  }

  /**
   * @param {string} vendor
   * @param {Object} payload
   * @returns {Promise}
   */
  info (vendor, payload) {
    return this.post(`/auth/info/${vendor}`, { payload })
  }
}
