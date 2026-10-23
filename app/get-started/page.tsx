import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MortgageSurveyWizard } from "@/components/forms/MortgageSurveyWizard";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Get Pre-Approved | 2-Minute Digital Mortgage Survey",
  description:
    "Complete our multi-step qualification survey to check your mortgage options with zero impact on your credit score. No SSN required.",
};

export default function GetStartedPage({
  searchParams,
}: {
  searchParams: { purpose?: "buy" | "refinance" | "explore"; price?: string; down?: string };
}) {
  return (
    <div className="py-12 bg-ivory-warm min-h-screen">
      <Container size="narrow">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
            2-Minute Digital Survey
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight mt-1">
            Let&apos;s Find Your Optimal Loan Program
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Soft credit inquiry with zero score impact. We never solicit Social Security numbers or banking logins during this preliminary review.
          </p>
        </div>

        <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading mortgage wizard...</div>}>
          <MortgageSurveyWizard initialPurpose={searchParams.purpose} />
        </Suspense>

        {/* Security & Verification Assurance */}
        <div className="mt-8 text-center text-xs text-slate-500 max-w-lg mx-auto space-y-1">
          <p className="font-semibold text-navy-midnight">
            256-Bit Bank-Grade Encryption • NMLS Unique Identifier #{siteConfig.brand.nmlsId}
          </p>
          <p>
            Your information is confidential and will never be sold to high-pressure third-party marketing brokers.
          </p>
        </div>
      </Container>
    </div>
  );
}
