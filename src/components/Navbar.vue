<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li :class="{'nav-item':this.currentPage !== 'home', 'nav-item active':this.currentPage === 'home' }">
          <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li :class="{'nav-item':this.currentPage !== 'register', 'nav-item active':this.currentPage === 'register' }">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import router from '../router';

export default {
  name: 'navbar',
  data() {
    return {
      currentPage: router.currentRoute.name
    }
  },
  watch: {
    $route() {
      this.currentPage = router.currentRoute.name;
    }
  }
}
</script>