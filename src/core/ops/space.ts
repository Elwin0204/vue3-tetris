import { want } from "@/core";
import event from "@/core/event";
import states from "@/core/states";
import { music } from "@/core/music";
import store from "@/store";
type storeType = typeof store;
const down = (store: storeType) => {
  store.commit("key_drop", true);
  event.down({
    key: "space",
    once: true,
    callback: () => {
      const state = store.state;
      if (state.lock) {
        return;
      }
      const cur = state.cur;
      if (cur !== null) {
        // 置底
        if (state.pause) {
          states.pause(false);
          return;
        }
        if (music.fall) {
          music.fall();
        }
        let index = 0;
        let bottom = cur.fall(index);
        while (want(bottom, state.matrix)) {
          bottom = cur.fall(index);
          index++;
        }
        const matrix = JSON.parse(JSON.stringify(state.matrix));
        bottom = cur.fall(index - 2);
        store.commit("moveBlock", bottom);
        const shape = bottom.shape;
        const xy = bottom.xy;
        shape.forEach((m, k1) =>
          m.forEach((n, k2) => {
            if (n && xy[0] + k1 >= 0) {
              // 竖坐标可以为负
              const line = matrix[xy[0] + k1];
              line[xy[1] + k2] = 1;
              matrix[xy[0] + k1] = line;
            }
          })
        );
        store.commit("drop", true);
        setTimeout(() => {
          store.commit("drop", false);
        }, 100);
        states.nextAround(matrix);
      } else {
        states.start();
      }
    },
  });
};

const up = (store: storeType) => {
  store.commit("key_drop", false);
  event.up({
    key: "space",
  });
};

export default {
  down,
  up,
};
