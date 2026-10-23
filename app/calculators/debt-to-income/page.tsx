import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VonkMasterCalculatorSuite } from "@/components/calculators/VonkMasterCalculatorSuite";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Debt-to-Income (DTI) Calculator | Front-End & Back-End Ratios",
  description:
    "Analyze your Front-End (housing) and Back-End (total debt) DTI ratios against Fannie Mae, Freddie Mac, FHA, and VA underwriting guidelines.",
};

const dtiFaqs = [
  {
    question: "What is the difference between Front-End DTI and Back-End DTI?",
    answer: "Front-End DTI calculates the percentage of your gross monthly income dedicated solely to your proposed housing costs (PITI + HOA). Back-End DTI calculates the percentage of your gross monthly income required to pay all recurring debt obligations combined (housing costs plus car loans, student loans, credit card minimums, and personal loans).",
  },
  {
    question: "What is the maximum allowed DTI ratio for a conventional mortgage?",
    answer: "Under Fannie Mae and Freddie Mac automated underwriting (Desktop Underwriter / Loan Product Advisor), the standard conforming threshold is 43% to 45%. Borrowers with strong compensating factors (740+ credit scores, 6+ months of reserves, and 20%+ equity) can sometimes receive approval up to 50%.",
  },
  {
    question: "How can I lower my DTI before applying for a mortgage?",
    answer: "You can lower your DTI by paying off small revolving credit card balances, paying down installment loans with 10 or fewer payments remaining, or adding a qualifying co-borrower to your mortgage application.",
  },
];

export default function DtiCalculatorPage() {
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
            Underwriting Benchmarks & Guidelines
          </h2>
          <Accordion items={dtiFaqs} />
        </div>
      </Container>
    </div>
  );
}
