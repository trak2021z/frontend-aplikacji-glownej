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
          </div>
        </div>
        <div class="form-group">
          <div class="row">
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
            <label v-if="edt_unit_price != null" for="edt_unit_price">Stock Price (per unit)</label>
            <input label="Stock Price (per unit)" id='id_edt_unit_price' type="number" name="edt_unit_price" v-model="edt_unit_price" @change="onChange" min="0.01" step="0.01" class="form-control"
                  value=null placeholder="Stock Price (per unit)"
                  v-model.trim="$v.edt_unit_price.$model"
                  :class="{'is-invalid':$v.edt_unit_price.$error, 'is-valid':!$v.edt_unit_price.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.edt_unit_price.required">Invalid stock price</span>
                <span v-if="!$v.edt_unit_price.decimal">Unit price must be a decimal number</span>
                <span v-if="!$v.edt_unit_price.minValue">Unit price must be at least 0.01</span>
            </div>
          </div><br>
          <div class="row">
            <label v-if="edt_amount != null" for="edt_amount">Stock Amount</label>
            <input id='id_edt_amount' type="number" name="edt_amount" v-model="edt_amount" @change="onChange" min="1" class="form-control"
              value=null placeholder="Stock Amount"
              v-model.trim="$v.edt_amount.$model"
              :class="{'is-invalid':$v.edt_amount.$error, 'is-valid':!$v.edt_amount.$invalid }">
              <div class="invalid-feedback">
                <span v-if="!$v.edt_amount.required">Invalid amount</span>
                <span v-if="!$v.edt_amount.integer">Stock amount must be an integer</span>
                <span v-if="!$v.edt_amount.available_amount">Selected stock is not available in such amount</span>
                <span v-if="!$v.edt_amount.minValue">Unit price must be a positive number</span>
              </div>
          </div><br>
          <div class="row">
            <input @click="submit" type="button" class="btn btn-success btn-lg btn-block" value="Create Offer"/>
          </div>
        </div>
      </form>

      <loading :active.sync="isComputing" :is-full-page="false"/> 

      <template v-if="!getOffers">
        <h3 v-if="!isComputing">Loading, please wait...</h3>
      </template>

      <template v-else>
        <div class="table-responsive">
        <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Type</th>
          <th scope="col">Status</th>
          <th scope="col">Stock Name</th>
          <th scope="col">Unit Price</th>
          <th scope="col">Amount</th>
          <th scope="col">Cancel</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in pageOfOffers" :key="item.id">
          <td>{{ item.created }}</td>
          <td>{{ item.offer_type }}</td>
          <td>{{ item.status_name }}</td>
          <td v-if="item.offer_type === 'buy'">{{ allStocks.find( element => (element.pk === item.stock) ).name }}</td>
          <td v-else>{{ allUserStocks.find( element => (element.pk === item.stock)).stock.name  }} </td>
          <td>{{ item.unit_price }}</td>
          <td>{{ item.stock_amount }}</td>
          <td><button v-if="item.status === 1" v-on:click="clickCancelOffer(item.pk, item.offer_type)" class="btn-danger">Cancel</button></td>
        </tr>
        </tbody>
      </table>
      </div>
      <hr>
      <paginator :items="getOffers"
                  :maxPages="4"
                  :initialPage="currentPage"
                  :key="paginatorKey"
                  @changePage="onChangePage"/>
      </template>
    </div>
  </div>
</template>

<script>
import {required, decimal, integer, minValue} from "vuelidate/lib/validators";
import {mapGetters, mapActions} from "vuex";
import Paginator from "@/components/Paginator";

function available_amount(value){
  if(this.selectedOfferType == 1){
    return value <= this.allStocks[this.selectedStock].avail_amount;
  }else{
    return value <= this.userStocks[this.selectedStock].stock_amount;
  }
}

export default {
    computed: { 
      ...mapGetters(['getOffers', 'getUser', 'allStocks', 'allUserStocks']),
    },
    components: {Paginator},
    data() {
    return {
      isComputing: false,
      pageOfOffers: null,
      currentPage: 1,
      paginatorKey: 0,
      selectedOfferType : 1,
      selectedStock: 1,
      userStocks: null,
      edt_unit_price: null,
      edt_amount: null
    }
  },
  methods: {
    ...mapActions(["getOffersAction", "addBuyOfferAction", "addSellOfferAction", "deleteBuyOfferAction", "deleteSellOfferAction","getUserAction", "getUserStocksAction", "getStocksAction"]),
    onChange(){
      //console.log('Offer type selected: ', this.selectedOfferType);
    },
    onChangeStock(){
      //console.log('Stock selected: ', this.selectedStock);
      //inputUnitPrice.setAttribute('value', this.allStocks[this.selectedStock].avail_amount);
      //inputStockAmount.setAttribute('value', 1);
    },
    onChangePage(pageOfItems, page) {
      this.currentPage = page;
      this.pageOfOffers = pageOfItems;
    },
    formatFields(item) {
      const date = item.created.split('T')
      const time = date[1].split('.')
      item.created = date[0] + " " + time[0];
      const STATUS_TYPES = ['open','expired','closed']
      item.status_name = STATUS_TYPES[(item.status-1)];
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert('Fill all fields correctly before creating an offer')
      } else {
          if (this.selectedOfferType == 1) {
            //console.log('Buy Offer');
          let par_stock = this.allStocks[this.selectedStock].pk;
          let par_price = this.edt_unit_price;
          let par_amount = this.edt_amount;
          let data = {stock: par_stock, unit_price: par_price, stock_amount: par_amount};

          let max_amount = this.allStocks[this.selectedStock].avail_amount;

          if(par_amount > max_amount)
            alert(`${'Insufficient amount of available stocks - there are only ' + max_amount + ' stocks of chosen type.'}`)
          else{
              this.addBuyOfferAction(data).then(response => {
              if(response.status === 200 || response.status === 201){
                confirm(`You've made a buy offer for:  ${this.allStocks[this.selectedStock].name} in amount of ${this.edt_amount} for the price of ${this.edt_unit_price} each.`)
                this.$v.$reset();
                this.paginatorKey += 1;
                location.reload();
              } else {
                alert(`${response.status}: ${response.data.error}`);
              }
              }).catch(error => {
                  alert(`${error}`)
              });
          }
            
        } else {
            //console.log('Sell Offer');
            if(this.userStocks[this.selectedStock].pk){
              let par_stock = this.userStocks[this.selectedStock].pk;
              let par_price = this.edt_unit_price;
              let par_amount = this.edt_amount;
              let data = {user_stock: par_stock, unit_price: par_price, stock_amount: par_amount};

              this.addSellOfferAction(data).then(response => {
                  if(response.status === 200 || response.status === 201){
                    confirm(`You've made a sell offer in amount of ${this.edt_amount} for the price of ${this.edt_unit_price} each.`)
                    this.$v.$reset();
                    this.paginatorKey += 1;
                    location.reload();
                  } else {
                    alert(`${response.status}: ${response.data.error}`);
                  }
                }).catch(error => {
                  let max_amount = this.userStocks[this.selectedStock].stock_amount;
                  //console.log('Wpisany amount' + par_amount + ", zupa: " + )
                  if(par_amount > max_amount)
                    alert(`${'Insufficient amount of stocks - you only have ' + max_amount + ' stocks of chosen type.'}`)
                  else
                    alert(`${error}`)
                });
              this.paginatorKey += 1;
            }
        }
      }
    },
    clickCancelOffer(par_pk, par_type) {
        if(par_type === 'buy'){
          this.deleteBuyOfferAction(par_pk).then(response => {
              if(response.status === 200 || response.status === 201){
                confirm(`Offer cancelled succesfully`)
                this.$v.$reset();
                this.paginatorKey += 1;
              } else {
                alert(`${response.status}: ${response.data.error}`);
              }
            });
          this.paginatorKey += 1;
        }else{
          this.deleteSellOfferAction(par_pk).then(response => {
              if(response.status === 200 || response.status === 201){
                confirm(`Offer cancelled succesfully`)
                this.$v.$reset();
                this.paginatorKey += 1;
                location.reload();
              } else {
                alert(`${response.status}: ${response.data.error}`);
              }
            });
          this.paginatorKey += 1;
        }
    }
  },
    async created() {
        //this.user = await this.getUserAction();
        await this.getUserStocksAction();
        this.userStocks = this.allUserStocks;
        this.userStocks = this.userStocks.filter(function( obj ) {
            return obj.stock_amount > 0;
        })

        await this.getStocksAction();
        this.isComputing = true;
        await this.getOffersAction();
        this.getOffers.forEach(this.formatFields);
        this.isComputing = false;
    },
    validations: {
        edt_unit_price:{
          required,
          decimal,
          minValue: minValue(0.01)
        },
        edt_amount:{
          required,
          integer,
          minValue: minValue(1),
          available_amount
        }
    }
}
</script>