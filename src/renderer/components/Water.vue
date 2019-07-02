<template>
  <div>
    <div v-if="loaded">
      <div class="chart-grid">
          <div id="line" class="chart-wrapper">
            <chart :chart-data="dataCollection" class="chart"></chart>
          </div>
          <div class="chart-wrapper">
            <doughnut :chart-data="actionData" class="chart"></doughnut>
          </div>
          <div id="bar" class="chart-wrapper">
            <bar :chart-data="barData" class="chart"></bar>
          </div> 
        <calendar id="calendar" :weekAffairs="weekAffairs" :active="active">
          <form slot="form">
            <i class="fas fa-tint icon"></i>
            <div>
              <input v-model="consts.cost" type="text" name="cost" placeholder="€ per m^3">
              <i class="fas fa-euro-sign"></i>
            </div>
            <div>
              <input v-model="consts.var" type="text" name="liters" placeholder="Nº of m^3">
              <i class="fas fa-shower"></i>
            </div>
            <input @click.prevent="submit()" id="submit" type="submit" name="cost" value="Submit">
          </form>
        </calendar>
      </div>
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

        active: { comp: 'water', color: "#00e7ff" },

        loaded: false,

        interval: null,

    }

  },

    created() {

      this.$store.dispatch('loadConsts', {db: this.$store.state.db, type: 'water', doc: 'Water'})

      this.$store.dispatch('loadData', {db: this.$store.state.db, type: 'water'})

      this.$store.dispatch('loadAffairs', {db: this.$store.state.db, type: 'water', doc: 'Affairs'})

      this.loaded = true;

      //this.start();

    },

    beforeDestroy() {

      let db = this.$store.state.db

      let writeBack = this.$store.state.water.writeBack

      let weekAffairs = this.$store.state['water'].weekAffairs

      let consts = {

          cost: Number(this.consts.cost),
          field_1: Number(this.consts.var),

      }

      db.collection('consts').doc('Water').set(consts)

      //this.releaseWriteBack(writeBack, db);

      this.$store.dispatch('releaseAffairs', {db: db, type: 'water', doc: 'Affairs'})

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
          field_1: Number(this.consts.var)

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

    },

    computed: {

      weekAffairs() {

        return this.$store.state['water'].weekAffairs
      },

      consts() {

        return this.$store.state['water'].consts
      },

      dataCollection() {

        return this.$store.state['water'].dataCollection
      },

      barData() {

        return this.$store.state['water'].weekData
      },

      actionData() {

        return this.$store.state['water'].actionData
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
    margin: 0;
  }

  .chart-grid {

    width: 98%;
    margin: 20px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, auto);
    grid-gap: 10px;

  }

  .chart {

    width: 100%;
    background: #191919;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    
  }

  #line {

    grid-column: 1/4;
  }

  #bar {

    grid-column: 1/2;
  }

  #calendar {

    grid-column: 2/4;
    grid-row: 2/5;
  }
</style>
