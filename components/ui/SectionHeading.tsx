import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  const isDark = theme === "dark";

  return (
    <div className={twMerge(clsx("max-w-3xl mb-12", alignClasses[align], className))}>
      {eyebrow && (
        <div
          className={clsx(
            "inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full mb-3.5",
            isDark
              ? "bg-navy-light text-brass-muted border border-brass/20"
              : "bg-brass/10 text-navy-midnight border border-brass/30"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brass inline-block" />
          {eyebrow}
        </div>
      )}
      <h2
        className={clsx(
          "font-heading text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight leading-[1.15]",
          isDark ? "text-white" : "text-navy-midnight"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "mt-4 text-base sm:text-lg leading-relaxed",
            isDark ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
