import {Bar, mixins} from 'vue-chartjs'

const { reactiveProp } = mixins

export default({

  extends: Bar,

  mixins: [reactiveProp],

  data () {
    return {

      options: {

        scales: {

          xAxes: [{

            barThickness: 20

          }]
        },
        responsive: true,
        maintainAspectRatio: false
      }

    }
  },

  mounted () {
    this.renderChart(this.chartData, this.options)
  }

})
