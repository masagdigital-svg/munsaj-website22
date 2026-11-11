import type { Metadata } from "next";
import { PageShell } from "@/components/mansaj/page-shell";
import { Contact } from "@/components/mansaj/contact";
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
  title: "تواصل مع منسج الرقمية | اطلب موقعك الآن",
  description: "تواصل مع وكالة منسج الرقمية لمناقشة مشروعك والحصول على خطة وباقة مناسبة لتصميم موقعك أو متجرك الإلكتروني.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "تواصل مع منسج الرقمية", description: "ابدأ مشروعك الرقمي مع منسج الرقمية." },
};
export default function ContactPage() {
  return <PageShell><PageIntro eyebrow="Contact / تواصل معنا" title="ابدأ مشروعك الرقمي مع منسج الرقمية" description="أخبرنا عن مشروعك وسنساعدك في تحديد الخطوة التالية والحل المناسب لاحتياجاتك." /><Contact /></PageShell>;
}
