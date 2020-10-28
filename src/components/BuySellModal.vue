<template>
  <div class="modal fade" id="modalBuySellStock" tabindex="-1" role="dialog" aria-labelledby="buySellStockModal"
       aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">{{ isSell ? "Sell" : "Buy" }} Stocks</h4>
          <button @click="hide" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3">
          <div class="md-form mb-5">
            <input v-model="id" type="text" id="stockId" class="form-control validate" disabled>
            <label data-error="wrong" data-success="right" for="stockId">Stock Id</label>
          </div>

          <div class="md-form mb-4">
            <input type="number" id="stockQuantity" class="form-control validate" min="1" :max="available_amount"
                   v-model.number="$v.quantity.$model"
                   :class="{'is-invalid':$v.quantity.$error, 'is-valid':!$v.quantity.$invalid }">
            <label data-error="wrong" data-success="right" for="stockQuantity">Stock Amount</label>
          </div>

          <div class="md-form mb-4">
            <input v-model="price" type="text" id="stockPrice" class="form-control validate" disabled>
            <label data-error="wrong" data-success="right" for="stockPrice">Current Price</label>
          </div>

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
import {mapActions} from "vuex";
import {required, between, integer} from "vuelidate/lib/validators";

window.$ = window.jQuery = jQuery;

export default {
  name: "BuySellModal",
  data() {
    return {
      msg: "",
      id: 0,
      quantity: 1,
      price: 0.00,
      available_amount: 0
    }
  },
  methods: {
    ...mapActions(["buyStock", "sellStock"]),
    show() {
      this.setValues();
      jQuery('#modalBuySellStock').modal()
    },
    hide() {
      this.$emit('hide');
      jQuery('#modalBuySellStock').modal('hide');
    },
    setValues(){
      const stock = this.stockRow;

      this.id = this.isSell ? stock.owned_pk : stock.pk;
      this.price = stock.price;
      this.available_amount = this.isSell ? stock.owned_amount : stock.avail_amount;
    },
    performTransaction(e) {
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.msg = 'Fill all fields correctly';
          this.$v.$reset();
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
                alert(response.data.error);
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
                alert(response.data.error);
              }
            });
          }
        }
        e.preventDefault();
    }
  },
  props: ["isVisible", "isSell", "stockRow"],
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
        between: between(1, this.available_amount)
      }
    }
  }
}
</script>

<style scoped>

</style>