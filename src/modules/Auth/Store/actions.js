/**
 * @ref auth/login
 * @param {Object} context
 * @param {Object} credentials
 */
export const login = (context, credentials) => {
  context.commit('mutateToken', credentials.token)
  context.commit('mutateUser', credentials.user)
}

/**
 * @ref auth/logout
 * @param {Object} context
 */
export const logout = (context) => {
  context.commit('mutateToken', '')
  context.commit('mutateUser', '')
}
