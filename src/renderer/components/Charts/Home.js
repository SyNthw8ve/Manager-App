import {Doughnut} from 'vue-chartjs'

export default({
  extends: Doughnut,

  data () {
    return {
      gasGradient: null,
      waterGradient: null,
      elecGradient: null
    }
  },

  mounted () {
    this.gasGradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gasGradient.addColorStop(0, 'rgba(255, 0, 102, 0.9)')
    this.gasGradient.addColorStop(0.5, 'rgba(255, 0, 102, 0.25)')
    this.gasGradient.addColorStop(1, 'rgba(255, 0, 102, 0)')

    this.waterGradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.waterGradient.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.waterGradient.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
    this.waterGradient.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.elecGradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.elecGradient.addColorStop(0, 'rgba(255, 221, 0, 0.9)')
    this.elecGradient.addColorStop(0.5, 'rgba(255, 221, 0, 0.25)')
    this.elecGradient.addColorStop(1, 'rgba(255, 221, 0, 0)')

    this.renderChart({
      labels: ['Gas', 'Water', 'Electricity'],
      datasets: [
        {
          label: 'Average Use',
          backgroundColor: [this.gasGradient, this.waterGradient, this.elecGradient],
          hoverBackgroundColor: ['rgb(255, 0, 102)', 'rgb(0, 231, 255)', 'rgb(255, 221, 0)'],
          data: [60, 100, 42]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})
