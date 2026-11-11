import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { PageIntro } from "@/components/mansaj/page-intro";
import { Work } from "@/components/mansaj/work";

export const metadata: Metadata = {
  title: "أعمال ومشاريع منسج الرقمية",
  description: "شاهد نماذج من مواقع الشركات والمطاعم والمكاتب القانونية التي صممتها وطورتها منسج الرقمية.",
  alternates: { canonical: "/ar/work", languages: { en: "/work", ar: "/ar/work" } },
  openGraph: { title: "أعمال منسج الرقمية", description: "نماذج من مواقع ومشاريع منسج الرقمية." },
};

export default function ArabicWorkPage() {
  return (
    <PageShell initialLang="ar">
      <PageIntro eyebrow={{ en: "Our Work", ar: "أعمالنا" }} title={{ en: "Websites and Digital Projects", ar: "مشاريع ومواقع من تنفيذ منسج الرقمية" }} description={{ en: "Explore our published website projects.", ar: "استكشف نماذج من المواقع المنشورة التي نفذناها لمشاريع وأنشطة في مجالات مختلفة، وشاهد معاينة كل موقع مباشرة." }} documentTitle={{ en: "Our Work", ar: "أعمالنا ومشاريعنا" }} />
      <Work />
    </PageShell>
  );
}
