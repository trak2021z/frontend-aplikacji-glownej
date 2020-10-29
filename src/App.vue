<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import store from './stores/store';

export default {
  name: 'App',
  components: {
    Navbar
  },
  store
}
</script>
