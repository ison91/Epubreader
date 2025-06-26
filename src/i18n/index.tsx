
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
}

// The provider component
export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [locale, setLocale] = useState('en');
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${locale}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(error);
        // Fallback to English if loading fails
        if (locale !== 'en') {
          setLocale('en');
        }
      }
    };
    loadTranslations();
  }, [locale]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return key; // Return the key if not found
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
  };


  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
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
