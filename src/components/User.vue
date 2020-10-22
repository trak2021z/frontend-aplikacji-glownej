<template>
  <div class="main-container">
    <div class="main-table">
      <h2>Hello, {{user.username}}</h2>
      <p>Your balance: {{user.profile.balance}}</p>

      <div class="modal fade" id="modalBuyStock" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h4 class="modal-title w-100 font-weight-bold">Buy Stocks</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <div class="md-form mb-5">
                <input type="text" id="buyModalId" class="form-control validate" disabled>
                <label data-error="wrong" data-success="right" for="buyModalId">Stock Id</label>
              </div>

              <div class="md-form mb-4">
                <input type="text" id="buyModalAmount" class="form-control validate">
                <label data-error="wrong" data-success="right" for="buyModalAmount">Stock Amount</label>
              </div>

              <div class="md-form mb-4">
                <input type="text" id="buyModalPrice" class="form-control validate" disabled>
                <label data-error="wrong" data-success="right" for="buyModalPrice">Current Price</label>
              </div>

            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button @click="buyStocks()" class="btn btn-success">Buy</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="modalSellStock" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h4 class="modal-title w-100 font-weight-bold">Sell Stocks</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <div class="md-form mb-5">
                <input type="text" id="sellModalId" class="form-control validate" disabled>
                <label data-error="wrong" data-success="right" for="sellModalId">Stock Id</label>
              </div>

              <div class="md-form mb-4">
                <input type="text" id="sellModalAmount" class="form-control validate">
                <label data-error="wrong" data-success="right" for="sellModalAmount">Stock Amount</label>
              </div>

              <div class="md-form mb-4">
                <input type="number" min="1" step="1" id="sellModalPrice" class="form-control validate" disabled>
                <label data-error="wrong" data-success="right" for="sellModalPrice">Current Price</label>
              </div>

            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button @click="sellStocks()" class="btn btn-success">Sell</button>
            </div>
          </div>
        </div>
      </div>

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
            v-for="(userStock, index) in userStocks" :key="userStock.pk"
            v-bind:index="index"
            v-bind:stock="userStock.stock"
            v-bind:stock_amount="userStock.stock_amount"
            v-on:buy-stock-clicked="showBuyModal"
            v-on:sell-stock-clicked="showSellModal"
        />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import jQuery from 'jquery';
import {mapGetters, mapActions} from "vuex";
import StockRow from "@/components/StockRow";

window.$ = window.jQuery = jQuery;
export default {
  components: {StockRow},
  data() {
    return {
      selectedStockId: null,
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
      jQuery('#buyModalId').attr('value', id);
      jQuery('#buyModalPrice').attr('value', price);
      jQuery('#modalBuyStock').modal()
    },
    showSellModal(id, price){
      this.selectedStockId = id;
      jQuery('#sellModalId').attr('value', id);
      jQuery('#sellModalPrice').attr('value', price);
      jQuery('#modalSellStock').modal()
    },
    buyStocks() {
      //this.buyStocks(this.selectedStockId, Math.floor(jQuery('#buyModalAmount').val()));
    },
    sellStocks() {
      //this.sellStocks(this.selectedStockId, Math.floor(jQuery('#sellModalAmount').val()));
    }
  },
  computed: mapGetters(["getUser"]),
  async created() {
    this.user = await this.getUserAction();
    this.userStocks = await this.getUserStockAction();
  }
}
</script>