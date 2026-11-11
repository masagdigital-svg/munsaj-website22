import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { Work } from "@/components/mansaj/work";
function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="border-b border-border bg-muted/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-brand">{eyebrow}</p>
        <h1 className="max-w-3xl text-balance text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "أعمالنا ومشاريعنا | منسج الرقمية",
  description: "تعرّف على نماذج من المواقع التي صممتها وطورتها منسج الرقمية للشركات والأنشطة التجارية.",
  alternates: { canonical: "/work" },
  openGraph: { title: "أعمال منسج الرقمية", description: "نماذج من مواقع ومشاريع منسج الرقمية." },
};
export default function WorkPage() {
  return <PageShell><PageIntro eyebrow="Our work / أعمالنا" title="مشاريع ومواقع حقيقية من تنفيذ منسج الرقمية" description="استكشف نماذج من المواقع المنشورة التي نفذناها لمشاريع وأنشطة مختلفة." /><Work /></PageShell>;
}
