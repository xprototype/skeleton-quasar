import { read } from 'src/app/Util/Storage'
import options from '../Defaults/options'

// noinspection ES6ModulesDependencies
export default {
  name: process.env.app.NAME,
  subTitle: process.env.app.TITLE,
  drawer: read('appDrawer') || [],
  options: options,
  clipboard: {},
  query: {}
}
