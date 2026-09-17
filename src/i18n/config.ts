import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es }
    },
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en', 'es'],
    interpolation: {
      escapeValue: false 
    }
  });

// Atualiza a tag lang do HTML e title dinamicamente
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  const titles: Record<string, string> = {
    pt: 'Rafaela Geovana | Front-End Engineer',
    en: 'Rafaela Geovana | Front-End Engineer',
    es: 'Rafaela Geovana | Desarrolladora Front-End'
  };
  document.title = titles[lng] || titles.pt;
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', titles[lng] || titles.pt);
  }
});

export default i18n;
