<template>
  <div>
    <div class="background-adios"></div>
    <div v-if="true" style="margin:auto; padding:0; position: center; max-width: 100%">
      <img style="height: 100vh;" src="../assets/adios_goodbye.jpg"/>
    </div>
  </div>
</template>

<script>
  import router from "@/router";

  export default {
    created() {
      setTimeout(() => router.replace("/login"), 4000);
    }
  }
</script>