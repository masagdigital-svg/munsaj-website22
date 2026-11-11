import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { PageIntro } from "@/components/mansaj/page-intro";
import { Contact } from "@/components/mansaj/contact";

export const metadata: Metadata = {
  title: "تواصل مع منسج الرقمية",
  description: "تواصل مع وكالة منسج الرقمية لمناقشة مشروع تصميم موقع إلكتروني أو متجر إلكتروني والحصول على الحل المناسب.",
  alternates: { canonical: "/ar/contact", languages: { en: "/contact", ar: "/ar/contact" } },
  openGraph: { title: "تواصل مع منسج الرقمية", description: "ابدأ مشروعك الرقمي مع منسج الرقمية." },
};

export default function ArabicContactPage() {
  return (
    <PageShell initialLang="ar">
      <PageIntro eyebrow={{ en: "Contact", ar: "تواصل معنا" }} title={{ en: "Start Your Digital Project", ar: "ابدأ مشروعك الرقمي مع منسج الرقمية" }} description={{ en: "Tell us about your project.", ar: "أرسل تفاصيل مشروعك إلى منسج الرقمية لمناقشة تصميم موقع شركتك أو متجرك الإلكتروني وتحديد الخطوة التالية." }} documentTitle={{ en: "Contact Us", ar: "تواصل مع منسج الرقمية" }} />
      <Contact />
    </PageShell>
  );
}
