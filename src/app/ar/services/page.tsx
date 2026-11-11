import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { PageIntro } from "@/components/mansaj/page-intro";
import { Services } from "@/components/mansaj/services";
import { Process } from "@/components/mansaj/process";

export const metadata: Metadata = {
  title: "خدمات تصميم وتطوير المواقع",
  description: "خدمات منسج الرقمية في تصميم مواقع الشركات والمتاجر الإلكترونية وصفحات الهبوط والمواقع العقارية والشخصية.",
  alternates: { canonical: "/ar/services", languages: { en: "/services", ar: "/ar/services" } },
  openGraph: { title: "خدمات منسج الرقمية", description: "تصميم وتطوير مواقع ومتاجر إلكترونية تناسب نشاطك." },
};

export default function ArabicServicesPage() {
  return (
    <PageShell initialLang="ar">
      <PageIntro eyebrow={{ en: "Services", ar: "الخدمات" }} title={{ en: "Website Design & Development Services", ar: "خدمات تصميم وتطوير المواقع" }} description={{ en: "Websites, online stores and landing pages for your business.", ar: "نصمم ونطور مواقع تعريفية للشركات، ومتاجر إلكترونية، وصفحات هبوط، ومواقع عقارية وشخصية، بحلول تناسب أهداف نشاطك وعملاءك." }} documentTitle={{ en: "Website Design & Development Services", ar: "خدمات تصميم وتطوير المواقع" }} />
      <Services />
      <Process />
    </PageShell>
  );
}
