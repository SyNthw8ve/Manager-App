import {Line, mixins} from 'vue-chartjs'

const { reactiveProp } = mixins

export default({

  extends: Line,

  mixins: [reactiveProp],

  props: ['chartData'],

  data () {

    return {

    }
  },

  mounted () {

    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(255, 0, 102, 0.9)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 102, 0.25)')
    this.gradient.addColorStop(1, 'rgba(255, 0, 102, 0)')

    this.chartData.datasets[0].backgroundColor = this.gradient;

    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})

  }
})
