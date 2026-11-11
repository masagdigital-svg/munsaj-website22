import type { Metadata } from "next";
import Link from "next/link";
import { getServicePage, servicePages } from "@/lib/service-pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return {};
  const title = service.title.ar;
  const description = service.description.ar;
  return {
    title,
    description,
    alternates: { canonical: `/ar/services/${slug}`, languages: { en: `/services/${slug}`, ar: `/ar/services/${slug}` } },
    openGraph: { title: `${title} | منسج الرقمية`, description, type: "website" },
  };
}

export default async function ArabicServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return <main dir="rtl" lang="ar" className="mx-auto max-w-4xl px-6 py-24"><h1 className="text-3xl font-bold">الخدمة غير موجودة</h1><Link className="mt-6 inline-block underline" href="/ar/services">كل الخدمات</Link></main>;

  return (
    <main lang="ar" dir="rtl" className="min-h-screen">
      <section className="border-b border-border bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="mb-4 text-sm font-bold tracking-widest text-brand">منسج الرقمية / الخدمات</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">{service.title.ar}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{service.description.ar}</p>
          <Link href="/ar/contact" className="mt-8 inline-flex rounded-sm bg-brand px-6 py-3 font-bold text-brand-foreground">ناقش مشروعك معنا</Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold">موقع يُبنى حول احتياجات نشاطك</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">{service.intro.ar}</p>
          <h2 className="mt-10 text-2xl font-bold">ماذا يمكن أن تشمل الخدمة؟</h2>
          <ul className="mt-5 space-y-3">{service.benefits.ar.map((item) => <li key={item} className="flex gap-3 leading-7"><span className="text-brand">✓</span><span>{item}</span></li>)}</ul>
          <h2 className="mt-10 text-2xl font-bold">لمن تناسب هذه الخدمة؟</h2>
          <p className="mt-4 leading-8 text-muted-foreground">{service.audience.ar}</p>
        </div>
        <aside className="h-fit rounded-md border border-border bg-card p-6">
          <h2 className="text-xl font-bold">هل أنت مستعد للبدء؟</h2>
          <p className="mt-3 leading-7 text-muted-foreground">أخبرنا بأهدافك وسنساعدك في تحديد نطاق الموقع المناسب لنشاطك.</p>
          <Link href="/ar/contact" className="mt-6 inline-flex font-bold text-brand underline underline-offset-4">تواصل مع منسج الرقمية</Link>
          <Link href="/ar/services" className="mt-5 block text-sm underline underline-offset-4">استكشف جميع الخدمات</Link>
        </aside>
      </section>
    </main>
  );
}
