interface IEventName {
  [index: string]: any;
}
const eventName: IEventName = {};

interface IEventParams {
  key?: string;
  begin?: number;
  interval?: number;
  callback?: (value?: () => void) => void;
  once?: boolean;
}
const down = (o: IEventParams) => {
  // 键盘、手指按下
  const keys = Object.keys(eventName);
  keys.forEach((i) => {
    clearTimeout(eventName[i]);
    eventName[i] = null;
  });
  if (!o.callback) {
    return;
  }
  const clear = () => {
    clearTimeout(eventName[o.key as string]);
  };
  o.callback(clear);
  if (o.once === true) {
    return;
  }
  let begin = o.begin || 100 || null;
  const interval = o.interval || 50;
  const loop = () => {
    eventName[o.key as string] = setTimeout(() => {
      begin = null;
      loop();
      if (o.callback) {
        o.callback(clear);
      }
    }, begin || interval);
  };
  loop();
};

const up = (o: IEventParams) => {
  // 键盘、手指松开
  clearTimeout(eventName[o.key as string]);
  eventName[o.key as string] = null;
  if (!o.callback) {
    return;
  }
  o.callback(undefined);
};

const clearAll = () => {
  const keys = Object.keys(eventName);
  keys.forEach((i) => {
    clearTimeout(eventName[i]);
    eventName[i] = null;
  });
};

export default {
  down,
  up,
  clearAll,
};
