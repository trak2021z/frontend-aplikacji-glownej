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
                <input type="text" id="sellModalPrice" class="form-control validate" disabled>
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
          <th scope="col">Stock Name</th>
          <th scope="col">Stock Price</th>
          <th scope="col">Stock Amount</th>
          <th scope="col">Show Company</th>
          <th scope="col">Buy More</th>
          <th scope="col">Sell</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in userStocks" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.stock.name }}</td>
          <td>{{ item.stock.price }}</td>
          <td>{{ item.stock_amount }}</td>
          <td>
            <router-link v-bind="item" :to="`/company/${item.stock.company.pk}`">
              <font-awesome-icon icon="search-plus"/>
            </router-link>
          </td>
          <td>
            <a href="" @click="changeSelectedStock(item.company_id, item.price)" data-toggle="modal" data-target="#modalBuyStock">
              <font-awesome-icon icon="money-check"/>
            </a>
          </td>
          <td>
            <a href="" @click="changeSelectedStock(item.company_id, item.price)" data-toggle="modal" data-target="#modalSellStock">
              <font-awesome-icon icon="coins"/>
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import {mapGetters, mapActions} from "vuex";
window.$ = window.jQuery = jQuery;
export default {
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
      userStocks: null,
      stocks: {
        all: [
          {
            company_id: 1,
            name: "firma fajna",
            price: 200.10,
            aval_amount: 50
          },
          {
            company_id: 2,
            name: "srednia firma",
            price: 100.11,
            aval_amount: 30
          },
          {
            company_id: 3,
            name: "słabiaki",
            price: 11.99,
            aval_amount: 50
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(["getUserAction", "getUserStockAction"]),
    changeSelectedStock(id, price) {
      this.selectedStockId = id;
      jQuery('#buyModalId').attr('value', id);
      jQuery('#buyModalPrice').attr('value', price);
      jQuery('#sellModalId').attr('value', id);
      jQuery('#sellModalPrice').attr('value', price);
    },
    buyStocks() {
      console.log('kupowanie');
    },
    sellStocks() {
      console.log('sprzedawanie');
    }
  },
  computed: mapGetters(["getUser"]),
  async created() {
    this.user = await this.getUserAction();
    this.userStocks = await this.getUserStockAction();
    console.log(this.user);
    console.log(this.userStocks);
  }
}
</script>