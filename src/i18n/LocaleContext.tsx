import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  type Locale,
  availableLocales,
  translations,
  type TranslationShape
} from "./translations";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: TranslationShape;
  availableLocales: Locale[];
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);
const LOCALE_STORAGE_KEY = "app.locale";

const resolveInitialLocale = (): Locale => {
  if (typeof window === "undefined") {
    return "pl";
  }

  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && (availableLocales as Locale[]).includes(stored as Locale)) {
      return stored as Locale;
    }
  } catch {
    // Ignore storage access issues and fall back to default locale.
  }

  return "pl";
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => resolveInitialLocale());

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState((current) => (current === nextLocale ? current : nextLocale));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage access issues; locale will fall back to default on next load.
    }
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      messages: translations[locale],
      availableLocales
    }),
    [locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
