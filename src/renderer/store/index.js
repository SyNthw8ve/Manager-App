import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'Firebase'
require('Firebase/firestore')
import config from '../components/database/firebaseConfig'

import modules from './modules'
import waterModule from './modules/waterCollection.js'
import elecModule from './modules/elecCollection.js'
import gasModule from './modules/gasCollection.js' 

Vue.use(Vuex)

let firebaseApp = firebase.initializeApp(config)

const fireStore = firebaseApp.firestore();

export default new Vuex.Store({

  modules: {

    'water': waterModule,
    'elec': elecModule,
    'gas': gasModule,
    extra: modules

  },

  state: { 
    
    db: fireStore,

    showModal: false,
  },

  getters: {

  },

  mutations: {

    loadData(state, payload) {

      state[payload.type].dataCollection.labels = payload.labels
      state[payload.type].dataCollection.datasets[0].data = payload.data

    },

    loadAffairs(state, payload) {

      state[payload.type].weekAffairs[payload.data.day] = payload.data
    },

    loadConsts(state, payload) {

      state[payload.type].consts = payload.consts
    },

    releaseAffairs(state, payload) {

      let db = payload.db;

      Object.keys(state[payload.type].weekAffairs).forEach( (day) => {

        db.collection(payload.doc).doc(day).set(state[payload.type].weekAffairs[day])

      })

      state[payload.type].weekAffairs = {

        'sunday': { day: 'sunday', affairs: [], type: payload.type},
        'monday': { day: 'monday', affairs: [], type: payload.type},
        'thuesday': { day: 'thuesday', affairs: [], type: payload.type},
        'wednesday': { day: 'wednesday', affairs: [], type: payload.type},
        'thursday': { day: 'thursday', affairs: [], type: payload.type},
        'friday': { day: 'friday', affairs: [], type: payload.type},
        'saturday': { day: 'saturday', affairs: [], type: payload.type}

      }

      state[payload.type].actionData = {

        labels: [],
  
        datasets: [{

            label: 'Action Costs',
            backgroundColor: [],
            data: []

        }]
      }

      state[payload.type].weekData.datasets[0].data = []
      state[payload.type].weekData.datasets[1].data = []
    
    },

    loadBarData(state, payload) {

      let stateModule = state[payload.type]

      Object.keys(stateModule.weekAffairs).forEach( (day, index) => {
      
        let durations = stateModule.weekAffairs[day].affairs.reduce( (prev, current) => {

            return prev + Number(current.duration)*Number(current.times)

        }, 0)

        let value = durations*stateModule.consts.cost*stateModule.consts.var/stateModule.const

        console.log(value)

        stateModule.weekData.datasets[0].data.push(value.toFixed(2))
        stateModule.weekData.datasets[1].data.push((value/stateModule.consts.cost).toFixed(2))

      })

    },

    loadAction(state, payload) {

      let result = {}

      let stateModule = state[payload.type]

      Object.keys(stateModule.weekAffairs).forEach( (day) => {

        stateModule.weekAffairs[day].affairs.forEach( affair => {

              let value = Number(affair.duration)*Number(affair.times)*stateModule.consts.var*stateModule.consts.cost/stateModule.const

              if(result[affair.action] === undefined) {

                  result[affair.action] = value

              } else {

                  let v = Number(result[affair.action]) + value

                  result[affair.action] = v
              }
          })
      })

      Object.keys(result).forEach( (action, index) => {

        stateModule.actionData.labels.push(action)

        stateModule.actionData.datasets[0].data.push(result[action])

        stateModule.actionData.datasets[0].backgroundColor.push(`rgb(0, 231,  ${255 - 30*(index)})`)
      })
    },

    updateWriteBack(state, payload) {

      if(payload.type === 'water') {

        state.waterModule.writeBack.push(payload.data)

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

      state[payload.type].weekAffairs[payload.day].affairs.push(payload.data)

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

  },

  actions: {

    loadData(context, payload) {

        let db = payload.db

        db.collection('Data').where('type', '==', payload.type).get().then( querySnapshot => {

            let labels = []
            let data = []

            querySnapshot.forEach( doc => {

              labels.push(doc.data().date);
              data.push(doc.data().value);
              
            });

            context.commit('loadData', {labels: labels, data: data, type: payload.type})
  
        }).catch( error => console.log(error))
    },

    loadConsts(context, payload) {

      let db = payload.db

      db.collection('consts').doc(payload.doc).get().then( doc => {

          let data = doc.data();

          let consts = {

              cost: data.cost,
              var: data.field_1,

          }

          context.commit('loadConsts', {consts: consts, type: payload.type})

      })
    },

    updateWriteBack(context, payload) {

      context.commit('updateWriteBack', payload)

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

    loadAffairs(context, payload){

      let db = payload.db

      db.collection(payload.doc).where('type', '==', payload.type).get().then( querySnapshot => {

        querySnapshot.forEach( doc => {

            let data = doc.data()

            context.commit('loadAffairs', {data: data, type: payload.type})

        })

        context.commit('loadBarData', {type: payload.type})

        context.commit('loadAction', {type: payload.type})
      })
    },

    releaseAffairs(context, payload){

      context.commit('releaseAffairs', payload)
    }
  }
})
