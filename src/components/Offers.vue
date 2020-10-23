<template>
    <div class="main-container">
    <div class="main-table">
      <h2>Offers</h2>
      <form>
        <div class="form-group">
          <div class="row">
            <div class="col">
              <select name="sel_offer_type" v-model="selectedOfferType" @change="onChange" class="browser-default custom-select">
                <option value="1">Buy Offer</option>
                <option value="2">Sell Offer</option>
              </select>
            </div>
            <div class="col">
                <select name="sel_stocks" reactive="true" v-model="selectedStock" v-if="selectedOfferType == 1" class="browser-default custom-select">
                <option selected disabled value>Please choose stock</option>
                <option v-for="item in stocks" :key="item.id"> {{item.name}} </option>
              </select>
              <select name="sel_stocks" reactive="true" v-model="selectedStock" v-if="selectedOfferType == 2" class="browser-default custom-select">
                <option selected disabled value>Please choose stock</option>
                <option v-for="item in userStocks" :key="item.id"> {{item.stock.name}} </option>
              </select>
            </div>
          </div><br>
          <div class="row">
            <label for="edt_unit_price">Stock Price (per unit)</label>
            <input type="number" min="0.01" step="0.01" value="0.01" class="form-control" name="edt_unit_price" placeholder="0.01">
          </div><br>
          <div class="row">
            <label for="edt_amount">Stock Amount</label>
            <input type="number" min="1" value="1" class="form-control" name="edt_amount" placeholder="1">
          </div><br>
          <div class="row">
            <input @click="submit" type="button" class="btn btn-success btn-lg btn-block" value="Create Offer"/>
          </div>
        </div>
      </form>
      
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Offer Type</th>
          <th scope="col">Status</th>
          <th scope="col">Stock Name</th>
          <th scope="col">Unit Price</th>
          <th scope="col">Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in BuyOffers.items" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.type }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.stock }}</td>
          <td>{{ item.unit_price }}</td>
          <td>{{ item.stock_amount }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {integer, decimal} from "vuelidate/lib/validators";
import {mapGetters, mapActions} from "vuex";
export default {
    data() {
    return {
      selectedOfferType : 1,
      userStocks: null,
      stocks: null,
      buyOfferRequest: {
        stock: 0,
        unit_price: 0,
        stock_amount: 0
      },
      sellOfferRequest: {
        user_stock: 0,
        unit_price: 0,
        stock_amount: 0
      },
      BuyOffers: {
        items: [
          {
            "type":"buy",  
            "status":"open",
            "stock": "Dummy Stock",
            "unit_price": 100.00,
            "stock_amount": 10
          },
          {
            "type":"buy",  
            "status":"open",
            "stock": "Dummy Stock",
            "unit_price": 179.00,
            "stock_amount": 10
          },
          {
            "type":"sell",
            "status":"open",
            "stock": "Dummy Stock",
            "unit_price": 45.00,
            "stock_amount": 20
          },
          {
            "type":"buy",   
            "status":"expired",
            "stock": "Dummy Stock",
            "unit_price": 191.00,
            "stock_amount": 120
          },
          {
            "type":"buy", 
            "status":"closed",
            "stock": "Dummy Stock",
            "unit_price": 45.00,
            "stock_amount": 5
          },
          {
            "type":"buy", 
            "status":"closed",
            "stock": "Dummy Stock",
            "unit_price": 15.00,
            "stock_amount": 10
          },
          {
            "type":"buy", 
            "status":"buy",
            "stock": "Dummy Stock",
            "unit_price": 10.00,
            "stock_amount": 30
          },
          {
            "type":"buy", 
            "status":"buy",
            "stock": "Dummy Stock",
            "unit_price": 15.00,
            "stock_amount": 10
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(["getUserAction", "getUserStockAction", "getStocksAction"]),
    onChange(){
        console.log('Offer type selected: ', this.selectedOfferType);
    },
    submit() {
        if (this.selectedOfferType == 1) {
            console.log('Buy Offer');
        } else {
            console.log('Sell Offer');
        }
    }
  },
    computed: mapGetters(["getUser"]),
    async created() {
        this.user = await this.getUserAction();
        this.userStocks = await this.getUserStockAction();
        this.stocks = await this.getStocksAction();
    },
    validations: {
        edt_unit_price:{
            decimal
        },
        edt_amount:{
            integer
        }
    }
}
</script>