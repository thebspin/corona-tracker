<template>
  <p>
    {{ country }}
  </p>
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
