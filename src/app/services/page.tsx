import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { PageIntro } from "@/components/mansaj/page-intro";
import { Services } from "@/components/mansaj/services";
import { Process } from "@/components/mansaj/process";

export const metadata: Metadata = {
  title: "Mansaj Digital Website Design & Development Services",
  description: "Explore corporate website design, online stores, landing pages, real estate websites and portfolio development by Mansaj Digital.",
  alternates: { canonical: "/services", languages: { en: "/services", ar: "/ar/services" } },
  openGraph: { title: "Services", description: "Explore corporate website design, online stores, landing pages, real estate websites and portfolio development by Mansaj Digital." },
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
