<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ stock.name }}</td>
    <td>{{ stock.company.name }}</td>
    <td>{{ stock_amount ? stock_amount : stock.avail_amount }}</td>
    <td>{{ stock.price }}</td>
    <td>
      <button v-on:click="$emit('buy-stock-clicked', stock.pk, stock.price)" class="btn-success">Buy</button>
      <button v-on:click="$emit('sell-stock-clicked', stock.pk, stock.price)" class="btn-danger">Sell</button>
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
  props: ["index", "stock", "stock_amount"]
}
</script>

<style scoped>

</style>