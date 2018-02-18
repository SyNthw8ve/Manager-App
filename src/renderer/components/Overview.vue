<template>
  <div>
    <div v-if="loaded" class="wrapper">
      <chart :chart-data="dataCollection" class="chart"></chart>
    </div>
    <div v-if="!loaded" class="loading">
      <i id="spinner" class="fas fa-circle-notch fa-spin"></i>
    </div>
  </div>
</template>

<script>

  import Doughnut from './Charts/Circle.js'

  export default {

    data () {

      return {

        dataCollection: {

          labels: ['Gas', 'Water', 'Electricity'],

          datasets: [{

              label: 'Average Use',
              backgroundColor: ['#725dfc', '#00e7ff', '#00ffb6'],
              borderWidth: 0,
              data: []

            }]
        },

        loaded: false,

      };
    },

    created() {

      let db = this.$store.state.db

      let dataSet = []

      db.collection('Data').where('type', '==', 'gas').get().then( querySnapshot => {

        let sum = querySnapshot.docs.reduce( (prev, doc) => { return prev + doc.data().value }, 0)

        dataSet.push( sum )

        db.collection('Data').where('type', '==', 'water').get().then( querySnapshot => {

          let sum = querySnapshot.docs.reduce( (prev, doc) => { return prev + doc.data().value }, 0)

          dataSet.push( sum )

          db.collection('Data').where('type', '==', 'elec').get().then( querySnapshot => {

            let sum = querySnapshot.docs.reduce( (prev, doc) => { return prev + doc.data().value }, 0)

            dataSet.push( sum )

            this.dataCollection.datasets[0].data = this.getPercent(dataSet);

            this.loaded = true;

          }).catch( error => console.log(error))

        }).catch( error => console.log(error))

      }).catch( error => console.log(error))
      
    },

    components: {

      'chart': Doughnut

    },

    methods: {

      getPercent(dataSet) {

        let total = dataSet.reduce( (prev, curr) => { return prev + curr}, 0)

        let percent = dataSet.map ( data => { return (data/total*100).toFixed(2) })

        return percent
      }

    },

    name: 'overview'
  }
</script>

<style scoped>

  .wrapper {

    width: 100%;

  }

  .chart {

    width: 50%;
    display: block;
    background: #191919;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin: 20px auto;

  }

  #spinner {

    position: static;
    font-size: 60px;
    margin: auto;
    color: #a5a5a5;

  }

   .loading {

    width: 50%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #191919;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin: 20px auto;
    
  }

</style>
