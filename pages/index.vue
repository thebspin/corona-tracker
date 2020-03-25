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
        <h3 class="text-center">
          Deaths: {{ numberWithComma(allCases.deaths) }}
        </h3>
      </b-col>
      <b-col>
        <h3 class="text-right">
          Recovered: {{ numberWithComma(allCases.recovered) }}
        </h3>
      </b-col>
    </b-row>
    <main-table
      v-if="countries.length > 0"
      :countries="countries"
      class="mt-4"
    />
    <p v-else>The database is currently unreachable</p>
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
    const allCases = await $axios.$get("https://tracker-api.keirs.nl/all")
    const countries = await $axios.$get(
      "https://tracker-api.keirs.nl/countries"
    )
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
