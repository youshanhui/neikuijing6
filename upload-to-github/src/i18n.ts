import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import zhTranslation from './locales/zh/translation.json';
import ptTranslation from './locales/pt/translation.json';
import esTranslation from './locales/es/translation.json';
import deTranslation from './locales/de/translation.json';
import ruTranslation from './locales/ru/translation.json';
import koTranslation from './locales/ko/translation.json';
import itTranslation from './locales/it/translation.json';
import frTranslation from './locales/fr/translation.json';
import arTranslation from './locales/ar/translation.json';
import jaTranslation from './locales/ja/translation.json';
import hiTranslation from './locales/hi/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
  es: {
    translation: esTranslation,
  },
  de: {
    translation: deTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  ko: {
    translation: koTranslation,
  },
  it: {
    translation: itTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  ar: {
    translation: arTranslation,
  },
  ja: {
    translation: jaTranslation,
  },
  hi: {
    translation: hiTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
      lookupFromPathIndex: 0,
    },
  });

// Language detection from URL path
const getLanguageFromPath = (pathname: string): string => {
  const pathLang = pathname.split('/')[1];
  const supportedLangs = ['en', 'zh', 'pt', 'es', 'de', 'ru', 'ko', 'it', 'fr', 'ar', 'ja', 'hi'];
  if (supportedLangs.includes(pathLang)) {
    return pathLang;
  }
  return 'zh';
};

// Initialize language from current path
const pathLanguage = typeof window !== 'undefined' ? getLanguageFromPath(window.location.pathname) : 'zh';
i18n.changeLanguage(pathLanguage);

export default i18n;
