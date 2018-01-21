import Vue from 'vue'
import Vuex from 'vuex'

import Firebase from 'Firebase'
import 'Firebase/firestore'
import config from '../components/database/firebaseConfig'

import modules from './modules'

Vue.use(Vuex)

const firebaseApp = Firebase.initializeApp(config)

export default new Vuex.Store({

  modules,

  state: { db: firebaseApp.firestore() },

  getters: {


  },

  mutations: {

    initDB() {

      //
    }
  },

  actions: {}
})
