<template>
  <div class="bg music" :class="data ? '' : 'c'"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Music",
  props: {
    data: {
      type: Boolean,
    },
  },
});
</script>
<style lang="less" scoped>
@import "../style/index.less";
</style>
