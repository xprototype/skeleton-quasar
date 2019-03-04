import { erase, write } from 'src/app/Util/Storage'

/**
 * @param state
 * @param token
 */
export const mutateToken = (state, token) => {
  state.token = token
  if (token) {
    write('token', state.token)
    return
  }
  erase('token')
}

/**
 * @param state
 * @param user
 */
export const mutateUser = (state, user) => {
  state.user = user
  if (user) {
    write('user', state.user)
    return
  }
  erase('user')
}
