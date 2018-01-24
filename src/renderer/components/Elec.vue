<template>
<div>
  <div v-if="loaded">
    <div class="chart-wrapper">
      <chart :chart-data="datacollection" class="chart"></chart>
    </div>
    <div class="form-wrapper">
        <form>
          <i class="fas fa-bolt" ></i>
          <div>
            <input v-model="cost" type="text" name="cost" placeholder="€ per Kw/h">
            <i class="fas fa-euro-sign"></i>
          </div>
          <div >
            <input v-model="number_devices" type="text" name="shower" placeholder="Nº of devices">
            <i class="fas fa-microchip"></i>
          </div>
          <div>
            <input v-model="mean_time_device" type="text" name="mean-showers" placeholder="Average time of use">
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
  import Line from './Charts/Elec.js'

  export default {

    data () {

      return {

        cost: null,

        number_devices: null,

        mean_time_device: null,

        number_other_sources: null,

        outher_mean_time: null,

        last_value: null,

        loaded: false,

        datacollection: null

      };

    },

    components: {

      'chart': Line

    },

    created() {
      
      let db = this.$store.state.db;

      db.collection('consts').doc('Elect').get().then( doc => {

        let data = doc.data();

        this.$store.dispatch('setConsts', {

          type: 'elec',
          consts: {

            cost: data.cost,
            number_devices: data.field_1,
            mean_time_device: data.field_2,
            number_other_sources: data.field_3,
            outher_mean_time: data.field_4,
            last_value: data.last_value

          }
        })

        this.cost = data.cost

        this.number_devices = data.field_1

        this.mean_time_device = data.field_2

        this.number_other_sources = data.field_3

        this.outher_mean_time = data.field_4

        this.loaded = true;

      })

      /*setInterval( () => {

        this.submitValue();
        this.updateChart();

      }, 5000)*/
    },

    methods: {

      submit: function() {

        let db = this.$store.state.db;

        let consts = {

          cost: Number(this.cost),
          field_1: Number(this.number_devices),
          field_2: Number(this.outher_mean_time),
          field_3: Number(this.number_other_sources),
          field_4: Number(this.outher_mean_time),
          last_value: this.last_value || 0

        }

        db.collection('consts').doc('Elect').set(consts) 

        this.$store.dispatch('setConsts', {

          type: 'elec',
          consts: consts

        })
      },

      submitValue: function(){

        let db = this.$store.state.db;

        let date = new Date();

        let start = Date.now();

        db.collection('Data').doc(`${start}`).set({

          type: 'elec',
          date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
          value: this.cost*(this.number_devices*this.mean_time_device + this.number_other_sources*this.outher_mean_time) + this.last_value

        })

        this.last_value = this.cost*(this.number_devices*this.mean_time_device + this.number_other_sources*this.outher_mean_time) + this.last_value

      },

      updateChart: function() {

        let db = this.$store.state.db;

        db.collection('Data').where('type', '==', 'elec').get().then( querySnapshot => {

          let labels = [];
          let data = [];

          querySnapshot.forEach( doc => {

            let date = doc.data().date;
            let value = doc.data().value;

            labels.push(date);
            data.push(value);
            
          });

          this.$store.dispatch('setData', {

          type: 'elec',
          data: data

          })

          this.$store.dispatch('setLabels', {

            type: 'elec',
            data: labels

          })
          
        }).catch( error => console.log(error))

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

    position: static;
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

  .fa-bolt {

    position: static;
    margin: 15px auto;
    text-align: center;
    display: block;
    font-size: 40px;
    color: #ffdd00;
    
   }  

</style>
