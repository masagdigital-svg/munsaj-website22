import { HomeContent } from "@/components/mansaj/home-content";

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://munsajdigital.com/#website",
      "url": "https://munsajdigital.com/",
      "name": "Mansaj Digital",
      "alternateName": [
        "منسج الرقمية",
        "Munsaj Digital",
        "منسج",
        "Mansaj",
        "Munsaj",
        "منسج ديجيتال",
        "munsajdigital.com"
      ],
      "publisher": { "@id": "https://munsajdigital.com/#organization" }
    },
    {
      "@type": "Organization",
      "@id": "https://munsajdigital.com/#organization",
      "name": "Mansaj Digital",
      "alternateName": [
        "منسج الرقمية",
        "Munsaj Digital",
        "منسج",
        "Mansaj",
        "Munsaj",
        "منسج ديجيتال"
      ],
      "url": "https://munsajdigital.com/"
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <HomeContent />
    </>
  );
}
