import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VonkMasterCalculatorSuite } from "@/components/calculators/VonkMasterCalculatorSuite";

export const metadata: Metadata = {
  title: "Mortgage Refinance Calculator | Break-Even Period & Monthly Savings",
  description:
    "Compare your current mortgage terms against new market rates. Calculate monthly savings, closing cost break-even timeline, and cash-out equity.",
};

export default function RefinanceCalculatorPage() {
  return (
    <div className="bg-ivory-warm min-h-screen pb-20">
      {/* Top Hero Banner */}
      <section className="bg-navy-midnight text-white py-12 lg:py-16 border-b border-navy-light/40">
        <Container>
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/15 text-brass text-xs font-bold uppercase tracking-wider">
              <span>Financial Decision Tool</span>
              <span className="text-slate-500">•</span>
              <span>Break-Even & Monthly Savings Analysis</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              Mortgage Refinance Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Compare your existing mortgage rate and balance against current wholesale market terms. Calculate your exact monthly cash savings and closing cost recovery timeline.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
            <Suspense fallback={<div className="p-16 text-center text-slate-500">Loading calculator suite...</div>}>
              <VonkMasterCalculatorSuite initialTab="refi" />
            </Suspense>
          </div>
        </Container>
      </section>
    </div>
  );
}
