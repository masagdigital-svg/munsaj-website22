import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { PageIntro } from "@/components/mansaj/page-intro";
import { Work } from "@/components/mansaj/work";

export const metadata: Metadata = {
  title: "أعمالنا ومشاريعنا",
  description: "تعرّف على نماذج من المواقع التي صممتها وطورتها منسج الرقمية للشركات والأنشطة التجارية.",
  alternates: { canonical: "/work", languages: { en: "/work", ar: "/ar/work" } },
  openGraph: { title: "أعمال منسج الرقمية", description: "نماذج من مواقع ومشاريع منسج الرقمية." },
};

export default function WorkPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow={{ en: "Our Work", ar: "أعمالنا" }}
        title={{
          en: "Real Websites and Digital Projects by Mansaj Digital",
          ar: "مشاريع ومواقع حقيقية من تنفيذ منسج الرقمية",
        }}
        description={{
          en: "Explore examples of published websites we have created for businesses and projects across different industries.",
          ar: "استكشف نماذج من المواقع المنشورة التي نفذناها لمشاريع وأنشطة مختلفة.",
        }}
        documentTitle={{ en: "Our Work", ar: "أعمالنا ومشاريعنا" }}
      />
      <Work />
    </PageShell>
  );
}
