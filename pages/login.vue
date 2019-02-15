<template>
<section id="content">
  <section class="container">
    <div class="user-login">
      <div class="header">Login</div>
      <form id="login-form" class="box" @submit.prevent="login" method="post">
        <div class="logo">Q</div>
        <div class="c-active-input" :class="{ 'has-danger': errors.email }">
          <div class="input-group">
            <div class="e-placeholder m-top-text" :class="{ 'has-danger': errors.email }">
              {{ errors.email || 'Email' }}
            </div>
            <input v-model="formData.email" placeholder="Email" type="email" autofocus="autofocus" required>
          </div>
        </div>
        <div class="c-active-input" :class="{ 'has-danger': errors.password }">
          <div class="input-group">
            <div class="e-placeholder m-top-text" :class="{ 'has-danger': errors.password }">
              {{ errors.password || 'Password' }}
            </div>
            <input v-model="formData.password" type="password" placeholder="Password" required>
          </div>
        </div>
        <button class="btn btn-primary">
          login
        </button>
      </form>
    </div>
  </section>
</section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      errors: [],
    };
  },
  methods: {
    login() {
      this.$auth.loginWith('local', {
        data: this.formData,
      }).then(() => {
        this.errors = [];
        this.$router.push(this.$auth.options.redirect.home);
      }).catch((error) => {
        this.errors = error.response.data.first_errors;
      });
    }
  }
}
</script>

<style scoped>
.user-login {
  width: 440px;
  margin: auto;
  text-align: center;
  margin: 50px auto;
}

.user-login .header {
  font-size: 29px;
  margin-bottom: 29px;
}

.user-login .box {
  -webkit-box-shadow: 0 0 9px 0 rgba(0, 0, 0, .19);
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, .19);
  padding: 25px 40px 35px;
  border: 1px solid #e7e7e7;
  border-radius: 7px;
  background: #fff;
}

.user-login .box input {
  border: 1px solid #4b84da;
  border-radius: 5px;
  padding: 15px;
  width: 100%;
  outline: none;
}

.user-login .box .logo {
  font-weight: 700;
  font-size: 80px;
  text-align: center;
  margin-bottom: 20px;
}

.user-login .box .c-active-input {
  margin-bottom: 30px;
}

.c-active-input .input-group {
  position: relative;
}

.has-danger {
  color: #dc3545;
}

.c-active-input .input-group .m-top-text {
  margin: 0 10px;
  max-width: calc(100% - 20px);
  position: absolute;
  top: -.55em;
  background: #fff;
  display: block;
  float: left;
  padding: 0 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.c-active-input .input-group .m-top-text.e-placeholder {
  color: #4b84da;
}

.c-active-input.has-danger input {
  border-color: #dc3545 !important;
}

.c-active-input .input-group .m-top-text.has-danger {
  color: #dc3545;
}
</style>
