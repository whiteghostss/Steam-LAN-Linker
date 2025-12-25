'use client';

import React, { createContext, useContext } from 'react';
import { translations, TranslationKey } from '@/lib/i18n';

type Language = 'en' | 'zh';

type I18nContextType = {
  language: Language;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{
  language: Language;
  children: React.ReactNode;
}> = ({ language, children }) => {

  const t = (key: TranslationKey, vars?: Record<string, string | number>): string => {
    const langTranslations = translations[language];
    
    const keys = key.split('.');
    let temp: any = langTranslations;
    for (const k of keys) {
        if (temp[k] !== undefined) {
            temp = temp[k];
        } else {
            return key; // Key not found
        }
    }

    if (typeof temp !== 'string') {
      return key; // Path is correct but not a string
    }

    let result = temp;
    if (vars) {
      Object.entries(vars).forEach(([varKey, varValue]) => {
        result = result.replace(`{{${varKey}}}`, String(varValue));
      });
    }

    return result;
  };


  return (
    <I18nContext.Provider value={{ language, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
