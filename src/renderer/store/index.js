import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'Firebase'
require('Firebase/firestore')
import config from '../components/database/firebaseConfig'

import modules from './modules' 

Vue.use(Vuex)

let firebaseApp = firebase.initializeApp(config)

const fireStore = firebaseApp.firestore();

export default new Vuex.Store({

  modules,

  state: { 
    
    db: fireStore,

    showModal: false,
  
    water: {

      writeBack: [],

      weekAffairs: {

        'sunday': { day: 'sunday', affairs: [], type: 'water' },
        'monday': { day: 'monday', affairs: [], type: 'water'},
        'thuesday': { day: 'thuesday', affairs: [], type: 'water' },
        'wednesday': { day: 'wednesday', affairs: [], type: 'water' },
        'thursday': { day: 'thursday', affairs: [], type: 'water' },
        'friday': { day: 'friday', affairs: [], type: 'water' },
        'saturday': { day: 'saturday', affairs: [], type: 'water' }

      }
      
    },
    
    elecDataCollection : {

      writeBack: [],

      weekAffairs: {

        'sunday': { day: 'sunday', affairs: [] },
        'monday': { day: 'monday', affairs: [] },
        'thuesday': { day: 'thuesday', affairs: [] },
        'wednesday': { day: 'wednesday', affairs: [] },
        'thursday': { day: 'thursday', affairs: [] },
        'friday': { day: 'friday', affairs: [] },
        'saturday': { day: 'saturday', affairs: [] },

      }
    },

    gasDataCollection : {

      writeBack: [],

      weekAffairs: {

        'sunday': { day: 'sunday', affairs: [] },
        'monday': { day: 'monday', affairs: [] },
        'thuesday': { day: 'thuesday', affairs: [] },
        'wednesday': { day: 'wednesday', affairs: [] },
        'thursday': { day: 'thursday', affairs: [] },
        'friday': { day: 'friday', affairs: [] },
        'saturday': { day: 'saturday', affairs: [] }
        
      }
    },
    
  },

  getters: {

    

  },

  mutations: {

    updateWriteBack(state, payload) {

      if(payload.type === 'water') {

        state.water.writeBack.push(payload.data)

      } else if (payload.type === 'elec') {

        state.elecDataCollection.writeBack.push(payload.data);

      } else if (payload.type === 'gas') {

        state.gasDataCollection.writeBack.push(payload.data);
      }
    },

    clearWriteBack(state, payload) {

      if(payload.type === 'water') {

        state.water.writeBack = [];

      } else if (payload.type === 'elec') {

        state.elecDataCollection.writeBack = [];

      } else if (payload.type === 'gas') {

        state.gasDataCollection.writeBack = [];
      }
    },

    showModal(state, payload) {

      state.showModal = payload.modal;

    },

    addAffair(state, payload) {

      if(payload.type === 'water') {

        state.water.weekAffairs[payload.day].affairs.push(payload.data)

      } else if (payload.type === 'elec') {

        state.elecDataCollection.weekAffairs[payload.day].affairs.push(payload.data)

      } else if (payload.type === 'gas') {

        state.gasDataCollection.weekAffairs[payload.day].affairs.push(payload.data)
      }
    },

    removeAffair(state, payload) {

      if(payload.type === 'water') {

        state.water.weekAffairs[payload.day].affairs = state.water.weekAffairs[payload.day].affairs.filter( affair => (
          
          affair.action !== payload.affair.action || affair.duration !== payload.affair.duration || affair.times !== payload.affair.times))

      } else if (payload.type === 'elec') {

        state.elecDataCollection.weekAffairs[payload.day].affairs = state.elecDataCollection.weekAffairs[payload.day].affairs.filter( affair => (
          
          affair.action !== payload.affair.action || affair.duration !== payload.affair.duration || affair.times !== payload.affair.times))

      } else if (payload.type === 'gas') {

        state.gasDataCollection.weekAffairs[payload.day].affairs = state.gasDataCollection.weekAffairs[payload.day].affairs.filter( affair => (
          
          affair.action !== payload.affair.action || affair.duration !== payload.affair.duration || affair.times !== payload.affair.times))
      }
    },

    loadAffair(state, payload) {

      if(payload.type === 'water') {

        state.water.weekAffairs[payload.data.day] = payload.data

      } else if (payload.type === 'elec') {

        state.elecDataCollection.weekAffairs[payload.data.day] = payload.data

      } else if (payload.type === 'gas') {

        state.gasDataCollection.weekAffairs[payload.data.day] = payload.data
      }
    },

    clearAffairs(state, payload) {

      if(payload.type === 'water') {

        let week = state.water.weekAffairs

        Object.keys(week).forEach( (day) => {

          week[day].affairs = []
  
        })

      } else if (payload.type === 'elec') {

        let week = state.elecDataCollection.weekAffairs

        Object.keys(week).forEach( (day) => {

          week[day].affairs = []
  
        })

      } else if (payload.type === 'gas') {

        let week = state.gasDataCollection.weekAffairs

        Object.keys(week).forEach( (day) => {

          week[day].affairs = []
  
        })
      }
    },


  },

  actions: {

    updateWriteBack(context, payload) {

      context.commit('updateWriteBack', payload)

    },

    clearWriteBack(context, payload){

      context.commit('clearWriteBack', payload)

    },

    showModal( context, payload) {

      context.commit('showModal', payload)

    },

    addAffair(context, payload) {

      context.commit('addAffair', payload)

    },

    removeAffair(context, payload) {

      context.commit('removeAffair', payload)
    },

    loadAffair(context, payload){

      context.commit('loadAffair', payload)
    },

    clearAffairs(context, payload){

      context.commit('clearAffairs', payload)
    }

  }
})
