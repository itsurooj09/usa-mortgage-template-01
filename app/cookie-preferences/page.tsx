"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function CookiePreferencesPage() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ns_cookie_consent");
    if (saved === "all") {
      setAnalyticsEnabled(true);
      setMarketingEnabled(true);
    } else if (saved === "necessary") {
      setAnalyticsEnabled(false);
      setMarketingEnabled(false);
    }
  }, []);

  const handleSave = () => {
    const consentMode = analyticsEnabled && marketingEnabled ? "all" : analyticsEnabled ? "analytics" : "necessary";
    localStorage.setItem("ns_cookie_consent", consentMode);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="py-16 bg-white min-h-screen">
      <Container size="narrow">
        <div className="space-y-8">
          <div className="border-b border-border-subtle pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
              Privacy Controls
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight">
              Cookie Preferences & Privacy Choices
            </h1>
            <p className="text-xs text-slate-500">
              Manage your cookie preferences and tracking consent.
            </p>
          </div>

          {savedNotice && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <span>✓ Your privacy preferences have been updated and saved.</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="p-6 rounded-xl border border-border-subtle bg-ivory-warm space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-navy-midnight">
                    Essential & Strictly Necessary Cookies
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider">
                    Always Active
                  </span>
                </div>
                <div className="w-10 h-6 bg-navy-midnight rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-80">
                  <span className="w-4 h-4 bg-white rounded-full inline-block" />
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                These cookies are strictly required to operate the core website features, maintain secure SSL sessions, calculate amortization formulas, and process form submissions. They cannot be disabled.
              </p>
            </div>

            {/* Performance & Analytics Cookies */}
            <div className="p-6 rounded-xl border border-border-subtle bg-white space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-navy-midnight">
                    Performance & Analytics Cookies
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Aggregated Site Metrics
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className={`w-11 h-6 rounded-full flex items-center transition-colors p-1 ${
                    analyticsEnabled ? "bg-navy-midnight justify-end" : "bg-slate-300 justify-start"
                  }`}
                  aria-pressed={analyticsEnabled}
                >
                  <span className="w-4 h-4 bg-white rounded-full inline-block shadow-sm" />
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                These cookies allow us to count page visits and traffic sources to measure and improve our mortgage calculator performance and navigation pathways. All data is anonymized.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="p-6 rounded-xl border border-border-subtle bg-white space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-navy-midnight">
                    Marketing & Conversion Cookies
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Personalized Loan Offers
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMarketingEnabled(!marketingEnabled)}
                  className={`w-11 h-6 rounded-full flex items-center transition-colors p-1 ${
                    marketingEnabled ? "bg-navy-midnight justify-end" : "bg-slate-300 justify-start"
                  }`}
                  aria-pressed={marketingEnabled}
                >
                  <span className="w-4 h-4 bg-white rounded-full inline-block shadow-sm" />
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Used to deliver relevant loan rate updates and educational advertisements on partner networks. If disabled, you will still see general mortgage advertisements.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                type="button"
                variant="brass"
                size="md"
                onClick={handleSave}
                className="font-bold text-navy-deep"
              >
                Save My Preferences
              </Button>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  setAnalyticsEnabled(true);
                  setMarketingEnabled(true);
                  localStorage.setItem("ns_cookie_consent", "all");
                  setSavedNotice(true);
                  setTimeout(() => setSavedNotice(false), 3000);
                }}
              >
                Accept All Cookies
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
