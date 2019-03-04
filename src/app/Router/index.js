/**
 * @param {string} path
 * @param {string} redirect
 * @param {Object} meta
 * @returns {Object}
 */
export const redirect = (path, redirect, meta = {}) => ({ path, redirect, meta })

/**
 * @param {string} path
 * @param {Function} component
 * @param {Array} children
 * @returns {Object}
 */
export const children = (path, component, children = []) => ({ path, component, children })

/**
 * @param {string} path
 * @param {Function} component
 * @param {Object} meta
 * @returns {Object}
 */
export const route = (path, component, meta = {}) => ({ path, component, meta })
