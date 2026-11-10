"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowDown,
  Clock,
  Layers,
  LayoutGrid,
  MessageSquare,
} from "lucide-react";
import { useLang } from "@/lib/lang";
import { Reveal, SectionHeading } from "./reveal";

export function Why() {
  const { t, lang } = useLang();

  const bullets = [
    {
      icon: LayoutGrid,
      en: "Present your services and information in one place you own and control.",
      ar: "اعرض خدماتك ومعلوماتك في مكان واحد تملكه وتتحكم بمحتواه.",
    },
    {
      icon: Clock,
      en: "Keep your project details available to customers at any time.",
      ar: "اجعل تفاصيل مشروعك متاحة لعملائك في أي وقت.",
    },
    {
      icon: Layers,
      en: "Arrange products, properties, or bookings around how your business works.",
      ar: "رتّب المنتجات أو العقارات أو الحجوزات بحسب طبيعة نشاطك.",
    },
    {
      icon: MessageSquare,
      en: "Make contact and orders clearer and easier than searching through scattered posts.",
      ar: "اجعل التواصل والطلب أوضح وأسهل من البحث بين منشورات متفرقة.",
    },
  ];

  return (
    <section id="why" className="py-16 sm:py-20" aria-label={t({ en: "Why your project needs a website", ar: "لماذا يحتاج مشروعك إلى موقع" })}>
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <SectionHeading
            align="start"
            eyebrow={t({ en: "Why a website?", ar: "لماذا موقع؟" })}
            title={t({
              en: "Because your customers want to find their answers easily.",
              ar: "لأن عملاءك يريدون أن يجدوا إجاباتهم بسهولة.",
            })}
            desc={t({
              en: "Your website gives your project a clear home that explains its services, shows its details at any time, and brings its links and contact information into one experience.",
              ar: "موقعك يمنح مشروعك مكانًا واضحًا يشرح خدماته، ويعرض تفاصيله في أي وقت، ويجمع روابطه ومعلومات التواصل في تجربة واحدة.",
            })}
          />

          <ul className="mt-7 flex flex-col gap-3.5">
            {bullets.map((b, i) => (
              <Reveal key={b.en} delay={0.05 * i} as="li">
                <div className="flex items-start gap-3.5 rounded-sm border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-offset-sm">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-brand-soft text-brand">
                    <b.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <p className="text-[15px] leading-relaxed">
                    {t({ en: b.en, ar: b.ar })}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2} className="mt-7">
            <a
              href="#services"
              data-cursor={t({ en: "Go", ar: "يلا" })}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
            >
              {t({ en: "Discover the right website for my business", ar: "اكتشف الموقع المناسب لنشاطي" })}
              <ArrowDown className="h-4 w-4 flip-x" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        {/* Image-led explanation */}
        <div className="flex flex-col gap-4">
          <Reveal delay={0.1}>
            <figure className="group relative overflow-hidden rounded-md border border-border bg-card shadow-offset">
              <Image
                src="/images/show-atelier.jpg"
                alt={
                  lang === "ar"
                    ? "طاولة عمل تُفصّل عليها تصميمات رقمية لمشاريع مختلفة"
                    : "A tailor's desk crafting digital designs for different projects"
                }
                width={1600}
                height={893}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-deep/85 px-4 py-2.5 text-xs font-semibold text-deep-foreground backdrop-blur-sm">
                <span>
                  {t({ en: "Tailored to how your business works", ar: "تفصيل يبدأ من طبيعة نشاطك" })}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-[var(--brand)]">01</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.18}>
            <figure className="group relative overflow-hidden rounded-md border border-border bg-card shadow-offset">
              <Image
                src="/images/show-team.jpg"
                alt={
                  lang === "ar"
                    ? "فريق منسج يعمل معًا حول حاسوب محمول لإنجاز مشروع عميل"
                    : "The Mansaj team working together around a laptop on a client project"
                }
                width={1600}
                height={1067}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-deep/85 px-4 py-2.5 text-xs font-semibold text-deep-foreground backdrop-blur-sm">
                <span>
                  {t({ en: "A team with you until delivery", ar: "فريق يرافقك حتى التسليم" })}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-[var(--brand)]">02</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.26}>
            <figure className="group relative overflow-hidden rounded-md border border-border bg-card shadow-offset">
              <Image
                src="/images/dev-work.jpg"
                alt={
                  lang === "ar"
                    ? "مطوّرة تبني موقعًا على حاسوبها المحمول"
                    : "A developer building a website on her laptop"
                }
                width={1600}
                height={1067}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-deep/85 px-4 py-2.5 text-xs font-semibold text-deep-foreground backdrop-blur-sm">
                <span>
                  {t({ en: "Built with care, tested on real screens", ar: "مبني بعناية ومُختبر على شاشات حقيقية" })}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-[var(--brand)]">03</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
