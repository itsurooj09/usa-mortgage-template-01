import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VaLoanCalculator } from "@/components/calculators/VaLoanCalculator";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "VA Loan Calculator | 0% Down, Funding Fee Tiers & $0 PMI",
  description:
    "Model your VA home loan payment with 0% down, funding fee calculations, disability fee exemptions, and zero monthly PMI benefit for military veterans.",
};

const vaFaqs = [
  {
    question: "Do VA loans require monthly private mortgage insurance (PMI)?",
    answer: "No. One of the single greatest benefits of a VA mortgage is that you never pay monthly PMI or MIP, regardless of putting 0% down payment. This saves military families between $150 and $350 every single month.",
  },
  {
    question: "Who is exempt from the VA Funding Fee?",
    answer: "Veterans receiving VA compensation for a service-connected disability, veterans entitled to disability compensation who receive active-duty retirement pay, and surviving spouses receiving Dependency and Indemnity Compensation (DIC) are 100% exempt from the VA funding fee.",
  },
  {
    question: "Can the VA Funding Fee be rolled into the loan balance?",
    answer: "Yes, 100% of the funding fee can be financed directly into your total loan amount so you bring zero cash out-of-pocket to closing.",
  },
];

export default function VaLoanCalculatorPage() {
  return (
    <div className="py-12 bg-ivory-warm min-h-screen">
      <Container>
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
            Military Benefit Tool
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight mt-1">
            VA Loan Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Calculate your monthly payment with zero down payment, funding fee tiers, service-connected disability fee exemptions, and $0 monthly PMI.
          </p>
        </div>

        <VaLoanCalculator />

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-navy-midnight mb-4">
            VA Financing Guidelines & Entitlement
          </h2>
          <Accordion items={vaFaqs} />
        </div>
      </Container>
    </div>
  );
}
