import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { currentRates, rateMetadata } from "@/content/rates";
import { ContextualLeadForm } from "@/components/forms/ContextualLeadForm";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Current USA Mortgage Rates & APRs | Benchmark Market Averages",
  description:
    "View current 30-year fixed, 15-year fixed, FHA, VA, and Jumbo mortgage rates. Dated weekly benchmarks with APRs and custom rate quotes.",
};

export default function MortgageRatesPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy-midnight text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light text-brass text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Effective Date: {rateMetadata.asOfDate}</span>
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
              Current Mortgage Rates & APRs
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Transparent, dated benchmark interest rates and Annual Percentage Rates (APRs) sourced from national survey feeds and our direct lending desk.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Rates Table & Quick Quote Layout */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Rates Table Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
                <div>
                  <h2 className="font-heading font-bold text-xl text-navy-midnight">
                    National Weekly Benchmark Rates
                  </h2>
                  <p className="text-xs text-slate-500">
                    Source: {rateMetadata.source} • Conforming Baseline Limit: ${rateMetadata.conformingBaselineLimit.toLocaleString()}
                  </p>
                </div>
                <div className="text-xs text-slate-500">
                  Updated: <strong className="text-navy-midnight">{rateMetadata.asOfDate}</strong>
                </div>
              </div>

              {/* Responsive Rate Card Grid / Table */}
              <div className="overflow-x-auto border border-border-subtle rounded-xl shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-navy-midnight text-white">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Loan Program</th>
                      <th className="py-3 px-4 font-semibold text-right">Interest Rate</th>
                      <th className="py-3 px-4 font-semibold text-right">APR</th>
                      <th className="py-3 px-4 font-semibold text-right hidden sm:table-cell">Points</th>
                      <th className="py-3 px-4 font-semibold text-right hidden md:table-cell">7-Day Trend</th>
                      <th className="py-3 px-4 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle text-slate-700">
                    {currentRates.map((tier) => (
                      <tr key={tier.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-navy-midnight text-sm">
                            {tier.program}
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {tier.termYears}-Year Term • {tier.downPaymentPercent}% Min. Down
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-black font-heading text-base text-navy-midnight">
                          {tier.rate.toFixed(2)}%
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-brass-dark text-sm">
                          {tier.apr.toFixed(2)}%
                        </td>
                        <td className="py-3.5 px-4 text-right text-slate-600 hidden sm:table-cell">
                          {tier.points} pts
                        </td>
                        <td className="py-3.5 px-4 text-right hidden md:table-cell">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              tier.change7d < 0
                                ? "bg-emerald-50 text-emerald-700"
                                : tier.change7d > 0
                                ? "bg-red-50 text-red-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {tier.change7d < 0 ? `▼ ${Math.abs(tier.change7d)}%` : tier.change7d > 0 ? `▲ +${tier.change7d}%` : "— 0.00%"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Link
                            href={`/get-started?program=${tier.id}`}
                            className="inline-block px-3 py-1.5 rounded bg-brass text-navy-deep font-bold text-xs hover:bg-brass-hover transition-colors shadow-sm"
                          >
                            Lock Rate
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Explanatory Assumptions & Mandatory Disclosures */}
              <div className="p-5 rounded-xl bg-ivory-warm border border-border-subtle text-xs text-slate-600 leading-relaxed space-y-3">
                <h3 className="font-bold text-navy-midnight text-sm">
                  Rate Calculation Assumptions & Disclosures
                </h3>
                <p>
                  {rateMetadata.disclaimer}
                </p>
                <p>
                  <strong>APR (Annual Percentage Rate) Explanation:</strong> APR reflects the true annual cost of credit, including the nominal interest rate, lender origination points, processing fees, and mandatory prepaid financing charges. The payment on a $400,000 30-year fixed conforming loan at 6.42% interest rate (6.55% APR) with 20% down payment is approximately $2,507 per month (principal and interest only).
                </p>
                <p className="text-[11px] text-slate-400">
                  {siteConfig.disclosures.licensingDisclaimer}
                </p>
              </div>
            </div>

            {/* Sidebar Contextual Lead Form */}
            <div className="lg:col-span-4">
              <ContextualLeadForm
                headline="Request a Custom Rate Quote"
                subheadline="Get an exact rate quote based on your credit score and target property."
                sourceCampaign="Rates Page Quote"
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
