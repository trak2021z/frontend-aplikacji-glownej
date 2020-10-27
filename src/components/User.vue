<template>
  <div class="main-container">
    <div class="main-table">
      <h2>Hello, {{user.username}}</h2>
      <p>Your balance: {{user.profile.balance}}</p>

      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!allUserStocks">
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
              v-for="(userStock, index) in pageOfUserStocks" :key="userStock.pk"
              v-bind:index="index"
              v-bind:stock="userStock.stock"
              v-bind:stock_amount="userStock.stock_amount"
              v-bind:user_stock_id="userStock.pk"
              @buy-stock-clicked="showBuyModal"
              @sell-stock-clicked="showSellModal"
          />
          </tbody>
        </table>
        <hr>
        <jw-pagination :items="allUserStocks" @changePage="onChangePage" />
      </template>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import StockRow from "@/components/StockRow";
import BuyModal from "@/components/BuyModal";
import SellModal from "@/components/SellModal";

export default {
  components: {SellModal, BuyModal, StockRow},
  data() {
    return {
      isComputing: false,
      pageOfUserStocks: null,
      selectedStockId: null,
      selectedStockPrice: null,
      isBuyModalVisible: false,
      isSellModalVisible: false,
      email: localStorage.getItem('email'),
      user: {
        profile: {
          balance: null
        },
        username: null
      },
    }
  },
  methods: {
    ...mapActions(["getUserAction", "getUserStocksAction"]),
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
      this.pageOfUserStocks = pageOfItems;
    }
  },
  computed: mapGetters(["getUser", "allUserStocks"]),
  async created() {
    this.isComputing = true;
    this.user = await this.getUserAction();
    try {
      let response = await this.getUserStocksAction();
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