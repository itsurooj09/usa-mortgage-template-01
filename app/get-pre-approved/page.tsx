import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MortgageSurveyWizard } from "@/components/forms/MortgageSurveyWizard";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Get Pre-Approved for a Home Loan | Northstar Mortgage",
  description:
    "Get verified mortgage pre-approval in 2 minutes. Fast digital qualification to strengthen your purchase offer.",
};

export default function GetPreApprovedPage() {
  return (
    <div className="py-12 bg-ivory-warm min-h-screen">
      <Container size="narrow">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
            Verified Pre-Approval
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight mt-1">
            Get Pre-Approved to Buy Your Next Home
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Submit your goals to receive an underwritten pre-approval letter that listing agents prioritize.
          </p>
        </div>

        <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading mortgage wizard...</div>}>
          <MortgageSurveyWizard initialPurpose="buy" />
        </Suspense>

        <div className="mt-8 text-center text-xs text-slate-500 max-w-lg mx-auto space-y-1">
          <p className="font-semibold text-navy-midnight">
            Equal Housing Lender • NMLS #{siteConfig.brand.nmlsId}
          </p>
        </div>
      </Container>
    </div>
  );
}
