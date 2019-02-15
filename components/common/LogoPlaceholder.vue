<template lang="html">
  <div class="logo-placeholder" :style="{fontSize: `${fontSize}px`}">
    {{letters}}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    fontSize: {
      type: Number,
      default: 16,
    },
  },
  computed: {
    letters() {
      return this.text.split(' ').map((t) => t[0]).join('');
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-placeholder {
  white-space: nowrap;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #6495ed;
  text-transform: uppercase;
}
</style>
