import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VonkMasterCalculatorSuite } from "@/components/calculators/VonkMasterCalculatorSuite";

export const metadata: Metadata = {
  title: "Closing Costs Calculator | Cash-to-Close Itemized Estimator",
  description:
    "Estimate your total closing costs, lender fees, title services, transfer taxes, and initial escrow prepaids under CFPB TRID Loan Estimate guidelines.",
};

export default function ClosingCostsPage() {
  return (
    <div className="bg-ivory-warm min-h-screen pb-20">
      {/* Top Hero Banner */}
      <section className="bg-navy-midnight text-white py-12 lg:py-16 border-b border-navy-light/40">
        <Container>
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/15 text-brass text-xs font-bold uppercase tracking-wider">
              <span>Financial Decision Tool</span>
              <span className="text-slate-500">•</span>
              <span>TRID Itemized Settlement Fee Estimator</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Closing Costs Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Estimate your total out-of-pocket cash to close, including non-shoppable lender fees, title insurance premiums, transfer taxes, and advance escrow reserves.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
            <Suspense fallback={<div className="p-16 text-center text-slate-500">Loading calculator suite...</div>}>
              <VonkMasterCalculatorSuite initialTab="purchase" />
            </Suspense>
          </div>
        </Container>
      </section>
    </div>
  );
}
