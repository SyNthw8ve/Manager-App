<template>
  <div>
    <div v-if="loaded">
      <div class="chart-wrapper">
        <chart :chart-data="datacollection" v-on:loaded="load" class="chart"></chart>
      </div>
      <div class="form-wrapper">
        <form>
          <i class="fas fa-tint"></i>
          <div >
            <input v-model="cost" type="text" name="cost" placeholder="€ per liter">
            <i class="fas fa-euro-sign"></i>
          </div>
          <div >
            <input v-model="number_showers" type="text" name="shower" placeholder="Nº of showers per day">
            <i class="fas fa-shower"></i>
          </div>
          <div >
            <input v-model="mean_time_shower" type="text" name="mean-showers" placeholder="Average time of shower">
            <i class="far fa-clock"></i>
          </div>
          <div >
            <input v-model="number_other_sources" type="text" name="outher-sources" placeholder="Nº of other sources of usage">
            <i class="fas fa-wrench"></i>
          </div>
          <div >
            <input v-model="outher_mean_time" type="text" name="mean-other" placeholder="Average time of use">
            <i class="far fa-clock"></i>
          </div>
          <input @click.prevent="submit()" id="submit" type="submit" name="cost" value="Submit">
        </form>
      </div>
    </div>
    <div class="loading" v-if="!loaded">
      <i id="spinner" class="fas fa-circle-notch fa-spin"></i>
    </div>
  </div>
</template>

<script>

  import Line from './Charts/Water.js'
  import { error } from 'util';
  import { setInterval } from 'timers';

  export default {
    
    components: {

      'chart': Line

    },

    data () {

      return {

        cost: null,

        number_showers: null,

        mean_time_shower: null,

        number_other_sources: null,

        outher_mean_time: null,

        loaded: true,

        last_value: 0,

        datacollection: {}
      }

    },

    created() {
    
      let db = this.$store.state.db;

      db.collection('consts').doc('Water').get().then( doc => {

        let data = doc.data();

        this.$store.dispatch('setConsts', {

          type: 'water',
          consts: {

            cost: data.cost,
            number_showers: data.field_1,
            mean_time_shower: data.field_2,
            number_other_sources: data.field_3,
            outher_mean_time: data.field_4,
            last_value: data.last_value

          }
        })

        this.cost = data.cost

        this.number_showers = data.field_1

        this.mean_time_shower = data.field_2

        this.number_other_sources = data.field_3

        this.outher_mean_time = data.field_4

      })

      /*setInterval( () => {

        this.submitValue();
        this.updateChart();

      }, 5000)*/
    },


    methods: {

      submit: function(){

        let db = this.$store.state.db;

        let consts = {

          cost: Number(this.cost),
          field_1: Number(this.number_showers),
          field_2: Number(this.mean_time_shower),
          field_3: Number(this.number_other_sources),
          field_4: Number(this.outher_mean_time),
          last_value: this.last_value || 0

        }

        db.collection('consts').doc('Water').set(consts)

        this.$store.dispatch('setConsts', {

          type: 'water',
          consts: consts

        })

      },

      submitValue: function(){

        let db = this.$store.state.db;

        let date = new Date();

        let start = Date.now();

        db.collection('Data').doc(`${start}`).set({

          type: 'water',
          date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
          value: this.cost*(this.number_showers*this.mean_time_shower + this.number_other_sources*this.outher_mean_time) + this.last_value

        })

        this.last_value = this.cost*(this.number_showers*this.mean_time_shower + this.number_other_sources*this.outher_mean_time) + this.last_value

      },

      updateChart: function() {

        let db = this.$store.state.db;

        db.collection('Data').where('type', '==', 'water').get().then( querySnapshot => {

          let labels = [];
          let data = [];

          querySnapshot.forEach( doc => {

            let date = doc.data().date;
            let value = doc.data().value;

            labels.push(date);
            data.push(value);
            
          });

          this.$store.dispatch('setData', {

          type: 'water',
          data: data

          })

          this.$store.dispatch('setLabels', {

            type: 'water',
            data: labels

          })
          
        }).catch( error => console.log(error))

      },

      load() {

        console.log('hello')

        this.loaded = true;
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
    display: flex;
    align-content: center;
    width: 40%;
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

  .fa-tint {

    position: static;
    margin: 15px auto;
    text-align: center;
    display: block;
    font-size: 40px;
    color: #00e7ff;
    
  }


</style>
