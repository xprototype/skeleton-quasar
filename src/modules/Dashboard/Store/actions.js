/**
 * @param {Object} context
 * @param {string} transition
 */
export const setTransition = (context, transition) => {
  context.commit('mutateTransition', transition)
}
