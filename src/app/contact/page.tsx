import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { PageIntro } from "@/components/mansaj/page-intro";
import { Contact } from "@/components/mansaj/contact";

export const metadata: Metadata = {
  title: "Contact Mansaj Digital | Start Your Website Project",
  description: "Contact Mansaj Digital to discuss a business website, online store or landing page and find the right solution for your project.",
  alternates: { canonical: "/contact", languages: { en: "/contact", ar: "/ar/contact" } },
  openGraph: { title: "Contact Mansaj Digital", description: "Contact Mansaj Digital to discuss a business website, online store or landing page and find the right solution for your project." },
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
