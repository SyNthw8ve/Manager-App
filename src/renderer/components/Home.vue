<template>
  <div>
    <chart class="chart"></chart>
  </div>
</template>

<script>
  import Doughnut from './Charts/Home.js'

  export default {
    components: {

      'chart': Doughnut
    },
    name: 'home'
  }
</script>

<style scoped>

  .chart {

      width: 50%;
      background: #212733;
      border-radius: 15px;
      box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
      margin: 20px 0;
      display: inline-block;
  }


</style>
