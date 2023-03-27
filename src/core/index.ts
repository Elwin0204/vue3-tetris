import { blockType, ICur } from "@/core/const";

const hiddenProperty = (() => {
  let names = ["hidden", "webkitHidden", "mozHidden", "msHidden"];
  names = names.filter((e) => e in document);
  return names.length > 0 ? names[0] : false;
})();

const core = {
  isMobile() {
    // Judge whether it is mobile terminal
    const ua = navigator.userAgent;
    const android = /Android (\d+\.\d+)/.test(ua);
    const iphone = ua.indexOf("iPhone") > -1;
    const ipod = ua.indexOf("iPod") > -1;
    const ipad = ua.indexOf("iPad") > -1;
    const nokiaN = ua.indexOf("NokiaN") > -1;
    return android || iphone || ipod || ipad || nokiaN;
  },
  visibilityChangeEvent: (() => {
    if (!hiddenProperty) {
      return false;
    }
    return hiddenProperty.replace(/hidden/i, "visibilitychange");
  })(),
  isFocus: () => {
    // If this feature does not exist, it is considered to be always focused
    if (!hiddenProperty) {
      return true;
    }
    return !document[hiddenProperty as keyof typeof document];
  },
  getNextType() {
    // 随机获取下一个方块类型
    const len = blockType.length;
    return blockType[Math.floor(Math.random() * len)];
  },
  want(next: ICur, matrix: number[][]) {
    // 方块是否能移到到指定位置
    const xy = next.xy;
    const shape = next.shape;
    const horizontal = shape[0].length;
    return shape.every((m, k1) =>
      m.every((n, k2) => {
        if (xy[1] < 0) {
          // left
          return false;
        }
        if (xy[1] + horizontal > 10) {
          // right
          return false;
        }
        if (xy[0] + k1 < 0) {
          // top
          return true;
        }
        if (xy[0] + k1 >= 20) {
          // bottom
          return false;
        }
        if (n) {
          if (matrix[xy[0] + k1][xy[1] + k2]) {
            return false;
          }
          return true;
        }
        return true;
      })
    );
  },
  isClear(matrix: number[][]) {
    // 是否达到消除状态
    const clearLines: number[] = [];
    matrix.forEach((m, k) => {
      if (m.every((n) => !!n)) {
        clearLines.push(k);
      }
    });
    if (clearLines.length === 0) {
      return false;
    }
    return clearLines;
  },
  isOver(matrix: number[][]) {
    // 游戏是否结束, 第一行落下方块为依据
    return matrix[0].some((n) => !!n);
  },
};

export const {
  isMobile,
  visibilityChangeEvent,
  isFocus,
  getNextType,
  want,
  isClear,
  isOver,
} = core;
