import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VonkMasterCalculatorSuite } from "@/components/calculators/VonkMasterCalculatorSuite";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Mortgage Refinance Calculator | Break-Even Period & Monthly Savings",
  description:
    "Compare your current mortgage terms against new market rates. Calculate monthly savings, closing cost break-even timeline, and cash-out equity.",
};

const refiFaqs = [
  {
    question: "What is a break-even period in mortgage refinancing?",
    answer: "The break-even period is the number of months required for your monthly mortgage savings to fully offset the upfront closing costs of the new loan. Formula: Break-Even (Months) = Total Refinance Closing Costs / Monthly Payment Savings.",
  },
  {
    question: "Is refinancing worth it for a 0.5% rate reduction?",
    answer: "It depends on your loan balance and how long you plan to stay in the home. On a $400,000 mortgage, a 0.5% rate drop saves roughly $125 to $140 per month. If closing costs are $3,500, your break-even period is roughly 25 to 28 months.",
  },
  {
    question: "Can I take cash out without paying closing costs upfront?",
    answer: "Yes. You can roll all closing costs and title fees into the new loan balance, meaning you bring $0 cash to closing.",
  },
];

export default function RefinanceCalculatorPage() {
  return (
    <div className="py-12 bg-ivory-warm min-h-screen">
      <Container>
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl mb-12">
          <Suspense fallback={<div className="p-16 text-center text-slate-500">Loading calculator suite...</div>}>
            <VonkMasterCalculatorSuite initialTab="refi" />
          </Suspense>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-navy-midnight mb-4">
            When Does Refinancing Make Sense?
          </h2>
          <Accordion items={refiFaqs} />
        </div>
      </Container>
    </div>
  );
}
