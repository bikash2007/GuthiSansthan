import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
const resources = {
  English: {
    translation: require("./locales/english.json"),
  },
  Nepali: {
    translation: require("./locales/nepali.json"),
  },
  Newari: {
    translation: require("./locales/newari.json"),
  },
  Mithila: {
    translation: require("./locales/mithila.json"),
  },
};
i18n
  .use(HttpApi) // Use HttpApi to fetch translation files via HTTP
  .use(LanguageDetector) // Use LanguageDetector to automatically detect user's preferred language
  .use(initReactI18next) // Initialize i18next for React integration
  .init({
    resources,
    supportedLngs: ["English", "Nepali", "Newari", "Mithila"], // Supported languages
    fallbackLng: "Nepali", // Fallback language if a translation is missing
    detection: {
      order: ["queryString", "cookie"], // Order of language detection methods
      cache: ["cookie"], // Cache language detection in cookies
    },
    backend: {
      loadPath: "/locales/{{lng}}.json", // Path pattern to load translation files
    },
    react: {
      useSuspense: false, // Disable React Suspense for data fetching
    },
  });

export default i18n;
