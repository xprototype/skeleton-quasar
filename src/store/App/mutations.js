import { write } from 'src/app/Util/Storage'

/**
 * @param {Object} state
 * @param {Array} name
 */
export const mutateName = (state, name) => {
  state.name = name
}

/**
 * @param {Object} state
 * @param {Array} subTitle
 */
export const mutateSubTitle = (state, subTitle) => {
  state.subTitle = subTitle
}

/**
 * @param {Object} state
 * @param {Array} drawer
 */
export const mutateDrawer = (state, drawer) => {
  state.drawer = drawer
  write('appDrawer', drawer)
}

/**
 * @param {Object} state
 * @param {Array} options
 */
export const mutateOptions = (state, options) => {
  state.options = options
}

/**
 * @param {Object} state
 * @param {Object} clipboard
 */
export const mutateClipboard = (state, clipboard) => {
  state.clipboard = clipboard
}

/**
 * @param {Object} state
 * @param {Object} query
 */
export const mutateQuery = (state, query) => {
  state.query = query
}
