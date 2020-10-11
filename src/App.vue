<template>
  <div id="app">
    <Navbar></Navbar>
    <Register></Register>
  </div>
</template>

<script>
import Register from "./components/Register";
import Navbar from "./components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar,
    Register,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
