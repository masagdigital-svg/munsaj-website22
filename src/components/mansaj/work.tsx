"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import { useLang } from "@/lib/lang";
import { Reveal, SectionHeading } from "./reveal";
import { waLink } from "@/lib/whatsapp";

const PROJECTS = [
  {
    img: "/images/work/alhamra.jpg",
    no: "01",
    en: {
      title: "Al-Hamra Grills",
      category: "Restaurants & grills",
      url: "https://alhamraa.netlify.app/",
      urlLabel: "alhamraa.netlify.app",
    },
    ar: {
      title: "مشويات الحمراء",
      category: "مطاعم ومشويات",
      url: "https://alhamraa.netlify.app/",
      urlLabel: "alhamraa.netlify.app",
    },
  },
  {
    img: "/images/work/aishalaw.jpg",
    no: "02",
    en: {
      title: "Law Office of Aisha Mohammed Al-Sayari",
      category: "Legal offices",
      url: "https://aishalaw.netlify.app/",
      urlLabel: "aishalaw.netlify.app",
    },
    ar: {
      title: "مكتب المحامية عائشة محمد الصيعري",
      category: "مكاتب وقانونية",
      url: "https://aishalaw.netlify.app/",
      urlLabel: "aishalaw.netlify.app",
    },
  },
  {
    img: "/images/work/maram.jpg",
    no: "03",
    en: {
      title: "Law Office of Maram Al-Fahmi",
      category: "Legal offices",
      url: "https://maramalfahmi.netlify.app",
      urlLabel: "maramalfahmi.netlify.app",
    },
    ar: {
      title: "مكتب المحامية مرام الفهمي",
      category: "مكاتب وقانونية",
      url: "https://maramalfahmi.netlify.app",
      urlLabel: "maramalfahmi.netlify.app",
    },
  },
  {
    img: "/images/work/justwow.jpg",
    no: "04",
    en: {
      title: "JUST WOW — واو وبس",
      category: "Snacks & treats",
      url: "https://just-wow.netlify.app/",
      urlLabel: "just-wow.netlify.app",
    },
    ar: {
      title: "JUST WOW — واو وبس",
      category: "وجبات خفيفة ومأكولات",
      url: "https://just-wow.netlify.app/",
      urlLabel: "just-wow.netlify.app",
    },
  },
] as const;

export function Work() {
  const { t, lang } = useLang();

  return (
    <section id="work" className="py-16 sm:py-20" aria-label={t({ en: "Our work", ar: "أعمالنا" })}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t({ en: "Mansaj's work", ar: "أعمال منسج" })}
          title={t({
            en: "Real websites, live on the internet.",
            ar: "مواقع حقيقية، تعمل الآن على الإنترنت.",
          })}
          desc={t({
            en: "These are not mockups — every card shows the actual website we built. Tap the screenshot or “Preview website” to open the live site and try it yourself.",
            ar: "هذه ليست صورًا وهمية — كل بطاقة تعرض الموقع الفعلي الذي بنيناه. اضغط على الصورة أو «معاينة الموقع» لتفتح الموقع الحقيقي وتجرّبه بنفسك.",
          })}
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {PROJECTS.map((p, i) => {
            const c = t({ en: p.en, ar: p.ar });
            return (
              <Reveal key={c.title} delay={(i % 2) * 0.09} as="li">
                <article className="group overflow-hidden rounded-md border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-offset">
                  {/* browser chrome — always LTR like a real browser */}
                  <div
                    dir="ltr"
                    className="flex items-center gap-2 border-b border-border bg-muted/70 px-3 py-2"
                  >
                    <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
                      <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    </span>
                    <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-[10.5px] text-muted-foreground">
                      <Lock className="h-3 w-3 shrink-0 text-brand" aria-hidden="true" />
                      <span className="truncate">{c.urlLabel}</span>
                    </span>
                    <ExternalLink
                      className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
                      aria-hidden="true"
                    />
                  </div>

                  {/* real screenshot — click to open the live site */}
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor={t({ en: "Open", ar: "افتح" })}
                    aria-label={
                      lang === "ar"
                        ? `فتح معاينة موقع ${c.title}`
                        : `Open live preview of the ${c.title} website`
                    }
                    className="relative block overflow-hidden border-b border-border"
                  >
                    <Image
                      src={p.img}
                      alt={
                        lang === "ar"
                          ? `لقطة حقيقية من موقع ${c.title}`
                          : `Real screenshot of the ${c.title} website`
                      }
                      width={1200}
                      height={750}
                      className="h-44 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04] sm:h-56"
                    />
                    <span
                      className="absolute top-3 start-3 rounded-sm bg-deep px-2 py-1 font-mono text-[11px] font-bold text-deep-foreground"
                      aria-hidden="true"
                    >
                      {p.no}
                    </span>
                    <span className="absolute bottom-3 end-3 rounded-sm bg-brand px-2.5 py-1 text-[11px] font-bold text-brand-foreground">
                      {c.category}
                    </span>
                  </a>

                  {/* body */}
                  <div className="flex flex-col gap-3 p-5">
                    <h3 className="text-[17px] font-bold leading-snug">{c.title}</h3>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor={t({ en: "Open", ar: "افتح" })}
                        className="inline-flex items-center gap-2 rounded-sm bg-deep px-4 py-2.5 text-sm font-bold text-deep-foreground transition-colors hover:bg-[var(--brand)] hover:text-[var(--brand-foreground)]"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        {t({ en: "Preview website", ar: "معاينة الموقع" })}
                      </a>
                      <a
                        href={waLink(
                          (lang === "ar"
                            ? `مرحبًا منسج الرقمية 👋\nشاهدت مشروع «${c.title}» في صفحة أعمالكم وأريد موقعًا مشابهًا لنشاطي.`
                            : `Hello Mansaj Digital 👋\nI saw the “${c.title}” project on your work page and I want a similar website for my business.`)
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
                      >
                        {t({ en: "Something like this", ar: "أريد مثل هذا" })}
                        <ArrowUpRight className="h-4 w-4 flip-x" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
