import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export function Logo({
  className = "",
  variant = "light",
  size = "md",
}: LogoProps) {
  const isDark = variant === "dark";

  const sizeConfig = {
    sm: {
      iconSize: 28,
      textSize: "text-base",
      subSize: "text-[9px]",
      containerH: "h-8",
    },
    md: {
      iconSize: 36,
      textSize: "text-lg",
      subSize: "text-[10px]",
      containerH: "h-10",
    },
    lg: {
      iconSize: 44,
      textSize: "text-2xl",
      subSize: "text-xs",
      containerH: "h-12",
    },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded-md py-1 transition-opacity hover:opacity-95 ${className}`}
      aria-label="Mortgage Level Home"
    >
      {/* Precision Geometric Financial Star / Compass SVG Icon */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          width={sizeConfig.iconSize}
          height={sizeConfig.iconSize}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Subtle Outer Shield Glow */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="9"
            fill={isDark ? "#10243A" : "#172F4D"}
            stroke={isDark ? "#E2E8F0" : "#234165"}
            strokeWidth="1.5"
          />

          {/* Compass Star / North Star Geometry */}
          {/* Vertical Main Needle */}
          <path
            d="M20 7L23 18.5H17L20 7Z"
            fill="url(#brassGradTop)"
          />
          <path
            d="M20 33L17 21.5H23L20 33Z"
            fill="url(#brassGradBottom)"
          />
          {/* Horizontal Needle */}
          <path
            d="M33 20L21.5 23V17L33 20Z"
            fill="url(#brassGradRight)"
          />
          <path
            d="M7 20L18.5 17V23L7 20Z"
            fill="url(#brassGradLeft)"
          />

          {/* Central Precision Diamond Core */}
          <rect
            x="17"
            y="17"
            width="6"
            height="6"
            transform="rotate(45 20 20)"
            fill="#FFFFFF"
          />
          <circle cx="20" cy="20" r="1.5" fill="#10243A" />

          {/* Linear Gradients for Brass Luster */}
          <defs>
            <linearGradient id="brassGradTop" x1="20" y1="7" x2="20" y2="18.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5EFE4" />
              <stop offset="1" stopColor="#C5A46D" />
            </linearGradient>
            <linearGradient id="brassGradBottom" x1="20" y1="33" x2="20" y2="21.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8C7142" />
              <stop offset="1" stopColor="#C5A46D" />
            </linearGradient>
            <linearGradient id="brassGradRight" x1="33" y1="20" x2="21.5" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5EFE4" />
              <stop offset="1" stopColor="#C5A46D" />
            </linearGradient>
            <linearGradient id="brassGradLeft" x1="7" y1="20" x2="18.5" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8C7142" />
              <stop offset="1" stopColor="#C5A46D" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Balanced Wordmark Typography */}
      <div className="flex flex-col leading-none select-none">
        <span
          className={`font-heading font-black tracking-tight ${sizeConfig.textSize} ${
            isDark ? "text-navy-midnight" : "text-white"
          }`}
        >
          MORTGAGE
        </span>
        <span
          className={`font-heading font-bold uppercase tracking-[0.26em] ${sizeConfig.subSize} text-brass mt-0.5`}
        >
          LEVEL
        </span>
      </div>
    </Link>
  );
}
