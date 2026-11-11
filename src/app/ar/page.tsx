import type { Metadata } from "next";
import { HomeContent } from "@/components/mansaj/home-content";

export const metadata: Metadata = {
  title: "منسج الرقمية | تصميم وتطوير المواقع",
  description: "منسج الرقمية وكالة تصميم وتطوير مواقع الشركات والمتاجر الإلكترونية وصفحات الهبوط والمواقع العقارية والشخصية.",
  alternates: { canonical: "/ar", languages: { en: "/", ar: "/ar" } },
  openGraph: { title: "منسج الرقمية | تصميم وتطوير المواقع", description: "وكالة منسج الرقمية لتصميم وتطوير المواقع والمتاجر الإلكترونية." },
};

export default function ArabicHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://munsajdigital.com/ar#webpage",
          url: "https://munsajdigital.com/ar",
          name: "منسج الرقمية",
          inLanguage: "ar",
          isPartOf: { "@id": "https://munsajdigital.com/#website" }
        }) }}
      />
      <HomeContent initialLang="ar" />
    </>
  );
}
