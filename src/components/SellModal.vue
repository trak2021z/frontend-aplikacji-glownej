<template>
  <div class="modal fade" id="modalSellStock" tabindex="-1" role="dialog" aria-labelledby="sellStockModal"
       aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">Sell Stocks</h4>
          <button @click="hide" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3">
          <div class="md-form mb-5">
            <input v-model="stock_id" type="text" id="sellModalId" class="form-control validate" disabled>
            <label data-error="wrong" data-success="right" for="sellModalId">Stock Id</label>
          </div>

          <div class="md-form mb-4">
            <input type="number" id="sellModalAmount" class="form-control validate" min="1"
                   v-model.number="$v.amount.$model"
                   :class="{'is-invalid':$v.amount.$error, 'is-valid':!$v.amount.$invalid }">
            <label data-error="wrong" data-success="right" for="sellModalAmount">Stock Amount</label>
          </div>

          <div class="md-form mb-4">
            <input v-model="stock_price" type="text" min="1" step="1" id="sellModalPrice" class="form-control validate" disabled>
            <label data-error="wrong" data-success="right" for="sellModalPrice">Current Price</label>
          </div>

        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button @click="sellStocks" class="btn btn-success">Sell</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import {mapActions} from "vuex";
import {between, integer, required} from "vuelidate/lib/validators";

window.$ = window.jQuery = jQuery;

export default {
  name: "SellModal",
  data() {
    return {
      msg: "",
      amount: 1
    }
  },
  methods: {
    ...mapActions(["sellStock"]),
    show() {
      jQuery('#modalSellStock').modal();
    },
    hide() {
      this.$emit('hide');
      jQuery('#modalSellStock').modal('hide');
    },
    sellStocks(e) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.msg = 'Fill all fields correctly';
        this.$v.$reset();
      } else {
        this.sellStock({
          userStockId: this.stock_id,
          quantity: this.amount
        }).then(response => {
          if(response.status === 200){
            this.$v.$reset();
            this.hide();
          } else {
            alert(response.data.error);
          }
        });
      }
      e.preventDefault();
    }
  },
  props: ["is_visible", "stock_id", "stock_price"],
  watch: {
    is_visible: function(newVal) {
      if(newVal){
        this.show();
      }
    }
  },
  validations: {
    amount: {
      required,
      integer,
      between: between(1,500)
    }
  }
}
</script>

<style scoped>

</style>