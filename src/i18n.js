import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es.json";
import en from "./locales/en.json";
// 👇 CAMBIO: Importamos 'br' en lugar de 'pt'
import br from "./locales/br.json"; 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      // 👇 CAMBIO: Usamos la llave 'br'
      br: { translation: br } 
    },
    
    lng: "en", // Idioma inicial
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;