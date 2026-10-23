import React from "react";

interface BadgeProps {
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Official Equal Housing Opportunity Logo & Label (HUD / Fair Housing Standard)
 * Exact match to uploaded reference media_1792740643933.png
 */
export function EqualHousingBadge({ className = "", variant = "dark" }: BadgeProps) {
  const isDarkBg = variant === "dark";
  const textColor = isDarkBg ? "text-slate-300" : "text-slate-700";
  const strokeColor = isDarkBg ? "#FFFFFF" : "#10243A";
  const fillColor = isDarkBg ? "#FFFFFF" : "#10243A";

  return (
    <div className={`flex flex-col items-center sm:items-start space-y-2 select-none ${className}`}>
      <span className={`text-[11px] font-bold uppercase tracking-wider ${textColor}`}>
        EQUAL HOUSING OPPORTUNITY
      </span>
      <div className="flex items-center gap-2">
        {/* Official HUD House with Equal Sign Symbol */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
          aria-label="Equal Housing Opportunity Logo"
        >
          {/* Border Box */}
          <rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="6"
            stroke={strokeColor}
            strokeWidth="3.5"
            fill="none"
          />
          {/* House Roof */}
          <path
            d="M32 10L12 26H20V48H44V26H52L32 10Z"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Chimney */}
          <path
            d="M40 18V13H45V22"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Equal Sign (=) Inside House */}
          <rect x="26" y="30" width="12" height="3" rx="1.5" fill={fillColor} />
          <rect x="26" y="37" width="12" height="3" rx="1.5" fill={fillColor} />
          {/* Micro Subtitle Text */}
          <text
            x="32"
            y="56"
            textAnchor="middle"
            fontSize="4.5"
            fontWeight="bold"
            letterSpacing="0.05em"
            fill={fillColor}
            fontFamily="sans-serif"
          >
            EQUAL HOUSING
          </text>
          <text
            x="32"
            y="60"
            textAnchor="middle"
            fontSize="4"
            fontWeight="bold"
            letterSpacing="0.05em"
            fill={fillColor}
            fontFamily="sans-serif"
          >
            OPPORTUNITY
          </text>
        </svg>
      </div>
    </div>
  );
}

/**
 * Official SECURE SSL ENCRYPTION Shield Badge
 * Exact match to uploaded references media_1792740643933.png & media_1792740672494.png
 */
export function SslEncryptionBadge({ className = "", variant = "dark" }: BadgeProps) {
  const isDarkBg = variant === "dark";
  const labelColor = isDarkBg ? "text-slate-300" : "text-slate-700";
  const shieldStroke = isDarkBg ? "#FFFFFF" : "#1E293B";
  const textColor = isDarkBg ? "#FFFFFF" : "#1E293B";

  return (
    <div className={`flex flex-col items-center sm:items-start space-y-1.5 select-none ${className}`}>
      <span className={`text-[11px] font-bold uppercase tracking-wider ${labelColor}`}>
        SSL CERTIFICATE
      </span>
      <div className="flex items-center gap-2.5">
        {/* Shield with Checkmark */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
          aria-label="Secure SSL Encryption Shield"
        >
          {/* Classic Security Shield Shape */}
          <path
            d="M32 6L14 12V30C14 44 22 53 32 58C42 53 50 44 50 30V12L32 6Z"
            stroke={shieldStroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill={isDarkBg ? "rgba(255,255,255,0.06)" : "rgba(16,36,58,0.03)"}
          />
          {/* Bold Checkmark Inside Shield */}
          <path
            d="M23 31L29 37L41 23"
            stroke={shieldStroke}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Text Block: SECURE / SSL ENCRYPTION */}
        <div className="flex flex-col leading-tight">
          <span
            className="font-heading font-black text-sm tracking-wider"
            style={{ color: textColor }}
          >
            SECURE
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-wider opacity-85"
            style={{ color: textColor }}
          >
            SSL ENCRYPTION
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Large Top Banner Shield Badge (As displayed on red/navy header in media_1792740672494.png)
 */
export function HeroSslShieldBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg ${className}`}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          d="M32 6L14 12V30C14 44 22 53 32 58C42 53 50 44 50 30V12L32 6Z"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.15)"
        />
        <path
          d="M23 31L29 37L41 23"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex flex-col leading-none text-left">
        <span className="font-heading font-black text-base tracking-wider text-white">
          SECURE
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-200 mt-1">
          SSL ENCRYPTION
        </span>
      </div>
    </div>
  );
}

/**
 * Privacy & Security Guaranteed Lock Badge
 * Exact match to bottom of uploaded image media_1792740672494.png
 */
export function PrivacySecurityGuaranteedBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-3.5 px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-sm ${className}`}
    >
      {/* Golden Metallic Padlock Icon */}
      <div className="relative flex-shrink-0 w-8 h-8 flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shackle */}
          <path
            d="M9 13V9C9 5.13401 12.134 2 16 2C19.866 2 23 5.13401 23 9V13"
            stroke="#94A3B8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Golden Body */}
          <rect
            x="6"
            y="12"
            width="20"
            height="17"
            rx="3.5"
            fill="url(#goldLockGrad)"
            stroke="#D97706"
            strokeWidth="1.2"
          />
          {/* Keyhole */}
          <circle cx="16" cy="19" r="2" fill="#78350F" />
          <path d="M16 21V24" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

          <defs>
            <linearGradient id="goldLockGrad" x1="6" y1="12" x2="26" y2="29" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text Copy matching Reference */}
      <div className="flex flex-col text-left leading-tight">
        <span className="font-heading font-black text-sm text-[#0284C7] tracking-tight">
          Privacy & Security Guaranteed.
        </span>
        <span className="text-xs text-slate-500 font-medium mt-0.5">
          Your Data Is Never Sold or Shared. Ever.
        </span>
      </div>
    </div>
  );
}
