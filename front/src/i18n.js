import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

const savedLanguage = localStorage.getItem('language') ? localStorage.getItem('language').toLowerCase() : 'en';
// console.log('savedLanguage', savedLanguage);
// console.log('localStorage.getItem(language)', localStorage.getItem('language'));
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;