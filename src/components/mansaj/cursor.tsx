"use client";

import * as React from "react";
import { useLang } from "@/lib/lang";

/**
 * Custom square cursor:
 * - a small squared frame that follows the mouse (fine pointers only)
 * - over interactive elements it expands, changes color and shows a label
 *   coming from the element's [data-cursor] attribute (e.g. "View", "Order")
 */
export function CustomCursor() {
  const { lang } = useLang();
  const [enabled, setEnabled] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [label, setLabel] = React.useState("");
  const [pressed, setPressed] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const frameRef = React.useRef<HTMLDivElement>(null);
  const pos = React.useRef({ x: -100, y: -100, tx: -100, ty: -100 });
  const raf = React.useRef<number>(0);

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-on");

    const onMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      setVisible(true);

      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, [role='button'], [data-cursor], input, textarea, select, summary"
      ) as HTMLElement | null;
      if (el) {
        setActive(true);
        const custom = el?.dataset?.cursor;
        setLabel(custom ? custom : lang === "ar" ? "اضغط" : "Click");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    const loop = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.22;
      pos.current.y += (pos.current.ty - pos.current.y) * 0.22;
      if (frameRef.current) {
        frameRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("custom-cursor-on");
    };
  }, [lang]);

  if (!enabled) return null;

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .2s ease" }}
    >
      <div
        className={`flex items-center justify-center border font-semibold transition-all duration-200 ease-out ${
          active
            ? "h-11 min-w-11 rounded-sm border-brand bg-brand px-3 text-brand-foreground shadow-offset-sm"
            : "h-6 w-6 rounded-[4px] border-2 border-brand bg-transparent"
        }`}
        style={{
          transform: pressed ? "scale(0.85)" : "scale(1)",
          fontSize: active ? "11px" : undefined,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {active && label ? (
          <span className="truncate leading-none">{label}</span>
        ) : (
          <span className="h-1 w-1 rounded-[1px] bg-brand" />
        )}
      </div>
    </div>
  );
}
