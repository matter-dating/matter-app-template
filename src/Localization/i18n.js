// src/localization/i18n.ts
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import translationEN from './en/translation.json';
import translationJP from './jp/translation.json';

export const resources = {
  en: {
    translation: translationEN,
  },
  ja: {
    translation: translationJP,
  },
};

// console.log(RNLocalize.getLocales());

const currentLanguage =
  RNLocalize.getLocales()[0].languageCode === 'ja' ? 'ja' : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: currentLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
