<template>
  <div class="main-container">
    <div class="main-table">
      <h2 v-if="company">{{ company.name }}</h2>

      <buy-sell-modal :is-visible="isBuySellModalVisible" :is-sell="isSellAction" :stock-row="selectedStock" @hide="closeModal"/>

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
        <stock-row
            v-for="stock in pageOfStocks" :key="stock.pk"
            :stock="stock"
            :is-user-stock="false"
            @stock-clicked="showBuySellModal"
        />
        </tbody>
      </table>
      <hr>
      <jw-pagination v-if="companyStocks" :items="companyStocks" @changePage="onChangePage" />
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import StockRow from "@/components/StockRow";
import BuySellModal from "@/components/BuySellModal";

export default {
  name: "Company",
  components: {StockRow, BuySellModal},
  data() {
    return {
      company: null,
      companyStocks: null,
      pageOfStocks: null,
      isComputing: false,
      isBuySellModalVisible: false,
      selectedStock: null,
      isSellAction: false,
    }
  },
  methods: {
    ...mapActions(["getCompanyAction"]),
    showBuySellModal(stock, isSell){
      this.selectedStock = stock;
      this.isSellAction = isSell;
      this.isBuySellModalVisible = true;
    },
    closeModal(){
      this.isBuySellModalVisible = false;
    },
    onChangePage(pageOfItems){
      this.pageOfStocks = pageOfItems;
    }
  },
  async created() {
    this.company = await this.getCompanyAction(this.$route.params.id);
    this.companyStocks = this.company.stocks;
  }
}
</script>