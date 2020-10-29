<template>
  <div class="main-container">
    <div class="vld-parent main-table">
      <loading :active.sync="isComputing" :is-full-page="false"/>

      <template v-if="!allUserStocks">
        <h3 v-if="!isComputing">Oops... something went wrong!</h3>
      </template>

      <template v-else>
        <h2>Hello, {{getUser.email}}</h2>

        <p>Your balance: {{getUser.profile.balance}}</p>

        <buy-sell-modal :is-visible="isBuySellModalVisible" :is-sell="isSellAction" :stock-row="selectedStock" @hide="closeModal"/>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">Stock</th>
              <th scope="col">Company</th>
              <th scope="col">Amount</th>
              <th scope="col">Price</th>
              <th scope="col">Buy/Sell</th>
            </tr>
            </thead>
            <tbody>
            <stock-row
                v-for="userStock in pageOfUserStocks" :key="userStock.pk"
                :stock="userStock"
                :is-user-stock="true"
                @stock-clicked="showBuySellModal"
            />
            </tbody>
          </table>
        </div>
        <hr>
        <jw-pagination :items="allUserStocks" :maxPages="4" :labels="customLabels" @changePage="onChangePage" />
      </template>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import StockRow from "@/components/StockRow";
import BuySellModal from "@/components/BuySellModal";

export default {
  components: {BuySellModal, StockRow},
  data() {
    return {
      isComputing: false,
      pageOfUserStocks: null,
      isBuySellModalVisible: false,
      selectedStock: {},
      isSellAction: false
    }
  },
  methods: {
    ...mapActions(["getUserAction", "getUserStocksAction"]),
    showBuySellModal(stock, isSell){
      this.selectedStock = stock;
      this.isSellAction = isSell;
      this.isBuySellModalVisible = true;
    },
    closeModal(){
      this.isBuySellModalVisible = false;
    },
    onChangePage(pageOfItems){
      this.pageOfUserStocks = pageOfItems;
    }
  },
  computed: mapGetters(["getUser", "allUserStocks", 'customLabels']),
  async created() {
    this.isComputing = true;
    this.user = await this.getUserAction();
    try {
      let response = await this.getUserStocksAction();
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