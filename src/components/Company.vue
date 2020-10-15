<template>
  <div class="main-container">
    <div class="main-table">
      <h2>Company Name</h2>
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Stock Name</th>
          <th scope="col">Stock Price</th>
          <th scope="col">Show Stock</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in companyStocks.items" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.stockName }}</td>
          <td>{{ item.stockPrice }}</td>
          <td>
            <router-link to="/">
              <font-awesome-icon icon="search-plus"/>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companyStocks: {
        items: [
          {
            "stockName": "nazwaAkcji",
            "stockPrice": 320
          },
          {
            "stockName": "nazwaAkcji",
            "stockPrice": 320
          },
          {
            "stockName": "nazwaAkcji",
            "stockPrice": 320
          },
        ]
      }
    }
  }
}
</script>