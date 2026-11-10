"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { useLang } from "@/lib/lang";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { waLink, WA_GREETING_EN, WA_GREETING_AR } from "@/lib/whatsapp";

/** Simple typewriter for the hero terminal card. */
function useTypewriter(lines: string[], speed = 42, pause = 1500) {
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const current = lines[line];
      if (char <= current.length) {
        setText(current.slice(0, char));
        char += 1;
        timer = setTimeout(tick, speed);
      } else {
        timer = setTimeout(() => {
          line = (line + 1) % lines.length;
          char = 0;
          tick();
        }, pause);
      }
    };
    tick();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lines, speed, pause]);

  return text;
}

export function Hero() {
  const { t, lang } = useLang();

  const commands = React.useMemo(
    () =>
      lang === "ar"
        ? [
            "$ mansaj build --for \"مشروعك\"",
            "✓ تصميم يعرض بفخر على كل الشاشات",
            "✓ تجربة سريعة وواضحة لعملائك",
            "→ جاهز للانطلاق… تواصل معنا اليوم",
          ]
        : [
            '$ mansaj build --for "your-business"',
            "✓ design that shines on every screen",
            "✓ fast, clear experience for your customers",
            "→ ready to launch… let's talk today",
          ],
    [lang]
  );
  const typed = useTypewriter(commands);

  return (
    <section id="home" className="relative overflow-hidden" aria-label="Intro">
      {/* backdrop */}
      <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 end-[-40px] h-64 w-64 border-2 border-brand/25 animate-float"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 start-[-30px] h-40 w-40 rotate-12 border-2 border-brand/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-16">
        {/* Copy */}
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-1.5 font-mono text-xs font-semibold shadow-offset-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              {t({ en: "Web agency — open for new projects", ar: "وكالة مواقع — نستقبل مشاريع جديدة" })}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-balance text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-[3.4rem]">
              {t({
                en: (
                  <>
                    Your project deserves a{" "}
                    <span className="relative inline-block text-brand">
                      website
                      <span
                        className="absolute inset-x-0 -bottom-1 h-1 bg-brand/30"
                        aria-hidden="true"
                      />
                    </span>{" "}
                    that works for it.
                  </>
                ),
                ar: (
                  <>
                    مشروعك يستحق{" "}
                    <span className="relative inline-block text-brand">
                      موقعًا
                      <span
                        className="absolute inset-x-0 -bottom-1 h-1 bg-brand/30"
                        aria-hidden="true"
                      />
                    </span>{" "}
                    يعمل لأجله.
                  </>
                ),
              })}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t({
                en: "We are Mansaj Digital — a web design & development agency. We build websites, online stores, and digital experiences that help your customers understand your offer, reach you, and take the next step easily.",
                ar: "نحن منسج الرقمية — وكالة تصميم وتطوير مواقع. نبني مواقع ومتاجر إلكترونية وتجارب رقمية تساعد عملاءك على فهم ما تقدمه، والوصول إليك، واتخاذ الخطوة التالية بسهولة.",
              })}
            </p>
          </Reveal>

          <Reveal delay={0.24} className="flex flex-wrap items-center gap-3">
            <a href="#pricing" data-cursor={t({ en: "Go", ar: "يلا" })}>
              <Button
                size="lg"
                className="rounded-sm bg-brand px-6 text-[15px] font-semibold text-brand-foreground shadow-offset hover:bg-brand/90"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {t({ en: "See packages & prices", ar: "شاهد الباقات والأسعار" })}
              </Button>
            </a>
            <a href="#work" data-cursor={t({ en: "View", ar: "شوف" })}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-sm border-2 border-foreground/70 bg-card px-6 text-[15px] font-semibold shadow-none hover:bg-secondary"
              >
                {t({ en: "Explore our work", ar: "استكشف أعمالنا" })}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
          </Reveal>

          {/* Trust line — the honest numbers */}
          <Reveal delay={0.32} className="w-full">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 bg-brand" aria-hidden="true" />
                <strong className="font-bold" dir="ltr">+1</strong>
                <span className="text-muted-foreground">
                  {t({ en: "year of experience", ar: "سنة خبرة" })}
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 bg-brand" aria-hidden="true" />
                <strong className="font-bold" dir="ltr">+760</strong>
                <span className="text-muted-foreground">
                  {t({ en: "hours of hands-on work", ar: "ساعة عمل فعلية" })}
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 bg-brand" aria-hidden="true" />
                <span className="text-muted-foreground">
                  {t({ en: "Mobile-first, always", ar: "الجوال أولًا، دائمًا" })}
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Visual — terminal + workspace photo */}
        <Reveal delay={0.15} className="relative">
          <div className="relative">
            {/* terminal card — stacks above the photo on mobile, overlaps on sm+ */}
            <div className="relative z-10 w-full max-w-sm rounded-md border border-border bg-deep text-deep-foreground shadow-offset sm:absolute sm:-top-8 sm:start-8 sm:w-[85%]">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ms-2 font-mono text-[11px] opacity-70">mansaj — zsh</span>
              </div>
              <div className="min-h-[7rem] space-y-1 px-3 py-3 font-mono text-[11.5px] leading-relaxed sm:min-h-[7.5rem] sm:text-xs">
                <p dir="ltr" className="break-words">
                  <span className="text-brand">{typed}</span>
                  <span className="animate-caret ms-0.5 inline-block h-3.5 w-2 bg-brand align-middle" />
                </p>
              </div>
            </div>

            {/* photo */}
            <figure className="mt-3 overflow-hidden rounded-md border border-border bg-card pt-0 shadow-offset sm:mt-6 sm:pt-10">
              <Image
                src="/images/show-workspace.jpg"
                alt={
                  lang === "ar"
                    ? "مساحة عمل منسج أثناء بناء موقع حقيقي"
                    : "The Mansaj workspace while building a real website"
                }
                width={1600}
                height={892}
                priority
                className="h-64 w-full object-cover sm:h-72 lg:h-80"
              />
              <figcaption className="flex items-center justify-between border-t border-border px-4 py-3 text-xs font-medium text-muted-foreground">
                <span>
                  {t({
                    en: "From idea to launch — clear, agreed steps",
                    ar: "من الفكرة إلى الإطلاق — بخطوات واضحة ومتفق عليها",
                  })}
                </span>
                <a
                  href={waLink(lang === "ar" ? WA_GREETING_AR : WA_GREETING_EN)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
                >
                  {t({ en: "Chat with us", ar: "تواصل معنا" })}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
