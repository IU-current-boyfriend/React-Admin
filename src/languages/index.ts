import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUsTrans from "./modules/en";
import zhUsTrans from "./modules/zh";
import { getBrowserLang } from "@/utils";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enUsTrans
    },
    zh: {
      translation: zhUsTrans
    }
  },
  lng: getBrowserLang(),
  debug: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
