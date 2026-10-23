import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { loanProducts } from "@/content/loans";

export const metadata: Metadata = {
  title: "Mortgage Loan Programs Directory | All 11 Financing Options",
  description:
    "Compare all 11 loan products offered by Northstar Mortgage: Conventional, FHA, VA, USDA, Jumbo, First-Time Buyer, Fixed, ARM, Cash-Out, Rate & Term, and Reverse Mortgages.",
};

export default function LoanOptionsPage() {
  const categories = ["Home Financing", "Buying a Home", "Refinancing"] as const;

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-midnight text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Loan Programs Directory
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mt-2 tracking-tight">
              Compare All 11 Residential Financing Programs
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Whether you are purchasing your very first single-family home or optimizing a multi-property investment portfolio, explore program guidelines, down payment minimums, and underwriting requirements.
            </p>
          </div>
        </Container>
      </section>

      {/* Categorized Loan Groups */}
      <section className="py-20 bg-white">
        <Container>
          <div className="space-y-16">
            {categories.map((cat) => {
              const loansInCat = loanProducts.filter((l) => l.category === cat);
              return (
                <div key={cat} className="space-y-6">
                  <div className="border-b border-border-subtle pb-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-heading font-bold text-2xl text-navy-midnight">
                        {cat}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {cat === "Home Financing" && "Core conforming, government-backed, and luxury financing options."}
                        {cat === "Buying a Home" && "Specialized loan structures for home purchase timing and budgeting."}
                        {cat === "Refinancing" && "Equity harvesting, rate optimization, and senior mortgage strategies."}
                      </p>
                    </div>
                    <Badge variant="brass" size="sm">
                      {loansInCat.length} Programs
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loansInCat.map((loan) => (
                      <div
                        key={loan.id}
                        className="bg-white rounded-xl border border-border-subtle p-6 hover:border-slate-300 hover:shadow-card transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-brass-dark">
                              Min. Down: {loan.metrics.minDownPayment}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {loan.metrics.creditScoreGuideline} FICO
                            </span>
                          </div>

                          <h3 className="font-heading font-bold text-lg text-navy-midnight">
                            {loan.title}
                          </h3>

                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                            {loan.shortDescription}
                          </p>

                          <div className="mt-4 pt-3 border-t border-border-subtle text-xs space-y-1 text-slate-600">
                            {loan.keyBenefits.slice(0, 2).map((b, i) => (
                              <div key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-600 font-bold">✓</span>
                                <span className="line-clamp-1">{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-border-subtle flex justify-between items-center">
                          <Link
                            href={`/loan-options/${loan.slug}`}
                            className="text-xs font-bold text-navy-midnight hover:text-brass"
                          >
                            Read Full Details →
                          </Link>
                          <Link
                            href={loan.recommendedCalculator.href}
                            className="text-xs text-slate-400 hover:text-navy-midnight"
                          >
                            Calculator
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Advisory Banner */}
      <section className="py-16 bg-ivory-warm border-t border-border-subtle">
        <Container>
          <div className="bg-white rounded-2xl p-8 border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="font-heading font-bold text-2xl text-navy-midnight">
                Need Help Selecting the Right Loan?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Our licensed loan officers analyze your credit score, down payment, and monthly debt ratios to recommend the optimal loan program.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button href="/get-started" variant="brass" size="md" className="font-bold text-navy-deep">
                Start Pre-Approval Survey
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Talk with an Officer
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
