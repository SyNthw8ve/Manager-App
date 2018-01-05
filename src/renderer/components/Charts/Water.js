import {Line} from 'vue-chartjs'

export default({
  extends: Line,

  data () {
    return {
      gradient: null
    }
  },

  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
    this.gradient.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Water',
          backgroundColor: this.gradient,
          data: [60, 55, 32, 10, 2, 12, 53, 0, 0, 0, 0, 0],
          pointRadius: 6,
          pointBackgroundColor: '#00e7ff',
          pointHoverRadius: 8,
          pointBorderColor: '#000000'
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})
