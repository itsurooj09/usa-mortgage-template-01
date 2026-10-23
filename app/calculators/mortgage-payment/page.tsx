import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MortgagePaymentCalculator } from "@/components/calculators/MortgagePaymentCalculator";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Mortgage Payment Calculator | Principal, Interest, Taxes & PMI",
  description:
    "Calculate your monthly mortgage payment with principal, interest, taxes, insurance, and cancellable PMI. View full 30-year amortization schedule.",
};

const calcFaqs = [
  {
    question: "How is monthly principal and interest calculated?",
    answer: "Principal and interest are calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1], where P is the loan principal, r is the monthly interest rate, and n is the total number of monthly payments (e.g. 360 months for a 30-year mortgage).",
  },
  {
    question: "When does Private Mortgage Insurance (PMI) get removed?",
    answer: "Under the federal Homeowners Protection Act, you can request PMI cancellation when your loan balance reaches 80% of the original home value, and your lender must automatically cancel it at 78% LTV.",
  },
  {
    question: "How are property taxes estimated?",
    answer: "Our calculator applies a default 1.2% national average annual property tax rate, adjustable to your municipality's specific millage rate.",
  },
];

export default function MortgagePaymentCalculatorPage() {
  return (
    <div className="py-12 bg-ivory-warm min-h-screen">
      <Container>
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
            Interactive Calculator
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight mt-1">
            Mortgage Payment Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Model your estimated total monthly housing payment including principal, interest, taxes, homeowners insurance, and cancellable private mortgage insurance (PMI).
          </p>
        </div>

        <MortgagePaymentCalculator />

        {/* Informational Guidance */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-navy-midnight mb-4">
            Understanding Your Monthly Payment Components (PITI)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 mb-10">
            <div className="p-4 rounded-xl bg-white border border-border-subtle">
              <strong className="text-navy-midnight block text-base font-heading mb-1">
                Principal & Interest (P&I)
              </strong>
              The principal pays down your original loan balance, while interest compensates the lender. In the early years, the majority of your payment covers interest.
            </div>
            <div className="p-4 rounded-xl bg-white border border-border-subtle">
              <strong className="text-navy-midnight block text-base font-heading mb-1">
                Taxes & Insurance (T&I)
              </strong>
              Collected monthly into an escrow impound account so your loan servicer can pay your county property tax bill and homeowners insurance policy on time.
            </div>
          </div>

          <h3 className="font-heading font-bold text-xl text-navy-midnight mb-4">
            Payment Calculation FAQs
          </h3>
          <Accordion items={calcFaqs} />
        </div>
      </Container>
    </div>
  );
}
