"use client";

import * as React from "react";
import Link from "next/link";
import {
  Building2,
  CreditCard,
  Landmark,
  MousePointerClick,
  ShoppingBag,
  UserRound,
  ArrowUpRight,
} from "lucide-react";
import { useLang } from "@/lib/lang";
import { Reveal, SectionHeading } from "./reveal";
import { waLink } from "@/lib/whatsapp";

export function Services() {
  const { t, lang } = useLang();

  const services = [
    {
      icon: Building2,
      en: {
        title: "Corporate & business websites",
        desc: "Introduce your services, team, and key information in a clear website that reflects your identity.",
        wa: "Hello Mansaj Digital 👋\nI'm interested in a corporate & business website. Please send me the details and next steps.",
      },
      ar: {
        title: "مواقع تعريفية للشركات والأنشطة",
        desc: "عرّف بخدماتك وفريقك ومعلوماتك المهمة في موقع واضح يعكس هوية نشاطك.",
        wa: "مرحبًا منسج الرقمية 👋\nأنا مهتم بموقع تعريفي للشركات والأنشطة. أرجو إرسال التفاصيل والخطوات التالية.",
      },
    },
    {
      icon: ShoppingBag,
      en: {
        title: "Online stores",
        desc: "Present your products in an organized way and make them easy to discover.",
        wa: "Hello Mansaj Digital 👋\nI'm interested in an online store for my products. Please send me the details and next steps.",
      },
      ar: {
        title: "متاجر إلكترونية",
        desc: "اعرض منتجاتك بطريقة مرتبة، وسهّل على عملائك اكتشافها والوصول إلى تفاصيلها.",
        wa: "مرحبًا منسج الرقمية 👋\nأنا مهتم بمتجر إلكتروني لمنتجاتي. أرجو إرسال التفاصيل والخطوات التالية.",
      },
    },
    {
      icon: CreditCard,
      en: {
        title: "Stores with payment gateways",
        desc: "A store that supports product display and checkout via the payment options available in your country.",
        wa: "Hello Mansaj Digital 👋\nI'm interested in an online store with a payment gateway. Please send me the details and next steps.",
      },
      ar: {
        title: "متاجر مع بوابات دفع",
        desc: "متجر يتيح عرض المنتجات وإتمام الدفع عبر خيارات الدفع التي يدعمها المشروع والبلد.",
        wa: "مرحبًا منسج الرقمية 👋\nأنا مهتم بمتجر إلكتروني مع بوابة دفع. أرجو إرسال التفاصيل والخطوات التالية.",
      },
    },
    {
      icon: MousePointerClick,
      en: {
        title: "Landing pages for campaigns",
        desc: "A focused page that explains your offer or campaign and drives one clear action.",
        wa: "Hello Mansaj Digital 👋\nI'm interested in a landing page for my campaign/offer. Please send me the details and next steps.",
      },
      ar: {
        title: "صفحات هبوط للحملات",
        desc: "صفحة مركّزة تشرح عرضك أو حملتك وتوجّه الزائر إلى إجراء محدد.",
        wa: "مرحبًا منسج الرقمية 👋\nأنا مهتم بصفحة هبوط لحملتي أو عرضي. أرجو إرسال التفاصيل والخطوات التالية.",
      },
    },
    {
      icon: UserRound,
      en: {
        title: "Personal sites & portfolios",
        desc: "Present your expertise and projects professionally so the right people reach out.",
        wa: "Hello Mansaj Digital 👋\nI'm interested in a personal site / portfolio. Please send me the details and next steps.",
      },
      ar: {
        title: "مواقع شخصية ومعارض أعمال",
        desc: "قدّم خبرتك ومشاريعك بطريقة احترافية تسهّل على المهتمين التعرف إليك والتواصل معك.",
        wa: "مرحبًا منسج الرقمية 👋\nأنا مهتم بموقع شخصي أو معرض أعمال. أرجو إرسال التفاصيل والخطوات التالية.",
      },
    },
    {
      icon: Landmark,
      en: {
        title: "Real estate websites",
        desc: "Organize listings and details so visitors can explore options and get in touch.",
        wa: "Hello Mansaj Digital 👋\nI'm interested in a real estate website. Please send me the details and next steps.",
      },
      ar: {
        title: "مواقع عقارية",
        desc: "نظّم العقارات وتفاصيلها، وسهّل على الزوار استكشاف الخيارات والتواصل بشأنها.",
        wa: "مرحبًا منسج الرقمية 👋\nأنا مهتم بموقع عقاري. أرجو إرسال التفاصيل والخطوات التالية.",
      },
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-20" aria-label={t({ en: "Our services", ar: "خدماتنا" })}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t({ en: "Services", ar: "الخدمات" })}
          title={t({
            en: "Choose what your project needs, not just what looks trendy.",
            ar: "اختر ما يحتاجه مشروعك، لا ما يبدو رائجًا فقط.",
          })}
          desc={t({
            en: "Every business has different needs. Pick a service and we'll open a WhatsApp chat with your request ready — one tap and we start.",
            ar: "لكل نشاط احتياجات مختلفة. اختر الخدمة وسنفتح لك محادثة واتساب بطلبك جاهزًا — ضغطة واحدة ونبدأ.",
          })}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const c = t({ en: s.en, ar: s.ar });
            return (
              <Reveal key={c.title} delay={(i % 3) * 0.07} as="li">
                <article className="group flex h-full flex-col rounded-md border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-offset">
                  <div className="flex items-center gap-3 border-b border-border p-5 pb-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-deep text-[var(--brand)] transition-colors group-hover:bg-[var(--brand)] group-hover:text-[var(--brand-foreground)]">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-[15.5px] font-bold leading-snug">{c.title}</h3>
                  </div>
                  <p className="flex-1 p-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                  <div className="px-5 pb-5 pt-0">
                    <a
                      href={waLink(c.wa)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor={t({ en: "Chat", ar: "كلّمنا" })}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 border-foreground/15 bg-background px-4 py-2.5 text-sm font-bold transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
                    >
                      {t({ en: "I want this service", ar: "أريد هذه الخدمة" })}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-10 rounded-md border border-border bg-card p-6">
          <h3 className="text-xl font-bold">
            {t({ en: "Explore our services in detail", ar: "اكتشف تفاصيل خدماتنا" })}
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { slug: "corporate-websites", en: "Corporate website design", ar: "تصميم مواقع الشركات" },
              { slug: "ecommerce-websites", en: "E-commerce website design", ar: "تصميم المتاجر الإلكترونية" },
              { slug: "landing-pages", en: "Landing page design", ar: "تصميم صفحات الهبوط" },
              { slug: "real-estate-websites", en: "Real estate website design", ar: "تصميم مواقع العقارات" },
              { slug: "portfolio-websites", en: "Portfolio website design", ar: "تصميم المواقع الشخصية ومعارض الأعمال" },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`${lang === "ar" ? "/ar" : ""}/services/${item.slug}`}
                className="rounded-sm border border-border px-4 py-3 text-sm font-bold transition-colors hover:border-brand hover:text-brand"
              >
                {lang === "ar" ? item.ar : item.en} <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
