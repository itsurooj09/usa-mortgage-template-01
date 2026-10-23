import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import {
  VonkMasterCalculatorSuite,
  CalculatorTab,
} from "@/components/calculators/VonkMasterCalculatorSuite";

export const metadata: Metadata = {
  title: "Interactive Mortgage Calculator Suite | All-in-One Loan Scenarios",
  description:
    "Explore our complete multi-tab interactive mortgage calculator suite: Purchase, Affordability, Refinance, Rent vs Buy, VA Loans, DSCR Investor financing, and Fix & Flip modeling.",
};

export default function CalculatorsOverviewPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const tab = (searchParams.tab as CalculatorTab) || "dscr";

  return (
    <div className="bg-ivory-warm min-h-screen pb-20">
      {/* Top Breadcrumb & Title Banner */}
      <section className="bg-navy-midnight text-white py-12 lg:py-16 border-b border-navy-light/40">
        <Container>
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/15 text-brass text-xs font-bold uppercase tracking-wider">
              <span>Interactive Decision Suite</span>
              <span className="text-slate-500">•</span>
              <span>8 Comprehensive Financial Models</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Interactive Mortgage Calculators
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Model your monthly payments, investment returns, and borrower qualification across all major residential loan programs. Fast, client-side, with zero impact on your credit.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Calculator Suite Container */}
      <section className="py-10 sm:py-14">
        <Container>
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
            <Suspense fallback={<div className="p-16 text-center text-slate-500">Loading calculator suite...</div>}>
              <VonkMasterCalculatorSuite initialTab={tab} />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* Regulatory Notice */}
      <section className="pt-4 text-xs text-slate-500 text-center">
        <Container size="narrow">
          <p className="leading-relaxed">
            All calculations provided by Northstar Mortgage are for illustrative and planning purposes only. Loan approval, interest rates, and final terms are subject to verified underwriter review of income, assets, property appraisal, and credit qualifications. Equal Housing Opportunity Lender.
          </p>
        </Container>
      </section>
    </div>
  );
}
