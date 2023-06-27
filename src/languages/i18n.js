import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import english from './english.json';
import french from './french.json';
import * as RNlocalize from 'react-native-localize';

// const languageDetector = {
//   type: 'languageDetector',
//   async: true,
//   detect: callback => {
//     return callback(RNlocalize.getLocales()[0].languageCode);
//   },
//   init: () => {},
//   cacheUserLanguage: () => {},
// };

i18next
  // .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: english,
      fr: french,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
