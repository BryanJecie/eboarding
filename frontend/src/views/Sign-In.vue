<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
  <div class="sign-in">
    <a-row type="flex" :gutter="[24, 24]" justify="space-around" align="middle">
      <!-- Sign In Form Column -->
      <a-col
        :span="24"
        :md="12"
        :lg="{ span: 12, offset: 0 }"
        :xl="{ span: 6, offset: 2 }"
        class="col-form"
      >
        <a-alert
          v-if="errors.has('invalid_credentials')"
          message="Error"
          :description="errors.get('invalid_credentials')"
          type="error"
          show-icon
        />

        <h1 class="mb-15">Sign In</h1>
        <h5 class="font-regular text-muted">
          Enter your email and password to sign in
        </h5>

        <!-- Sign In Form -->
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
          :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" label="Email" :colon="false">
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                  ],
                },
              ]"
              placeholder="Email"
            />
          </a-form-item>
          <a-form-item class="mb-5" label="Password" :colon="false">
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'Please input your password!' },
                  ],
                },
              ]"
              type="password"
              placeholder="Password"
            />
          </a-form-item>
          <a-form-item class="mb-10">
            <a-switch v-model="rememberMe" /> Remember Me
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              block
              html-type="submit"
              class="login-form-button"
              :loading="btnLoading"
            >
              SIGN IN
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">
          Don't have an account?
          <router-link to="/sign-in" class="font-bold text-dark"
            >Sign Up</router-link
          >
        </p>
      </a-col>
      <!-- / Sign In Form Column -->

      <!-- Sign In Image Column -->
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
        <img src="images/img-signin.jpg" alt="" />
      </a-col>
      <!-- Sign In Image Column -->
    </a-row>
  </div>
</template>

<script>
import Errors from "@src/helpers/errors";
// import Form from "@src/helpers/form";
export default {
  data() {
    return {
      // Binded model property for "Sign In Form" switch button for "Remember Me" .
      rememberMe: true,
      staySignedIn: true,
      btnLoading: false,
      errors: new Errors(),
    };
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  mounted() {
    this.form.setFieldsValue({
      email: "admin@admin.com",
      password: "secret",
    });
  },
  methods: {
    // Handles input validation after submission.
    handleSubmit(e) {
      e.preventDefault();
      this.errors.clear();

      this.form.validateFields((err, values) => {
        if (!err) {
          this.btnLoading = true;
          let params = {
            body: values,
            url: "/v1/guest/to_login",
            staySignedIn: this.staySignedIn,
            remember: this.rememberMe,
          };
          this.$store
            .dispatch("auth/login", params)
            .then((res) => {
              this.$router.push({
                name: "Home",
              });
            })
            .catch((err) => {
              this.errors.record(err.response.data.errors);
            })
            .finally(() => {
              this.btnLoading = false;
            });
        }
      });
    },

    to_post() {},

    authenticate(user) {},
  },
};
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>