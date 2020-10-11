<template>
    <div class="signup-form">
      <form>
        <h2>Register</h2>
        <p class="hint-text">You can create new account using this form</p>
        <div class="form-group">
          <div class="row">
            <div class="col"><input type="text" class="form-control" name="first_name" placeholder="First Name" required="required"></div>
            <div class="col"><input type="text" class="form-control" name="last_name" placeholder="Last Name" required="required"></div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col"><input type="email" class="form-control" name="email" placeholder="Email" required="required"></div>
            <div class="col"><input type="email" class="form-control" name="address" placeholder="Address" required="required"></div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col"><input type="password" class="form-control" name="password" placeholder="Password" required="required"></div>
            <div class="col"><input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required"></div>
          </div>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" name="credit_card" placeholder="Credit Card" required="required">
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col"><input type="reset" class="btn btn-success btn-lg btn-block" value="Reset Form"></div>
            <div class="col"><button type="submit" class="btn btn-success btn-lg btn-block">Register Now</button></div>
          </div>
        </div>
      </form>
      <div class="text-center">Already have an account? <a href="#">Sign in</a></div>
    </div>
</template>

<script>
  export default {
    name: 'Register'
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