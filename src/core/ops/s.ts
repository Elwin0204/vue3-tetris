import event from "@/core/event";
import store from "@/store";
type storeType = typeof store;
const down = (store: storeType) => {
  store.commit("key_music", true);
  if (store.state.lock) {
    return;
  }
  event.down({
    key: "s",
    once: true,
    callback: () => {
      if (store.state.lock) {
        return;
      }
      store.commit("music", !store.state.music);
    },
  });
  console.log("down");
};

const up = (store: storeType) => {
  console.log("up");
  store.commit("key_music", false);
  event.up({
    key: "s",
  });
};

export default {
  down,
  up,
};
