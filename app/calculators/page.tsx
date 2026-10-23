import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Mortgage Calculators Suite | 7 Interactive Financial Tools",
  description:
    "Explore our complete suite of 7 verified mortgage calculators: Payment, Affordability, Refinance, FHA, VA, Closing Costs, and Debt-to-Income.",
};

const calculatorsList = [
  {
    title: "Mortgage Payment Calculator",
    href: "/calculators/mortgage-payment",
    category: "Payment & Amortization",
    description:
      "Estimate complete PITI monthly payment: Principal & Interest, Property Taxes, Homeowners Insurance, cancellable PMI, and HOA dues. Includes full annual amortization schedule.",
    keyMetrics: ["Full PITI Breakdown", "Annual Amortization Table", "Cancellable PMI Check"],
  },
  {
    title: "Home Affordability Calculator",
    href: "/calculators/home-affordability",
    category: "Budgeting & Purchasing Power",
    description:
      "Determine your maximum comfortable home purchase price based on gross annual income, recurring monthly debt obligations, and down payment funds across 3 underwriting tiers.",
    keyMetrics: ["Conservative / Moderate / Aggressive Tiers", "Front & Back DTI Analysis", "Max Loan Capacity"],
  },
  {
    title: "Refinance Calculator",
    href: "/calculators/refinance",
    category: "Equity & Savings",
    description:
      "Compare your current mortgage terms against proposed new market rates. Calculates monthly savings, lifetime interest reduction, and exact break-even recoup months.",
    keyMetrics: ["Monthly Payment Savings", "Break-Even Recoup Period", "Cash-Out Equity Option"],
  },
  {
    title: "FHA Loan Calculator",
    href: "/calculators/fha",
    category: "Government Programs",
    description:
      "Model Federal Housing Administration financing with 3.5% down payment. Calculates 1.75% Upfront Mortgage Insurance Premium (UFMIP) and monthly annual MIP.",
    keyMetrics: ["3.5% Down Payment", "1.75% Financed UFMIP", "HUD 2023-05 MIP Tiers"],
  },
  {
    title: "VA Loan Calculator",
    href: "/calculators/va",
    category: "Military Benefits",
    description:
      "Explore 100% financing for US military servicemembers and veterans. Calculates VA Funding Fee tiers, disability exemptions (0% fee), and zero monthly PMI benefit.",
    keyMetrics: ["0% Down Payment", "$0 Monthly PMI", "Service Disability Fee Waiver"],
  },
  {
    title: "Closing Costs Calculator",
    href: "/calculators/closing-costs",
    category: "Cash Requirements",
    description:
      "Itemized estimation of Loan Estimate fees: lender origination, appraisal, third-party title and settlement, county transfer taxes, and initial prepaid escrow reserves.",
    keyMetrics: ["Itemized Fee Breakdown", "Prepaids & Escrow Reserves", "Total Cash to Close"],
  },
  {
    title: "Debt-to-Income (DTI) Calculator",
    href: "/calculators/debt-to-income",
    category: "Underwriting & Credit",
    description:
      "Analyze your front-end housing ratio and back-end total debt burden against Fannie Mae, Freddie Mac, and FHA underwriting benchmarks.",
    keyMetrics: ["Front-End Housing Ratio", "Back-End Total Debt Ratio", "Conforming Approval Status"],
  },
];

export default function CalculatorsOverviewPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy-midnight text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Verified Financial Suite
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mt-2 tracking-tight">
              Mortgage Calculators Overview
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Plan your home purchase or refinance with precision. Our 7 interactive calculators utilize verified financial formulas adhering to US CFPB, Fannie Mae, and FHA guidelines.
            </p>
          </div>
        </Container>
      </section>

      {/* Directory Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {calculatorsList.map((calc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-border-subtle p-8 hover:border-slate-300 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="brass" size="sm">{calc.category}</Badge>
                    <span className="text-xs font-bold text-navy-midnight">0{idx + 1}</span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-navy-midnight mt-1">
                    {calc.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {calc.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-border-subtle space-y-1.5">
                    {calc.keyMetrics.map((km, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{km}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between">
                  <Link
                    href={calc.href}
                    className="font-bold text-sm text-navy-midnight hover:text-brass flex items-center gap-1"
                  >
                    <span>Launch Calculator</span>
                    <span>→</span>
                  </Link>
                  <Button
                    href="/get-started"
                    variant="brass"
                    size="sm"
                    className="text-xs font-bold text-navy-deep"
                  >
                    Get Pre-Approved
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
