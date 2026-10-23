import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VonkMasterCalculatorSuite } from "@/components/calculators/VonkMasterCalculatorSuite";
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
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl mb-12">
          <Suspense fallback={<div className="p-16 text-center text-slate-500">Loading calculator suite...</div>}>
            <VonkMasterCalculatorSuite initialTab="purchase" />
          </Suspense>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-navy-midnight mb-4">
            Understanding Your Loan Estimate Sections
          </h2>
          <Accordion items={closingFaqs} />
        </div>
      </Container>
    </div>
  );
}
