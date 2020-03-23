<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Covid-19 Tracker</h1>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <h3>Cases: {{ numberWithComma(allCases.cases) }}</h3>
      </b-col>
      <b-col>
        <h3>Deaths: {{ numberWithComma(allCases.deaths) }}</h3>
      </b-col>
      <b-col>
        <h3>Recovered: {{ numberWithComma(allCases.recovered) }}</h3>
      </b-col>
    </b-row>
    <main-table :countries="countries" class="mt-4" />
    <p>Data last updated: {{ updatedCases }}</p>
  </b-container>
</template>

<script>
import MainTable from "@/components/MainTable.vue"
export default {
  components: {
    MainTable
  },
  async asyncData({ $axios }) {
    const allCases = await $axios.$get("https://corona.lmao.ninja/all")
    const countries = await $axios.$get("https://corona.lmao.ninja/countries")
    return { allCases, countries }
  },
  computed: {
    updatedCases() {
      const date = new Date(this.allCases.updated)
      return date.toTimeString()
    }
  },
  methods: {
    numberWithComma(num) {
      return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }
  }
}
</script>
