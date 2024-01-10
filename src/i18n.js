import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from "libs/lang/en/translation.json"
import translationDE from "libs/lang/de/translation.json"

const resources = {
  en: {
    translation: translationEN
  },
  de: {
    translation: translationDE
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: resources,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;