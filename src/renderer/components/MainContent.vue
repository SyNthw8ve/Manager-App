<template>
  <section id="left-display">
      <router-view></router-view>
  </section>
</template>

<script>

  import { bus } from '../main'

  export default {
    components: {

    },

    data () {
      return {

        
      }
    },

    created() {

      bus.$on('slideOn', () => {

        document.getElementById('left-display').classList.toggle('active')

      })
    },

    name: 'mainContent',

  }
</script>

<style scoped>

  #left-display {

    width: 100%;
    height: 100%;
    margin: 0;
    overflow-y: auto;
    transition: .4s;
    
  }

  #left-display.active {

    margin-left: 250px;
  }

</style>
