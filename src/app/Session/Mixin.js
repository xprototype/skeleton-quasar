import { sessionGuest, sessionUser } from 'src/app/Session'

/**
 * @typedef {Session}
 */
const Session = {
  /**
   */
  computed: {
    /**
     */
    user: sessionUser,
    /**
     */
    guest: sessionGuest,
    /**
     */
    photo () {
      const photo = this.$util.prop(sessionUser(), 'photo')
      if (!photo) {
        return this.$util.statics('/images/photo/default.jpg')
      }
      return this.$util.statics(photo, true)
    }
  },
  /**
   */
  methods: {
    /**
     * @return {Promise}
     */
    logout () {
      return this.$store.dispatch('auth/logout').then(() => this.$router.push('/auth/sigin'))
    }
  }
}

export default Session
