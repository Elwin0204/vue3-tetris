import { want } from "@/core";
import event from "@/core/event";
import states from "@/core/states";
import { music } from "@/core/music";
import store from "@/store";
type storeType = typeof store;
const down = (store: storeType) => {
  store.commit("key_down", true);
  if (store.state.cur !== null) {
    event.down({
      key: "down",
      begin: 40,
      interval: 40,
      callback: (stopDownTrigger) => {
        const state = store.state;
        if (state.lock) {
          return;
        }
        if (music.move) {
          music.move();
        }
        const cur = state.cur;
        if (cur === null) {
          return;
        }
        if (state.pause) {
          states.pause(false);
          return;
        }
        const next = cur.fall();
        if (want(next, state.matrix)) {
          store.commit("moveBlock", next);
          // store.dispatch(actions.moveBlock(next));
          states.auto();
        } else {
          const matrix = JSON.parse(JSON.stringify(state.matrix));
          const shape = cur.shape;
          const xy = cur.xy;
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
          states.nextAround(matrix, stopDownTrigger);
        }
      },
    });
  } else {
    event.down({
      key: "down",
      begin: 200,
      interval: 100,
      callback: () => {
        if (store.state.lock) {
          return;
        }
        const state = store.state;
        const cur = state.cur;
        if (cur) {
          return;
        }
        if (music.move) {
          music.move();
        }
        let startLines = state.startLines;
        startLines = startLines - 1 < 0 ? 10 : startLines - 1;
        store.commit("startLines", startLines);
        // store.dispatch(actions.startLines(startLines));
      },
    });
  }
};

const up = (store: storeType) => {
  store.commit("key_down", false);
  event.up({
    key: "down",
  });
};

export default {
  down,
  up,
};
