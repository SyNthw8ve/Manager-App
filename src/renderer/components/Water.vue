<template>
  <div>
    <div v-if="loaded">
      <div class="chart-grid">
          <div id="line" class="chart-wrapper">
            <chart :chart-data="dataCollection" class="chart"></chart>
          </div>
          <div class="chart-wrapper">
            <bar :chart-data="weekData" class="chart"></bar>
          </div>
          <div class="chart-wrapper">
            <doughnut :chart-data="actionData" class="chart"></doughnut>
          </div>
      </div>
      <calendar :weekAffairs="weekAffairs"></calendar>
    </div>
    <div class="loading" v-if="!loaded">
      <i id="spinner" class="fas fa-circle-notch fa-spin"></i>
    </div>
  </div>
</template>

<script>

  import Line from './Charts/Line.js'
  import Bar from './Charts/Bar.js'
  import Doughnut from './Charts/Circle.js'

  import Modal from './Modals/Modal.vue'
  import Calendar from './Calendar.vue'

  import { error } from 'util'
  import { setInterval, setTimeout } from 'timers'

  export default {
    
    components: {

      'chart': Line,
      'bar': Bar,
      'modal': Modal,
      'doughnut': Doughnut,
      'calendar': Calendar

    },

    data () {

      return {

        consts: {

          cost: null,

          liters_per_min: null,

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

        weekData: {
          
          labels: ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          datasets: [{

            label: 'Daily Cost',
            data: [],
            backgroundColor: 'rgba(0, 231, 255, 0.7)',

          },
          {

            label: 'Liters Spent (m^3)',
            data: [],
            backgroundColor: 'rgba(0, 196, 176, 0.7)',

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

      loaded: false,

      interval: null,

    }

  },

    created() {
    
      let db = this.$store.state.db

      let weekAffairs = this.$store.state.water.weekAffairs

      this.retreiveData(db);

      this.retreiveConsts(db);

      this.retreiveAffairs(db, weekAffairs);

      //this.start();

    },

    beforeDestroy() {

      let db = this.$store.state.db

      let writeBack = this.$store.state.water.writeBack

      let weekAffairs = this.$store.state.water.weekAffairs

      let consts = {

          cost: Number(this.consts.cost),
          field_1: Number(this.consts.liters_per_min),

      }

      db.collection('consts').doc('Water').set(consts)

      this.releaseWriteBack(writeBack, db);

      this.releaseAffairs(weekAffairs, db);

      window.clearInterval(this.interval)

    },

    methods: {

      start() {

        this.interval = window.setInterval( () => { 
          
          this.updateChart() 
          
        }, 10000)

      },

      submit() {

        let db = this.$store.state.db;

        let consts = {

          cost: Number(this.consts.cost),
          field_1: Number(this.consts.liters_per_min)

        }

        db.collection('consts').doc('Water').set(consts)

      },

      updateChart() {

        let date = new Date();

        let values = {

          type: 'water',

          day: date.getDay(),

          date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,

          value: this.getValue(date.getDay())

        }

        let payload = { type: 'water', data: { doc:`${Date.now()}` , values } }

        let chartData = {data: this.dataCollection.datasets[0].data, labels: this.dataCollection.labels} 

        chartData.labels.push(values.date)
        chartData.data.push(values.value)
        
        this.$store.dispatch('updateWriteBack', payload)

        this.dataCollection = {

          labels: chartData.labels,
          datasets: [{

            label: 'Water',
            backgroundColor: 'rgba(0, 231, 255, 0.05)',
            borderColor: 'rgba(0, 231, 255, 0.7)',
            data: chartData.data,
            pointRadius: 6,
            pointBackgroundColor: '#00e7ff',
            pointHoverRadius: 8,
            pointBorderColor: '#000000'

          }]
        }

      },

      getValue(day) {

        let weekAffairs = this.$store.state.water.weekAffairs

        let affairs = weekAffairs[Object.keys(weekAffairs)[day]].affairs

        let durations = affairs.reduce( (prev, current) => {

          return prev + Number(current.duration)*Number(current.times)

        }, 0)

        return durations*this.consts.liters_per_min*this.consts.cost/1000
      },

      retreiveData(db) {

        db.collection('Data').where('type', '==', 'water').get().then( querySnapshot => {

          querySnapshot.forEach( doc => {

            let date = doc.data().date;
            let value = doc.data().value;

            this.dataCollection.labels.push(date);
            this.dataCollection.datasets[0].data.push(value);
            
          });

        }).catch( error => console.log(error))

      },

      retreiveConsts(db) {

        db.collection('consts').doc('Water').get().then( doc => {

          let data = doc.data();

          this.consts = {

              cost: data.cost,
              liters_per_min: data.field_1,

          }
        })
      },

      retreiveAffairs(db, weekAffairs) {

        db.collection('Affairs').where('type', '==', 'water').get().then( querySnapshot => {

          querySnapshot.forEach( doc => {

            let data = doc.data()

            this.$store.dispatch('loadAffair', {type: 'water', data: data})

            this.loaded = true
          })

          Object.keys(weekAffairs).forEach( (day, index) => {

            let value = this.getValue(index);

            this.weekData.datasets[0].data.push(value.toFixed(2))
            this.weekData.datasets[1].data.push( (value/this.consts.cost).toFixed(2) )

          })

          this.actionsCost(this.$store.state.water.weekAffairs);

        })
      },

      releaseWriteBack(writeBack, db) {

        writeBack.forEach( (data) => {

          db.collection('Data').doc(data.doc).set({

            type: data.values.type,
            date: data.values.date,
            value: data.values.value,
            day: data.values.day

          }).catch( (error) => console.log(error) )

        })

        this.$store.dispatch('clearWriteBack', {type: 'water'})
      },

      releaseAffairs(weekAffairs, db) {

        Object.keys(weekAffairs).forEach( (day) => {

          db.collection('Affairs').doc(day).set(weekAffairs[day])

        })

        this.$store.dispatch('clearAffairs', {type: 'water'})
      },

      actionsCost(weekAffairs) {

        let result = {}

        Object.keys(weekAffairs).forEach( (day) => {

          weekAffairs[day].affairs.forEach( affair => {

            let value = Number(affair.duration)*Number(affair.times)*this.consts.liters_per_min*this.consts.cost/1000

              if(result[affair.action] === undefined) {

                result[affair.action] = value

              } else {

                let v = Number(result[affair.action]) + value

                result[affair.action] = v

              }

          })

        })

        Object.keys(result).forEach( (action, index) => {

          this.actionData.labels.push(action)

          this.actionData.datasets[0].data.push(result[action])

          this.actionData.datasets[0].backgroundColor.push(`rgb(0, 231,  ${255 - 30*(index)})`)
        })

      },

    },

    computed: {

      weekAffairs() {

        return this.$store.state.water.weekAffairs

      }

    },

    name: 'water'
  }
</script>

<style scoped>

  .loading {

    width: 95%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #191919;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin: 20px auto;
    
  }

  #spinner {

    position: inherit;
    font-size: 60px;
    margin: auto;
    color: #a5a5a5;

  }

  .chart-wrapper {

    width: 100%;
    
  }

  .chart-grid {

    width: 100%;
    margin: 20px auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, auto);
    grid-gap: 20px 0px;
    justify-items: center;

  }

  .chart {

    width: 95%;
    background: #191919;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin: 0 auto;

  }

  #line {

    grid-column: 1/3;
    
  }

</style>
