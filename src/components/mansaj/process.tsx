"use client";

import * as React from "react";
import { Compass, PenTool, Code2, Rocket } from "lucide-react";
import { useLang } from "@/lib/lang";
import { Reveal, SectionHeading } from "./reveal";

export function Process() {
  const { t } = useLang();

  const steps = [
    {
      icon: Compass,
      en: {
        title: "Discover",
        desc: "We understand your business, audience, and what your website must achieve.",
      },
      ar: {
        title: "الفهم",
        desc: "نفهم نشاطك وجمهورك وما الذي يجب أن يحققه موقعك لعملائك.",
      },
    },
    {
      icon: PenTool,
      en: {
        title: "Design",
        desc: "We plan the pages, content, and look — agreed with you before we build.",
      },
      ar: {
        title: "التصميم",
        desc: "نخطط الصفحات والمحتوى والشكل — بالاتفاق معك قبل البدء بالبناء.",
      },
    },
    {
      icon: Code2,
      en: {
        title: "Build",
        desc: "We develop your website mobile-first, fast, and test it on real screens.",
      },
      ar: {
        title: "البناء",
        desc: "نطوّر موقعك بالجوال أولًا وبسرعة عالية، ونختبره على شاشات حقيقية.",
      },
    },
    {
      icon: Rocket,
      en: {
        title: "Launch",
        desc: "We publish it, hand over everything, and stay with you after delivery.",
      },
      ar: {
        title: "الإطلاق",
        desc: "ننشر موقعك ونسلّمك كل شيء، ونظل معك بعد التسليم.",
      },
    },
  ];

  return (
    <section
      id="process"
      className="py-16 sm:py-20"
      aria-label={t({ en: "How we work", ar: "كيف نعمل" })}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t({ en: "How we work", ar: "كيف نعمل" })}
          title={t({
            en: "Four clear steps — from your idea to a live website.",
            ar: "أربع خطوات واضحة — من فكرتك إلى موقع يعمل على أرض الواقع.",
          })}
          desc={t({
            en: "No confusion, no surprises. You always know where your project stands.",
            ar: "بلا حيرة ولا مفاجآت. ستعرف دائمًا أين وصل مشروعك.",
          })}
        />

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const c = t({ en: s.en, ar: s.ar });
            return (
              <Reveal key={c.title} delay={i * 0.08} as="li">
                <div className="relative flex h-full flex-col gap-3 rounded-md border border-border bg-card p-5 pt-6 transition-all hover:-translate-y-1 hover:shadow-offset-sm">
                  <span
                    className="absolute -top-3 start-5 rounded-sm bg-brand px-2 py-0.5 font-mono text-[11px] font-bold text-brand-foreground"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-soft text-brand">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
