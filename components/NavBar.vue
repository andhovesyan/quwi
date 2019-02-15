<template lang="html">
  <nav class="navbar">
    <nuxt-link to="/projects" class="logo">Q</nuxt-link>
    <div class="nav" v-if="$auth.user">
      <nuxt-link to="/projects" class="nav-link">Projects</nuxt-link>
      <a href="javascript:;" class="nav-link" @click="logout">Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  background: #fafafa;
  border: none;
  box-shadow: 0 1px 1px #7c7c7c;
  display: flex;
  text-align: right;
  padding-right: 20px;
  height: 46px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 103;
}
.nav {
  line-height: 46px;
  height: 46px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.nav-link {
  display: flex;
  float: left;
  align-items: center;
  text-transform: uppercase;
  font-size: .8em;
  color: #636363;
  padding: 0 15px;
  height: 46px;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #000;
  font-weight: 700;
  font-family: Google Sans, sans-serif;
  width: 44px;
  height: 44px;
  margin-left: 13px;
  margin-right: 13px;
  margin-top: 1px;
  border-radius: 50%;
  text-decoration: none;
  cursor: pointer;
}
</style>
