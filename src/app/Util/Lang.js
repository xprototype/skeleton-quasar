/**
 * @param {String|Array} key
 * @param {string} [fallback]
 * @returns {String|Object}
 */
export const lang = (key, fallback = '') => {
  if (typeof key === 'string') {
    const clean = key.replace(/\//g, '.')
    if (window.app.i18n.te(clean)) {
      return window.app.i18n.t(clean)
    }
    return fallback || key
  }

  for (let path in key) {
    if (!key.hasOwnProperty(path)) {
      continue
    }

    let clean = key[path].replace(/\//g, '.')
    if (!window.app.i18n.te(clean)) {
      continue
    }
    return window.app.i18n.t(clean)
  }
  return fallback
}
