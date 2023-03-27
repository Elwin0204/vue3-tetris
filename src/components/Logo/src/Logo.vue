<template>
  <div class="logo" :style="`display:${display}`">
    <div class="bg dragon" :class="style"></div>
    <p v-dompurify-html="titleCenter"></p>
  </div>
</template>
<script lang="ts">
interface ILogo {
  timeout: undefined | number;
}
let Logo: ILogo = {
  timeout: undefined,
};
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import i18n from "@/i18n";
import { handleXss, checkType } from "@/utils";
import type { ICur } from "@/core/const";
interface IAnimatateParams {
  cur: ICur;
  reset: boolean;
}
export default defineComponent({
  name: "Logo",
  props: ["cur", "reset"],
  setup(props) {
    const style = ref("r1");
    const display = ref("none");
    const titleCenter = computed(() => handleXss(i18n.global.t("titleCenter")));

    const animate = ({ cur, reset }: IAnimatateParams) => {
      clearTimeout(Logo.timeout);
      style.value = "r1";
      display.value = "none";
      if (cur || reset) {
        display.value = "none";
        return;
      }

      let m = ref("r");
      let count = ref(0);

      const set = (func: () => void, delay: number) => {
        if (!func) {
          return;
        }
        Logo.timeout = setTimeout(func, delay);
      };
      // 显示
      const show = (func: () => void) => {
        set(() => {
          display.value = "block";
          if (checkType(func) === "[object Function]") {
            func();
          }
        }, 150);
      };
      // 隐藏
      const hide = (func: () => void) => {
        set(() => {
          display.value = "none";
          if (checkType(func) === "[object Function]") {
            func();
          }
        }, 150);
      };
      // 龙在眨眼睛
      const eyes = (func: () => void, delay1: number, delay2: number) => {
        set(() => {
          style.value = m.value + 2;
          set(() => {
            style.value = m.value + 1;
            if (checkType(func) === "[object Function]") {
              func();
            }
          }, delay2);
        }, delay1);
      };

      const run = (func: () => void) => {
        set(() => {
          style.value = m.value + 4;
          set(() => {
            style.value = m.value + 3;
            count.value++;
            if (
              count.value === 10 ||
              count.value === 20 ||
              count.value === 30
            ) {
              m.value = m.value === "r" ? "l" : "r";
            }
            if (count.value < 40) {
              run(func);
              return;
            }
            style.value = m.value + 1;
            if (checkType(func) === "[object Function]") {
              set(func, 4000);
            }
          }, 100);
        }, 100);
      };

      const dra = () => {
        count.value = 0;
        eyes(
          () => {
            eyes(
              () => {
                eyes(
                  () => {
                    style.value = m.value + 2;
                    run(dra);
                  },
                  150,
                  150
                );
              },
              150,
              150
            );
          },
          1000,
          1500
        );
      };

      // 忽隐忽现
      show(() => {
        hide(() => {
          show(() => {
            hide(() => {
              show(() => {
                dra();
              });
            });
          });
        });
      });
    };

    watch(
      props,
      (newProps, oldProps: any) => {
        animate(newProps);
        if (
          (!!oldProps &&
            [oldProps.cur, newProps.cur].indexOf(false) !== -1 &&
            oldProps.cur !== newProps.cur) ||
          (!!oldProps && oldProps.reset !== newProps.reset)
        ) {
          animate(newProps);
        }
      },
      { immediate: true, deep: true }
    );

    onMounted(() => {
      animate(props);
    });
    return {
      style,
      display,
      titleCenter,
    };
  },
});
</script>
<style lang="less" scoped>
@import "../style/index.less";
</style>
