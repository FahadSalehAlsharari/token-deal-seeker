
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationKeys } from '@/i18n';

type LanguageContextType = {
  language: Language;
  t: TranslationKeys;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
};

const defaultLanguage: Language = 'ar';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  t: translations[defaultLanguage],
  setLanguage: () => {},
  dir: 'rtl',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [dir, setDir] = useState<'rtl' | 'ltr'>('rtl');

  useEffect(() => {
    // Apply RTL direction for Arabic, LTR for English
    const newDir = language === 'ar' ? 'rtl' : 'ltr';
    setDir(newDir);
    document.documentElement.dir = newDir;
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage: changeLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};
