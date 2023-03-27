<script lang="tsx">
import { defineComponent, watch, ref, Ref } from "vue";
import { fillLine, blankLine } from "@/core/const";
import { isClear } from "@/core";
import states from "@/core/states";
type clearLinesType = Ref<boolean> | Ref<number[]>;
type overState = Ref<null> | Ref<number[][]>;
const t = setTimeout;
export default defineComponent({
  name: "Matrix",
  props: ["cur", "reset", "propMatrix"],
  setup(props) {
    let clearLines: clearLinesType = ref(false);
    let animateColor = ref(2);
    let isOver = ref(false);
    let overState: overState = ref(null);
    type propsType = typeof props;
    const getResult = (props: propsType) => {
      const cur = props.cur;
      const shape = cur && cur.shape;
      const xy = cur && cur.xy;
      let matrix = JSON.parse(JSON.stringify(props.propMatrix));
      const clearLinesTemp = clearLines.value;
      if (clearLinesTemp) {
        const animateColorTemp = animateColor.value;
        (clearLinesTemp as number[]).forEach((index) => {
          matrix[index] = [
            animateColorTemp,
            animateColorTemp,
            animateColorTemp,
            animateColorTemp,
            animateColorTemp,
            animateColorTemp,
            animateColorTemp,
            animateColorTemp,
            animateColorTemp,
            animateColorTemp,
          ];
        });
      } else if (shape) {
        (shape as number[][]).forEach((m, k1) =>
          m.forEach((n, k2) => {
            if (n && xy[0] + k1 >= 0) {
              // 竖坐标可以为负
              let line = matrix[xy[0] + k1];
              let color;
              if (line[xy[1] + k2] === 1 && !clearLines.value) {
                // 矩阵与方块重合
                color = 2;
              } else {
                color = 1;
              }
              line[xy[1] + k2] = color;
              matrix[xy[0] + k1] = line;
            }
          })
        );
      }
      return matrix;
    };
    const clearAnimate = () => {
      const anima = (callback: () => void) => {
        t(() => {
          animateColor.value = 0;
          t(() => {
            animateColor.value = 2;
            if (typeof callback === "function") {
              callback();
            }
          }, 100);
        }, 100);
      };
      anima(() => {
        anima(() => {
          anima(() => {
            t(() => {
              states.clearLines(props.propMatrix, clearLines.value as number[]);
            }, 100);
          });
        });
      });
    };
    const over = (newProps: propsType) => {
      const overStateTemp = getResult(newProps);

      overState.value = [...overStateTemp] as number[][];
      const exLine = (index: number) => {
        if (index <= 19) {
          (overState.value as number[][])[19 - index] = fillLine;
        } else if (index >= 20 && index <= 39) {
          (overState.value as number[][])[index - 20] = blankLine;
        } else {
          states.overEnd();
          return;
        }
        overState.value = [...overStateTemp];
        // console.log(JSON.stringify(overState))
      };

      for (let i = 0; i <= 40; i++) {
        t(exLine.bind(null, i), 40 * (i + 1));
      }
    };
    const propsChange = (newProps: propsType) => {
      const clears = isClear(newProps.propMatrix);
      const overs = newProps.reset;
      setTimeout(() => {
        clearLines.value = clears;
        isOver.value = overs;
      }, 0);
      if (clears && !clearLines.value) {
        clearAnimate();
      }
      if (!clears && overs && !isOver.value) {
        over(newProps);
      }
    };
    watch(
      props,
      (newProps) => {
        propsChange(newProps);
      },
      { immediate: true, deep: true }
    );

    return () => {
      let matrix: null | number[][] = [];
      if (isOver.value) {
        matrix = overState.value;
      } else {
        matrix = getResult(props);
      }
      return (
        <div class="matrix">
          {(matrix as number[][]).map((p) => (
            <p>
              {p.map((e) => (
                <b class={(e === 1 ? "c" : "") + (e === 2 ? "d" : "")} />
              ))}
            </p>
          ))}
        </div>
      );
    };
  },
});
</script>
<style lang="less" scoped>
@import "../style/index.less";
</style>
