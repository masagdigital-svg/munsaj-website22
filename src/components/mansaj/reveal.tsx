"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Shared scroll-reveal wrapper — subtle rise + fade, brutalist-friendly. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Section heading block used by every section (eyebrow + title + desc). */
export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  align?: "center" | "start";
}) {
  return (
    <Reveal
      className={`flex flex-col gap-3 ${
        align === "center" ? "items-center text-center" : "items-start text-start"
      }`}
    >
      <p className="inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
        <span className="squares-strip" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {eyebrow}
      </p>
      <h2 className="max-w-2xl text-balance text-3xl font-bold leading-snug sm:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          {desc}
        </p>
      ) : null}
    </Reveal>
  );
}
