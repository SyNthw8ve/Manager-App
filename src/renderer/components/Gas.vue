<template>
  <div>
    <div v-if="loaded">
      <div class="chart-wrapper">
        <chart :chart-data="dataCollection" class="chart"></chart>
      </div>
        <calendar :weekAffairs="weekAffairs">
          <form slot="form">
            <i class="fas fa-fire"></i>
            <div>
              <input v-model="consts.cost" type="text" name="cost" placeholder="€ per cubic meter">
              <i class="fas fa-euro-sign"></i>
            </div>
            <div>
              <input v-model="consts.number_showers" type="text" name="shower" placeholder="Nº of showers per day">
              <i class="fas fa-shower"></i>
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
  import Bar from './Charts/Bar.js'
  
  import Modal from './Modals/Modal.vue'
  import Calendar from './Calendar'
  
  export default {

    data () {

      return {

        consts: {

          cost: null,

          number_showers: null,

        },

        dataCollection: {

          labels: [],
          datasets: [{

            label: 'Gas',
            backgroundColor: 'rgba(255, 0, 102, 0.05)',
            borderColor: 'rgba(255, 0, 102, 0.7)',
            data: [],
            pointRadius: 6,
            pointBackgroundColor: '#ff0066',
            pointHoverRadius: 8,
            pointBorderColor: '#000000'

          }]
        },

      loaded: false,

      interval: null,

      activeData: {

          active: '',

          type: 'gas'

        }

      }
    },

    components: {

      'chart': Line,
      'modal': Modal,
      'bar': Bar,
      'calendar': Calendar

    },

    created() {
    
      let db = this.$store.state.db;

      let weekAffairs = this.$store.state.elecDataCollection.weekAffairs

      this.loaded = true

      //this.start();
          
    },

    beforeDestroy() {

      /*let db = this.$store.state.db

      let writeBack = this.$store.state.gasDataCollection.writeBack

      let consts = {

          cost: Number(this.consts.cost),
          field_1: Number(this.consts.number_showers),
          field_2: Number(this.consts.mean_time_shower),
          field_3: Number(this.consts.number_other_sources),
          field_4: Number(this.consts.outher_mean_time),
          last_value: this.consts.last_value 

      }

      db.collection('consts').doc('Gas').set(consts)

      writeBack.forEach( (data) => {

        db.collection('Data').doc(data.doc).set({

          type: data.values.type,
          date: data.values.date,
          value: data.values.value

        }).catch( (error) => console.log(error) )

      })

      this.$store.dispatch('clearWriteBack', {type: 'gas'})

      window.clearInterval(this.interval)*/

    },

    methods: {

      start() {

        this.interval = window.setInterval( () => { 
          
          this.submitValue() 
          
        }, 10000)

      },

      submit: function() {

        let db = this.$store.state.db;

        let consts = {

          cost: Number(this.consts.cost),
          field_1: Number(this.consts.number_showers),
          field_2: Number(this.consts.mean_time_shower),
          field_3: Number(this.consts.number_other_sources),
          field_4: Number(this.consts.outher_mean_time),
          last_value: this.consts.last_value 

        }

        db.collection('consts').doc('Gas').set(consts)

      },
      
      submitValue() {

        let date = new Date();

        let values = {

          type: 'gas',

          date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,

          value: this.consts.cost*(this.consts.number_showers*this.consts.mean_time_shower + this.consts.number_other_sources*this.consts.outher_mean_time) + this.consts.last_value

        }

        let payload = { type: 'gas', data: { doc:`${Date.now()}` , values } }

        let chartData = {data: this.dataCollection.datasets[0].data, labels: this.dataCollection.labels} 

        chartData.labels.push(values.date)
        chartData.data.push(values.value)
        
        this.$store.dispatch('updateWriteBack', payload)

        this.consts.last_value = values.value

        this.dataCollection = {

          labels: chartData.labels,
          datasets: [{

            label: 'Gas',
            backgroundColor: 'rgba(255, 0, 102, 0.05)',
            borderColor: 'rgba(255, 0, 102, 0.7)',
            data: chartData.data,
            pointRadius: 6,
            pointBackgroundColor: '#ff0066',
            pointHoverRadius: 8,
            pointBorderColor: '#000000'

          }]
        }

      },

      add(e) {

      this.activeData.active = e.target.parentElement.innerText

      this.$store.dispatch('showModal', {modal: true});

      },

    },

    computed: {

      weekAffairs() {

        return this.$store.state.gasDataCollection.weekAffairs
      }

    },

    name: 'gas'

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

  .affairs {

    overflow: auto;
    height: 150px;
    margin-top: 5px;
  }

  #spinner {

    position: inherit;
    font-size: 60px;
    margin: auto;

  }

  .chart-wrapper {

    width: 100%;

  }

  .chart {

    width: 95%;
    background: #191919;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin: 20px auto;

  }

  .fas, .far {

    position: relative;
    top: -28px;
    left: 14px;
    margin: 0;
    color: #a5a5a5;
    font-size: 20px;
    padding-right: 8px;

  }

  .fa-fire {

    position: static;
    margin: 15px auto;
    text-align: center;
    display: block;
    font-size: 40px;
    color: #ff0066;
    
  }


</style>
