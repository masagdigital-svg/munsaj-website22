"use client";

import type { ReactNode } from "react";
import { LangProvider, type Lang } from "@/lib/lang";
import { CustomCursor } from "@/components/mansaj/cursor";
import { SiteHeader } from "@/components/mansaj/header";
import { SiteFooter } from "@/components/mansaj/contact";
import { FloatingWhatsApp } from "@/components/mansaj/floating-wa";

export function PageShell({ children, initialLang = "en" }: { children: ReactNode; initialLang?: Lang }) {
  return (
    <LangProvider initialLang={initialLang}>
      <CustomCursor />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingWhatsApp />
      </div>
    </LangProvider>
  );
}
