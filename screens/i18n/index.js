import i18n from "i18n-js";
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next'
import enTranslation from './en.json'
import esTranslation from './es.json'


const resources = {
    en: {
        translation: enTranslation,
    },
    es: {
        translation: esTranslation,
    }
};

i18next.use(initReactI18next)

i18next.init({
        resources,
        lng: 'es',
        keySeparator: false,
        interporlation: {
            escapeValue: false,
        },
    });


export default i18next;

