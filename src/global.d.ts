export {};
declare global {
  interface Window {
    webkitAudioContext: any;
    mozAudioContext: any;
    oAudioContext: any;
    msAudioContext: any;
  }
}
