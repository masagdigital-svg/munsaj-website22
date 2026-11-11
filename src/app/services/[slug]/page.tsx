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
  const title = service.title.en;
  const description = service.description.en;
  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}`, languages: { en: `/services/${slug}`, ar: `/ar/services/${slug}` } },
    openGraph: { title: `${title} | Mansaj Digital`, description, type: "website" },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return <main className="mx-auto max-w-4xl px-6 py-24"><h1 className="text-3xl font-bold">Service not found</h1><Link className="mt-6 inline-block underline" href="/services">All services</Link></main>;

  return (
    <main className="min-h-screen">
      <section className="border-b border-border bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-brand">Mansaj Digital / Services</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">{service.title.en}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{service.description.en}</p>
          <Link href="/contact" className="mt-8 inline-flex rounded-sm bg-brand px-6 py-3 font-bold text-brand-foreground">Discuss your project</Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold">A website built around your business</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">{service.intro.en}</p>
          <h2 className="mt-10 text-2xl font-bold">What your project can include</h2>
          <ul className="mt-5 space-y-3">{service.benefits.en.map((item) => <li key={item} className="flex gap-3 leading-7"><span className="text-brand">✓</span><span>{item}</span></li>)}</ul>
          <h2 className="mt-10 text-2xl font-bold">Who this service is for</h2>
          <p className="mt-4 leading-8 text-muted-foreground">{service.audience.en}</p>
        </div>
        <aside className="h-fit rounded-md border border-border bg-card p-6">
          <h2 className="text-xl font-bold">Ready to get started?</h2>
          <p className="mt-3 leading-7 text-muted-foreground">Tell us about your goals and we’ll help you define the right website scope for your business.</p>
          <Link href="/contact" className="mt-6 inline-flex font-bold text-brand underline underline-offset-4">Contact Mansaj Digital</Link>
          <Link href="/services" className="mt-5 block text-sm underline underline-offset-4">Explore all services</Link>
        </aside>
      </section>
    </main>
  );
}
