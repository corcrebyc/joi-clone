"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Locale,
  translations,
  TranslationKey,
  locales,
} from "@/lib/translations";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  locales: typeof locales;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [mounted, setMounted] = useState(false);

  const isRtl = locale === "ar";

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale === "pt" ? "pt-BR" : locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale, mounted]);

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale === "pt" ? "pt-BR" : newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
  }

  function t(key: TranslationKey): string {
    return translations[locale][key] ?? translations.pt[key] ?? key;
  }

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{
          locale: "pt",
          setLocale: () => {},
          t: (key) => translations.pt[key],
          locales,
          isRtl: false,
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, locales, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
