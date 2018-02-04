<template>
<div>
  <div v-if="loaded">
    <div class="chart-wrapper">
      <chart :chart-data="dataCollection" class="chart"></chart>
    </div>
    <div class="options-wrapper">
      <div class="form-wrapper">
          <form>
            <i class="fas fa-fire"></i>
            <div>
              <input v-model="consts.cost" type="text" name="cost" placeholder="€ per cubic meter">
              <i class="fas fa-euro-sign"></i>
            </div>
            <div>
              <input v-model="consts.number_showers" type="text" name="shower" placeholder="Nº of showers per day">
              <i class="fas fa-shower"></i>
            </div>
            <div>
              <input v-model="consts.mean_time_shower" type="text" name="mean-showers" placeholder="Average time of shower">
              <i class="far fa-clock"></i>
            </div>
            <div>
              <input v-model="consts.number_other_sources" type="text" name="outher-sources" placeholder="Nº of other sources of usage">
              <i class="fas fa-wrench"></i>
            </div>
            <div>
              <input v-model="consts.outher_mean_time" type="text" name="mean-other" placeholder="Average time of use">
              <i class="far fa-clock"></i>
            </div>
            <input @click.prevent="submit()" id="submit" type="submit" name="cost" value="Submit">
          </form>
        </div>
        <div class="calendar">
         <div class="day">
            <span>Monday <i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.monday.affairs">{{affair.action}} {{affair.time}} {{affair.number_times}}</li>
              </ul>
            </div>
          </div>
          <div class="day">
            <span>Thuesday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.thuesday.affairs">{{affair.action}}{{affair.time}}{{affair.number_times}}</li>
              </ul>
            </div>
          </div>
          <div class="day">
            <span>Wednesday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.wednesday.affairs">{{affair.action}}{{affair.time}}{{affair.number_times}}</li>
              </ul>
            </div>
          </div>
          <div class="day">
            <span>Thursday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.thursday.affairs">{{affair.action}}{{affair.time}}{{affair.number_times}}</li>
              </ul>
            </div>
          </div>
          <div class="day">
            <span>Friday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.friday.affairs">{{affair.action}}{{affair.time}}{{affair.number_times}}</li>
              </ul>
            </div>
          </div>
          <div class="day">
            <span>Saturday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.saturday.affairs">{{affair.action}}{{affair.time}}{{affair.number_times}}</li>
              </ul>
            </div>  
          </div>
          <div class="day">
            <span>Sunday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.sunday.affairs">{{affair.action}}{{affair.time}}{{affair.number_times}}</li>
              </ul>
            </div>
          </div>
        </div>
        <modal :activeData="activeData"></modal>
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
  import Modal from './Modals/Modal.vue'
  
  export default {

    data () {

      return {

        consts: {

          cost: null,

          number_showers: null,

          mean_time_shower: null,

          number_other_sources: null,

          outher_mean_time: null,

          last_value: 0

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
      'bar': Bar

    },

    created() {
    
      let db = this.$store.state.db;

      let weekAffairs = this.$store.state.elecDataCollection.weekAffairs

      this.loaded = true

      //this.start();
          
    },

    beforeDestroy() {

      let db = this.$store.state.db

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

      window.clearInterval(this.interval)

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

  .options-wrapper {

    display: flex;
    
  }

  .calendar {

    width: 80%;
    margin: 20px auto;
    margin-right: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 250px);
    grid-gap: 10px;
    justify-items: center;

  }

  .day {

    background-color: #191919;
    width: 85%;
    padding: 10px;
    text-align: center;
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);

  }

  .day span {

    background-color: #282828;
    box-shadow: 2px 2px 5px 1px rgba(255, 0, 102, 0.75);
    display: block;
    color: #ccc ;
    font-weight: 300;
    margin: 0;
    padding: 5px;
  }

  .affairs {

    overflow: auto;
    height: 150px;
    margin-top: 5px;
  }

  .day i.add {

    float: right;
    cursor: pointer;
    position: relative;
    top: 0px;
    left: 0px;

  }

  .day ul {

    list-style: none;
    margin-top: 5px;
    padding: 0;
    text-align: left;
    
  }

  .day li {

    margin-bottom: 5px;
    color: white;
    font-weight: 300;
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

  .form-wrapper {

    background-color: #191919;
    margin: 20px 25px;
    margin-right: 10px;
    display: flex;
    align-content: center;
    width: 45%;
    height: 40%;

  }

  .form-wrapper input {

    margin: 0px auto;
    padding: 10px 50px;
    width: 200px;
    color: white;
    font-size: 14px;
    display: block;
    background-color: #282828;
    box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
    border: none;

  }


  .form-wrapper form input:focus {

    outline: none;
    
  }

  .form-wrapper form {

    margin: 20px auto;
    display: inline-block;

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

  #submit {

    color: #a5a5a5;
    cursor: pointer;
    box-shadow: 9px 11px 14px 0px rgba(0,0,0,0.75);

  }

  #submit:hover {

    background-color: #191919;

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
