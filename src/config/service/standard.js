import axios from 'axios'
import $store from 'src/store'
import $router from 'src/router'
import { erase, read, write } from 'src/app/Util/Storage'
import { fallback } from 'src/config/index'

const TOKEN_NAME = 'token'

// noinspection ES6ModulesDependencies
const standard = axios.create({
  baseURL: process.env.api.BASE_URL,
  timeout: 100000,
  transformResponse: [
    function (data) {
      return data
    }
  ]
})

/**
 * @param {Object} response
 */
export const authorizationMiddleware = (response) => {
  setToken(response.data.token)
  return response
}

/**
 * @param {string} token
 */
export const setToken = token => {
  if (token) {
    updateToken(`Bearer ${token.replace('Bearer ', '')}`)
    return
  }
  updateToken('')
  erase(TOKEN_NAME)
}

/**
 * @param {string} token
 */
export const updateToken = token => {
  standard.defaults.headers.common['Authorization'] = token
  write(TOKEN_NAME, token)
}

/**
 * @param response
 * @returns {*}
 */
const responseSuccess = function (response) {
  if (response.headers && response.headers['authorization']) {
    setToken(response.headers['authorization'])
  }
  return response
}

/**
 * @param error
 * @returns {Promise}
 */
const responseError = function (error) {
  if (!error.response) {
    return Promise.reject(error)
  }

  if (error.response.status === 401) {
    const login = {
      path: fallback,
      query: {
        redirect: $router.currentRoute.fullPath
      }
    }
    $store.dispatch('auth/logout').then(() => $router.push(login))
  }

  if (error.response.data) {
    return Promise.reject(JSON.parse(error.response.data))
  }

  return Promise.reject(error)
}

standard.interceptors.response.use(responseSuccess, responseError)

const token = read(TOKEN_NAME)
if (token) {
  setToken(token)
}

export default standard
