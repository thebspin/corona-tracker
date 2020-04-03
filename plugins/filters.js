import Vue from "vue"

export default () => {
  Vue.filter("numberWithComma", function (value) {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  })
}
