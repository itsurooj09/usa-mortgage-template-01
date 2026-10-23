import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ClosingCostsCalculator } from "@/components/calculators/ClosingCostsCalculator";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Closing Costs Calculator | Cash-to-Close Itemized Estimator",
  description:
    "Estimate your total closing costs, lender fees, title services, transfer taxes, and initial escrow prepaids under CFPB TRID Loan Estimate guidelines.",
};

const closingFaqs = [
  {
    question: "What is the difference between closing costs and prepaids?",
    answer: "Closing costs are one-time administrative and legal fees paid to lenders, title companies, and county governments to process and record your mortgage. Prepaids are not fees; they are advance payments of your own property taxes and homeowners insurance policy placed into an escrow reserve account so your loan servicer can pay your annual bills on your behalf.",
  },
  {
    question: "Can the seller pay my closing costs?",
    answer: "Yes, via seller concessions negotiated in your purchase contract. Conventional guidelines permit up to 3% seller concessions with less than 10% down, and FHA/USDA guidelines permit up to 6%.",
  },
  {
    question: "What is cash-to-close?",
    answer: "Cash-to-close is the total liquid funds you must bring to the title company or closing attorney on closing day. Formula: Cash to Close = Down Payment + Net Closing Costs - Earnest Money Deposit.",
  },
];

export default function ClosingCostsPage() {
  return (
    <div className="py-12 bg-ivory-warm min-h-screen">
      <Container>
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
            Itemized Estimator
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight mt-1">
            Closing Costs & Cash-to-Close Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Model itemized lender origination fees, appraisal, title services, transfer taxes, and initial escrow reserves under standard CFPB Loan Estimate sections A through H.
          </p>
        </div>

        <ClosingCostsCalculator />

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-navy-midnight mb-4">
            Understanding Your Loan Estimate Sections
          </h2>
          <Accordion items={closingFaqs} />
        </div>
      </Container>
    </div>
  );
}
