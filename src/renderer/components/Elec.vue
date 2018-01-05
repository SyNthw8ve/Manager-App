<template>
  <div>
    <chart class="chart"></chart>
  </div>
</template>

<script>
  import Line from './Charts/Elec.js'

  export default {
    components: {

      'chart': Line
    },
    name: 'elec'
  }
</script>

<style>
  .chart {

    width: 100%;
    background: #212733;
    border-radius: 15px;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin: 20px 0;
    display: inline-block;

  }
</style>
