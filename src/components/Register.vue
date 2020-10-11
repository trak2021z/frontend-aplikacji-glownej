<template>
  <div class="signup-form">
    <form @submit="submit">
      <h2>Register</h2>
      <p class="hint-text">You can create new account using this form</p>
      <div class="form-group">
        <div class="row">
          <div class="col"><input type="text" class="form-control" name="first_name" placeholder="First Name"
                                  v-model.trim="$v.firstname.$model"
                                  :class="{'is-invalid':$v.firstname.$error, 'is-valid':!$v.firstname.$invalid }">
            <div class="invalid-feedback">
              <span v-if="!$v.firstname.required">Firstname Required</span>
              <span v-if="!$v.firstname.minLength">Malo Liter</span>
              <span v-if="!$v.firstname.maxLength">Duzo Liter</span>
            </div>
          </div>
          <div class="col">
            <input type="text" class="form-control" name="last_name" placeholder="Last Name"
                   v-model.trim="$v.lastname.$model"
                   :class="{'is-invalid':$v.lastname.$error, 'is-valid':!$v.lastname.$invalid }">
            <div class="invalid-feedback">
              <span v-if="!$v.lastname.required">Firstname Required</span>
              <span v-if="!$v.lastname.minLength">Malo Liter</span>
              <span v-if="!$v.lastname.maxLength">Duzo Liter</span>
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
              <span v-if="!$v.password.minLength">Password must be at least 6 characters</span>
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
          <div class="col"><input @click="clearFormFields" type="reset" class="btn btn-success btn-lg btn-block" value="Reset Form"></div>
          <div class="col">
            <button type="submit" class="btn btn-success btn-lg btn-block">Register Now</button>
          </div>
        </div>
      </div>
    </form>
    <div class="text-center">Already have an account? <a href="#">Sign in</a></div>
  </div>
</template>

<script>
import {maxLength, minLength, required, email, sameAs} from "vuelidate/lib/validators";

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
      creditCard: ''
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
    clearFormFields(){
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.address = '';
      this.password = '';
      this.passwordConfirmation = null;
      this.creditCard = '';
    }
  },
  validations: {
    firstname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10)
    },
    lastname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10)
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
      minLength: minLength(6)
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

<style>
body {
  color: #000;
  background: #9fd98f !important;
}

.form-control {
  height: 40px;
  box-shadow: none;
  color: #969fa4;
}

.form-control:focus {
  border-color: #5cb85c;
}

.form-control, .btn {
  border-radius: 3px;
}

.signup-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 0;
  font-size: 15px;
}

.signup-form h2 {
  color: #636363;
  margin: 0 0 15px;
  position: relative;
  text-align: center;
}

.signup-form h2:before, .signup-form h2:after {
  content: "";
  height: 2px;
  width: 30%;
  background: #d4d4d4;
  position: absolute;
  top: 50%;
  z-index: 2;
}

.signup-form h2:before {
  left: 0;
}

.signup-form h2:after {
  right: 0;
}

.signup-form .hint-text {
  color: #999;
  margin-bottom: 30px;
  text-align: center;
}

.signup-form form {
  color: #999;
  border-radius: 3px;
  margin-bottom: 15px;
  background: #f2f3f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}

.signup-form .form-group {
  margin-bottom: 20px;
}

.signup-form .btn {
  font-size: 16px;
  font-weight: bold;
  min-width: 140px;
  outline: none !important;
}

.signup-form .row div:first-child {
  padding-right: 10px;
}

.signup-form .row div:last-child {
  padding-left: 10px;
}

.signup-form a {
  color: #2c3e50;
  text-decoration: underline;
}

.signup-form a:hover {
  text-decoration: none;
}

.signup-form form a {
  color: #5cb85c;
  text-decoration: none;
}

.signup-form form a:hover {
  text-decoration: underline;
}
</style>