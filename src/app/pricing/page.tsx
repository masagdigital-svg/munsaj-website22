import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { PageIntro } from "@/components/mansaj/page-intro";
import { Pricing } from "@/components/mansaj/pricing";

export const metadata: Metadata = {
  title: "باقات تصميم المواقع والأسعار",
  description: "قارن باقات منسج الرقمية لتصميم المواقع والمتاجر الإلكترونية، واختر الحل المناسب لمشروعك.",
  alternates: { canonical: "/pricing", languages: { en: "/pricing", ar: "/ar/pricing" } },
  openGraph: { title: "باقات وأسعار منسج الرقمية", description: "باقات واضحة لتصميم المواقع والمتاجر الإلكترونية." },
};

export default function PricingPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow={{ en: "Packages", ar: "الباقات" }}
        title={{
          en: "Website Design Packages & Pricing",
          ar: "باقات تصميم المواقع والأسعار",
        }}
        description={{
          en: "Choose the package that fits your business needs, or contact us to define a custom scope for your project.",
          ar: "اختر الباقة التي تناسب احتياجات مشروعك، أو تواصل معنا لتحديد نطاق عمل مخصص.",
        }}
        documentTitle={{
          en: "Website Design Packages & Pricing",
          ar: "باقات تصميم المواقع والأسعار",
        }}
      />
      <Pricing />
    </PageShell>
  );
}
