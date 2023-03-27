import store from "@/store";

const AudioContext =
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext;

export const hasWebAudioAPI = {
  data: !!AudioContext && location.protocol.indexOf("http") !== -1,
};
interface IMusic {
  killStart: () => void;
  start: () => void;
  clear: () => void;
  fall: () => void;
  gameover: () => void;
  rotate: () => void;
  move: () => void;
}
export const music: IMusic = {
  killStart: () => {},
  start: () => {},
  clear: () => {},
  fall: () => {},
  gameover: () => {},
  rotate: () => {},
  move: () => {},
};

(() => {
  if (!hasWebAudioAPI.data) {
    return;
  }
  const url = "./static/music.mp3";
  const context = new AudioContext();
  const req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "arraybuffer";
  req.onload = () => {
    context.decodeAudioData(
      req.response,
      (buf) => {
        // Convert the obtained audio decoding to buffer
        const getSource = () => {
          const source = context.createBufferSource();
          source.buffer = buf;
          source.connect(context.destination);
          return source;
        };

        // The music at the beginning of the game is only played once
        music.killStart = () => {
          music.start = () => {};
        };

        // start game
        music.start = () => {
          music.killStart();
          if (!store.state.music) {
            return;
          }
          getSource().start(0, 3.7202, 3.6224);
        };

        // clear block
        music.clear = () => {
          if (!store.state.music) {
            return;
          }
          getSource().start(0, 0, 0.7675);
        };

        // fall immediatly
        music.fall = () => {
          if (!store.state.music) {
            return;
          }
          getSource().start(0, 1.2558, 0.3546);
        };

        // game over
        music.gameover = () => {
          if (!store.state.music) {
            return;
          }
          getSource().start(0, 8.1276, 1.1437);
        };

        // rotate
        music.rotate = () => {
          if (!store.state.music) {
            return;
          }
          getSource().start(0, 2.2471, 0.0807);
        };

        // move
        music.fall = () => {
          if (!store.state.music) {
            return;
          }
          getSource().start(0, 2.9088, 0.1437);
        };
      },
      (error) => {
        if (window.console && !!window.console.error) {
          window.console.error(`Music: ${url} read error`, error);
          hasWebAudioAPI.data = false;
        }
      }
    );
  };

  req.send();
})();
