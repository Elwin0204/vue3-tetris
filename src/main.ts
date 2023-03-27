import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import i18n from "./i18n";
import VueDOMPurifyHTML from "vue-dompurify-html";
import "@/styles/global.less";

const app = createApp(App);
app.use(store);
app.use(i18n);
app.use(VueDOMPurifyHTML);
app.mount("#app");
