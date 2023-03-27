import { createStore } from "vuex";
import { lastRecord, blankMatrix, maxPoint, blockType } from "@/core/const";
import Block from "@/core/block";
import { hasWebAudioAPI } from "@/core/music";
import { getNextType, isFocus } from "@/core";

const dropInitState =
  lastRecord && lastRecord.lock !== undefined ? !!lastRecord.lock : false;

const resetInitState =
  lastRecord && lastRecord.reset ? !!lastRecord.reset : false;

const curInitState = (() => {
  if (!lastRecord || !lastRecord.cur) {
    return null;
  }
  const cur = lastRecord.cur;
  const option = {
    type: cur.type,
    rotateIndex: cur.rotateIndex,
    shape: cur.shape,
    xy: cur.xy,
  };
  return new Block(option);
})();

const matrixInitState =
  lastRecord && Array.isArray(lastRecord.matrix)
    ? lastRecord.matrix
    : blankMatrix;

let musicInitState =
  lastRecord && lastRecord.music !== undefined ? !!lastRecord.music : true;
if (!hasWebAudioAPI.data) {
  musicInitState = false;
}

let maxInitState =
  lastRecord && !isNaN(parseInt(lastRecord.max as any, 10))
    ? parseInt(lastRecord.max as any, 10)
    : 0;

if (maxInitState < 0) {
  maxInitState = 0;
} else if (maxInitState > maxPoint) {
  maxInitState = maxPoint;
}

let speedStartInitState =
  lastRecord && !isNaN(parseInt(lastRecord.speedStart as any, 10))
    ? parseInt(lastRecord.speedStart as any, 10)
    : 1;
if (speedStartInitState < 1 || speedStartInitState > 6) {
  speedStartInitState = 1;
}

let startLinesInitState =
  lastRecord && !isNaN(parseInt(lastRecord.startLines as any, 10))
    ? parseInt(lastRecord.startLines as any, 10)
    : 0;
if (startLinesInitState < 0 || startLinesInitState > 10) {
  startLinesInitState = 0;
}

const nextInitState =
  lastRecord && blockType.indexOf(lastRecord.next) !== -1
    ? lastRecord.next
    : getNextType();

let speedRunInitState =
  lastRecord && !isNaN(parseInt(lastRecord.speedRun.toString(), 10))
    ? parseInt(lastRecord.speedRun.toString(), 10)
    : 1;
if (speedRunInitState < 1 || speedRunInitState > 6) {
  speedRunInitState = 1;
}

let pointsInitState =
  lastRecord && !isNaN(parseInt(lastRecord.points.toString(), 10))
    ? parseInt(lastRecord.points.toString(), 10)
    : 0;

if (pointsInitState < 0) {
  pointsInitState = 0;
} else if (pointsInitState > maxPoint) {
  pointsInitState = maxPoint;
}

const pauseInitState =
  lastRecord && lastRecord.pause !== undefined ? !!lastRecord.pause : false;

let clearLinesInitState =
  lastRecord && !isNaN(parseInt(lastRecord.clearLines.toString(), 10))
    ? parseInt(lastRecord.clearLines.toString(), 10)
    : 0;
if (clearLinesInitState < 0) {
  clearLinesInitState = 0;
}

const lockInitState =
  lastRecord && lastRecord.lock !== undefined ? !!lastRecord.lock : false;

export default createStore({
  state: {
    drop: dropInitState,
    cur: curInitState,
    reset: resetInitState,
    matrix: matrixInitState,
    music: musicInitState,
    max: maxInitState,
    speedStart: speedStartInitState,
    startLines: startLinesInitState,
    next: nextInitState,
    speedRun: speedRunInitState,
    points: pointsInitState,
    pause: pauseInitState,
    clearLines: clearLinesInitState,
    keyboard: {
      drop: false,
      down: false,
      left: false,
      right: false,
      rotate: false,
      reset: false,
      music: false,
      pause: false,
    },
    lock: lockInitState,
    focus: isFocus(),
  },
  getters: {},
  mutations: {
    nextBlock(state, data) {
      if (!data) {
        data = getNextType();
      }
      state.next = data;
    },
    moveBlock(state, data) {
      state.cur = data.reset === true ? null : new Block(data);
    },
    speedStart(state, data) {
      state.speedStart = data;
    },
    speedRun(state, data) {
      state.speedRun = data;
    },
    startLines(state, data) {
      state.startLines = data;
    },
    matrix(state, data) {
      state.matrix = data;
    },
    lock(state, data) {
      state.lock = data;
    },
    clearLines(state, data) {
      state.clearLines = data;
    },
    points(state, data) {
      state.points = data;
    },
    max(state, data) {
      state.max = data;
    },
    reset(state, data) {
      state.reset = data;
    },
    drop(state, data) {
      state.drop = data;
    },
    pause(state, data) {
      state.pause = data;
    },
    music(state, data) {
      state.music = data;
    },
    focus(state, data) {
      state.focus = data;
    },
    key_drop(state, data) {
      state.keyboard["drop"] = data;
    },
    key_down(state, data) {
      state.keyboard["down"] = data;
    },
    key_left(state, data) {
      state.keyboard["left"] = data;
    },
    key_right(state, data) {
      state.keyboard["right"] = data;
    },
    key_rotate(state, data) {
      state.keyboard["rotate"] = data;
    },
    key_reset(state, data) {
      state.keyboard["reset"] = data;
    },
    key_music(state, data) {
      state.keyboard["music"] = data;
    },
    key_pause(state, data) {
      state.keyboard["pause"] = data;
    },
  },
});
