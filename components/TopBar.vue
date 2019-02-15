<template lang="html">
  <div class="top-bar-row">
    <div class="container">
      <slot />
    </div>
  </div>
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
.top-bar-row {
  min-height: 53px;
  background-color: #c1c8d2;
  border-bottom: 1.5px solid #fff;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font-weight: 700;
}
</style>
