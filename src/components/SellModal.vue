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
            <input type="text" id="sellModalAmount" class="form-control validate">
            <label data-error="wrong" data-success="right" for="sellModalAmount">Stock Amount</label>
          </div>

          <div class="md-form mb-4">
            <input v-model="stock_price" type="number" min="1" step="1" id="sellModalPrice" class="form-control validate" disabled>
            <label data-error="wrong" data-success="right" for="sellModalPrice">Current Price</label>
          </div>

        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button @click="sellStocks()" class="btn btn-success">Sell</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

export default {
  name: "SellModal",
  methods: {
    show() {
      jQuery('#modalSellStock').modal()
    },
    hide() {
      this.$emit('hide');
    },
    sellStocks() {
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