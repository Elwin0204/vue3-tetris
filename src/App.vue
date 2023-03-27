<template>
  <hi-tetris />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HiTetris from "@/components/Tetris";

export default defineComponent({
  name: "App",
  components: {
    HiTetris,
  },
});
</script>
