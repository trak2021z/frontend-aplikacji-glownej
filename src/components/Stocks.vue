<template>
  <div class="main-container">
    <div class="vld-parent main-table">

      <h2>Stocks</h2>
      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!allStocks">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>
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
        <jw-pagination :items="allStocks" @changePage="onChangePage" />
      </template>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import StockRow from "@/components/StockRow";
import BuyModal from "@/components/BuyModal";
import SellModal from "@/components/SellModal";

export default {
  name: "Stocks",
  computed: mapGetters(['allStocks']),
  components: {StockRow, BuyModal, SellModal},
  data(){
    return{
      isComputing: false,
      selectedStockId: null,
      selectedStockPrice: null,
      isBuyModalVisible: false,
      isSellModalVisible: false,
      pageOfStocks: null,
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
    onChangePage(pageOfItems){
      this.pageOfStocks = pageOfItems;
    }
  },
  async created() {
    this.isComputing = true;
    try {
      let response = await this.getStocksAction();
      if(response.status !== 200){
        alert(response.data.error);
      }
    }catch(e){
      console.log(e);
    }
    this.isComputing = false;
  }
}
</script>

<style scoped>

</style>