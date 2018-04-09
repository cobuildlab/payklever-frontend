import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import {
  reactI18nextModule
} from 'react-i18next';
import es from './es';
import en from './en';

i18next
  .use(LngDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['navigator'],
    },
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
  })

export default i18next;
