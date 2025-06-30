
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import enTranslations from '../../public/locales/en.json';

// Define the shape of the translation context
interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Define the props for the provider
interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: string;
}

// The provider component
export const I18nProvider = ({ children, initialLocale = 'en' }: I18nProviderProps) => {
  const [locale, setLocale] = useState(initialLocale);
  const [translations, setTranslations] = useState<Record<string, any>>({ en: enTranslations });

  useEffect(() => {
    // Set the initial locale from server/browser
    setLocale(initialLocale);
  }, [initialLocale]);


  useEffect(() => {
    const loadTranslations = async (lang: string) => {
      if (lang === 'en' || translations[lang]) {
        return;
      }
      try {
        const response = await fetch(`/locales/${lang}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${lang}`);
        }
        const data = await response.json();
        setTranslations(prev => ({ ...prev, [lang]: data }));
      } catch (error) {
        console.error(error);
        // Fallback to English if loading fails
        if (locale !== 'en') {
          setLocale('en');
        }
      }
    };
    if (locale) {
        loadTranslations(locale);
    }
  }, [locale, translations]);

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const langTranslations = translations[locale] || translations.en;
    
    const keys = key.split('.');
    let result = langTranslations;
    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            // Fallback to English if key not found in current language
            let fallbackResult = translations.en;
            for (const fk of keys) {
                if (fallbackResult && typeof fallbackResult === 'object' && fk in fallbackResult) {
                    fallbackResult = fallbackResult[fk];
                } else {
                    return key; // Return key if not in English either
                }
            }
            result = fallbackResult;
            break;
        }
    }

    if (typeof result !== 'string') {
        return key; // Return key if the path does not resolve to a string
    }

    if (params) {
        return result.replace(/\{\{(\w+)\}\}/g, (_, placeholder) => {
            return params[placeholder] !== undefined ? String(params[placeholder]) : placeholder;
        });
    }

    return result;
  }, [locale, translations]);

  const contextValue = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

// Custom hook to use the i18n context
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
