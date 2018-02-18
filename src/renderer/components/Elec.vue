<template>
<div>
    <div v-if="loaded">
      <div class="chart-grid">
          <div id="line" class="chart-wrapper">
            <chart :chart-data="dataCollection" class="chart"></chart>
          </div>
          <div class="chart-wrapper">
            <bar :chart-data="barData" class="chart"></bar>
          </div>
          <div class="chart-wrapper">
            <doughnut :chart-data="actionData" class="chart"></doughnut>
          </div>
      </div>
    <calendar :weekAffairs="weekAffairs" :active="active">
      <form slot="form">
        <i class="fas fa-bolt" ></i>
        <div>
          <input v-model="consts.cost" type="text" name="cost" placeholder="€ per Kw/h">
          <i class="fas fa-euro-sign"></i>
        </div>
        <div >
          <input v-model="consts.number_devices" type="text" name="kW" placeholder="Nº of devices">
          <i class="fas fa-microchip"></i>
        </div>
        <input @click.prevent="submit()" id="submit" type="submit" name="cost" value="Submit">
      </form>
    </calendar>
  </div>
  <div class="loading" v-if="!loaded">
    <i id="spinner" class="fas fa-circle-notch fa-spin"></i>
  </div>
</div>
</template>

<script>
  import Line from './Charts/Line.js'
  import Bar from './Charts/Bar'
  import Doughnut from './Charts/Circle.js'

  import Modal from './Modals/Modal.vue'
  import Calendar from './Calendar.vue'

  export default {

    data () {

      return {

        active: 'elec',

        loaded: false,

        interval: null,

      };

    },

    components: {

      'chart': Line,
      'modal': Modal,
      'doughnut': Doughnut,
      'bar': Bar,
      'calendar': Calendar

    },

    created() {
    
      let payload = {db: this.$store.state.db, type: 'elec'}

      this.$store.dispatch('loadConsts', {db: this.$store.state.db, type: 'elec', doc: 'Elect'})

      this.$store.dispatch('loadData', payload)

      this.$store.dispatch('loadAffairs', payload)

      this.loaded = true;

      //this.start();
          
    },

    beforeDestroy() {

      let db = this.$store.state.db

      let writeBack = this.$store.state.water.writeBack

      let weekAffairs = this.$store.state['elec'].weekAffairs

      let consts = {

          cost: Number(this.consts.cost),
          field_1: Number(this.consts.number_devices)

      }

      db.collection('consts').doc('Elect').set(consts)

      //this.releaseWriteBack(writeBack, db);

      this.$store.dispatch('releaseAffairs', {db: db, type: 'elec'});

      window.clearInterval(this.interval)

    },

    methods: {

      start() {

        this.interval = window.setInterval( () => { 
          
          this.updateChart() 
          
        }, 10000)

      },

      submit: function() {

        let db = this.$store.state.db;

        let consts = {

          cost: Number(this.cost),
          field_1: Number(this.number_devices)

        }

        db.collection('consts').doc('Elect').set(consts) 

      },

      updateChart() {

        let date = new Date();

        let values = {

          type: 'water',

          day: date.getDay(),

          date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,

          value: this.getValue(date.getDay())

        }

        let payload = { type: 'elec', data: { doc:`${Date.now()}` , values } }

        let chartData = {data: this.dataCollection.datasets[0].data, labels: this.dataCollection.labels} 

        chartData.labels.push(values.date)
        chartData.data.push(values.value)
        
        this.$store.dispatch('updateWriteBack', payload)

        this.consts.last_value = values.value

        this.dataCollection = {

          labels: chartData.labels,
          datasets: [{

            label: 'Electricity',
            backgroundColor: 'rgba(255, 221, 0, 0.05)',
            borderColor: 'rgba(255, 221, 0, 0.7)',
            data: chartData.data,
            pointRadius: 6,
            pointBackgroundColor: '#ffdd00',
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

        this.$store.dispatch('clearWriteBack', {type: 'elec'})
      },
      
    },

    computed: {

     weekAffairs() {

        return this.$store.state['elec'].weekAffairs
      },

      consts() {

        return this.$store.state['elec'].consts
      },

      dataCollection() {

        return this.$store.state['elec'].dataCollection
      },

      barData() {

        return this.$store.state['elec'].weekData
      },

      actionData() {

        return this.$store.state['elec'].actionData
      }


    },

    name: 'elec'
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
    grid-template-rows: repeat(2, auto);
    grid-gap: 10px 0px;
    justify-items: center;

  }

  .chart {

    width: 95%;
    background: #191919;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin: 0 auto;

  }
</style>
