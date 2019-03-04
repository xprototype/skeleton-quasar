import Vue from 'vue'
import Vuex from 'vuex'

import app from './App'
import auth from 'src/modules/Auth/Store'
import dashboard from 'src/modules/Dashboard/Store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    dashboard
  }
})

export default store
