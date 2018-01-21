<template>
  <div>
    <div class="chart-wrapper">
      <chart :chart-data="datacollection" class="chart"></chart>
    </div>
    <div class="form-wrapper">
      <form>
        <i class="fas fa-tint"></i>
        <div class="to-animate">
          <input v-model="cost" type="text" name="cost" placeholder="€ per liter">
          <i class="fas fa-euro-sign"></i>
        </div>
        <div class="to-animate">
          <input v-model="number_showers" type="text" name="shower" placeholder="Nº of showers per day">
          <i class="fas fa-shower"></i>
        </div>
        <div class="to-animate">
          <input v-model="mean_time_shower" type="text" name="mean-showers" placeholder="Average time of shower">
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
  import Line from './Charts/Water.js'

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

        gradient: null,

        datacollection: {

          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{

            label: 'Water',
            backgroundColor: this.gradient,
            borderColor: '#00e7ff',
            data: [60, 55, 32, 10, 2, 12, 53, 0, 0, 0, 0, 0],
            pointRadius: 6,
            pointBackgroundColor: '#00e7ff',
            pointHoverRadius: 8,
            pointBorderColor: '#000000'

          }]
        }
      }

    },

    methods: {

      submit: function(){

        let db = this.$store.state.db;

        db.collection('consts').doc('Water').set({

          cost: Number(this.cost),
          field_1: Number(this.number_showers),
          field_2: Number(this.mean_time_shower),
          field_3: Number(this.number_other_sources),
          field_4: Number(this.outher_mean_time)

        })
      }
    },

    name: 'water'
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

  .fa-tint {

    position: static;
    margin: 15px auto;
    text-align: center;
    display: block;
    font-size: 40px;
    color: #00e7ff;
    
  }

</style>
