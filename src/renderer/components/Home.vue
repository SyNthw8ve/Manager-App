<template>
  <div class="wrapper">
    <chart :chart-data="datacollection" class="chart"></chart>
  </div>
</template>

<script>

  import Doughnut from './Charts/Home.js'

  export default {

    data () {

      return {

        datacollection: {

        labels: ['Gas', 'Water', 'Electricity'],

        datasets: [
          {
            label: 'Average Use',
            backgroundColor: ['#ff0066', '#00e7ff', '#ffdd00'],
            hoverBackgroundColor: ['rgb(255, 0, 102)', 'rgb(0, 231, 255)', 'rgb(255, 221, 0)'],
            data: [60, 100, 42]
          }
        ]}

      };
    },

    components: {

      'chart': Doughnut

    },

    name: 'home'
  }
</script>

<style scoped>

  .wrapper {

    width: 100%;


  }

  .chart {

    width: 50%;
    background: #191919;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin: 20px auto;

  }

</style>
