import {Line, mixins} from 'vue-chartjs'

export default({

  extends: Line,

  data () {

    return {

      datacollection: {

        labels: [],
        datasets: [{

          label: 'Electricity',
          backgroundColor: this.gradient,
          borderColor: '#ffdd00',
          data: [],
          pointRadius: 6,
          pointBackgroundColor: '#ffdd00',
          pointHoverRadius: 8,
          pointBorderColor: '#000000'

        }]
      }
    }

  },

  mounted () {

    let db = this.$store.state.db;

    db.collection('Data').where('type', '==', 'elec').get().then( querySnapshot => {

      let data = []
      let labels = []

      querySnapshot.forEach( doc => {

        let date = doc.data().date;
        let value = doc.data().value;

        labels.push(date);
        data.push(value);
        
      });

      this.$store.dispatch('setData', {

        type: 'elec',
        data: data

      })

      this.$store.dispatch('setLabels', {

        type: 'elec',
        data: labels

      })

      this.datacollection = this.$store.state.elecDataCollection.datacollection;


      this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

      this.gradient.addColorStop(0, 'rgba(255, 221, 0, 0.9)')
      this.gradient.addColorStop(0.5, 'rgba(255, 221, 0, 0.25)')
      this.gradient.addColorStop(1, 'rgba(255, 221, 0, 0)')

      this.datacollection.datasets[0].backgroundColor = this.gradient;

      this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})

    }).catch( error => console.log(error))
    
  }
})
