<template>
  <div class="modal fade" id="modalBuySellStock" tabindex="-1" role="dialog" aria-labelledby="buySellStockModal"
       aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title w-100 font-weight-bold">{{ isSell ? "Sell" : "Buy" }} Stocks</h4>
          <button @click="hide" type="button" class="close position-absolute" style="right:4%" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3">

          <table class="table table-borderless">
            <thead>
            <tr>
              <th scope="col" colspan="2">{{stockRow.name}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="text-left">Available amount: {{available_amount}}</td>
              <td class="text-right">Price: {{price}}</td>
            </tr>
            </tbody>
          </table>

          <div class="md-form mb-1">
            <input type="number" id="stockQuantity" class="form-control validate"
                   maxlength="10" min="1" :max="available_amount"
                   placeholder="Stock amount..."
                   v-model.number="$v.quantity.$model"
                   :class="{'is-invalid':$v.quantity.$error, 'is-valid':!$v.quantity.$invalid }">
            <div class="invalid-feedback">
              <span v-if="!$v.quantity.required">Stock Amount is required!</span>
              <span v-if="!$v.quantity.integer">Amount has to be an integer!</span>
              <span v-if="!$v.quantity.between">That amount is not available!</span>
              <span v-if="!$v.quantity.userCanAfford">You can't afford that!</span>
            </div>
          </div>

          <h4 v-if="this.getUser" class="text-dark text-right">Your Balance: {{availableBalance}}</h4>

          <h4 class="text-dark text-right">Total: {{total}}</h4>

          <h4 v-if="this.getUser" class="text-dark text-right">New Balance: {{newBalance}}</h4>

        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button @click="performTransaction" class="btn btn-success">{{ isSell ? "Sell" : "Buy" }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import {mapActions, mapGetters} from "vuex";
import {required, between, integer} from "vuelidate/lib/validators";

window.$ = window.jQuery = jQuery;

function userCanAfford (value){
  if(!this.isSell){
    if (!this.getUser) {
      return false;
    }

    return this.getUser.profile.balance >= value * this.price;
  }

  return true;
}

export default {
  name: "BuySellModal",
  data() {
    return {
      msg: "",
      quantity: "",
    }
  },
  methods: {
    ...mapActions(["buyStock", "sellStock", "getUserAction"]),
    show() {
      jQuery('#modalBuySellStock').modal()
    },
    hide() {
      this.$emit('hide');
      jQuery('#modalBuySellStock').modal('hide');
      this.quantity = "";
      this.$v.$reset();
    },
    performTransaction(e) {
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.msg = 'Fill all fields correctly';
        } else {
          if(this.isSell){
            this.sellStock({
              userStockId: this.id,
              quantity: this.quantity
            }).then(response => {
              if(response.status === 200){
                confirm(`You sold ${this.stockRow.name} in amount of ${this.quantity} for the price of ${this.stockRow.price} each.`)
                this.$v.$reset();
                this.hide();
              } else {
                alert(`${response.status}: ${response.data.error}`);
              }
            });
          } else {
            this.buyStock({
              stockId: this.id,
              quantity: this.quantity
            }).then(response => {
              if(response.status === 200){
                confirm(`You bought ${this.stockRow.name} in amount of ${this.quantity} for the price of ${this.stockRow.price} each.`)
                this.$v.$reset();
                this.hide();
              } else {
                alert(`${response.status}: ${response.data.error}`);
              }
            });
          }
        }
        e.preventDefault();
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    isSell: {
      type: Boolean,
      required: true
    },
    stockRow: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
    id: function(){
      return this.isSell ? this.stockRow.owned_pk : this.stockRow.pk;
    },
    price: function (){
      return this.stockRow.price;
    },
    available_amount: function (){
      return this.isSell ? this.stockRow.owned_amount : this.stockRow.avail_amount;
    },
    availableBalance: function (){
      return this.getUser.profile.balance;
    },
    newBalance: function (){
      return (+this.getUser.profile.balance + +this.total).toFixed(2);
    },
    total: function (){
      let total = this.quantity * this.price;
      total = total > 0.00 ? total : 0.00;
      const prefix = this.isSell ? '+' : '-';

      return total > 0 ? prefix + total.toFixed(2) : total.toFixed(2);
    }
  },
  watch: {
    isVisible: function(newVal) {
      if(newVal){
        this.show();
      }
    }
  },
  validations() {
    return {
      quantity: {
        required,
        integer,
        between: between(1, this.available_amount),
        userCanAfford
      }
    }
  },
  async created() {
    await this.getUserAction();
  }
}
</script>

<style scoped>

</style>