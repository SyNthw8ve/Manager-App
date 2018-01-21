<template>
<div>
  <div class="chart-wrapper">
    <chart :chart-data="datacollection" class="chart"></chart>
  </div>
  <div class="form-wrapper">
      <form>
        <i class="fas fa-bolt" ></i>
        <div class="to-animate">
          <input v-model="cost" type="text" name="cost" placeholder="€ per Kw/h">
          <i class="fas fa-euro-sign"></i>
        </div>
        <div class="to-animate">
          <input v-model="number_devices" type="text" name="shower" placeholder="Nº of devices">
          <i class="fas fa-microchip"></i>
        </div>
        <div class="to-animate">
          <input v-model="mean_time_device" type="text" name="mean-showers" placeholder="Average time of use">
          <i class="far fa-clock"></i>
        </div>
        <div class="to-animate">
          <input v-model="number_other_sources" type="text" name="outher-sources" placeholder="Nº of other sources of usage">
          <i class="fas fa-wrench"></i>
        </div>
        <div class="to-animate">
          <input v-model="outher_mean_time" type="text" name="mean-other" placeholder="Average time of use">
          <i class="far fa-clock"></i>
        </div>
        <input @click.prevent="submit()" id="submit" type="submit" name="cost" value="Submit">
      </form>
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

        gradient: null,

        datacollection: {

          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{

            label: 'Electricity',
            backgroundColor: this.gradient,
            borderColor: '#ffdd00',
            data: [60, 55, 32, 10, 2, 12, 53, 0, 0, 0, 0, 0],
            pointRadius: 6,
            pointBackgroundColor: '#ffdd00',
            pointHoverRadius: 8,
            pointBorderColor: '#000000'

          }]
        }
      };

    },

    components: {

      'chart': Line

    },

    methods: {

      submit: function() {

        let db = this.$store.state.db;

        db.collection('consts').doc('Elect').set({

          cost: Number(this.cost),
          field_1: Number(this.number_devices),
          field_2: Number(this.mean_time_device),
          field_3: Number(this.number_other_sources),
          field_4: Number(this.outher_mean_time)

        }) 
      }
    },

    name: 'elec'
  }
</script>

<style scoped>

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
