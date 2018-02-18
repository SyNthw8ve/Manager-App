export default {

    namespaced: true,

    state: {
        
        consts: {

            cost: null,
  
            number_devices: null,
  
        },

        dataCollection: {

            labels: [],
            datasets: [{
  
              label: 'Electricity',
              backgroundColor: 'rgba(255, 221, 0, 0.05)',
              borderColor: 'rgba(255, 221, 0, 0.7)',
              data: [],
              pointRadius: 6,
              pointBackgroundColor: '#ffdd00',
              pointHoverRadius: 8,
              pointBorderColor: '#000000'
  
            }]
          },

        writeBack: [],
          
        weekAffairs: {

            'sunday': { day: 'sunday', affairs: [], type: 'elec'},
            'monday': { day: 'monday', affairs: [], type: 'elec'},
            'thuesday': { day: 'thuesday', affairs: [], type: 'elec'},
            'wednesday': { day: 'wednesday', affairs: [], type: 'elec'},
            'thursday': { day: 'thursday', affairs: [], type: 'elec'},
            'friday': { day: 'friday', affairs: [], type: 'elec'},
            'saturday': { day: 'saturday', affairs: [], type: 'elec'}

        },

        weekData: {
          
            labels: ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
  
              label: 'Daily Cost',
              data: [],
              backgroundColor: 'rgba(255, 221, 0, 0.7)',
  
            },
            {
  
              label: 'kW spent',
              data: [],
              backgroundColor: 'rgba(244, 156, 41, 0.7)',
  
            }],
        },

        actionData: {

            labels: [],
  
            datasets: [{
  
                label: 'Action Costs',
                backgroundColor: [],
                data: []
  
            }]
  
        },
    },

    getters: {}
}