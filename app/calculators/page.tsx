import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config/siteConfig";
import {
  VonkMasterCalculatorSuite,
  CalculatorTab,
} from "@/components/calculators/VonkMasterCalculatorSuite";

export const metadata: Metadata = {
  title: "Interactive Mortgage Calculator Suite | All-in-One Loan Scenarios",
  description:
    "Explore our complete multi-tab interactive mortgage calculator suite: Purchase, Affordability, Refinance, Rent vs Buy, VA Loans, DSCR Investor financing, and Fix & Flip modeling.",
};

export default function CalculatorsOverviewPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const tab = (searchParams.tab as CalculatorTab) || "dscr";

  return (
    <div className="bg-ivory-warm min-h-screen pb-20">
      {/* 1. High-Impact Photographic & Editorial Hero Section */}
      <section className="relative bg-navy-midnight text-white py-16 lg:py-24 overflow-hidden border-b border-navy-light/40">
        {/* Photographic Background with Controlled Vignette */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
            alt="Financial calculations and modern architectural planning"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight via-navy-midnight/95 to-navy-midnight/80" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 7 cols: Narrative & Trust Points */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy-light/40 border border-brass/40 text-brass text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>2026 Direct Lending Precision Engine</span>
                <span className="text-slate-500">•</span>
                <span>NMLS #{siteConfig.brand.nmlsId}</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-5xl text-white tracking-tight leading-tight">
                Empower Your Decisions with Precision Mortgage Modeling.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Accurately forecast your monthly PITI payments, full 30-year amortization curves, refinance break-even dates, and maximum purchasing power across all conforming and government loan programs. 100% free, private, and zero impact on your credit score.
              </p>

              {/* Trust Badges Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brass/20 text-brass flex items-center justify-center font-bold text-xs flex-shrink-0">✓</span>
                  <span>Principal, Interest, Taxes & Insurance (PITI)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brass/20 text-brass flex items-center justify-center font-bold text-xs flex-shrink-0">✓</span>
                  <span>Full 360-Month Amortization Schedules</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brass/20 text-brass flex items-center justify-center font-bold text-xs flex-shrink-0">✓</span>
                  <span>Cancellable PMI & FHA MIP Calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brass/20 text-brass flex items-center justify-center font-bold text-xs flex-shrink-0">✓</span>
                  <span>Zero SSN or Contact Info Required to Calculate</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#calculator-workstation"
                  className="inline-flex items-center justify-center font-bold text-sm sm:text-base px-6 py-3.5 rounded-lg bg-brass text-navy-deep hover:bg-brass-hover transition-colors shadow-md"
                >
                  Explore Calculator Models ↓
                </a>
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg border border-slate-500 text-white hover:bg-white/10 transition-colors"
                >
                  Get Instant Rate Quote →
                </Link>
              </div>
            </div>

            {/* Right 5 cols: 2026 Underwriting Reference Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-floating text-navy-midnight space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brass-dark block">
                      Underwriting Benchmarks
                    </span>
                    <h3 className="font-heading font-black text-lg text-navy-midnight">
                      2026 National Lending Limits
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Live Standards
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-ivory-warm border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-600 block">Baseline Conforming Cap</span>
                      <span className="text-[11px] text-slate-400">FHFA Single-Family Standard</span>
                    </div>
                    <span className="font-heading font-black text-base text-navy-midnight">$806,495</span>
                  </div>

                  <div className="p-3 rounded-xl bg-ivory-warm border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-600 block">Minimum Down Payment</span>
                      <span className="text-[11px] text-slate-400">Conventional 3% • FHA 3.5% • VA 0%</span>
                    </div>
                    <span className="font-heading font-black text-base text-navy-midnight">0% - 3.5%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-ivory-warm border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-600 block">Clear-to-Close Speed</span>
                      <span className="text-[11px] text-slate-400">In-House Direct Underwriting</span>
                    </div>
                    <span className="font-heading font-black text-base text-navy-midnight">19 Days Avg.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-ivory-warm border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-600 block">Credit Check Requirement</span>
                      <span className="text-[11px] text-slate-400">Online Financial Planning</span>
                    </div>
                    <span className="font-heading font-black text-base text-emerald-600">$0 / Soft Only</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 text-center leading-relaxed">
                  Direct correspondent lending desk with zero retail broker commission markups.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Calculator Suite Container */}
      <section className="py-12 sm:py-16" id="calculator-workstation">
        <Container>
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
            <Suspense fallback={<div className="p-16 text-center text-slate-500">Loading calculator suite...</div>}>
              <VonkMasterCalculatorSuite initialTab={tab} />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* Regulatory Notice */}
      <section className="pt-2 text-xs text-slate-500 text-center">
        <Container size="narrow">
          <p className="leading-relaxed">
            All calculations provided by Northstar Mortgage are for illustrative and planning purposes only. Loan approval, interest rates, and final terms are subject to verified underwriter review of income, assets, property appraisal, and credit qualifications. Equal Housing Opportunity Lender.
          </p>
        </Container>
      </section>
    </div>
  );
}
