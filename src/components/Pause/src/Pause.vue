<template>
  <div class="bg pause" :class="{ c: showPause }" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
interface IPause {
  timeout: undefined | number;
}
let Pause: IPause = {
  timeout: undefined,
};
export default defineComponent({
  name: "Pause",
  props: {
    data: {
      type: Boolean,
    },
  },
  setup(props) {
    const showPause = ref(false);
    const setShake = (flag: boolean) => {
      if (flag && !Pause.timeout) {
        Pause.timeout = setInterval(() => {
          showPause.value = !showPause.value;
        }, 250);
      }
      if (!flag && Pause.timeout) {
        clearInterval(Pause.timeout);
        showPause.value = false;
        Pause.timeout = undefined;
      }
    };
    onMounted(() => {
      setShake(props.data);
    });
    watch(
      props,
      (newProps) => {
        setShake(newProps.data);
      },
      { immediate: true, deep: true }
    );

    return {
      showPause,
    };
  },
});
</script>
<style lang="less" scoped>
@import "../style/index.less";
</style>
