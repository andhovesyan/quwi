<template lang="html">
  <div class="switcher">
    <input type="checkbox" :id="id" @input="onChange" @change="onChange" :checked="value"/>
    <label :for="id">Toggle</label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      default: false,
    },
  },
  methods: {
    onChange(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
$height: 20px;
$width: 40px;
$cicleWidth: 14px;
$distance: ($height - $cicleWidth) / 2;

.switcher {
  display: inline-block;
}

input[type=checkbox] {
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: $width;
  height: $height;
  background: #c33a24;
  display: block;
  border-radius: $height;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: $distance;
  left: $distance;
  width: $cicleWidth;
  height: $cicleWidth;
  background: #fff;
  border-radius: $cicleWidth;
}

input:checked + label {
  background: #0b8f14;
}

input:checked + label:after {
  left: calc(100% - #{$distance});
  transform: translateX(-100%);
}
</style>
