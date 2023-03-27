<template>
  <div class="app" :style="size">
    <div class="rect" :class="drop ? 'drop' : ''">
      <hi-decorator />
      <div class="screen">
        <div class="panel">
          <hi-matrix :propMatrix="matrix" :cur="cur" :reset="reset" />
          <hi-logo :cur="!!cur" :reset="reset" />
          <div class="state">
            <hi-point :cur="!!cur" :max="max" :point="points" />
            <p>{{ cur ? $t("cleans") : $t("startLine") }}</p>
            <hi-number :number="cur ? clearLines : startLines" />
            <p>{{ $t("level") }}</p>
            <hi-number :number="cur ? speedRun : speedStart" :length="1" />
            <p>{{ $t("nextText") }}</p>
            <hi-next :data="next" />
            <div class="bottom">
              <hi-music :data="music" />
              <hi-pause :data="pause" />
              <hi-number :propTime="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <hi-keyboard :filling="filling" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useState } from "@/utils/useState";
import HiDecorator from "@/components/Decorator";
import HiMatrix from "@/components/Matrix";
import HiLogo from "@/components/Logo";
import HiKeyboard from "@/components/Keyboard";
import HiPoint from "@/components/Point";
import HiNumber from "@/components/Number";
import HiNext from "@/components/Next";
import HiMusic from "@/components/Music";
import HiPause from "@/components/Pause";
import { visibilityChangeEvent, isFocus } from "@/core";
import states from "@/core/states";
export default defineComponent({
  name: "Tetris",
  components: {
    HiDecorator,
    HiMatrix,
    HiLogo,
    HiKeyboard,
    HiPoint,
    HiNumber,
    HiNext,
    HiMusic,
    HiPause,
  },
  setup() {
    const storeState = useState([
      "drop",
      "cur",
      "reset",
      "matrix",
      "max",
      "points",
      "startLines",
      "clearLines",
      "speedStart",
      "speedRun",
      "next",
      "music",
      "pause",
    ]);

    let size = ref({});
    let filling = ref(0);

    const start = () => {
      // Write the focus change of the page into the store
      if (visibilityChangeEvent) {
        document.addEventListener(
          visibilityChangeEvent as string,
          () => {
            states.focus(isFocus());
          },
          false
        );
      }
    };

    const render = () => {
      const sizeFn = () => {
        const w = document.documentElement.clientWidth;
        const h = document.documentElement.clientHeight;
        const ratio = h / w;
        let scale;
        let css: { [key: string]: any } = {};
        if (ratio < 1.5) {
          scale = h / 960;
        } else {
          scale = w / 640;
          filling.value = (h - 960 * scale) / scale / 3;
          css = {
            "padding-top": Math.floor(filling.value) + 42 + "px",
            "padding-bottom": Math.floor(filling.value) + "px",
            "margin-top": Math.floor(-480 - filling.value * 1.5) + "px",
          };
        }
        css["transform"] = `scale(${scale})`;
        return {
          css,
          filling: filling.value,
        };
      };
      const result = sizeFn();
      size.value = result.css;
      filling.value = result.filling;
      start();
    };

    onMounted(() => {
      render();
      window.addEventListener("resize", render, true);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", render, true);
    });
    return {
      size,
      filling,
      ...storeState,
    };
  },
});
</script>
<style lang="less" scoped>
@import "../style/index.less";
</style>
