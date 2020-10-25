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
                <select name="sel_stocks" reactive="true" v-model="selectedStock" @change="onChangeStock" v-if="selectedOfferType == 1" class="browser-default custom-select">
                <option selected disabled value>Please choose stock</option>
                <option v-for="(item, index) in allStocks" v-bind:value="index" :key="item.id"> {{item.name}} - {{item.price}} </option>
              </select>
              <select name="sel_stocks" reactive="true" v-model="selectedStock" @change="onChangeStock" v-if="selectedOfferType == 2" class="browser-default custom-select">
                <option selected disabled value>Please choose stock</option>
                <option v-for="item in userStocks" :key="item.id"> {{item.stock.name}}</option>
              </select>
            </div>
          </div><br>
          <div class="row">
            <label for="edt_unit_price">Stock Price (per unit)</label>
            <input type="number" name="edt_unit_price" v-model="edt_unit_price" @change="onChange" min="0.01" step="0.01" value="0.01" class="form-control" placeholder="0.01">
          </div><br>
          <div class="row">
            <label for="edt_amount">Stock Amount</label>
            <input type="number" name="edt_amount" v-model="edt_amount" @change="onChange" min="1" value="1" class="form-control" placeholder="1">
          </div><br>
          <div class="row">
            <input @click="submit" type="button" class="btn btn-success btn-lg btn-block" value="Create Offer"/>
          </div>
        </div>
      </form>
      
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Offer Type</th>
          <th scope="col">Status</th>
          <th scope="col">Stock Name</th>
          <th scope="col">Unit Price</th>
          <th scope="col">Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in BuyOffers.items" :key="item.id">
          <td>{{ item.date }}</td>
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
      selectedStock: 1,
      userStocks: null,
      edt_unit_price: 0.01,
      edt_amount: 1,
      BuyOffers: {
        items: [
          {
            "date": "2020-10-23 10:30:52",
            "type":"buy",
            "status":"open",
            "stock": "Dummy Stock",
            "unit_price": 100.00,
            "stock_amount": 10
          },
          {
            "date": "2020-10-22 10:30:52",
            "type":"buy",  
            "status":"open",
            "stock": "Dummy Stock",
            "unit_price": 179.00,
            "stock_amount": 10
          },
          {
            "date": "2020-10-21 10:30:52",
            "type":"sell",
            "status":"open",
            "stock": "Dummy Stock",
            "unit_price": 45.00,
            "stock_amount": 20
          },
          {
            "date": "2020-10-21 10:30:52",
            "type":"buy",   
            "status":"expired",
            "stock": "Dummy Stock",
            "unit_price": 191.00,
            "stock_amount": 120
          },
          {
            "date": "2020-10-20 10:30:52",
            "type":"buy", 
            "status":"closed",
            "stock": "Dummy Stock",
            "unit_price": 45.00,
            "stock_amount": 5
          },
          {
            "date": "2020-10-20 13:30:02",
            "type":"buy", 
            "status":"closed",
            "stock": "Dummy Stock",
            "unit_price": 15.00,
            "stock_amount": 10
          },
          {
            "date": "2020-10-20 11:30:52",
            "type":"buy", 
            "status":"buy",
            "stock": "Dummy Stock",
            "unit_price": 10.00,
            "stock_amount": 30
          },
          {
            "date": "2020-10-20 12:30:52",
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
    onChangeStock(){
        console.log('Stock selected: ', this.selectedStock);
    },
    submit(e) {
        if (this.selectedOfferType == 1) {
            console.log('Buy Offer');
            e.preventDefault();
            let currentObj = this;
            console.log('unit_price - ' + this.edt_unit_price);
            this.axios({ method: 'post', url: 'buyoffer', 
            data: {
              stock: this.allStocks[this.selectedStock].pk,
              unit_price : this.edt_unit_price,
              stock_amount: this.edt_amount,
            },
            headers: { Authorization: 'Bearer ' + localStorage.token } })
            .then(function (response) {
                currentObj.output = response.data;
                console.log('Buy Offer added sucessfully');
                confirm('Buy Offer added successfully');
              
            })
            .catch(function (error) {
              currentObj.output = error;
            });
            
        } else {
            console.log('Sell Offer');
            e.preventDefault();
            let currentObj = this;
            console.log('unit_price - ' + this.edt_unit_price);
            this.axios({ method: 'post', url: 'selloffer', 
            data: {
              user_stock: this.userStocks[this.selectedStock].pk,
              unit_price : this.edt_unit_price,
              stock_amount: this.edt_amount,
            },
            headers: { Authorization: 'Bearer ' + localStorage.token } })
            .then(function (response) {
                currentObj.output = response.data;
                console.log('Sell Offer added sucessfully');
                confirm('Sell Offer added successfully');
            })
            .catch(function (error) {
              currentObj.output = error;
            });
        }
    }
  },
    computed: mapGetters(["getUser", "allStocks"]),
    async created() {
        this.user = await this.getUserAction();
        this.userStocks = await this.getUserStockAction();
        await this.getStocksAction();
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