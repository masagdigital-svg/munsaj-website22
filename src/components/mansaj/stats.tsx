"use client";

import * as React from "react";
import { useInView } from "framer-motion";
import { useLang } from "@/lib/lang";
import { Reveal } from "./reveal";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} dir="ltr">
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useLang();

  const stats = [
    { to: 1, suffix: "+", en: "Year of experience", ar: "سنة خبرة" },
    { to: 760, suffix: "+", en: "Hours of hands-on work", ar: "ساعة عمل فعلية" },
    { to: 100, suffix: "%", en: "Responsive, mobile-first builds", ar: "مواقع متجاوبة بالجوال أولًا" },
    { to: 24, suffix: "/7", en: "WhatsApp support & follow-up", ar: "دعم ومتابعة عبر واتساب" },
  ];

  return (
    <div className="relative bg-deep text-deep-foreground">
      <div className="bg-blueprint-deep absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <Reveal className="mb-8 flex flex-col gap-2">
          <p className="inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            <span className="squares-strip" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            {t({ en: "The honest numbers", ar: "الأرقام الصادقة" })}
          </p>
          <h2 className="max-w-xl text-balance text-2xl font-bold sm:text-3xl">
            {t({
              en: "Real experience, measured in hours — not inflated numbers.",
              ar: "خبرة حقيقية تُقاس بالساعات — لا بأرقام منفوخة.",
            })}
          </h2>
        </Reveal>

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.en} delay={i * 0.08} as="li">
              <div className="group relative flex h-full flex-col gap-2 rounded-md border border-white/12 bg-white/5 p-5 transition-colors hover:border-[var(--brand)] hover:bg-white/8">
                <span
                  className="absolute top-0 start-0 h-1 w-8 bg-[var(--brand)]"
                  aria-hidden="true"
                />
                <p className="text-4xl font-bold tracking-tight text-[var(--brand)] sm:text-5xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="text-sm font-medium leading-snug text-deep-foreground/80">
                  {t({ en: s.en, ar: s.ar })}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
