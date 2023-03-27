import event from "@/core/event";
import states from "@/core/states";
import store from "@/store";
type storeType = typeof store;
const down = (store: storeType) => {
  store.commit("key_reset", true);
  if (store.state.lock) {
    return;
  }
  if (store.state.cur !== null) {
    event.down({
      key: "r",
      once: true,
      callback: () => {
        states.overStart();
      },
    });
  } else {
    event.down({
      key: "r",
      once: true,
      callback: () => {
        if (store.state.lock) {
          return;
        }
        states.start();
      },
    });
  }
};

const up = (store: storeType) => {
  store.commit("key_reset", false);
  event.up({
    key: "r",
  });
};

export default {
  down,
  up,
};
