import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { PageIntro } from "@/components/mansaj/page-intro";
import { Pricing } from "@/components/mansaj/pricing";

export const metadata: Metadata = {
  title: "أسعار وباقات تصميم المواقع",
  description: "تعرف على أسعار وباقات منسج الرقمية لتصميم مواقع الشركات والمتاجر الإلكترونية، من صفحة الهبوط إلى المتجر المتكامل.",
  alternates: { canonical: "/ar/pricing", languages: { en: "/pricing", ar: "/ar/pricing" } },
  openGraph: { title: "باقات وأسعار منسج الرقمية", description: "باقات واضحة لتصميم المواقع والمتاجر الإلكترونية." },
};

export default function ArabicPricingPage() {
  return (
    <PageShell initialLang="ar">
      <PageIntro eyebrow={{ en: "Packages", ar: "الباقات" }} title={{ en: "Website Design Packages & Pricing", ar: "باقات وأسعار تصميم المواقع" }} description={{ en: "Choose a package for your business.", ar: "قارن باقات تصميم المواقع وصفحات الهبوط والمتاجر الإلكترونية، واختر الباقة المناسبة لاحتياجات مشروعك أو اطلب عرض سعر مخصصًا." }} documentTitle={{ en: "Packages & Pricing", ar: "الباقات والأسعار" }} />
      <Pricing />
    </PageShell>
  );
}
