"use client";

import * as React from "react";
import { useLang } from "@/lib/lang";

const ITEMS = [
  { en: "Websites", ar: "مواقع" },
  { en: "Online Stores", ar: "متاجر إلكترونية" },
  { en: "Landing Pages", ar: "صفحات هبوط" },
  { en: "Real Estate", ar: "عقارات" },
  { en: "Portfolios", ar: "معارض أعمال" },
  { en: "Booking Sites", ar: "مواقع حجز" },
  { en: "SEO-ready", ar: "مهيأة لمحركات البحث" },
  { en: "Mobile-first", ar: "الجوال أولًا" },
] as const;

export function Marquee() {
  const { t, lang } = useLang();
  const row = [...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden border-y-2 border-foreground/80 bg-brand py-3 text-brand-foreground"
      aria-hidden="true"
    >
      {/* dir=ltr keeps the translateX(-50%) loop correct in Arabic mode too */}
      <div dir="ltr" className="flex w-max animate-marquee gap-0">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className={`flex items-center gap-3 whitespace-nowrap px-5 text-sm font-bold ${
                  lang === "ar"
                    ? "tracking-normal"
                    : "uppercase tracking-[0.14em]"
                }`}
              >
                {t(item)}
                <span className="inline-block h-2 w-2 rotate-45 bg-current opacity-70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
