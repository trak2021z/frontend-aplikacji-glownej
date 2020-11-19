<template>
  <div>
    <div class="background-bonjur"></div>
    <div v-if="true" style="margin:auto; padding:0; position: fixed; max-width: 100%">
      <img style="max-width: 100%" src="../assets/bonjur_welcome.png"/>
    </div>
  </div>
</template>

<script>
  import router from "@/router";

  export default {
    created() {
      setTimeout(() => router.replace("/stocks"), 4000);
    }
  }
</script>