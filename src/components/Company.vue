<template>
  <div class="main-container">
    <div class="main-table">
      <h2 v-if="company">{{ company.name }}</h2>

      <buy-modal :is_visible="isBuyModalVisible" :stock_id="selectedStockId" :stock_price="selectedStockPrice" @hide="closeModals"/>
      <sell-modal :is_visible="isSellModalVisible" :stock_id="selectedStockId" :stock_price="selectedStockPrice" @hide="closeModals"/>

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
            v-for="(stock, index) in pageOfStocks" :key="stock.pk"
            v-bind:index="index"
            v-bind:stock="stock"
            @buy-stock-clicked="showBuyModal"
            @sell-stock-clicked="showSellModal"
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
import BuyModal from "@/components/BuyModal";
import SellModal from "@/components/SellModal";

export default {
  name: "Company",
  components: {StockRow, BuyModal, SellModal},
  data() {
    return {
      company: null,
      companyStocks: null,
      pageOfStocks: null,
      selectedStockId: null,
      selectedStockPrice: null,
      isBuyModalVisible: false,
      isSellModalVisible: false,
    }
  },
  methods: {
    ...mapActions(["getCompanyAction"]),
    showBuyModal(id, price){
      this.selectedStockId = id;
      this.selectedStockPrice = price;
      this.isBuyModalVisible = true;
    },
    showSellModal(id, price){
      this.selectedStockId = id;
      this.selectedStockPrice = price;
      this.isSellModalVisible = true;
    },
    closeModals(){
      this.isBuyModalVisible = false;
      this.isSellModalVisible = false;
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