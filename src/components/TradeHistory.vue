<template>
  <div class="main-container">
    <div class="main-table">
      <h2>Trades History</h2>
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">Type</th>
          <th scope="col">Date</th>
          <th scope="col">Company</th>
          <th scope="col">Stock</th>
          <th scope="col">From Offer</th>
          <th scope="col">Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item) in trades.all" :key="item.id">
          <td>{{ item.type }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.stock }}</td>
          <td>
            <font-awesome-icon v-if="item.fromOffer === 'yes'" icon="check"/>
            <font-awesome-icon v-if="item.fromOffer !== 'yes'" icon="times"/>
          </td>
          <td>{{ item.price }}</td>
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
      trades: {
        all: [
          {
            "type": "sell",
            "date": "2020-10-20 11:11:11",
            "company": "First company",
            "stock": "stock first",
            "fromOffer": "yes",
            "price": 123.11
          },
          {
            "type": "sell",
            "date": "2020-10-20 11:11:11",
            "company": "Second company",
            "stock": "stock second",
            "fromOffer": "no",
            "price": 651.32
          },
          {
            "type": "sell",
            "date": "2020-10-20 11:11:11",
            "company": "First company",
            "stock": "stock first",
            "fromOffer": "yes",
            "price": 123.11
          },
          {
            "type": "sell",
            "date": "2020-10-20 11:11:11",
            "company": "Second company",
            "stock": "stock second",
            "fromOffer": "no",
            "price": 651.32
          },
          {
            "type": "sell",
            "date": "2020-10-20 11:11:11",
            "company": "First company",
            "stock": "stock first",
            "fromOffer": "yes",
            "price": 123.11
          },
          {
            "type": "sell",
            "date": "2020-10-20 11:11:11",
            "company": "Second company",
            "stock": "stock second",
            "fromOffer": "no",
            "price": 651.32
          }
        ]
      }
    }
  }
}
</script>