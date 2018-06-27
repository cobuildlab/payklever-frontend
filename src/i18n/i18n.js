import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import {
  reactI18nextModule
} from 'react-i18next';
import { en, es } from './locales';

i18next
  .use(LngDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    debug: false,
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
