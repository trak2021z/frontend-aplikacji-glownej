<template>
  <div class="main-form">
    <form @submit="submit">
      <h2>Log in</h2>
      <p class="hint-text">Please log in using e-mail and password</p>
      <div class="form-group">
        <div v-if="(status && status !== 201) || (!status && loginMessage)" class="alert alert-danger">
          {{loginMessage}}
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
            <button type="submit" class="btn btn-success btn-lg btn-block">Log in</button>
          </div>
        </div>
      </div>
    </form>
    <div class="text-center">Don't have an account? <router-link to="/register">Register</router-link></div>
  </div>
</template>

<script>
import {minLength, required, email} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";
import router from "@/router";

export default {
  name: "Login",
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
          if(this.status === 200){
            this.$v.$reset();
            router.replace('/stocks');
          }
        });
      }
      e.preventDefault();
    },
    loginStatus(){
      if(this.status === 200)
        this.loginMessage = "Log in successful, we'll redirect you in a moment";
      else
        this.loginMessage = 'Log in failed - wrong email and/or password';
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