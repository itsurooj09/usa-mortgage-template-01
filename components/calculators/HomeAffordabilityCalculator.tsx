"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateAffordability, AffordabilityResult } from "@/lib/calculations/affordability";
import { CurrencyInput, PercentageInput, Select } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";
import { exportMortgageReport } from "@/lib/exportReport";

export function HomeAffordabilityCalculator() {
  const [borrowerIncome, setBorrowerIncome] = useState(115000);
  const [coBorrowerIncome, setCoBorrowerIncome] = useState(0);
  const [monthlyDebts, setMonthlyDebts] = useState(650);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [annualInsurance, setAnnualInsurance] = useState(1400);
  const [monthlyHoa, setMonthlyHoa] = useState(0);
  const [selectedTier, setSelectedTier] = useState<"conservative" | "moderate" | "aggressive">("moderate");
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("monthly");

  const result: AffordabilityResult = useMemo(() => {
    return calculateAffordability({
      annualIncome: borrowerIncome,
      coBorrowerAnnualIncome: coBorrowerIncome,
      monthlyDebts,
      downPayment,
      interestRate,
      loanTermYears,
      annualPropertyTaxRate: propertyTaxRate,
      annualHomeInsurance: annualInsurance,
      monthlyHoa,
    });
  }, [
    borrowerIncome,
    coBorrowerIncome,
    monthlyDebts,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    annualInsurance,
    monthlyHoa,
  ]);

  const activeTier = result.tiers[selectedTier];
  const multiplier = viewMode === "yearly" ? 12 : 1;

  const handleReset = () => {
    setBorrowerIncome(115000);
    setCoBorrowerIncome(0);
    setMonthlyDebts(650);
    setDownPayment(60000);
    setInterestRate(6.5);
    setLoanTermYears(30);
    setPropertyTaxRate(1.2);
    setAnnualInsurance(1400);
    setMonthlyHoa(0);
    setSelectedTier("moderate");
  };

  const handleExportPDF = () => {
    exportMortgageReport({
      calculatorName: "Home Purchasing Affordability Analysis",
      generatedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      inputs: [
        { label: "Primary Borrower Annual Income", value: `$${borrowerIncome.toLocaleString()}` },
        { label: "Co-Borrower Annual Income", value: coBorrowerIncome > 0 ? `$${coBorrowerIncome.toLocaleString()}` : "$0" },
        { label: "Total Household Monthly Gross", value: `$${result.grossMonthlyIncome.toLocaleString()}/mo` },
        { label: "Monthly Recurring Debts", value: `$${monthlyDebts.toLocaleString()}/mo` },
        { label: "Available Down Payment", value: `$${downPayment.toLocaleString()}` },
        { label: "Estimated Interest Rate", value: `${interestRate}%` },
        { label: "Underwriting Tier", value: `${activeTier.tierName} (${activeTier.dtiFrontEnd}% / ${activeTier.dtiBackEnd}% DTI)` },
      ],
      results: [
        { label: "Estimated Affordable Purchase Price", value: `$${activeTier.maxPurchasePrice.toLocaleString()}`, isHighlight: true },
        { label: "Maximum Supported Loan Amount", value: `$${activeTier.maxLoanAmount.toLocaleString()}` },
        { label: "Max Monthly Housing Payment", value: `$${activeTier.maxMonthlyHousingPayment.toLocaleString()}/mo` },
        { label: "Estimated Monthly Principal & Interest", value: `$${Math.round(activeTier.estimatedMonthlyPAndI).toLocaleString()}/mo` },
        { label: "Estimated Monthly Property Taxes", value: `$${Math.round(activeTier.estimatedMonthlyTax).toLocaleString()}/mo` },
        { label: "Estimated Monthly Home Insurance", value: `$${Math.round(activeTier.estimatedMonthlyInsurance).toLocaleString()}/mo` },
        { label: "Estimated Monthly PMI", value: activeTier.estimatedMonthlyPmi > 0 ? `$${activeTier.estimatedMonthlyPmi}/mo` : "$0" },
      ],
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      {/* Utility Bar */}
      <div className="bg-ivory-warm px-6 py-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brass inline-block" />
          <span className="text-xs font-bold uppercase tracking-wider text-navy-midnight">
            Affordability & Purchasing Power Engine
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-slate-500 hover:text-navy-midnight hover:underline"
          >
            ↺ Reset Values
          </button>
          <button
            type="button"
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-border-subtle hover:border-slate-300 text-xs font-bold text-navy-midnight shadow-sm"
          >
            <span>📄 Print / Export PDF</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Household Income */}
            <div className="p-5 rounded-xl bg-white border border-border-subtle shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight pb-2 border-b border-border-subtle flex items-center justify-between">
                <span>1. Household Income & Recurring Debts</span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Gross: ${result.grossMonthlyIncome.toLocaleString()}/mo
                </span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Primary Borrower Annual Income"
                  helperText={`$${Math.round(borrowerIncome / 12).toLocaleString()}/month gross`}
                >
                  <CurrencyInput
                    value={borrowerIncome}
                    onChange={(val) => setBorrowerIncome(val)}
                    min={20000}
                  />
                </FormField>

                <FormField
                  label="Co-Borrower Income (Optional)"
                  optional
                  helperText={coBorrowerIncome > 0 ? `$${Math.round(coBorrowerIncome / 12).toLocaleString()}/month` : "None"}
                >
                  <CurrencyInput
                    value={coBorrowerIncome}
                    onChange={(val) => setCoBorrowerIncome(val)}
                  />
                </FormField>
              </div>

              <FormField
                label="Monthly Debt Obligations"
                helperText="Auto loans, minimum credit card payments, student debt, personal loans"
              >
                <CurrencyInput
                  value={monthlyDebts}
                  onChange={(val) => setMonthlyDebts(val)}
                />
              </FormField>
            </div>

            {/* 2. Down Payment & Financing */}
            <div className="p-5 rounded-xl bg-white border border-border-subtle shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight pb-2 border-b border-border-subtle">
                2. Down Payment & Loan Structure
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="Down Payment ($)">
                  <CurrencyInput
                    value={downPayment}
                    onChange={(val) => setDownPayment(val)}
                  />
                </FormField>

                <FormField label="Interest Rate (%)">
                  <PercentageInput
                    value={interestRate}
                    onChange={(val) => setInterestRate(val)}
                    step={0.125}
                  />
                </FormField>

                <FormField label="Loan Term">
                  <Select
                    value={loanTermYears.toString()}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    options={[
                      { value: "30", label: "30 Years Fixed" },
                      { value: "20", label: "20 Years Fixed" },
                      { value: "15", label: "15 Years Fixed" },
                    ]}
                  />
                </FormField>
              </div>
            </div>

            {/* 3. Underwriting DTI Comfort Level */}
            <div className="p-5 rounded-xl bg-ivory-warm border border-border-subtle space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight">
                  3. DTI Comfort Level & Budget Tolerance
                </h4>
                <span className="text-[11px] font-semibold text-brass-dark">
                  {selectedTier === "conservative" && "Strictest (28/36%)"}
                  {selectedTier === "moderate" && "Conforming (31/43%)"}
                  {selectedTier === "aggressive" && "Max Approval (36/48%)"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {(["conservative", "moderate", "aggressive"] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedTier === tier
                        ? "bg-navy-midnight text-white border-navy-midnight shadow-sm"
                        : "bg-white text-navy-midnight border-border-subtle hover:border-slate-300"
                    }`}
                  >
                    <div className="text-xs font-bold capitalize">{tier}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">
                      {tier === "conservative" && "28/36% DTI"}
                      {tier === "moderate" && "31/43% DTI"}
                      {tier === "aggressive" && "36/48% DTI"}
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <FormField label="Tax Rate">
                  <PercentageInput
                    value={propertyTaxRate}
                    onChange={(v) => setPropertyTaxRate(v)}
                    step={0.1}
                  />
                </FormField>
                <FormField label="Annual Ins.">
                  <CurrencyInput
                    value={annualInsurance}
                    onChange={(v) => setAnnualInsurance(v)}
                  />
                </FormField>
                <FormField label="HOA/mo">
                  <CurrencyInput
                    value={monthlyHoa}
                    onChange={(v) => setMonthlyHoa(v)}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Right Panel: Sticky Live Results Panel (Reference 2 style) */}
          <div className="lg:col-span-5 sticky top-24 bg-ivory-warm rounded-2xl p-6 sm:p-7 border border-border-subtle shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Affordable Purchase Target
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-navy-midnight text-white">
                  {activeTier.tierName} Tier
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-heading text-4xl sm:text-5xl font-black text-navy-midnight tracking-tight">
                  ${activeTier.maxPurchasePrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Supported at {activeTier.dtiFrontEnd}% housing / {activeTier.dtiBackEnd}% total debt ratio.
              </p>

              {/* Monthly payment callout */}
              <div className="my-5 p-4 rounded-xl bg-white border border-border-subtle shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Max Monthly Housing Budget</span>
                  <div className="flex gap-1 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setViewMode("monthly")}
                      className={`px-1.5 py-0.5 rounded ${viewMode === "monthly" ? "bg-navy-midnight text-white" : "text-slate-400"}`}
                    >
                      Mo
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("yearly")}
                      className={`px-1.5 py-0.5 rounded ${viewMode === "yearly" ? "bg-navy-midnight text-white" : "text-slate-400"}`}
                    >
                      Yr
                    </button>
                  </div>
                </div>
                <div className="font-heading font-black text-2xl text-navy-midnight">
                  ${Math.round(activeTier.maxMonthlyHousingPayment * multiplier).toLocaleString()}
                  <span className="text-xs font-normal text-slate-500"> / {viewMode === "monthly" ? "mo" : "yr"}</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Supported Loan Amount:</span>
                  <span className="font-bold text-navy-midnight">
                    ${activeTier.maxLoanAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Your Cash Down Payment:</span>
                  <span className="font-bold text-navy-midnight">
                    ${downPayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Est. Principal & Interest:</span>
                  <span className="font-bold text-navy-midnight">
                    ${Math.round(activeTier.estimatedMonthlyPAndI * multiplier).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Est. Property Taxes & Insurance:</span>
                  <span className="font-bold text-navy-midnight">
                    ${Math.round((activeTier.estimatedMonthlyTax + activeTier.estimatedMonthlyInsurance) * multiplier).toLocaleString()}
                  </span>
                </div>
                {activeTier.estimatedMonthlyPmi > 0 && (
                  <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                    <span className="text-slate-600">Est. Monthly PMI:</span>
                    <span className="font-bold text-amber-700">
                      ${Math.round(activeTier.estimatedMonthlyPmi * multiplier).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <Button
                href={`/get-started?price=${activeTier.maxPurchasePrice}&down=${downPayment}`}
                variant="brass"
                size="md"
                className="w-full text-navy-deep font-bold shadow-sm"
              >
                Pre-Qualify for ${activeTier.maxPurchasePrice.toLocaleString()} →
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 px-6 py-3 border-t border-border-subtle text-[11px] text-slate-500 flex justify-between">
        <span>*Based on underwriting qualifying algorithms. Does not represent a formal commitment to lend under TILA.</span>
        <button type="button" onClick={handleExportPDF} className="font-bold text-navy-midnight hover:underline">
          Export Formal Report ↗
        </button>
      </div>
    </div>
  );
}
