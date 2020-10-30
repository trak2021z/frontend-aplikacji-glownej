<template>
  <div class="main-form">
    <form @submit="submit">
      <h2>Register</h2>
      <p class="hint-text">You can create new account using this form</p>
      <div class="form-group">
        <div v-if="status === 201" class="alert alert-success">
          {{registerMessage}}
        </div>
        <div v-if="(status && status !== 201) || (!status && registerMessage)" class="alert alert-danger">
          {{registerMessage}}
        </div>
        <div class="row">
          <div class="col"><input type="text" class="form-control" name="first_name" placeholder="First Name"
                                  v-model.trim="$v.firstname.$model"
                                  :class="{'is-invalid':$v.firstname.$error, 'is-valid':!$v.firstname.$invalid }">
            <div class="invalid-feedback">
              <span v-if="!$v.firstname.required">Firstname Required</span>
              <span v-if="!$v.firstname.minLength">First name too short</span>
              <span v-if="!$v.firstname.maxLength">First name too long</span>
            </div>
          </div>
          <div class="col">
            <input type="text" class="form-control" name="last_name" placeholder="Last Name"
                   v-model.trim="$v.lastname.$model"
                   :class="{'is-invalid':$v.lastname.$error, 'is-valid':!$v.lastname.$invalid }">
            <div class="invalid-feedback">
              <span v-if="!$v.lastname.required">Last name Required</span>
              <span v-if="!$v.lastname.minLength">Last name too short</span>
              <span v-if="!$v.lastname.maxLength">Last name too long</span>
            </div>
          </div>
        </div>
      </div>
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
          <div class="col"><input type="text" class="form-control" name="address" placeholder="Address"
                                  v-model.trim="$v.address.$model"
                                  :class="{'is-invalid':$v.address.$error, 'is-valid':!$v.address.$invalid }">
            <div class="invalid-feedback">
              <span v-if="!$v.address.required">Address required</span>
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
              <span v-if="!$v.password.minLength">Password must be at least 8 characters</span>
            </div>
          </div>
          <div class="col"><input type="password" class="form-control" name="confirm_password"
                                  placeholder="Confirm password"
                                  v-model.trim="$v.passwordConfirmation.$model"
                                  :class="{'is-invalid':$v.passwordConfirmation.$error, 'is-valid':!$v.passwordConfirmation.$invalid }">
            <div class="invalid-feedback">
              <span v-if="!$v.passwordConfirmation.sameAs">Password and confirmation password must match</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" name="creditCard" placeholder="Credit card"
               v-model.trim="$v.creditCard.$model"
               :class="{'is-invalid':$v.creditCard.$error, 'is-valid':!$v.creditCard.$invalid }">
        <div class="invalid-feedback">
          <span v-if="!$v.creditCard.required">Credit card number required</span>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col"><input @click="clearFormFields" type="reset" class="btn btn-success btn-lg btn-block"
                                  value="Reset Form"></div>
          <div class="col">
            <input @click="submit" type="button" class="btn btn-success btn-lg btn-block" value="Register"/>
          </div>
        </div>
      </div>
    </form>
    <div class="text-center">Already have an account? <router-link to="/login">Sign in</router-link></div>
  </div>
</template>

<script>
import {maxLength, minLength, required, email, sameAs} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";
import router from '../router';

export default {
  name: 'Register',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      password: '',
      passwordConfirmation: null,
      creditCard: '',
      status: null,
      registerMessage: null
    }
  },
  computed: mapGetters(["getToken"]),
  methods: {
    ...mapActions(["register"]),
    submit(e) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.registerMessage = 'Fill all fields correctly before registration';
        this.$v.$reset();
      } else {
        this.register({
          username: this.email,
          password1: this.password,
          password2: this.passwordConfirmation,
          email: this.email
        }).then(response => {
          this.status = response;
          this.registerStatus();
          if(this.status === 201){
            this.$v.$reset();
            setTimeout(() => router.replace('/companies'), 3000);
          }
        });
      }
      e.preventDefault();
    },
    registerStatus() {
      if (this.status === 201)
        this.registerMessage = "User registered successfully, we'll redirect you in a moment";
      else
        this.registerMessage = 'User creation failed';
    },
    clearFormFields() {
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.address = '';
      this.password = '';
      this.passwordConfirmation = null;
      this.creditCard = '';
      this.$v.$reset();
    }
  },
  validations: {
    firstname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50)
    },
    lastname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50)
    },
    email: {
      required,
      email
    },
    address: {
      required
    },
    password: {
      required,
      minLength: minLength(8)
    },
    passwordConfirmation: {
      sameAsPassword: sameAs('password')
    },
    creditCard: {
      required
    }
  }
}
</script>