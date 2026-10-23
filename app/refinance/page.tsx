import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { RefinanceCalculator } from "@/components/calculators/RefinanceCalculator";
import { ContextualLeadForm } from "@/components/forms/ContextualLeadForm";

export const metadata: Metadata = {
  title: "Refinance Your Mortgage | Rate Reduction & Cash-Out Equity",
  description:
    "Optimize your existing home financing. Lower monthly payments, eliminate PMI, or access home equity in cash with transparent break-even advisory.",
};

export default function RefinancePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-midnight text-white py-16 lg:py-24 relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brass">
                Mortgage Refinance Advisory
              </span>
              <h1 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                Put Your Home Equity to Work with Precision Refinancing.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Whether you want to lower your monthly interest rate, eliminate costly PMI, shorten your term to retire debt-free, or access cash for home renovations, our advisors calculate your exact break-even timeline down to the penny.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Button href="/get-started?purpose=refinance" variant="brass" size="lg" className="font-bold text-navy-deep">
                  Calculate Refinance Savings →
                </Button>
                <Button href="/calculators/refinance" variant="outline" size="lg" className="border-slate-500 text-white">
                  Interactive Refinance Tool
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ContextualLeadForm
                defaultLoanPurpose="refinance"
                headline="Check Refinance Rates"
                subheadline="Compare your current mortgage rate against today's market benchmarks."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Refinance Strategies */}
      <section className="py-20 bg-ivory-warm border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Refinance Goals"
            title="Strategic Financial Objectives"
            subtitle="Explore how restructuring your loan terms delivers tangible monthly and lifetime benefits."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-7 border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-brass/15 text-navy-midnight font-bold flex items-center justify-center text-lg mb-4">
                  ↓$
                </div>
                <h3 className="font-heading font-bold text-xl text-navy-midnight">
                  Lower Monthly Payments
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Reduce your interest rate or extend your loan duration to immediately increase monthly disposable cash flow.
                </p>
              </div>
              <Link href="/loan-options/rate-and-term-refinance" className="mt-6 text-xs font-bold text-navy-midnight hover:text-brass">
                Rate-and-Term Refinance →
              </Link>
            </div>

            <div className="bg-white rounded-xl p-7 border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-brass/15 text-navy-midnight font-bold flex items-center justify-center text-lg mb-4">
                  $$$
                </div>
                <h3 className="font-heading font-bold text-xl text-navy-midnight">
                  Cash-Out Home Equity
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Convert accrued home equity into liquid capital to consolidate high-interest credit cards or fund extensive home additions.
                </p>
              </div>
              <Link href="/loan-options/cash-out-refinance" className="mt-6 text-xs font-bold text-navy-midnight hover:text-brass">
                Cash-Out Refinance Guide →
              </Link>
            </div>

            <div className="bg-white rounded-xl p-7 border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-brass/15 text-navy-midnight font-bold flex items-center justify-center text-lg mb-4">
                  ⏱
                </div>
                <h3 className="font-heading font-bold text-xl text-navy-midnight">
                  Shorten Term to 15 Years
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Switch from a 30-year to a 15-year fixed mortgage to pay off your home 15 years earlier and save tens of thousands in interest.
                </p>
              </div>
              <Link href="/calculators/refinance" className="mt-6 text-xs font-bold text-navy-midnight hover:text-brass">
                Model 15-Year Savings →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Refinance Calculator Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mb-10">
            <SectionHeading
              eyebrow="Interactive Tool"
              title="Calculate Your Break-Even Period"
              subtitle="Enter your current loan terms and proposed new rates to see monthly savings, closing cost recoup time, and lifetime interest reductions."
            />
          </div>
          <RefinanceCalculator />
        </Container>
      </section>
    </div>
  );
}
