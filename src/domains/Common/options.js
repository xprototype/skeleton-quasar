/**
 * @param {string} domain
 * @returns {Array}
 */
export const gender = (domain) => [
  { value: 'male', label: `domains.${domain}.gender.male` },
  { value: 'female', label: `domains.${domain}.gender.female` }
]
