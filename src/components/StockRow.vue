<template>
  <tr>
    <td>{{stockRow.name}}</td>
    <td>
      <router-link :to="'/company/' + stockRow.company.pk">{{ stockRow.company.name }}</router-link>
    </td>
    <td>{{ isUserStock ? stockRow.owned_amount : stockRow.avail_amount }}</td>
    <td>{{ stockRow.price }}</td>
    <td>
      <button v-on:click="onClick(false)" class="btn-success">Buy</button>
      <button v-if="isUserStock" v-on:click="onClick(true)" class="btn-danger">Sell</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "StockRow",
  methods: {
    onClick(isSell){
      this.$emit('stock-clicked', this.stockRow, isSell);
    }
  },
  computed: {
    stockRow: function () {
      if (this.isUserStock) {
        let unifiedStock = this.stock.stock;
        unifiedStock.owned_pk = this.stock.pk;
        unifiedStock.owned_amount = this.stock.stock_amount;

        return unifiedStock;
      }

      return this.stock;
    }
  },
  props: ["stock", "isUserStock"]
}
</script>

<style scoped>

</style>