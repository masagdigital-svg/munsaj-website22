import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { PageIntro } from "@/components/mansaj/page-intro";
import { Services } from "@/components/mansaj/services";
import { Process } from "@/components/mansaj/process";

export const metadata: Metadata = {
  title: "خدمات تصميم وتطوير المواقع",
  description: "اكتشف خدمات منسج الرقمية في تصميم وتطوير مواقع الشركات والمتاجر الإلكترونية وصفحات الهبوط والمواقع العقارية والشخصية.",
  alternates: { canonical: "/services", languages: { en: "/services", ar: "/ar/services" } },
  openGraph: { title: "خدمات منسج الرقمية", description: "تصميم وتطوير مواقع ومتاجر إلكترونية تناسب نشاطك." },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow={{ en: "Services", ar: "الخدمات" }}
        title={{
          en: "Website Design & Development Services for Your Business",
          ar: "خدمات تصميم وتطوير المواقع التي يحتاجها مشروعك",
        }}
        description={{
          en: "From company websites to online stores and landing pages, we build clear digital experiences that help your customers find and connect with you.",
          ar: "من المواقع التعريفية إلى المتاجر الإلكترونية وصفحات الهبوط، نبني تجربة رقمية واضحة تساعد عملاءك على الوصول إليك.",
        }}
        documentTitle={{
          en: "Website Design & Development Services",
          ar: "خدمات تصميم وتطوير المواقع",
        }}
      />
      <Services />
      <Process />
    </PageShell>
  );
}
