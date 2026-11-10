"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/lib/lang";
import { waLink, WA_GREETING_EN, WA_GREETING_AR } from "@/lib/whatsapp";

/**
 * Floating WhatsApp button — always reachable if the visitor
 * faces a problem or wants to ask anything.
 */
export function FloatingWhatsApp() {
  const { t, lang } = useLang();
  const [showTip, setShowTip] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowTip(true), 3500);
    const hide = setTimeout(() => setShowTip(false), 11000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hide);
    };
  }, []);

  return (
    <div className="fixed bottom-5 end-5 z-[60] flex items-center gap-2.5">
      {showTip ? (
        <div className="hidden animate-in fade-in slide-in-from-end-4 rounded-sm border border-border bg-card px-3.5 py-2 text-xs font-semibold shadow-offset-sm sm:block">
          {t({
            en: "Need help? Chat with us on WhatsApp",
            ar: "تحتاج مساعدة؟ راسلنا على واتساب",
          })}
        </div>
      ) : null}

      <a
        href={waLink(lang === "ar" ? WA_GREETING_AR : WA_GREETING_EN)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={t({ en: "Chat", ar: "كلّمنا" })}
        aria-label={t({
          en: "Chat with Mansaj Digital on WhatsApp",
          ar: "تواصل مع منسج الرقمية عبر واتساب",
        })}
        className="animate-wa-pulse flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </a>
    </div>
  );
}
