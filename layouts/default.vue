<template>
  <div id="app" class="app">
    <nav-bar />
    <nuxt/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
@import '../assets/style';
</style>
