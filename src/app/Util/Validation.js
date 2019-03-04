import { helpers, minLength } from 'vuelidate/lib/validators'

/**
 * @type {Function}
 */
export const minLengthThree = minLength(3)

/**
 * @type {Function}
 */
export const minLengthSix = minLength(6)

/**
 * @type {Function}
 */
export const password = helpers.regex('number', /.+[1-9]/i)
