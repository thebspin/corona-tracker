<template>
  <pie-chart
    v-if="loaded"
    :data="chartData"
    :options="chartOptions"
    :height="200"
  />
</template>

<script>
import PieChart from "@/charts/PieChart"

export default {
  components: {
    PieChart
  },
  props: {
    country: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: ["Deaths", "Recovered", "Active"],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)"
            ]
          }
        ]
      },
      chartOptions: {}
    }
  },
  mounted() {
    this.chartData.datasets[0].data = [
      this.country.deaths,
      this.country.recovered,
      this.country.active
    ]
    this.loaded = true
  }
}
</script>
