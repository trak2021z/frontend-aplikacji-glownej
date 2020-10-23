<template>
  <div class="main-container">
    <div class="main-table">
      <h2>Stocks</h2>

      <BuyModal :is_visible="isBuyModalVisible" :stock_id="selectedStockId" :stock_price="selectedStockPrice" @hide="closeModals"/>
      <SellModal :is_visible="isSellModalVisible" :stock_id="selectedStockId" :stock_price="selectedStockPrice" @hide="closeModals"/>

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
              @buy-stock-clicked="showBuyModal"
              @sell-stock-clicked="showSellModal"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import StockRow from "@/components/StockRow";
import BuyModal from "@/components/BuyModal";
import SellModal from "@/components/SellModal";

export default {
name: "Stocks",
  components: {StockRow, BuyModal, SellModal},
  data(){
    return{
      selectedStockId: null,
      selectedStockPrice: null,
      isBuyModalVisible: false,
      isSellModalVisible: false,
      stocks: null
    }
  },
  methods: {
    ...mapActions(["getStocksAction"]),
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
  },
  async created() {
    this.stocks = await this.getStocksAction();
  }
}
</script>

<style scoped>

</style>