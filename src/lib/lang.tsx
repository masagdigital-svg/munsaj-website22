"use client";

import * as React from "react";

export type Lang = "en" | "ar";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: <T>(pair: { en: T; ar: T }) => T;
  isRtl: boolean;
};

const LangContext = React.createContext<LangContextValue | null>(null);
const STORAGE_KEY = "mansaj-lang";

export function LangProvider({
  children,
  initialLang = "en",
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = React.useState<Lang>(initialLang);

  React.useEffect(() => {
    if (initialLang !== "en") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "ar" || stored === "en") setLangState(stored);
    } catch {
      /* ignore */
    }
  }, [initialLang]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = React.useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = React.useCallback(
    () => setLangState((p) => (p === "en" ? "ar" : "en")),
    []
  );
  const t = React.useCallback(<T,>(pair: { en: T; ar: T }) => pair[lang], [lang]);
  const value = React.useMemo<LangContextValue>(
    () => ({ lang, setLang, toggleLang, t, isRtl: lang === "ar" }),
    [lang, setLang, toggleLang, t]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
