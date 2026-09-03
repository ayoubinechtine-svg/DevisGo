import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import fr from '../i18n/fr';
import ar from '../i18n/ar';
import en from '../i18n/en';
import type { Lang } from '../types';
import type { TranslationShape } from '../i18n/fr';

const dictionaries: Record<Lang, TranslationShape> = { fr, ar, en };
const RTL_LANGS: Lang[] = ['ar'];

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationShape;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = 'devisgo_lang';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return stored && dictionaries[stored] ? stored : 'fr';
  });

  const dir: 'ltr' | 'rtl' = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (next: Lang) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  };

  const value = useMemo(
    () => ({ lang, setLang, t: dictionaries[lang], dir }),
    [lang, dir]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
