<template>
  <div class="keyboard" :style="`margin-top:${fillingNum}px;`">
    <hi-button
      color="blue"
      size="s1"
      :top="0"
      :left="104"
      :label="labelDropSpace"
      arrow="translate(0, 63px)"
      :position="true"
      :active="keyboard['drop']"
      ref="dom_space"
    />
    <hi-button
      color="blue"
      size="s1"
      :top="180"
      :left="104"
      :label="labelDown"
      arrow="translate(0,-71px) rotate(180deg)"
      :active="keyboard['down']"
      ref="dom_down"
    />
    <hi-button
      color="blue"
      size="s1"
      :top="90"
      :left="14"
      :label="labelLeft"
      arrow="translate(60px, -12px) rotate(270deg)"
      :active="keyboard['left']"
      ref="dom_left"
    />
    <hi-button
      color="blue"
      size="s1"
      :top="90"
      :left="194"
      :label="labelRight"
      arrow="translate(-60px, -12px) rotate(90deg)"
      :active="keyboard['right']"
      ref="dom_right"
    />
    <hi-button
      color="red"
      size="s2"
      :top="0"
      :left="336"
      :label="labelResetR"
      :active="keyboard['reset']"
      ref="dom_r"
    />
    <hi-button
      color="green"
      size="s2"
      :top="0"
      :left="426"
      :label="labelSoundS"
      :active="keyboard['music']"
      ref="dom_s"
    />
    <hi-button
      color="green"
      size="s2"
      :top="0"
      :left="516"
      :label="labelPauseP"
      :active="keyboard['pause']"
      ref="dom_p"
    />
    <hi-button
      color="blue"
      size="s0"
      :top="100"
      :left="374"
      :label="rotation"
      :active="keyboard['rotate']"
      ref="dom_rotate"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, watchEffect, ref, computed, onMounted } from "vue";
import i18n from "@/i18n";
import HiButton from "@/components/Button";
import { useState } from "@/utils/useState";
import store from "@/store";
import ops from "@/core/ops";
type opsKeyType = keyof typeof ops;
interface IObj {
  [index: string]: any;
}
export default defineComponent({
  name: "Keyboard",
  components: {
    HiButton,
  },
  props: {
    filling: Number,
  },
  setup(props) {
    let fillingNum = ref(0);
    watchEffect(() => {
      fillingNum.value = (props.filling as number) + 20;
    });
    const storeState = useState(["keyboard"]);
    const rotation = computed(() => {
      return i18n.global.t("rotation");
    });
    const labelLeft = computed(() => {
      return i18n.global.t("left");
    });
    const labelRight = computed(() => {
      return i18n.global.t("right");
    });
    const labelDown = computed(() => {
      return i18n.global.t("down");
    });
    const labelDropSpace = computed(() => {
      return `${i18n.global.t("drop")} (SPACE)`;
    });
    const labelResetR = computed(() => {
      return `${i18n.global.t("reset")}(R)`;
    });
    const labelSoundS = computed(() => {
      return `${i18n.global.t("sound")}(S)`;
    });
    const labelPauseP = computed(() => {
      return `${i18n.global.t("pause")}(P)`;
    });

    const dom_space = ref();
    const dom_down = ref();
    const dom_left = ref();
    const dom_right = ref();
    const dom_r = ref();
    const dom_s = ref();
    const dom_p = ref();
    const dom_rotate = ref();

    const dom_list = {
      dom_space,
      dom_down,
      dom_left,
      dom_right,
      dom_r,
      dom_s,
      dom_p,
      dom_rotate,
    };
    type dom_list_type = keyof typeof dom_list;
    onMounted(() => {
      const touchEventCatch: IObj = {}; // 对于手机操作, 触发了touchstart, 将作出记录, 不再触发后面的mouse事件

      // 在鼠标触发mousedown时, 移除元素时可以不触发mouseup, 这里做一个兼容, 以mouseout模拟mouseup
      const mouseDownEventCatch: IObj = {};
      document.addEventListener(
        "touchstart",
        (e) => {
          if (e.preventDefault) {
            e.preventDefault();
          }
        },
        { capture: true, passive: false }
      );
      document.addEventListener(
        "touchend",
        (e) => {
          if (e.preventDefault) {
            e.preventDefault();
          }
        },
        true
      );

      // 阻止双指放大
      document.addEventListener("gesturestart", (event) => {
        event.preventDefault();
      });

      document.addEventListener(
        "mousedown",
        (e) => {
          if (e.preventDefault) {
            e.preventDefault();
          }
        },
        true
      );

      Object.keys(ops).forEach((key) => {
        dom_list[`dom_${key}` as dom_list_type].value.$el.addEventListener(
          "mousedown",
          () => {
            if (touchEventCatch[key] === true) {
              return;
            }
            ops[key as opsKeyType].down(store);
            mouseDownEventCatch[key] = true;
          },
          true
        );

        dom_list[`dom_${key}` as dom_list_type].value.$el.addEventListener(
          "mouseup",
          () => {
            if (touchEventCatch[key] === true) {
              touchEventCatch[key] = false;
              return;
            }
            ops[key as opsKeyType].up(store);
            mouseDownEventCatch[key] = false;
          },
          true
        );

        dom_list[`dom_${key}` as dom_list_type].value.$el.addEventListener(
          "mouseout",
          () => {
            if (mouseDownEventCatch[key] === true) {
              ops[key as opsKeyType].up(store);
            }
          },
          true
        );

        dom_list[`dom_${key}` as dom_list_type].value.$el.addEventListener(
          "touchstart",
          () => {
            touchEventCatch[key] = true;
            ops[key as opsKeyType].down(store);
          },
          true
        );
        dom_list[`dom_${key}` as dom_list_type].value.$el.addEventListener(
          "touchend",
          () => {
            ops[key as opsKeyType].up(store);
          },
          true
        );
      });
    });

    return {
      fillingNum,
      ...storeState,
      rotation,
      labelLeft,
      labelRight,
      labelDown,
      labelDropSpace,
      labelResetR,
      labelSoundS,
      labelPauseP,
      dom_space,
      dom_down,
      dom_left,
      dom_right,
      dom_r,
      dom_s,
      dom_p,
      dom_rotate,
    };
  },
});
</script>
<style lang="less" scoped>
@import "../style/index.less";
</style>
