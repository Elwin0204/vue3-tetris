<!--
 * @Author: CESBG\H7112347 yao.lei@mail.foxconn.com
 * @Date: 2023-03-13 08:08:38
 * @LastEditors: CESBG\H7112347 yao.lei@mail.foxconn.com
 * @LastEditTime: 2023-03-27 15:57:14
 * @FilePath: \vue3-tetris\src\components\Next\src\Next.vue
 * @Description: next block state
-->
<template>
  <div class="next">
    <div v-for="(item, index) in block" :key="index">
      <b :class="e ? 'c' : ''" v-for="(e, k2) in item" :key="k2" />
    </div>
  </div>
</template>
<script lang="ts">
import { blockShape } from "@/core/const";
const xy = {
  // 方块在下一个中的坐标
  I: [1, 0],
  L: [0, 0],
  J: [0, 0],
  Z: [0, 0],
  S: [0, 0],
  O: [0, 1],
  T: [0, 0],
};
type xyKeyType = keyof typeof xy;
const empty = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "Next",
  props: {
    data: {
      type: String,
    },
  },
  setup(props) {
    const block = ref(empty);
    const build = (type: xyKeyType) => {
      const shape: number[][] = blockShape[type];
      const blockTemp = empty.map((e) => [...e]);
      shape.forEach((m, k1) => {
        m.forEach((n, k2) => {
          if (n) {
            blockTemp[k1 + xy[type][0]][k2 + xy[type][1]] = 1;
          }
        });
      });
      block.value = blockTemp;
    };
    watch(
      props,
      (newProps) => {
        build(newProps.data as xyKeyType);
      },
      { immediate: true, deep: true }
    );
    return {
      block,
    };
  },
});
</script>
<style lang="less" scoped>
@import "../style/index.less";
</style>
