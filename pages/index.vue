<template lang="html">
<div></div>
</template>

<script>
export default {
  middleware: [
    function({ redirect }) {
      return redirect(301, '/projects');
    },
  ],
}
</script>
