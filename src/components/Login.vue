<template>
  <div class="background-stonks">
    <div class="main-form">
      <div class="col-sm-6 float-right">
        <form @submit="submit">
          <h2>Log in</h2>
          <p class="hint-text">Please log in using e-mail and password</p>
          <div class="form-group">
            <div v-if="(status && status !== 201 && loginMessage) || (!status && loginMessage)" class="alert"
                 v-bind:class="{ 'alert-danger': this.loginAlertDangerClass, 'alert-success': !this.loginAlertDangerClass }">
              {{ loginMessage }}
            </div>
            <div class="row">
              <div class="col"><input type="email" class="form-control" name="email" placeholder="Email"
                                      v-model.trim="$v.email.$model"
                                      :class="{'is-invalid':$v.email.$error, 'is-valid':!$v.email.$invalid }">
                <div class="invalid-feedback">
                  <span v-if="!$v.email.required">Email required</span>
                  <span v-if="!$v.email.email">Wrong email format</span>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col"><input type="password" class="form-control" name="password" placeholder="Password"
                                      v-model.trim="$v.password.$model"
                                      :class="{'is-invalid':$v.password.$error, 'is-valid':!$v.password.$invalid }">
                <div class="invalid-feedback">
                  <span v-if="!$v.password.required">Password required</span>
                  <span v-if="!$v.password.minLength">Password must be at least 8 characters long</span>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col">
                <button type="submit" class="btn btn-primary btn-lg btn-block">Log in</button>
              </div>
            </div>
          </div>
        </form>
        <div class="text-center text-white">Don't have an account?
          <router-link class="text-white" to="/register">Register</router-link>
        </div>
        <div class="bg-white mt-4 mb-1 rounded-pill blur"></div>
        <h1 class="text-white mt-5 stonks-text">STONKS</h1>
      </div>
    </div>
  </div>
</template>

<script>
import {minLength, required, email} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";
import router from "@/router";

export default {
  name: "Login",
  loginAlertDangerClass: true,
  data() {
    return {
      email: '',
      password: '',
      status: null,
      loginMessage: null
    }
  },
  computed: mapGetters(["getToken"]),
  methods: {
    ...mapActions(["login"]),
    submit(e) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loginAlertDangerClass = true;
        this.loginMessage = 'Fill all fields correctly to log in';
        this.$v.$reset();
      } else {
        this.login({
          username: this.email,
          password: this.password,
          email: this.email
        }).then(response => {
          this.status = response;
          this.loginStatus();
          if (this.status === 200) {
            this.$v.$reset();
            router.replace("/bonjur");
          }
        });
      }
      e.preventDefault();
    },
    loginStatus() {
      if (this.status === 200) {
        //this.loginAlertDangerClass = false;
        //this.loginMessage = "Log in successful, we'll redirect you in a moment";
      } else {
        this.loginAlertDangerClass = true;
        this.loginMessage = 'Log in failed - wrong email and/or password';
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
  }
}
</script>