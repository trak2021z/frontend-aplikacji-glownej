<template>
  <tr>
    <th scope="row"></th>
    <td>{{ stock.name }}</td>
    <td>
      <router-link :to="'/company/' + stock.company.pk">{{ stock.company.name }}</router-link>
    </td>
    <td>{{ stock_amount ? stock_amount : stock.avail_amount }}</td>
    <td>{{ stock.price }}</td>
    <td>
      <button v-on:click="$emit('buy-stock-clicked', stock.pk, stock.price)" class="btn-success">Buy</button>
      <button v-on:click="$emit('sell-stock-clicked', user_stock_id ? user_stock_id : stock.pk, stock.price)" class="btn-danger">Sell</button>
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
  props: ["index", "stock", "stock_amount", "user_stock_id"]
}
</script>

<style scoped>

</style>