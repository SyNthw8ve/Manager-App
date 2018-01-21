<template>
  <section id="left-display">
      <router-view></router-view>
  </section>
</template>

<script>

  export default {
    components: {

    },

    data () {
      return {

        
      }
    },

    name: 'mainContent',

  }
</script>

<style scoped>

  #left-display{

    width: 76.7%;
    height: 91%;
    margin: 0;
    overflow-y: auto;
    
  }

</style>
