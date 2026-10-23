"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ns_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("ns_cookie_consent", "all");
    setShowBanner(false);
  };

  const handleNecessaryOnly = () => {
    localStorage.setItem("ns_cookie_consent", "necessary");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-navy-midnight/95 backdrop-blur-md border-t border-navy-light/60 shadow-floating text-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-300 leading-relaxed pr-4">
          <p className="font-bold text-white text-sm mb-1">
            Privacy Choices & Cookie Preferences
          </p>
          <p>
            We use essential cookies to provide secure mortgage rate estimations and form submissions. With your consent, we also utilize analytics cookies to enhance user navigation and optimize loan program offerings. Review our{" "}
            <Link href="/privacy-policy" className="text-brass hover:underline">
              Privacy Policy
            </Link>{" "}
            or customize your settings on our{" "}
            <Link href="/cookie-preferences" className="text-brass hover:underline">
              Cookie Preferences page
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleNecessaryOnly}
            className="text-slate-200 border-slate-600 hover:text-white hover:bg-navy-light text-xs"
          >
            Essential Only
          </Button>
          <Button
            type="button"
            variant="brass"
            size="sm"
            onClick={handleAcceptAll}
            className="font-bold text-navy-deep text-xs"
          >
            Accept All Cookies
          </Button>
        </div>
      </div>
    </div>
  );
}
