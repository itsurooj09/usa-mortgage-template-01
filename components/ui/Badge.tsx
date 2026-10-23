import React from "react";
import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brass" | "navy" | "success" | "muted" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "brass",
  size = "md",
  className,
}: BadgeProps) {
  const variantStyles = {
    brass: "bg-brass/15 text-navy-midnight border-brass/30",
    navy: "bg-navy-midnight text-white border-navy-dark",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    muted: "bg-slate-100 text-slate-700 border-slate-200",
    outline: "bg-transparent text-slate-700 border-border-subtle",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3 py-1 text-xs font-semibold tracking-wide",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
