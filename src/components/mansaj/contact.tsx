"use client";

import * as React from "react";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang";
import { Reveal } from "./reveal";
import {
  waLink,
  WA_GREETING_EN,
  WA_GREETING_AR,
  WHATSAPP_DISPLAY,
  AGENCY_EMAIL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from "@/lib/whatsapp";

function MosaicMark() {
  return (
    <svg
      className="h-14 w-14 text-[var(--brand)] opacity-90"
      viewBox="0 0 5 4"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="0.92" height="0.92" fill="currentColor" />
      <rect x="0" y="1" width="0.92" height="0.92" fill="currentColor" />
      <rect x="0" y="2" width="0.92" height="0.92" fill="currentColor" />
      <rect x="0" y="3" width="0.92" height="0.92" fill="currentColor" />
      <rect x="4" y="0" width="0.92" height="0.92" fill="currentColor" />
      <rect x="4" y="1" width="0.92" height="0.92" fill="currentColor" />
      <rect x="4" y="2" width="0.92" height="0.92" fill="currentColor" />
      <rect x="4" y="3" width="0.92" height="0.92" fill="currentColor" />
      <rect x="1" y="0" width="0.92" height="0.92" fill="currentColor" />
      <rect x="1" y="1" width="0.92" height="0.92" fill="currentColor" />
      <rect x="3" y="0" width="0.92" height="0.92" fill="currentColor" />
      <rect x="3" y="1" width="0.92" height="0.92" fill="currentColor" />
      <rect x="2" y="1" width="0.92" height="0.92" fill="currentColor" />
      <rect x="2" y="2" width="0.92" height="0.92" className="text-[var(--deep)]" fill="currentColor" />
    </svg>
  );
}

export function Contact() {
  const { t, lang } = useLang();

  return (
    <section
      id="contact"
      className="pb-16 pt-4 sm:pb-20"
      aria-label={t({ en: "Contact us", ar: "تواصل معنا" })}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg bg-deep text-deep-foreground shadow-offset">
            <div className="bg-blueprint-deep absolute inset-0" aria-hidden="true" />
            <div
              className="absolute -bottom-8 -end-8 h-40 w-40 rotate-12 border-2 border-white/10"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center gap-5 px-6 py-12 text-center sm:py-16">
              <MosaicMark />
              <h2 className="max-w-xl text-balance text-3xl font-bold leading-snug sm:text-4xl">
                {t({
                  en: "Ready to build your project's home on the web?",
                  ar: "جاهز نبني لمشروعك موطنه على الويب؟",
                })}
              </h2>
              <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-deep-foreground/75">
                {t({
                  en: "One WhatsApp message is all it takes. Tell us about your project and we'll reply with a clear plan, the right package, and honest pricing.",
                  ar: "رسالة واتساب واحدة تكفي. أخبرنا عن مشروعك وسنرد عليك بخطة واضحة، وباقة مناسبة، وسعر صادق.",
                })}
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={waLink(lang === "ar" ? WA_GREETING_AR : WA_GREETING_EN)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={t({ en: "Chat", ar: "كلّمنا" })}
                  className="inline-flex items-center gap-2.5 rounded-sm bg-[#25d366] px-6 py-3.5 text-[15px] font-bold text-white shadow-offset-sm transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  {t({ en: "WhatsApp the agency directly", ar: "تواصل مع الوكالة مباشرة" })}
                </a>
                <a
                  href={`mailto:${AGENCY_EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-5 py-3.5 text-[14px] font-semibold text-deep-foreground transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
                  dir="ltr"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {AGENCY_EMAIL}
                </a>
              </div>

              <p className="mt-3 font-mono text-sm tracking-wide text-deep-foreground/80" dir="ltr">
                {WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const sections = [
    { href: "/", en: "Home", ar: "الرئيسية" },
    { href: "/services", en: "Services", ar: "الخدمات" },
    { href: "/work", en: "Work", ar: "أعمالنا" },
    { href: "/pricing", en: "Pricing", ar: "الباقات" },
    { href: "/contact", en: "Contact", ar: "تواصل معنا" },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1.3fr]">
        {/* brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/logos/mansaj-logo-mark.png"
              alt="Mansaj Digital logo"
              width={44}
              height={42}
              className="h-11 w-auto"
            />
            <span className="leading-tight">
              <span className="block text-base font-bold">
                {t({ en: "Mansaj Digital", ar: "منسج الرقمية" })}
              </span>
              <span className="block font-mono text-[11px] text-muted-foreground">
                {t({ en: "Web agency", ar: "وكالة مواقع" })}
              </span>
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t({
              en: "Your project deserves a website that works for it. We design and build it, piece by piece — like fabric woven on a loom.",
              ar: "مشروعك يستحق موقعًا يعمل لأجله. نصممه ونبنيه قطعة قطعة — كالنسيج الذي يُفصَل على منسج.",
            })}
          </p>
        </div>

        {/* sections */}
        <nav aria-label={t({ en: "Site sections", ar: "أقسام الموقع" })}>
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            {t({ en: "Sections", ar: "الأقسام" })}
          </p>
          <ul className="space-y-2">
            {sections.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="h-1.5 w-1.5 bg-border transition-colors group-hover:bg-brand" aria-hidden="true" />
                  {t({ en: s.en, ar: s.ar })}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* contact — WhatsApp only (the one official number) */}
        <div>
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            {t({ en: "Contact", ar: "التواصل" })}
          </p>
          <ul className="space-y-3">
            <li>
              <a
                href={waLink(t({ en: WA_GREETING_EN, ar: WA_GREETING_AR }))}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={t({ en: "Chat", ar: "كلّمنا" })}
                className="flex items-start gap-2.5 rounded-sm border border-border bg-background p-3 transition-colors hover:border-brand"
              >
                <MessageCircle className="mt-0.5 h-4.5 w-4.5 text-[#25d366]" aria-hidden="true" />
                <span>
                  <span className="block text-[13px] font-semibold">
                    {t({ en: "Official WhatsApp", ar: "الواتساب الرسمي" })}
                  </span>
                  <span className="block font-mono text-[13px] text-muted-foreground" dir="ltr">
                    {WHATSAPP_DISPLAY}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${AGENCY_EMAIL}`}
                className="flex items-center gap-2.5 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span className="font-mono text-[13px]" dir="ltr">{AGENCY_EMAIL}</span>
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span className="font-mono text-[13px]" dir="ltr">{INSTAGRAM_HANDLE}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p dir="ltr">
            © {year} Mansaj Digital — {t({ en: "Mansaj Digital Agency", ar: "وكالة منسج الرقمية" })}
          </p>
          <p className="font-mono">{t({ en: "Crafted with care by Mansaj", ar: "صُنع بعناية من وكالة منسج" })}</p>
        </div>
      </div>
    </footer>
  );
}
