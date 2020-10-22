<template>
  <div class="modal fade" id="modalBuyStock" tabindex="-1" role="dialog" aria-labelledby="buyStockModal"
       aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">Buy Stocks</h4>
          <button @click="hide" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3">
          <div class="md-form mb-5">
            <input v-model="stock_id" type="text" id="buyModalId" class="form-control validate" disabled>
            <label data-error="wrong" data-success="right" for="buyModalId">Stock Id</label>
          </div>

          <div class="md-form mb-4">
            <input type="text" id="buyModalAmount" class="form-control validate">
            <label data-error="wrong" data-success="right" for="buyModalAmount">Stock Amount</label>
          </div>

          <div class="md-form mb-4">
            <input v-model="stock_price" type="text" id="buyModalPrice" class="form-control validate" disabled>
            <label data-error="wrong" data-success="right" for="buyModalPrice">Current Price</label>
          </div>

        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button @click="buyStocks()" class="btn btn-success">Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

export default {
  name: "BuyModal",
  methods: {
    show() {
      jQuery('#modalBuyStock').modal()
    },
    hide() {
      this.$emit('hide');
    },
    buyStocks() {
      //this.buyStocks(this.selectedStockId, Math.floor(jQuery('#buyModalAmount').val()));
    }
  },
  props: ["is_visible", "stock_id", "stock_price"],
  watch: {
    is_visible: function(newVal) {
      if(newVal){
        this.show();
      }
    }
  }
}
</script>

<style scoped>

</style>