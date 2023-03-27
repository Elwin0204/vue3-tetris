<template>
  <div class="point">
    <p>{{ label }}</p>
    <hi-number :number="number" @setLength="setLength" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import HiNumber from "@/components/Number";
import i18n from "@/i18n";
import { ICur } from "@/core/const";
const DF = i18n.global.t("point");
const ZDF = i18n.global.t("highestScore");
const SLDF = i18n.global.t("lastRound");
interface IPoint {
  timeout: undefined | number;
}
interface IOnChangeParams {
  cur: ICur;
  point: number;
  max: number;
}
let Point: IPoint = {
  timeout: undefined,
};
export default defineComponent({
  name: "Point",
  props: ["cur", "point", "max"],
  components: {
    HiNumber,
  },
  setup(props) {
    let label = ref("");
    let number = ref(0);
    const setLength = (value: number) => {
      number.value = value;
    };

    const onChange = ({ cur, point, max }: IOnChangeParams) => {
      clearInterval(Point.timeout);
      if (cur) {
        // 在游戏进行中
        label.value = point >= max ? ZDF : DF;
        number.value = point;
      } else {
        // 游戏未开始
        const toggle = () => {
          // 最高分与上轮得分交替出现
          label.value = SLDF;
          number.value = point;
          Point.timeout = setTimeout(() => {
            label.value = ZDF;
            number.value = max;
            Point.timeout = setTimeout(toggle, 3000);
          }, 3000);
        };

        if (point !== 0) {
          // 如果为上轮没玩, 也不用提示了
          toggle();
        } else {
          label.value = ZDF;
          number.value = max;
        }
      }
    };

    watch(
      props,
      (newProps) => {
        onChange(newProps);
      },
      { immediate: true, deep: true }
    );

    return {
      label,
      number,
      setLength,
    };
  },
});
</script>
<style lang="less" scoped>
@import "../style/index.less";
</style>
