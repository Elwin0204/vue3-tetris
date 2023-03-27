<template>
  <div class="number">
    <span
      v-for="(item, index) in dataList"
      :key="index"
      :class="'bg s_' + item"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, watch, ref } from "vue";
interface INumberObj {
  timeInterval: undefined | number;
  time_count: undefined | number;
}
const formate = (num: number) =>
  num < 10 ? `0${num}`.split("") : `${num}`.split("");
let NumberObj: INumberObj = {
  timeInterval: undefined,
  time_count: undefined,
};
export default defineComponent({
  name: "Number",
  props: {
    propTime: {
      type: Boolean,
    },
    number: {
      type: Number,
    },
    length: {
      type: Number,
      default: 6,
    },
  },
  setup(props, { emit }) {
    let time = new Date();
    const dataList = ref<string[]>([]);

    const render = () => {
      if (props.propTime) {
        // 右下角时钟
        const now = time;
        const hour = formate(now.getHours());
        const min = formate(now.getMinutes());
        const sec = now.getSeconds() % 2;
        const t = hour.concat(sec ? "d" : "d_c", min);
        dataList.value = t;
        return;
      }
      const num = `${props.number}`.split("");
      for (let i = 0, len = props.length - num.length; i < len; i++) {
        num.unshift("n");
      }
      dataList.value = num;
      return;
    };

    const clock = () => {
      // const count = +Number(NumberObj.timeInterval);
      NumberObj.timeInterval = setTimeout(() => {
        time = new Date();
        render();
        clock();
      }, 1000);
    };
    watch(
      props,
      () => {
        render();
      },
      { immediate: true, deep: true }
    );
    onMounted(() => {
      if (!props.length) {
        emit("setLength", 6);
      }
      if (props.propTime) {
        clock();
      }
      render();
    });
    onUnmounted(() => {
      if (props.propTime) {
        clearTimeout(NumberObj.timeInterval);
      }
    });

    return {
      dataList,
    };
  },
});
</script>
<style lang="less" scoped>
@import "../style/index.less";
</style>
