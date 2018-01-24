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

  state: { 
    
    db: firebaseApp.firestore(),
  
    waterDataCollection : {

      consts : {

        cost: null,

        number_showers: null,

        mean_time_shower: null,

        number_other_sources: null,

        outher_mean_time: null,

        last_value: null

      },

      datacollection: {

        labels: [],
        datasets: [{

          label: 'Water',
          backgroundColor: this.gradient,
          borderColor: '#00e7ff',
          data: [],
          pointRadius: 6,
          pointBackgroundColor: '#00e7ff',
          pointHoverRadius: 8,
          pointBorderColor: '#000000'

        }]
      }
    },
    
    elecDataCollection : {

      consts : {

        cost: null,

        number_devices: null,

        mean_time_device: null,

        number_other_sources: null,

        outher_mean_time: null,

        last_value: null

      },

      datacollection: {

        labels: [],
        datasets: [{

          label: 'Electricity',
          backgroundColor: this.gradient,
          borderColor: '#ffdd00',
          data: [],
          pointRadius: 6,
          pointBackgroundColor: '#ffdd00',
          pointHoverRadius: 8,
          pointBorderColor: '#000000'

        }]
      }
    },
    
  },

  getters: {

  },

  mutations: {

    setConsts(state, payload) {

      if(payload.type === 'water'){

        state.waterDataCollection.consts = payload.consts;

      } else if (payload.type === 'elec') {

        state.elecDataCollection.consts = payload.consts;
      }
    },

    setData(state, payload) {

      if(payload.type === 'water') {

        state.waterDataCollection.datacollection.datasets[0].data = payload.data;

      } else if (payload.type === 'elec') {

        state.elecDataCollection.datacollection.datasets[0].data = payload.data;
      }
    },

    setLabels(state, payload) {

      if(payload.type === 'water') {

        state.waterDataCollection.datacollection.labels = payload.data;

      } else if (payload.type === 'elec') {

        state.elecDataCollection.datacollection.labels = payload.data;
      }
    }
  },

  actions: {

    setConsts(context, payload) {

      context.commit('setConsts', payload)

    },

    setData(context, payload) {

      context.commit('setData', payload)
    },

    setLabels(context, payload) {

      context.commit('setLabels', payload)
    },

  }
})
