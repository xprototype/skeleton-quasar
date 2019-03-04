/**
 * @param {string} pattern
 * @param {*} value
 * @return {string}
 */
export const mask = (pattern, value) => {
  let masked = ''
  value = unMask(pattern, value)
  if (!value) {
    return ''
  }
  let j = 0
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*') {
      masked += '*'
      continue
    }
    if (j > value.length - 1) {
      return masked
    }
    if (pattern[i] === '#') {
      masked += value[j]
      j++
      continue
    }
    if (pattern[i] === '%') {
      masked += value[j]
      j++
      continue
    }
    masked += pattern[i]
  }
  return masked
}

/**
 * @param {string} pattern
 * @param {string} value
 * @return {string}
 */
export const unMask = (pattern, value) => {
  const chars = noDuplicates(String(pattern).replace(/[#*%]/g, '').split(''))
  return String(value).replace(new RegExp('[' + chars.join(',') + ']', 'g'), '')
}

/**
 * @param {Array} array
 * @return {Array}
 */
export const noDuplicates = (array) => {
  const a = array.concat()
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1)
      }
    }
  }
  return a
}
