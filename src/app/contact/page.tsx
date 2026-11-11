import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { PageIntro } from "@/components/mansaj/page-intro";
import { Contact } from "@/components/mansaj/contact";

export const metadata: Metadata = {
  title: "تواصل مع منسج الرقمية | اطلب موقعك الآن",
  description: "تواصل مع وكالة منسج الرقمية لمناقشة مشروعك والحصول على خطة وباقة مناسبة لتصميم موقعك أو متجرك الإلكتروني.",
  alternates: { canonical: "/contact", languages: { en: "/contact", ar: "/ar/contact" } },
  openGraph: { title: "تواصل مع منسج الرقمية", description: "ابدأ مشروعك الرقمي مع منسج الرقمية." },
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow={{ en: "Contact", ar: "تواصل معنا" }}
        title={{
          en: "Start Your Digital Project with Mansaj Digital",
          ar: "ابدأ مشروعك الرقمي مع منسج الرقمية",
        }}
        description={{
          en: "Tell us about your project, and we will help you identify the right next step and the best solution for your needs.",
          ar: "أخبرنا عن مشروعك وسنساعدك في تحديد الخطوة التالية والحل المناسب لاحتياجاتك.",
        }}
        documentTitle={{
          en: "Contact Us",
          ar: "تواصل مع منسج الرقمية",
        }}
      />
      <Contact />
    </PageShell>
  );
}
