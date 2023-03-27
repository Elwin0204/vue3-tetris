<template>
  <div
    class="button"
    :class="color + ' ' + size"
    :style="'top:' + top + 'px;' + 'left:' + left + 'px'"
  >
    <i :class="{ active: active }" />
    <em :style="'transform:' + arrow + ' scale(1,2)'" v-show="size === 's1'" />
    <span :class="position ? 'position' : ''">
      {{ label }}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { transform } from "@/core/const";
export default defineComponent({
  name: "Button",
  props: [
    "active",
    "color",
    "size",
    "top",
    "left",
    "label",
    "position",
    "arrow",
  ],
  setup() {
    transform();
  },
});
</script>
<style lang="less" scoped>
@import "../style/index.less";
</style>
