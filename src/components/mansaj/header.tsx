"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ArrowUpRight, Languages, Menu, Moon, Sun } from "lucide-react";
import { useLang } from "@/lib/lang";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { waLink, WA_GREETING_EN, WA_GREETING_AR } from "@/lib/whatsapp";

const NAV = [
  { href: "/", en: "Home", ar: "الرئيسية" },
  { href: "/services", en: "Services", ar: "الخدمات" },
  { href: "/work", en: "Work", ar: "أعمالنا" },
  { href: "/pricing", en: "Pricing", ar: "الباقات" },
  { href: "/contact", en: "Contact", ar: "تواصل معنا" },
] as const;

function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  return (
    <div
      className="inline-flex items-center rounded-sm border border-border bg-card p-0.5"
      role="group"
      aria-label="Language / اللغة"
    >
      {(["en", "ar"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => {
            setLang(l);
            const path = pathname.startsWith("/ar") ? pathname.slice(3) || "/" : pathname;
            window.location.href = l === "ar" ? (path === "/" ? "/ar" : `/ar${path}`) : path;
          }}
          aria-pressed={lang === l}
          className={`px-2 py-1 text-xs font-bold uppercase tracking-wider transition-colors rounded-[2px] sm:px-2.5 ${
            lang === l
              ? "bg-brand text-brand-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l === "en" ? "EN" : compact ? "AR" : "ع"}
        </button>
      ))}
      <Languages
        className="ms-1.5 me-1 hidden h-3.5 w-3.5 text-muted-foreground min-[480px]:inline-block"
        aria-hidden="true"
      />
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const { t } = useLang();

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={t({ en: "Toggle dark mode", ar: "تبديل الوضع الداكن" })}
      data-cursor={t({ en: "Theme", ar: "المظهر" })}
      className="rounded-sm border-border bg-card shadow-none hover:bg-accent hover:text-accent-foreground"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-4.5 w-4.5" aria-hidden="true" />
      ) : (
        <Moon className="h-4.5 w-4.5" aria-hidden="true" />
      )}
    </Button>
  );
}

export function SiteHeader() {
  const { t, lang } = useLang();
  const prefix = lang === "ar" ? "/ar" : "";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-[0_1px_0_0_var(--border)]" : ""
      }`}
    >
      {/* thin brand line */}
      <div className="h-1 w-full bg-brand" aria-hidden="true" />

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
        {/* Brand lockup */}
        <a
          href={lang === "ar" ? "/ar" : "/"}
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
          aria-label="Mansaj Digital — Home"
          data-cursor="Home"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border bg-card p-1 shadow-offset-sm sm:h-10 sm:w-10">
            <Image
              src="/logos/mansaj-logo-mark-96.png"
              alt="Mansaj Digital logo"
              width={32}
              height={31}
              className="h-full w-auto"
            />
          </span>
          <span className="min-w-0 whitespace-nowrap leading-tight">
            <span className="block text-[14px] font-bold sm:text-[15px]">
              {t({ en: "Mansaj", ar: "منسج" })}
            </span>
            <span className="hidden text-[11px] font-medium text-muted-foreground min-[400px]:block">
              {t({ en: "Digital · الرقمية", ar: "الرقمية · Digital" })}
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="mx-auto hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={`${prefix}${n.href === "/" ? "" : n.href}` || "/"}
              className="rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t({ en: n.en, ar: n.ar })}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="ms-auto flex shrink-0 items-center gap-1.5 sm:gap-2 md:ms-0">
          <LangToggle />
          <ThemeToggle />
          <a
            href={waLink(lang === "ar" ? WA_GREETING_AR : WA_GREETING_EN)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
            data-cursor={t({ en: "Chat", ar: "كلّمنا" })}
          >
            <Button className="rounded-sm bg-brand font-semibold text-brand-foreground shadow-offset-sm hover:bg-brand/90">
              {t({ en: "Start your project", ar: "ابدأ مشروعك" })}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </a>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-sm border-border bg-card md:hidden"
                aria-label={t({ en: "Open menu", ar: "افتح القائمة" })}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={lang === "ar" ? "left" : "right"}
              className="w-72 rounded-none border-border p-0"
            >
              <SheetHeader className="border-b border-border p-4 text-start">
                <SheetTitle className="flex items-center gap-2 text-base font-bold">
                  <Image
                    src="/logos/mansaj-logo-mark-96.png"
                    alt=""
                    width={24}
                    height={23}
                  />
                  {t({ en: "Mansaj Digital", ar: "منسج الرقمية" })}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-3" aria-label="Mobile">
                {NAV.map((n, i) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-sm px-3 py-3 text-sm font-medium hover:bg-secondary"
                  >
                    <span>{t({ en: n.en, ar: n.ar })}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      0{i + 1}
                    </span>
                  </a>
                ))}
                <a
                  href={waLink(lang === "ar" ? WA_GREETING_AR : WA_GREETING_EN)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-3"
                >
                  <Button className="w-full rounded-sm bg-brand font-semibold text-brand-foreground shadow-offset-sm">
                    {t({ en: "Start your project", ar: "ابدأ مشروعك" })}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
