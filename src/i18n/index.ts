import { createI18n } from "vue-i18n";
import en from "./lang/en";
import zhCN from "./lang/zhCN";

const i18n = createI18n({
  locale: localStorage.getItem("lang") || "zhCN",
  messages: {
    en: en,
    zhCN: zhCN,
  },
});

export default i18n;
