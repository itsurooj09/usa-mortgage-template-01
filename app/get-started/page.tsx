import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MortgageSurveyWizard } from "@/components/forms/MortgageSurveyWizard";
import { siteConfig } from "@/lib/config/siteConfig";
import { photoLibrary } from "@/content/assets";
import {
  EqualHousingBadge,
  SslEncryptionBadge,
  PrivacySecurityGuaranteedBadge,
} from "@/components/ui/TrustBadges";

export const metadata: Metadata = {
  title: "Get Pre-Approved | 2-Minute Digital Mortgage Survey | Northstar Mortgage",
  description:
    "Complete our multi-step qualification survey to check your mortgage options with zero impact on your credit score. No SSN required.",
};

export default function GetStartedPage({
  searchParams,
}: {
  searchParams: { purpose?: "buy" | "refinance" | "explore"; price?: string; down?: string };
}) {
  return (
    <div className="py-12 lg:py-16 bg-ivory-warm min-h-screen">
      <Container>
        {/* Main Grid: Trust Sidebar (Left) + Survey Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Trust Sidebar & Loan Officer Support */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/15 text-brass-dark text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>2-Minute Digital Pre-Approval</span>
              </div>
              <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight tracking-tight leading-tight">
                Unlock Preferred Mortgage Terms in Minutes.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Take the first step toward verified pre-approval. We analyze your purchase or refinance profile across our direct correspondent capital guidelines with zero obligation.
              </p>
            </div>

            {/* Architectural Real Estate Image with Trust Stamp */}
            <div className="relative rounded-2xl overflow-hidden shadow-card border border-border-subtle h-64 sm:h-72 w-full">
              <Image
                src={photoLibrary.lifestyle.happyCoupleKeys.url}
                alt="Happy homebuyers holding keys to their new home"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-brass">
                  Fast Clear-to-Close
                </span>
                <p className="text-sm font-semibold drop-shadow mt-0.5">
                  Over 18,500 American families funded with 19-day average turnarounds.
                </p>
              </div>
            </div>

            {/* 4 Trust Pillars */}
            <div className="bg-white rounded-2xl p-6 border border-border-subtle shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base text-navy-midnight pb-2 border-b border-border-subtle">
                Our Borrower Security Guarantee
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <h4 className="font-bold text-navy-midnight">Zero Credit Score Impact</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Soft inquiry only during this questionnaire. Your FICO credit score remains completely untouched.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <h4 className="font-bold text-navy-midnight">No SSN or Banking Logins Needed</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      We do not require your Social Security number or sensitive bank credentials for preliminary rate matching.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <div>
                    <h4 className="font-bold text-navy-midnight">256-Bit Bank-Grade Encryption</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      End-to-end SSL data security. Your information is never sold to high-pressure third-party telemarketers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Officer Support Card */}
            <div className="bg-navy-midnight text-white rounded-2xl p-5 border border-navy-light/40 shadow-sm flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brass flex-shrink-0">
                <Image
                  src={siteConfig.primaryLoanOfficer.avatarUrl}
                  alt={siteConfig.primaryLoanOfficer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-brass font-bold">
                  Need Help While Applying?
                </div>
                <div className="font-heading font-bold text-sm text-white truncate">
                  {siteConfig.primaryLoanOfficer.name} (NMLS #{siteConfig.primaryLoanOfficer.nmlsId})
                </div>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
                  className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 mt-0.5"
                >
                  <span>Direct Desk:</span>
                  <span className="text-brass font-bold">{siteConfig.contact.phoneFormatted}</span>
                </a>
              </div>
            </div>

            {/* Official HUD & SSL Logos from Reference media_1792740643933.png */}
            <div className="pt-2 flex flex-wrap items-center gap-8 border-t border-border-subtle">
              <EqualHousingBadge variant="light" />
              <SslEncryptionBadge variant="light" />
            </div>
          </div>

          {/* Right Column: Mortgage Survey Wizard Container */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
              <Suspense fallback={<div className="p-16 text-center text-slate-500 font-medium">Loading questionnaire...</div>}>
                <MortgageSurveyWizard initialPurpose={searchParams.purpose} />
              </Suspense>
            </div>

            {/* Golden Padlock Badge from Reference media_1792740672494.png */}
            <div className="flex justify-center">
              <PrivacySecurityGuaranteedBadge />
            </div>
          </div>
        </div>

        {/* Bottom Trust & Compliance Statement */}
        <div className="mt-16 text-center text-xs text-slate-500 max-w-2xl mx-auto space-y-1">
          <p className="font-semibold text-navy-midnight">
            Northstar Mortgage Capital • Equal Housing Lender • NMLS Unique Identifier #{siteConfig.brand.nmlsId}
          </p>
          <p>
            Submission of this inquiry does not constitute a commitment to lend under the Truth in Lending Act (TILA). Final approval is subject to verified underwriter review of income, assets, and property appraisal.
          </p>
        </div>
      </Container>
    </div>
  );
}
