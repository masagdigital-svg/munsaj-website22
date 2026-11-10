"use client";

import * as React from "react";
import { BadgeCheck, Check, MessageCircle, Sparkles } from "lucide-react";
import { useLang } from "@/lib/lang";
import { Reveal, SectionHeading } from "./reveal";
import { waLink } from "@/lib/whatsapp";

type Plan = {
  id: string;
  nameEn: string;
  nameAr: string;
  price: string;
  period?: { en: string; ar: string };
  taglineEn: string;
  taglineAr: string;
  featuresEn: string[];
  featuresAr: string[];
  badge?: { en: string; ar: string };
  featured?: boolean;
  custom?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "launch",
    nameEn: "Launch",
    nameAr: "لانش",
    price: "$159",
    taglineEn: "One sharp page that puts your business on the map — fast.",
    taglineAr: "صفحة واحدة قوية تضع نشاطك على الخريطة — وبسرعة.",
    featuresEn: [
      "One-page landing website",
      "Mobile-first responsive design",
      "WhatsApp direct-contact button",
      "Basic SEO setup (titles & descriptions)",
      "Social media & map links",
      "Delivery in 3–5 days",
      "1 revision round",
      "2 weeks post-launch support",
    ],
    featuresAr: [
      "موقع هبوط بصفحة واحدة",
      "تصميم متجاوب يعرض بفخر على الجوال",
      "زر تواصل مباشر عبر واتساب",
      "تهيئة أساسية لمحركات البحث",
      "روابط التواصل الاجتماعي والخريطة",
      "التسليم خلال 3–5 أيام",
      "جولة تعديل واحدة",
      "دعم أسبوعين بعد التسليم",
    ],
  },
  {
    id: "business",
    nameEn: "Business",
    nameAr: "بزنس",
    price: "$599",
    taglineEn: "A full multi-page website that explains your business and sells it.",
    taglineAr: "موقع متعدد الصفحات يشرح نشاطك ويبيع له.",
    featuresEn: [
      "Up to 6 custom pages",
      "Tailored design matching your brand",
      "Gallery / menu / services showcase",
      "Contact forms + Google Maps",
      "On-page SEO for every page",
      "Google Analytics setup",
      "Delivery in 7–10 days",
      "3 revision rounds",
      "1 month post-launch support",
    ],
    featuresAr: [
      "حتى 6 صفحات مخصصة",
      "تصميم مفصّل على هوية علامتك",
      "عرض معرض / قائمة / خدمات",
      "نماذج تواصل + خرائط جوجل",
      "تهيئة SEO لكل صفحة",
      "إعداد Google Analytics",
      "التسليم خلال 7–10 أيام",
      "3 جولات تعديل",
      "دعم شهر كامل بعد التسليم",
    ],
    badge: { en: "Most popular", ar: "الأكثر طلبًا" },
    featured: true,
  },
  {
    id: "ecommerce",
    nameEn: "E-commerce Pro",
    nameAr: "متجر برو",
    price: "$1,399",
    taglineEn: "A complete online store, ready to take orders from day one.",
    taglineAr: "متجر إلكتروني كامل، جاهز لاستقبال الطلبات من اليوم الأول.",
    featuresEn: [
      "Full online store (up to 50 products)",
      "Payment gateway integration",
      "Cart & smooth checkout flow",
      "Categories, search & product filters",
      "Order alerts via WhatsApp & email",
      "Advanced SEO + speed optimization",
      "Delivery in 2–3 weeks",
      "Unlimited revisions within scope",
      "3 months priority support",
    ],
    featuresAr: [
      "متجر كامل (حتى 50 منتجًا)",
      "ربط بوابة دفع إلكترونية",
      "سلة شراء وتجربة دفع سلسة",
      "تصنيفات وبحث وفلترة للمنتجات",
      "تنبيهات الطلبات عبر واتساب والبريد",
      "SEO متقدم وتحسين سرعة",
      "التسليم خلال 2–3 أسابيع",
      "تعديلات غير محدودة ضمن النطاق",
      "دعم أولوية 3 أشهر",
    ],
  },
  {
    id: "custom",
    nameEn: "Custom",
    nameAr: "مخصوص",
    price: null,
    taglineEn: "Booking systems, portals, web apps — built around your idea.",
    taglineAr: "أنظمة حجز، بوابات، تطبيقات ويب — تُبنى حول فكرتك.",
    featuresEn: [
      "Tailored scope & quote after a short call",
      "Web applications & platforms",
      "Booking / membership systems",
      "Custom integrations & APIs",
      "Dedicated project timeline",
      "Long-term partnership options",
    ],
    featuresAr: [
      "نطاق وعرض سعر مخصص بعد مكالمة قصيرة",
      "تطبيقات ومنصات ويب",
      "أنظمة حجز وعضوية",
      "ربط وتكاملات وواجهات برمجية",
      "جدول زمني مخصص لمشروعك",
      "خيارات شراكة طويلة المدى",
    ],
    custom: true,
  },
];

function buildOrderMessage(plan: Plan, lang: "en" | "ar"): string {
  if (plan.custom) {
    return lang === "ar"
      ? "مرحبًا منسج الرقمية 👋\nأريد باقة *مخصوص* لمشروع خاص.\nفكرة مشروعي:\n- \n\nأرجو التواصل معي لمناقشة التفاصيل وتحديد النطاق والسعر."
      : "Hello Mansaj Digital 👋\nI want the *Custom package* for a special project.\nMy project idea:\n- \n\nPlease contact me to discuss the details and scope the work.";
  }

  const name = lang === "ar" ? plan.nameAr : plan.nameEn;
  const features = lang === "ar" ? plan.featuresAr : plan.featuresEn;
  const title =
    lang === "ar"
      ? `مرحبًا منسج الرقمية 👋\nأريد طلب باقة *${name}* بسعر *${plan.price}*.`
      : `Hello Mansaj Digital 👋\nI want to order the *${name} package — ${plan.price}*.`;
  const listTitle = lang === "ar" ? "مكونات الباقة:" : "What the package includes:";
  const outro =
    lang === "ar"
      ? "أرجو إرسال الخطوات التالية لبدء المشروع."
      : "Please send me the next steps to start.";

  return `${title}\n\n${listTitle}\n${features.map((f) => `• ${f}`).join("\n")}\n\n${outro}`;
}

export function Pricing() {
  const { t, lang } = useLang();

  return (
    <section
      id="pricing"
      className="relative py-16 sm:py-20"
      aria-label={t({ en: "Packages & prices", ar: "الباقات والأسعار" })}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t({ en: "Packages & prices", ar: "الباقات والأسعار" })}
          title={t({
            en: "Clear packages. Honest prices. No hidden fees.",
            ar: "باقات واضحة. أسعار صادقة. بلا رسوم مخفية.",
          })}
          desc={t({
            en: "Pick the package that fits your project — one tap on “Order via WhatsApp” sends us your package with everything it includes, and we reply right away.",
            ar: "اختر الباقة المناسبة لمشروعك — ضغطة واحدة على «اطلب عبر واتساب» ترسل لنا باقتك بكل ما تتضمنه، ونرد عليك فورًا.",
          })}
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => {
            const msg = buildOrderMessage(plan, lang);
            const name = t({ en: plan.nameEn, ar: plan.nameAr });
            const features = lang === "ar" ? plan.featuresAr : plan.featuresEn;

            return (
              <Reveal key={plan.id} delay={i * 0.07} as="li">
                <div
                  className={`relative flex h-full flex-col rounded-md border bg-card transition-all duration-300 hover:-translate-y-1.5 ${
                    plan.featured
                      ? "border-brand shadow-offset lg:-mt-4 lg:mb-4"
                      : "border-border hover:shadow-offset-sm"
                  }`}
                >
                  {plan.badge ? (
                    <span className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 inline-flex items-center gap-1 whitespace-nowrap rounded-sm bg-brand px-3 py-1 text-[11px] font-bold text-brand-foreground shadow-offset-sm">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {t({ en: plan.badge.en, ar: plan.badge.ar })}
                    </span>
                  ) : null}

                  <div className="border-b border-border p-5 pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold">{name}</h3>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        {plan.id}
                      </span>
                    </div>
                    <p className="mt-2.5">
                      {plan.custom ? (
                        <span className="inline-flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-brand">
                            {t({ en: "Let's talk", ar: "لنتحدث" })}
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-baseline gap-1.5">
                          <span className="text-[2.6rem] font-bold leading-none tracking-tight" dir="ltr">
                            {plan.price}
                          </span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {t({ en: "one-time", ar: "دفعة واحدة" })}
                          </span>
                        </span>
                      )}
                    </p>
                    <p className="mt-3 min-h-10 text-[13px] leading-relaxed text-muted-foreground">
                      {t({ en: plan.taglineEn, ar: plan.taglineAr })}
                    </p>
                  </div>

                  <ul className="flex-1 space-y-2.5 p-5">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13.5px] leading-relaxed">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-5 pt-0">
                    <a
                      href={waLink(msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor={t({ en: "Order", ar: "اطلب" })}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                        plan.featured
                          ? "bg-brand text-brand-foreground shadow-offset-sm hover:bg-brand/90"
                          : "border-2 border-foreground/70 bg-card hover:border-brand hover:bg-brand hover:text-brand-foreground"
                      }`}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      {plan.custom
                        ? t({ en: "Scope my project", ar: "لنناقش مشروعي" })
                        : t({ en: "Order via WhatsApp", ar: "اطلب عبر واتساب" })}
                    </a>
                    <p className="mt-2.5 flex items-center justify-center gap-1 text-center text-[11px] text-muted-foreground">
                      <BadgeCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                      {t({
                        en: "Your package details arrive with the first message",
                        ar: "تفاصيل باقتك تصلك مع الرسالة الأولى",
                      })}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.2} className="mt-8">
          <p className="mx-auto max-w-2xl rounded-sm border border-border bg-muted/60 px-4 py-3 text-center text-[13px] leading-relaxed text-muted-foreground">
            {t({
              en: "Not sure which package fits? Message us on WhatsApp and we'll recommend the right one for your project — no pressure.",
              ar: "لست متأكدًا أي باقة تناسبك؟ راسلنا على واتساب وسنرشّح لك الأنسب لمشروعك — بلا أي إلحاح.",
            })}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
