<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group label="Country">
          <b-form-input
            v-model="countryNameFilter"
            placeholder="Enter a country name"
            type="search"
            trim
          />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Sort by">
          <b-form-select
            v-model="sortByFilter"
            :options="sortByoptions"
            placeholder="None"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          v-if="countries.length > 0"
          striped
          hover
          :items="countries"
          :fields="tableFields"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="countryNameFilter"
          :sort-by.sync="sortByFilter"
          :sort-desc="true"
          outlined
          selectable
          @row-clicked="rowClicked"
        />
        <b-pagination
          v-if="countries.length > 0"
          v-model="currentPage"
          size="md"
          :total-rows="countries.length"
          :per-page="perPage"
          limit="7"
          first-number
          last-number
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    countries: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      countryNameFilter: null,
      sortByFilter: "cases",
      tableFields: [
        { key: "country", label: "Country" },
        { key: "cases", label: "Cases" },
        { key: "casesPerOneMillion", label: "Cases per 1m" },
        { key: "todayCases", label: "Cases today" },
        { key: "deaths", label: "Deaths" },
        { key: "todayDeaths", label: "Deaths today" },
        { key: "recovered", label: "Recovered" },
        { key: "active", label: "Active" },
        { key: "critical", label: "Critical" }
      ]
    }
  },
  computed: {
    sortByoptions() {
      const options = [
        { value: "cases", text: "Cases" },
        { value: "casesPerOneMillion", text: "Cases per 1m" },
        { value: "todayCases", text: "Today cases" },
        { value: "deaths", text: "Deaths" },
        { value: "todayDeaths", text: "Today deaths" },
        { value: "recovered", text: "Recovered" },
        { value: "active", text: "Active" },
        { value: "critical", text: "Critical" }
      ]
      return options
    }
  },
  methods: {
    rowClicked(item) {
      console.log(item)
    }
  }
}
</script>
