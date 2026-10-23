import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HomeAffordabilityCalculator } from "@/components/calculators/HomeAffordabilityCalculator";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Home Affordability Calculator | How Much House Can I Afford?",
  description:
    "Estimate your maximum home purchase price based on gross annual income, recurring monthly debts, and down payment funds.",
};

const affordabilityFaqs = [
  {
    question: "What is the 28/36 qualifying rule?",
    answer: "The 28/36 rule is a classic underwriting benchmark. It recommends that your total monthly housing payment should not exceed 28% of your gross monthly income (Front-End DTI), and your total monthly debt obligations (housing + car loans, credit cards, student debt) should not exceed 36% (Back-End DTI).",
  },
  {
    question: "How does my down payment influence my affordability limit?",
    answer: "A larger down payment increases your purchasing price in two ways: it directly adds to your cash purchasing power, and it reduces your loan-to-value (LTV) ratio. Reaching 20% down eliminates monthly private mortgage insurance (PMI), freeing up more of your monthly budget for principal and interest.",
  },
  {
    question: "Can I qualify with a higher debt-to-income ratio?",
    answer: "Yes. Many conventional Fannie Mae and Freddie Mac automated underwriting systems approve back-end DTIs up to 45%, and FHA loans can approve up to 50% for borrowers with strong credit scores and cash reserves.",
  },
];

export default function HomeAffordabilityPage() {
  return (
    <div className="py-12 bg-ivory-warm min-h-screen">
      <Container>
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
            Interactive Calculator
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight mt-1">
            Home Affordability Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Discover how much home you can comfortably afford. We calculate your purchasing power across Conservative (28/36%), Moderate (31/43%), and Aggressive (36/48%) underwriting tiers.
          </p>
        </div>

        <HomeAffordabilityCalculator />

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-navy-midnight mb-4">
            Affordability & Debt-to-Income Guidelines
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Underwriters evaluate what you can borrow using strict ratios, but your personal comfort level is what matters most. Always choose a monthly housing payment that preserves room for retirement savings, family emergency funds, and leisure.
          </p>
          <Accordion items={affordabilityFaqs} />
        </div>
      </Container>
    </div>
  );
}
