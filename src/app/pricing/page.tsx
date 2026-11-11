import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { Pricing } from "@/components/mansaj/pricing";
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
  title: "باقات تصميم المواقع والأسعار | منسج الرقمية",
  description: "قارن باقات منسج الرقمية لتصميم المواقع والمتاجر الإلكترونية، واختر الحل المناسب لمشروعك.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "باقات وأسعار منسج الرقمية", description: "باقات واضحة لتصميم المواقع والمتاجر الإلكترونية." },
};
export default function PricingPage() {
  return <PageShell><PageIntro eyebrow="Packages / الباقات" title="باقات تصميم المواقع والأسعار" description="اختر الباقة التي تناسب احتياجات مشروعك، أو تواصل معنا لتحديد نطاق عمل مخصص." /><Pricing /></PageShell>;
}
