import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { Services } from "@/components/mansaj/services";
import { Process } from "@/components/mansaj/process";
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
  title: "خدمات تصميم وتطوير المواقع | منسج الرقمية",
  description: "اكتشف خدمات منسج الرقمية في تصميم وتطوير مواقع الشركات والمتاجر الإلكترونية وصفحات الهبوط والمواقع العقارية والشخصية.",
  alternates: { canonical: "/services" },
  openGraph: { title: "خدمات منسج الرقمية", description: "تصميم وتطوير مواقع ومتاجر إلكترونية تناسب نشاطك." },
};
export default function ServicesPage() {
  return <PageShell><PageIntro eyebrow="Services / الخدمات" title="خدمات تصميم وتطوير المواقع التي يحتاجها مشروعك" description="من المواقع التعريفية إلى المتاجر الإلكترونية وصفحات الهبوط، نبني تجربة رقمية واضحة تساعد عملاءك على الوصول إليك." /><Services /><Process /></PageShell>;
}
