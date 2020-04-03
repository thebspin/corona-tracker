<template>
  <b-container>
    <b-breadcrumb>
      <b-breadcrumb-item to="/">
        Home
      </b-breadcrumb-item>
      <b-breadcrumb-item active>{{ country.country }}</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <h1>{{ country.country }} statistics</h1>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="6" md="3">
        <h5>Cases: {{ country.cases | numberWithComma }}</h5>
        <h5>Cases today: {{ country.todayCases | numberWithComma }}</h5>
        <h5>
          Cases per million: {{ country.deathsPerOneMillion | numberWithComma }}
        </h5>
      </b-col>
      <b-col cols="6" md="3">
        <h5>Recovered: {{ country.recovered | numberWithComma }}</h5>
        <h5>Active: {{ country.active | numberWithComma }}</h5>
        <h5>Critical: {{ country.critical | numberWithComma }}</h5>
      </b-col>
      <b-col cols="6" md="3">
        <h5>Deaths: {{ country.deaths | numberWithComma }}</h5>
        <h5>Death today: {{ country.todayDeaths | numberWithComma }}</h5>
        <h5>
          Deaths per million:
          {{ country.deathsPerOneMillion | numberWithComma }}
        </h5>
      </b-col>
      <b-col cols="6" md="3">
        <country-total-pie-chart :country="country" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <country-history-line-chart
          :country="country"
          :historical="historical"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CountryTotalPieChart from "@/components/Charts/CountryTotalPieChart.vue"
import CountryHistoryLineChart from "@/components/Charts/CountryHistoryLineChart.vue"

export default {
  components: {
    CountryTotalPieChart,
    CountryHistoryLineChart,
  },
  async asyncData({ $axios, params }) {
    const country = await $axios.$get(
      "https://tracker-api.keirs.nl/countries/" + params.name
    )
    const historical = await $axios.$get(
      "https://tracker-api.keirs.nl/historical/" + params.name
    )
    return { country, historical }
  },
}
</script>

<style lang="scss" scoped>
h5 {
  line-height: 1.5;
}
</style>
