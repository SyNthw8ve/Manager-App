<template>
  <section id="left-display">
    <div class="chart">
      <component v-bind:is="component"></component>
    </div>
  </section>
</template>

<script>
  import Water from './Water.vue'

  import Home from './Home.vue'

  import { bus } from '../main'

  export default {
    components: {
      'home': Home,
      'water': Water
    },

    data () {
      return {

        component: 'home'
      }
    },

    name: 'mainContent',

    created () {
      bus.$on('chartChanged', (data) => {
        this.component = data
      })
    }
  }
</script>

<style scoped>

  #left-display{

    width: 76.7%;
    height: 640px;
    margin: 0;
    overflow-y: auto;
  }

  .chart{

    background: #212733;
    border-radius: 15px;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin: 20px 20px 0px 20px;

  }

</style>
