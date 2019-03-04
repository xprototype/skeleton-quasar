import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import { lang } from 'src/app/Util/Lang'

/**
 * @param {Vue} app
 * @param {Vue} Vue
 */
export default ({ app, Vue }) => {
  /**
   */
  Vue.use(VueI18n)

  /**
   */
  Object.defineProperty(Vue.prototype, '$lang', {
    get () {
      return lang
    }
  })

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'en-us',
    fallbackLocale: 'en-us',
    messages
  })

  window.app = app
}
