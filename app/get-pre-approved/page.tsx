import React, { Suspense } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MortgageSurveyWizard } from "@/components/forms/MortgageSurveyWizard";
import { siteConfig } from "@/lib/config/siteConfig";
import { photoLibrary } from "@/content/assets";

export const metadata: Metadata = {
  title: "Get Pre-Approved for a Home Loan | Northstar Mortgage",
  description:
    "Get verified mortgage pre-approval in 2 minutes. Fast digital qualification to strengthen your purchase offer.",
};

export default function GetPreApprovedPage() {
  return (
    <div className="py-12 lg:py-16 bg-ivory-warm min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Trust Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/15 text-brass-dark text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Verified Pre-Approval</span>
              </div>
              <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight tracking-tight leading-tight">
                Make Winning Offers with Underwritten Pre-Approval.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                In competitive housing markets, listing agents prioritize offers backed by real bank underwriter letters. Submit your goals in 2 minutes with zero credit score impact.
              </p>
            </div>

            {/* Architectural Real Estate Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-card border border-border-subtle h-64 sm:h-72 w-full">
              <Image
                src={photoLibrary.hero.familyPorch.url}
                alt="Charming American home representing verified pre-approval"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-brass">
                  Listing Agent Certainty
                </span>
                <p className="text-sm font-semibold drop-shadow mt-0.5">
                  Our loan officers call the seller&apos;s agent directly upon offer submission.
                </p>
              </div>
            </div>

            {/* Trust Pillars */}
            <div className="bg-white rounded-2xl p-6 border border-border-subtle shadow-sm space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-navy-midnight">Zero FICO Score Impact</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Soft credit check only. Safe for your credit profile.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="font-bold text-navy-midnight">19-Day Average Closing</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Direct correspondent underwriting eliminates weeks of red tape.</p>
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
                  Dedicated Loan Officer
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
          </div>

          {/* Right Column: Mortgage Survey Wizard */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
              <Suspense fallback={<div className="p-16 text-center text-slate-500 font-medium">Loading questionnaire...</div>}>
                <MortgageSurveyWizard initialPurpose="buy" />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
