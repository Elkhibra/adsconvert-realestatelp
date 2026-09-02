import { createContext, useContext, useEffect, useState } from "react";
import {
  translations,
  formCopy,
  trustItems,
  kickers,
  privacyCopy,
} from "./translations";

const FONT_STYLESHEETS = [
  "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans-arabic/400.css",
  "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans-arabic/500.css",
  "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans-arabic/600.css",
  "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans-arabic/700.css",
  "https://cdn.jsdelivr.net/npm/@fontsource/inter/400.css",
  "https://cdn.jsdelivr.net/npm/@fontsource/inter/500.css",
  "https://cdn.jsdelivr.net/npm/@fontsource/inter/600.css",
  "https://cdn.jsdelivr.net/npm/@fontsource/inter/700.css",
  "https://cdn.jsdelivr.net/npm/@fontsource/inter/800.css",
  "https://cdn.jsdelivr.net/npm/@fontsource/inter/900.css",
];

function readStoredLanguage() {
  try {
    return localStorage.getItem("preferredLanguage") || "ar";
  } catch {
    return "ar";
  }
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage);

  useEffect(() => {
    FONT_STYLESHEETS.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("preferredLanguage", lang);
    } catch {
      // localStorage unavailable (private browsing, etc.) — language still
      // switches for the session, it just won't persist across reloads.
    }
  };

  const value = {
    language,
    changeLanguage,
    isRTL: language === "ar",
    t: translations[language],
    f: formCopy[language],
    k: kickers[language],
    trust: trustItems[language],
    p: privacyCopy[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
