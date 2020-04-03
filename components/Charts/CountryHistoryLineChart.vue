<template>
  <line-chart
    v-if="loaded"
    :data="chartData"
    :options="chartOptions"
    :height="200"
  />
</template>

<script>
import { keys } from "lodash"
import LineChart from "@/charts/LineChart"

export default {
  components: {
    LineChart,
  },
  props: {
    country: {
      type: Object,
      default() {
        return {}
      },
    },
    historical: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      loaded: false,
      chartData: {
        datasets: [
          {
            label: "Cases",
            data: keys(this.historical.timeline.cases).map((key) => {
              return { x: key, y: this.historical.timeline.cases[key] }
            }),
            fill: false,
            borderColor: "rgb(100, 0, 200)",
          },
          {
            label: "Deaths",
            data: keys(this.historical.timeline.deaths).map((key) => {
              return { x: key, y: this.historical.timeline.deaths[key] }
            }),
            fill: false,
            borderColor: "rgb(255, 99, 132)",
          },
          // {
          //   label: "Recovered",
          //   data: keys(this.historical.timeline.recovered).map((key) => {
          //     return { x: key, y: this.historical.timeline.recovered[key] }
          //   }),
          //   fill: false,
          //   borderColor: "rgb(54, 162, 235)"
          // }
        ],
      },
      chartOptions: {
        responsive: true,
        title: {
          display: true,
          text: "Covid-19 State for " + this.country.country,
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                parser: "M/D/YY",
                tooltipFormat: "ll",
              },
              scaleLabel: {
                display: true,
                labelString: "Date",
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Total Cases / Recovered / Deaths Reported",
              },
            },
          ],
        },
      },
    }
  },
  mounted() {
    this.loaded = true
  },
}
</script>
