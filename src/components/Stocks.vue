<template>
  <div class="main-container">
    <div class="main-table">
      <h2>Stocks</h2>
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Stock</th>
          <th scope="col">Company</th>
          <th scope="col">Amount</th>
          <th scope="col">Price</th>
          <th scope="col">Buy/Sell</th>
        </tr>
        </thead>
        <tbody>
          <StockRow
              v-for="(stock, index) in stocks" :key="stock.id"
              v-bind:index="index"
              v-bind:stock="stock"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import StockRow from "@/components/StockRow";

export default {
name: "Stocks",
  components: {StockRow},
  data(){
    return{
      stocks: [
        {
          "id": 1,
          company: {
            "id": 4,
            "name": "Narodowy Bank Polski"
          },
          "name": "NBP",
          "price": "202.00",
          "avail_amount": 314
        },
        {
          "id": 2,
          company: {
            "id": 7,
            "name": "Telewizja Bolska"
          },
          "name": "TVP",
          "price": "3.00",
          "avail_amount": 62521
        },
        {
          "id": 3,
          company: {
            "id": 2,
            "name": "MałyMiękki"
          },
          "name": "MNCRFT",
          "price": "1242.00",
          "avail_amount": 88
        },
        {
          "id": 4,
          company: {
            "id": 4,
            "name": "Kasa Powszechna"
          },
          "name": "PKO",
          "price": "516.00",
          "avail_amount": 678
        },
        {
          "id": 5,
          company: {
            "id": 1,
            "name": "+18"
          },
          "name": "PRNHB",
          "price": "1500000.00",
          "avail_amount": 3
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>