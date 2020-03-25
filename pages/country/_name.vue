<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>{{ country.country }} statistics</h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const country = await $axios.$get(
      "https://tracker-api.keirs.nl/countries/" + params.name
    )
    return { country }
  }
}
</script>
