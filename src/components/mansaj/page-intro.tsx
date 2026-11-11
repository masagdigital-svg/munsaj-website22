"use client";

import { useEffect } from "react";
import { useLang, type Lang } from "@/lib/lang";

type Bilingual = { en: string; ar: string };

type PageIntroProps = {
  eyebrow: Bilingual;
  title: Bilingual;
  description: Bilingual;
  documentTitle: Bilingual;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  documentTitle,
}: PageIntroProps) {
  const { lang } = useLang();

  useEffect(() => {
    const brand = lang === "ar" ? "منسج الرقمية" : "Mansaj Digital";
    document.title = `${documentTitle[lang]} | ${brand}`;
  }, [lang, documentTitle]);

  const text = (value: Bilingual) => value[lang as Lang];

  return (
    <section className="border-b border-border bg-muted/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-brand">
          {text(eyebrow)}
        </p>
        <h1 className="max-w-3xl text-balance text-3xl font-bold leading-tight sm:text-5xl">
          {text(title)}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {text(description)}
        </p>
      </div>
    </section>
  );
}
