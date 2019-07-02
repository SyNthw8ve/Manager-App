export default {

  namespaced: true,

  state: {

    consts: {

      cost: null,

      liters_per_min: null

    },

    dataCollection: {

      labels: [],
      datasets: [{

        label: 'Water',
        backgroundColor: 'rgba(0, 231, 255, 0.05)',
        borderColor: 'rgba(0, 231, 255, 0.7)',
        data: [],
        pointRadius: 6,
        pointBackgroundColor: '#00e7ff',
        pointHoverRadius: 8,
        pointBorderColor: '#000000'

      }]
    },

    writeBack: [],

    weekAffairs: {

      'sunday': { day: 'sunday', affairs: [], type: 'water'},
      'monday': { day: 'monday', affairs: [], type: 'water'},
      'thuesday': { day: 'thuesday', affairs: [], type: 'water'},
      'wednesday': { day: 'wednesday', affairs: [], type: 'water'},
      'thursday': { day: 'thursday', affairs: [], type: 'water'},
      'friday': { day: 'friday', affairs: [], type: 'water'},
      'saturday': { day: 'saturday', affairs: [], type: 'water'}

    },

    weekData: {

      labels: ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{

        label: 'Daily Cost',
        data: [],
        backgroundColor: 'rgba(0, 231, 255, 0.7)'

      },
      {

        label: 'Liters Spent (m^3)',
        data: [],
        backgroundColor: 'rgba(0, 196, 176, 0.7)'

      }]
    },

    actionData: {

      labels: [],

      datasets: [{

        label: 'Action Costs',
        backgroundColor: [],
        data: []

      }]

    }
  },

  getters: {}
}
