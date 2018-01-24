import {Doughnut, mixins} from 'vue-chartjs'

const { reactiveProp } = mixins

export default({

  extends: Doughnut,

  mixins: [reactiveProp],

  props: ['chartData'],

  data () {

    return {

    }
  },

  mounted () {

    //this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})

  }
})
