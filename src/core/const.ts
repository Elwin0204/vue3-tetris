export const blockShape = {
  I: [[1, 1, 1, 1]],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
};

export type blockShapeType = typeof blockShape;
export type blockShapeKeyType = keyof blockShapeType;
export type blockShapeValueType = blockShapeType[blockShapeKeyType];

export const origin = {
  I: [
    [-1, 1],
    [1, -1],
  ],
  L: [[0, 0]],
  J: [[0, 0]],
  Z: [[0, 0]],
  S: [[0, 0]],
  O: [[0, 0]],
  T: [
    [0, 0],
    [1, 0],
    [-1, 1],
    [0, -1],
  ],
};

export const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const blankMatrix = (() => {
  const matrix = [];
  for (let i = 0; i < 20; i++) {
    matrix.push(blankLine);
  }
  return matrix;
})();

export const maxPoint = 999999;

export const blockType = Object.keys(blockShape);

export const speeds = [800, 650, 500, 370, 250, 160];

export const delays = [50, 60, 70, 80, 90, 100];

export const fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

export const clearPoints = [100, 300, 700, 1500];

export const eachLines = 20;

export const STORAGE_KEY = "VUE_TETRIS";
export interface ICur {
  type: blockShapeKeyType;
  rotateIndex: number;
  timeStamp?: number;
  shape: blockShapeValueType;
  xy: number[];
}
interface IRecord {
  lock: boolean;
  cur: ICur;
  reset: boolean;
  matrix: number[][];
  music: any;
  max: number;
  speedStart: number;
  startLines: number;
  next: string;
  speedRun: number;
  points: number;
  pause: boolean;
  clearLines: number;
}
export const lastRecord = (() => {
  // last game status
  let result: IRecord;
  let data = window.localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return false;
  }
  try {
    if (typeof window.atob === "function") {
      data = atob(data);
    }
    data = decodeURIComponent(data);
    result = JSON.parse(data) as IRecord;
  } catch (e) {
    if (window.console && !!window.console.error) {
      window.console.error("Error reading record:", e);
    }
    return false;
  }
  return result;
})();

export const transform = () => {
  const trans = [
    "transform",
    "webkitTransform",
    "msTransform",
    "mozTransform",
    "oTransform",
  ];

  const body = document.body;
  type keyType = keyof typeof body.style;
  return trans.filter((e) => body.style[e as keyType] !== undefined)[0];
};
