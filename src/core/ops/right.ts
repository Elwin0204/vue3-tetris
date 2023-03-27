import { want } from "@/core";
import event from "@/core/event";
import states from "@/core/states";
import { music } from "@/core/music";
import { speeds, delays } from "@/core/const";
import store from "@/store";
type storeType = typeof store;
const down = (store: storeType) => {
  store.commit("key_right", true);
  event.down({
    key: "right",
    begin: 200,
    interval: 100,
    callback: () => {
      const state = store.state;
      if (state.lock) {
        return;
      }
      if (music.move) {
        music.move();
      }
      const cur = state.cur;
      if (cur !== null) {
        if (state.pause) {
          states.pause(false);
          return;
        }
        const next = cur.right();
        const delay = delays[state.speedRun - 1];
        let timeStamp;
        if (want(next, state.matrix)) {
          next.timeStamp += parseInt(delay.toString(), 10);
          store.commit("moveBlock", next);
          timeStamp = next.timeStamp;
        } else {
          cur.timeStamp += parseInt(
            (parseInt(delay.toString(), 10) / 1.5).toString(),
            10
          ); // 真实移动delay多一点，碰壁delay少一点
          store.commit("moveBlock", cur);
          timeStamp = cur.timeStamp;
        }
        const remain = speeds[state.speedRun - 1] - (Date.now() - timeStamp);
        states.auto(remain);
      } else {
        let speed = state.speedStart;
        speed = speed + 1 > 6 ? 1 : speed + 1;
        store.commit("speedStart", speed);
      }
    },
  });
};

const up = (store: storeType) => {
  store.commit("key_right", false);
  event.up({
    key: "right",
  });
};

export default {
  down,
  up,
};
