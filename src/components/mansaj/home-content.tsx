import * as React from "react";
import { LangProvider, useLang } from "@/lib/lang";
import { CustomCursor } from "@/components/mansaj/cursor";
import { SiteHeader } from "@/components/mansaj/header";
import { Hero } from "@/components/mansaj/hero";
import { Marquee } from "@/components/mansaj/marquee";
import { Why } from "@/components/mansaj/why";
import { Stats } from "@/components/mansaj/stats";
import { Services } from "@/components/mansaj/services";
import { Process } from "@/components/mansaj/process";
import { Work } from "@/components/mansaj/work";
import { Pricing } from "@/components/mansaj/pricing";
import { Contact, SiteFooter } from "@/components/mansaj/contact";
import { FloatingWhatsApp } from "@/components/mansaj/floating-wa";

function TechStrip() {
  const { t } = useLang();
  const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Netlify", "SEO"];

  return (
    <section
      className="border-y border-border bg-muted/50 py-6"
      aria-label={t({ en: "Our toolbox", ar: "أدواتنا" })}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 sm:px-6">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {t({ en: "Built with", ar: "نبني بـ" })}
        </span>
        {stack.map((s) => (
          <span
            key={s}
            className="font-mono text-sm font-semibold text-foreground/70 transition-colors hover:text-brand"
            dir="ltr"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

export function HomeContent() {
  return (
    <LangProvider>
      <CustomCursor />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <Marquee />
          <Why />
          <Stats />
          <Services />
          <Process />
          <Work />
          <Pricing />
          <TechStrip />
          <Contact />
        </main>
        <SiteFooter />
        <FloatingWhatsApp />
      </div>
    </LangProvider>
  );
}
