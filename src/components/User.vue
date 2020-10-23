<template>
  <div class="main-container">
    <div class="main-table">
      <h2>Hello, {{user.username}}</h2>
      <p>Your balance: {{user.profile.balance}}</p>

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
            v-for="(userStock, index) in userStocks" :key="userStock.pk"
            v-bind:index="index"
            v-bind:stock="userStock.stock"
            v-bind:stock_amount="userStock.stock_amount"
            @buy-stock-clicked="showBuyModal"
            @sell-stock-clicked="showSellModal"
        />
        </tbody>
      </table>

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
      userStocks: [
        {
          pk: null,
          stock: {
            pk: null,
            company: {
              pk: null,
              name: null
            },
            name: null,
            price: null,
            avail_amount: null
          },
          stock_amount: null
        }
      ]
    }
  },
  methods: {
    ...mapActions(["getUserAction", "getUserStockAction"]),
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
    async closeModals(){
      this.isBuyModalVisible = false;
      this.isSellModalVisible = false;
    },
  },
  computed: mapGetters(["getUser"]),
  async created() {
    this.user = await this.getUserAction();
    this.userStocks = await this.getUserStockAction();
  }
}
</script>