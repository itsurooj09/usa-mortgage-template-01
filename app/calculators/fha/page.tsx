import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VonkMasterCalculatorSuite } from "@/components/calculators/VonkMasterCalculatorSuite";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "FHA Loan Calculator | 3.5% Down & Upfront/Annual MIP",
  description:
    "Calculate FHA monthly mortgage payments with 3.5% down, 1.75% Upfront MIP, and HUD Mortgagee Letter annual MIP rates.",
};

const fhaFaqs = [
  {
    question: "What is the difference between Upfront MIP and Annual MIP?",
    answer: "Upfront MIP (UFMIP) is a one-time charge of 1.75% of your base loan amount, which is financed directly into the mortgage balance at closing. Annual MIP is an ongoing insurance premium (typically 0.55% of the loan amount annually) divided into 12 equal monthly installments added to your mortgage bill.",
  },
  {
    question: "Can FHA mortgage insurance ever be removed?",
    answer: "Under HUD rules, if you put down less than 10%, FHA annual MIP remains for the life of the loan. However, once you accumulate 20% equity through market appreciation and principal reduction, you can refinance into a conventional mortgage to eliminate mortgage insurance entirely.",
  },
  {
    question: "What is the minimum down payment for an FHA loan?",
    answer: "Borrowers with a credit score of 580 or higher qualify for the minimum 3.5% down payment. Borrowers with credit scores between 500 and 579 require a 10% down payment.",
  },
];

export default function FhaLoanCalculatorPage() {
  return (
    <div className="py-12 bg-ivory-warm min-h-screen">
      <Container>
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl mb-12">
          <Suspense fallback={<div className="p-16 text-center text-slate-500">Loading calculator suite...</div>}>
            <VonkMasterCalculatorSuite initialTab="afford" />
          </Suspense>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-navy-midnight mb-4">
            FHA Mortgage Insurance Essentials
          </h2>
          <Accordion items={fhaFaqs} />
        </div>
      </Container>
    </div>
  );
}
