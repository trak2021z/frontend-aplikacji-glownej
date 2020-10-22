<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ stock.name }}</td>
    <td>{{stock.company.name}}</td>
    <td>{{stock.avail_amount}}</td>
    <td>{{stock.price}}</td>
    <td>
      <button class="btn-success">Buy</button>
      <button class="btn-danger">Sell</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "StockRow",
  data() {
    return {
    }
  },
  props: ["index", "stock"]
}
</script>

<style scoped>

</style>