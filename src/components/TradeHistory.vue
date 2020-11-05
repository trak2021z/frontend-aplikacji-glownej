<template>
  <div class="main-container">
    <div class="vld-parent main-table">
      <h2>Trades History</h2>

      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!getTransactions">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Company</th>
              <th scope="col">Stock</th>
              <th scope="col">From Offer</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item) in pageOfTransactions" :key="item.id">
              <td>
                <span v-if="(item.buy === null && item. sell === null && item.is_sell === true) || item.sell !== null">sell</span>
                <span
                    v-if="(item.buy === null && item. sell === null && item.is_sell === false) || item.buy !== null">buy</span>
              </td>
              <td>{{ item.date }}</td>
              <td>
                <router-link :to="'/company/' + item.stock.company.pk">{{ item.stock.company.name }}</router-link>
              </td>
              <td>
                {{ item.stock.name }}
              </td>
              <td>
                <font-awesome-icon v-if="item.buy !== null || item.sell !== null" icon="check"/>
                <font-awesome-icon v-if="item.buy === null && item.sell === null" icon="times"/>
              </td>
              <td>{{ item.unit_price }}</td>
              <td>{{ item.amount }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <hr>
        <paginator :items="getTransactions" :maxPages="4" @changePage="onChangePage"/>
      </template>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Paginator from "@/components/Paginator";

export default {
  components: {Paginator},
  data() {
    return {
      isComputing: false,
      pageOfTransactions: null,
    }
  },
  methods: {
    ...mapActions(["getTransactionsAction"]),
    onChangePage(pageOfItems) {
      this.pageOfTransactions = pageOfItems;
    },
    formatDate(item) {
      const date = item.date.split('T')
      const time = date[1].split('.')
      item.date = date[0] + " " + time[0];
    }
  },
  computed: mapGetters(["getTransactions", "customLabels"]),
  async created() {
    this.isComputing = true;
    await this.getTransactionsAction();
    this.getTransactions.forEach(this.formatDate)
    this.getTransactions.reverse();
    this.isComputing = false;
  }
}
</script>