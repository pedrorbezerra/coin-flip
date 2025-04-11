import { useState } from 'react';
import en from '../i18n/en';
import ptBr from '../i18n/ptBr';

const translations = {
  en,
  ptBr,
} as const;

type Translations = typeof translations;
type Language = keyof Translations;
type TranslationKey = keyof typeof en;

export const useTranslations = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  const t = (key: TranslationKey): string => {
    return translations[currentLang][key] || key;
  };

  return {
    t,
    currentLang,
    setCurrentLang,
  };
};
