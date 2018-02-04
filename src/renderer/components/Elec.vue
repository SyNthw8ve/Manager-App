<template>
<div>
  <div v-if="loaded">
    <div class="chart-wrapper">
      <chart :chart-data="dataCollection" class="chart"></chart>
    </div>
    <div class="calendar">
      <div class="day">
          <form>
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
        </div>
      <div class="day">
            <span>Monday <i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.monday.affairs"> 
                  <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                    <i @click="remove('monday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                  </span> 
                </li>
              </ul>    
            </div>
          </div>
          <div class="day">
            <span>Thuesday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.thuesday.affairs"> 
                  <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                    <i @click="remove('thuesday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                  </span> 
                </li>
              </ul>    
            </div>
          </div>
          <div class="day">
            <span>Wednesday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.wednesday.affairs"> 
                  <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                    <i @click="remove('wednesday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                  </span> 
                </li>
              </ul>    
            </div>
          </div>
          <div class="day">
            <span>Thursday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.thursday.affairs"> 
                  <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                    <i @click="remove('thursday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                  </span> 
                </li>
              </ul>    
            </div>
          </div>
          <div class="day">
            <span>Friday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.friday.affairs"> 
                  <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                    <i @click="remove('friday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                  </span> 
                </li>
              </ul>    
            </div>
          </div>
          <div class="day">
            <span>Saturday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.saturday.affairs"> 
                  <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                    <i @click="remove('saturday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                  </span> 
                </li>
              </ul>    
            </div>
          </div>
          <div class="day">
            <span>Sunday<i @click="add($event)" class="add fas fa-plus"></i></span>
            <div class="affairs">
              <ul>
                <li v-for="affair in weekAffairs.sunday.affairs"> 
                  <span class="affair-info">{{affair.action}} {{affair.duration}} {{affair.times}} 
                    <i @click="remove('sunday', {action: affair.action, duration: affair.duration, times: affair.times})" class="fas fa-minus-square remove-btn"></i>
                  </span> 
                </li>
              </ul>    
            </div>
          </div>
        </div>
        <modal :activeData="activeData"></modal>
        <div class="chart-wrapper">
          <bar :chart-data="weekData" class="chart"></bar>
        </div>
  </div>
  <div class="loading" v-if="!loaded">
    <i id="spinner" class="fas fa-circle-notch fa-spin"></i>
  </div>
</div>
</template>

<script>
  import Line from './Charts/Line.js'
  import Modal from './Modals/Modal.vue'
  import Bar from './Charts/Bar'

  export default {

    data () {

      return {

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

        loaded: false,

        interval: null,

        activeData: {

          active: '',

          type: 'elec'

        }
      };

    },

    components: {

      'chart': Line,
      'modal': Modal,
      'bar': Bar

    },

    created() {
    
      let db = this.$store.state.db;

      let weekAffairs = this.$store.state.elecDataCollection.weekAffairs

      this.retreiveData(db);

      this.retreiveConsts(db);

      this.retreiveAffairs(db, weekAffairs);

      //this.start();
          
    },

    beforeDestroy() {

      let db = this.$store.state.db

      let writeBack = this.$store.state.elecDataCollection.writeBack

      let weekAffairs = this.$store.state.elecDataCollection.weekAffairs

      let consts = {

          cost: Number(this.consts.cost),
          field_1: Number(this.consts.number_devices)

      }

      db.collection('consts').doc('Elect').set(consts)

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

      add(e) {

      this.activeData.active = e.target.parentElement.innerText

      this.$store.dispatch('showModal', {modal: true});

      },

      getValue(day) {

        let weekAffairs = this.$store.state.elecDataCollection.weekAffairs

        let affairs = weekAffairs[Object.keys(weekAffairs)[day]].affairs

        let durations = affairs.reduce( (prev, current) => {

          return prev + Number(current.duration)*Number(current.times)

        }, 0)

        return durations/60*this.consts.number_devices*this.consts.cost
      },

      retreiveData(db) {

        db.collection('Data').where('type', '==', 'elec').get().then( querySnapshot => {

          querySnapshot.forEach( doc => {

            let date = doc.data().date;
            let value = doc.data().value;

            this.dataCollection.labels.push(date);
            this.dataCollection.datasets[0].data.push(value);
            
          });

        }).catch( error => console.log(error))

      },

      retreiveConsts(db) {

        db.collection('consts').doc('Elect').get().then( doc => {

          let data = doc.data();

          this.consts = {

              cost: data.cost,
              number_devices: data.field_1,

          }
        })
      },

      retreiveAffairs(db, weekAffairs) {

        db.collection('Affairs1').where('type', '==', 'elec').get().then( querySnapshot => {

          querySnapshot.forEach( doc => {

            let data = doc.data()

            this.$store.dispatch('loadAffair', {type: 'elec', data: data})

            this.loaded = true

          })

          Object.keys(weekAffairs).forEach( (day, index) => {

            let value = this.getValue(index);

            this.weekData.datasets[0].data.push(value.toFixed(2))
            this.weekData.datasets[1].data.push( (value/this.consts.cost).toFixed(2) )

          })

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

        this.$store.dispatch('clearWriteBack', {type: 'elec'})
      },

      releaseAffairs(weekAffairs, db) {

        Object.keys(weekAffairs).forEach( (day) => {

          db.collection('Affairs1').doc(day).set(weekAffairs[day])

        })

        this.$store.dispatch('clearAffairs', {type: 'elec'})
      },

      remove(day, affair) {

        console.log(day, affair)

        this.$store.dispatch('removeAffair', {type: 'elec', day: day, affair: affair})

      }
      
    },

    computed: {

      weekAffairs() {

        return this.$store.state.elecDataCollection.weekAffairs
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

  .calendar {

    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 250px);
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

  .day span {

    background-color: #282828;
    box-shadow: 2px 2px 5px 1px rgba(255, 221, 0, 0.75);
    display: block;
    color: #ccc ;
    font-weight: 300;
    margin: 0;
    padding: 5px;

  }


  #spinner {

    position: static;
    font-size: 60px;
    margin: auto;

  }

  .calendar .day span.affair-info {

    display: block;
    width: 95%;
    box-shadow: 0px 0px 0px 0px;


  }

  .calendar .day i.remove-btn {

   
    position: static;
    float: right;
    cursor: pointer;

  }

  .calendar .day i.remove-btn:hover {

    color: #ffdd00;

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


  .day input {

    margin: auto;
    padding: 10px 40px;
    color: white;
    font-size: 14px;
    display: block;
    background-color: #282828;
    box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
    border: none;
    box-sizing: border-box;

  }


  .day form input:focus {

    outline: none;
    
  }

  .day form {

    display: block;

  }

  .fas, .far {

    position: relative;
    top: -28px;
    right: 98px;
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

  .fa-bolt {

    position: static;
    margin: 15px auto;
    text-align: center;
    display: block;
    font-size: 40px;
    color: #ffdd00;
    
   }  

</style>
