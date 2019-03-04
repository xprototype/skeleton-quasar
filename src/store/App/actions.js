/**
 * @param {Object} context
 * @param {Array} menu
 */
export const setName = (context, menu) => {
  context.commit('mutateName', menu)
}

/**
 * @param {Object} context
 * @param {Array} subTitle
 */
export const setSubTitle = (context, subTitle) => {
  context.commit('mutateSubTitle', subTitle)
}

/**
 * @param {Object} context
 * @param {Array} drawer
 */
export const setDrawer = (context, drawer) => {
  context.commit('mutateDrawer', drawer)
}

/**
 * @param {Object} context
 * @param {Array} options
 */
export const setOptions = (context, options) => {
  context.commit('mutateOptions', options)
}

/**
 * @param {Object} context
 * @param {Object} clipboard
 */
export const setClipboard = (context, clipboard) => {
  context.commit('mutateClipboard', clipboard)
}

/**
 * @param {Object} context
 */
export const clearClipboard = (context) => {
  context.commit('mutateClipboard', {})
}

/**
 * @param {Object} context
 * @param {Object} query
 */
export const setQuery = (context, query) => {
  if (Object.keys(context.getters.getQuery).length) {
    return
  }
  context.commit('mutateQuery', query)
}

/**
 * @param {Object} context
 */
export const clearQuery = (context) => {
  context.commit('mutateQuery', {})
}
