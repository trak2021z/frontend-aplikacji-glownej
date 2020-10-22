<template>
  <div class="pb-5">
    <div class="pb-2">
      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-position mb-1">
        <a class="navbar-brand" href="/">Stonks</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <template v-if="$store.getters.isAuthenticated">
              <li :class="{'nav-item':this.currentPage !== 'stocks', 'nav-item active':this.currentPage === 'stocks' }">
                <router-link class="nav-link" to="/stocks">Stocks</router-link>
              </li>
              <li :class="{'nav-item':this.currentPage !== 'companies', 'nav-item active':this.currentPage === 'companies' }">
                <router-link class="nav-link" to="/companies">Companies</router-link>
              </li>
              <li :class="{'nav-item':this.currentPage !== 'company', 'nav-item active':this.currentPage === 'company' }">
                <router-link class="nav-link" to="/company">Company</router-link>
              </li>
            </template>
          </ul>
          <ul class="navbar-nav ml-auto">
            <template v-if="!$store.getters.isAuthenticated">
              <li :class="{'nav-item':this.currentPage !== 'login', 'nav-item active':this.currentPage === 'login' }">
                <router-link class="nav-link" to="/login">Log in</router-link>
              </li>
              <li class="nav-item">
                <router-link class="btn btn-success" to="/register">Register</router-link>
              </li>
            </template>
            <li v-else @click="logout" class="nav-item">
              <router-link class="btn btn-success" to="">Logout</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import router from '../router';
import store from '../stores/store';
import { mapActions } from "vuex";

export default {
  ...mapActions(["clearToken"]),
  name: 'navbar',
  data() {
    return {
      currentPage: router.currentRoute.name
    }
  },
  methods: {
    logout() {
      store.dispatch('clearToken');
      localStorage.removeItem('token');
      router.replace('/')
    }
  },
  watch: {
    $route() {
      this.currentPage = router.currentRoute.name;
    }
  }
}
</script>

<style>
.navbar-position {
  position: fixed !important;
  width: 100%;
  z-index: 100;
}
</style>