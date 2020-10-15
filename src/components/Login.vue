<template>
  <div class="main-form">
    <form @submit="submit">
      <h2>Log in</h2>
      <p class="hint-text">Please log in using e-mail and password</p>
      <div class="form-group">
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
    <div class="text-center">Don't have an account? <a href="#">Register</a></div>
  </div>
</template>

<script>
import {minLength, required, email} from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit(e) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('form is invalid');
      } else {
        console.log('form submitted');
      }
      e.preventDefault();
    },
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

<style scoped>

</style>