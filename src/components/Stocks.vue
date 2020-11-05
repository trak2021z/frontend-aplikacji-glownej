<template>
  <div class="main-container">
    <div class="vld-parent main-table">

      <h2>Stocks</h2>
      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!allStocks">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>
        <buy-sell-modal :is-visible="isBuySellModalVisible" :is-sell="isSellAction" :stock-row="selectedStock" @hide="closeModal"/>

        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">Stock</th>
              <th scope="col">Company</th>
              <th scope="col">Amount</th>
              <th scope="col">Price</th>
              <th scope="col">Buy</th>
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
        </div>

        <hr>
        <paginator :items="allStocks"
                   :maxPages="4"
                   :initialPage="currentPage"
                   :key="paginatorKey"
                   @changePage="onChangePage"
        />
      </template>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import StockRow from "@/components/StockRow";
import BuySellModal from "@/components/BuySellModal";
import Paginator from "@/components/Paginator";

export default {
  name: "Stocks",
  computed: mapGetters(['allStocks']),
  components: {Paginator, BuySellModal, StockRow},
  data(){
    return{
      isComputing: false,
      isBuySellModalVisible: false,
      selectedStock: {},
      isSellAction: false,
      pageOfStocks: null,
      currentPage: 1,
      paginatorKey: 0
    }
  },
  methods: {
    ...mapActions(["getStocksAction"]),
    showBuySellModal(stock, isSell){
      this.selectedStock = stock;
      this.isSellAction = isSell;
      this.isBuySellModalVisible = true;
    },
    closeModal(){
      this.isBuySellModalVisible = false;
      this.paginatorKey += 1;
    },
    onChangePage(pageOfItems, page){
      this.currentPage = page;
      this.pageOfStocks = pageOfItems;
    }
  },
  async created() {
    this.isComputing = true;
    try {
      let response = await this.getStocksAction();
      if(response.status !== 200){
        alert(`${response.status}: ${response.data.error}`);
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