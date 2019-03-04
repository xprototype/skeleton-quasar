/**
 * @type {Object}
 */
import { read } from 'src/app/Util/Storage'

export default {
  token: read('token'),
  user: read('user')
}
