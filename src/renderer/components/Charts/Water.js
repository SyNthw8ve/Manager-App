import {Line, mixins} from 'vue-chartjs'

export default({

  extends: Line,

  data () {

    return {

      datacollection: {

        labels: [],
        datasets: [{

          label: 'Water',
          backgroundColor: this.gradient,
          borderColor: '#00e7ff',
          data: [],
          pointRadius: 6,
          pointBackgroundColor: '#00e7ff',
          pointHoverRadius: 8,
          pointBorderColor: '#000000'

        }]
      }
    }

  },

  mounted() {

    let db = this.$store.state.db;

    db.collection('Data').where('type', '==', 'water').get().then( querySnapshot => {

      let data = []
      let labels = []

      querySnapshot.forEach( doc => {

        let date = doc.data().date;
        let value = doc.data().value;

        labels.push(date);
        data.push(value);
        
      });

      this.$store.dispatch('setData', {

        type: 'water',
        data: data

      })

      this.$store.dispatch('setLabels', {

        type: 'water',
        data: labels

      })

      this.datacollection = this.$store.state.waterDataCollection.datacollection;

      this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

      this.gradient.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
      this.gradient.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
      this.gradient.addColorStop(1, 'rgba(0, 231, 255, 0)')

      this.datacollection.datasets[0].backgroundColor = this.gradient;

      this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})

    }).catch( error => console.log(error))

  },

})
