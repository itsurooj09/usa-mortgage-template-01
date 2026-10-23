"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateMortgagePayment, MortgagePaymentResult } from "@/lib/calculations/mortgagePayment";
import { CurrencyInput, PercentageInput, Select } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";
import { exportMortgageReport } from "@/lib/exportReport";

export function MortgagePaymentCalculator({
  defaultPrice = 450000,
  defaultDownPayment = 90000,
  defaultRate = 6.5,
  defaultTerm = 30,
}: {
  defaultPrice?: number;
  defaultDownPayment?: number;
  defaultRate?: number;
  defaultTerm?: number;
}) {
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(defaultDownPayment);
  const [interestRate, setInterestRate] = useState(defaultRate);
  const [loanTermYears, setLoanTermYears] = useState(defaultTerm);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [annualInsurance, setAnnualInsurance] = useState(1400);
  const [monthlyHoa, setMonthlyHoa] = useState(0);

  // View state: Monthly vs Yearly toggle
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("monthly");
  const [showAmortization, setShowAmortization] = useState(false);

  const downPaymentPercent = homePrice > 0 ? Math.round((downPayment / homePrice) * 100) : 0;

  const result: MortgagePaymentResult = useMemo(() => {
    return calculateMortgagePayment({
      homePrice,
      downPayment,
      interestRate,
      loanTermYears,
      annualPropertyTax: (homePrice * propertyTaxRate) / 100,
      annualHomeInsurance: annualInsurance,
      monthlyHoa,
      pmiRate: 0.55,
    });
  }, [homePrice, downPayment, interestRate, loanTermYears, propertyTaxRate, annualInsurance, monthlyHoa]);

  const multiplier = viewMode === "yearly" ? 12 : 1;
  const displayTotal = Math.round(result.totalMonthlyPayment * multiplier);
  const displayPAndI = Math.round(result.monthlyPrincipalAndInterest * multiplier);
  const displayTax = Math.round(result.monthlyPropertyTax * multiplier);
  const displayIns = Math.round(result.monthlyHomeInsurance * multiplier);
  const displayPmi = Math.round(result.monthlyPmi * multiplier);
  const displayHoa = Math.round(result.monthlyHoa * multiplier);

  // Progress bar percentages
  const pAndIPct = result.totalMonthlyPayment > 0 ? (result.monthlyPrincipalAndInterest / result.totalMonthlyPayment) * 100 : 0;
  const taxPct = result.totalMonthlyPayment > 0 ? (result.monthlyPropertyTax / result.totalMonthlyPayment) * 100 : 0;
  const insPct = result.totalMonthlyPayment > 0 ? (result.monthlyHomeInsurance / result.totalMonthlyPayment) * 100 : 0;
  const pmiPct = result.totalMonthlyPayment > 0 ? (result.monthlyPmi / result.totalMonthlyPayment) * 100 : 0;
  const hoaPct = result.totalMonthlyPayment > 0 ? (result.monthlyHoa / result.totalMonthlyPayment) * 100 : 0;

  const handleReset = () => {
    setHomePrice(defaultPrice);
    setDownPayment(defaultDownPayment);
    setInterestRate(defaultRate);
    setLoanTermYears(defaultTerm);
    setPropertyTaxRate(1.2);
    setAnnualInsurance(1400);
    setMonthlyHoa(0);
  };

  const handleExportPDF = () => {
    exportMortgageReport({
      calculatorName: "Mortgage Payment & Amortization Calculation",
      generatedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      inputs: [
        { label: "Home Purchase Price", value: `$${homePrice.toLocaleString()}` },
        { label: "Down Payment", value: `$${downPayment.toLocaleString()} (${downPaymentPercent}%)` },
        { label: "Total Loan Amount", value: `$${result.loanAmount.toLocaleString()}` },
        { label: "Interest Rate (APR)", value: `${interestRate}%` },
        { label: "Loan Duration (Term)", value: `${loanTermYears} Years Fixed` },
        { label: "Annual Property Tax Rate", value: `${propertyTaxRate}% ($${Math.round(result.monthlyPropertyTax * 12).toLocaleString()}/yr)` },
        { label: "Annual Homeowners Insurance", value: `$${annualInsurance.toLocaleString()}/yr` },
        { label: "Monthly HOA Dues", value: `$${monthlyHoa.toLocaleString()}/mo` },
      ],
      results: [
        { label: "Total Monthly Payment (PITI)", value: `$${Math.round(result.totalMonthlyPayment).toLocaleString()}/mo`, isHighlight: true },
        { label: "Principal & Interest Payment", value: `$${Math.round(result.monthlyPrincipalAndInterest).toLocaleString()}/mo` },
        { label: "Property Taxes (Escrow)", value: `$${Math.round(result.monthlyPropertyTax).toLocaleString()}/mo` },
        { label: "Homeowners Insurance (Escrow)", value: `$${Math.round(result.monthlyHomeInsurance).toLocaleString()}/mo` },
        { label: "Private Mortgage Insurance (PMI)", value: result.monthlyPmi > 0 ? `$${Math.round(result.monthlyPmi)}/mo` : "$0 (≥20% Equity)" },
        { label: "HOA Fees", value: `$${Math.round(result.monthlyHoa)}/mo` },
        { label: "Total Interest Paid Over Term", value: `$${Math.round(result.totalInterestPaid).toLocaleString()}` },
        { label: "Total Lifetime Cost of Loan", value: `$${Math.round(result.totalCostOfLoan).toLocaleString()}` },
      ],
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      {/* Top Utility Header */}
      <div className="bg-ivory-warm px-6 py-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brass inline-block" />
          <span className="text-xs font-bold uppercase tracking-wider text-navy-midnight">
            Professional Financial Workstation
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-slate-500 hover:text-navy-midnight hover:underline flex items-center gap-1"
          >
            <span>↺ Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-border-subtle hover:border-slate-300 text-xs font-bold text-navy-midnight shadow-sm transition-colors"
          >
            <span>📄 Print / Export PDF</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Panel: Grouped Form Inputs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Group 1: Purchase & Down Payment */}
            <div className="p-5 rounded-xl bg-white border border-border-subtle shadow-sm space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight pb-2 border-b border-border-subtle flex items-center justify-between">
                <span>1. Property Value & Down Payment</span>
                <span className="text-[11px] font-normal text-slate-400">Step 1 of 2</span>
              </h4>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-navy-dark">
                    Purchase Price
                  </label>
                  <span className="font-heading font-black text-lg text-navy-midnight">
                    ${homePrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={2500000}
                  step={5000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full accent-navy-midnight cursor-pointer"
                />
                <div className="mt-2">
                  <CurrencyInput
                    value={homePrice}
                    onChange={(val) => setHomePrice(val)}
                    min={20000}
                  />
                </div>
              </div>

              {/* Down Payment Dual Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-navy-dark">
                      Down Payment ($)
                    </label>
                    <span className="text-xs font-bold text-brass-dark">{downPaymentPercent}%</span>
                  </div>
                  <CurrencyInput
                    value={downPayment}
                    onChange={(val) => setDownPayment(val)}
                    max={homePrice}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-navy-dark block mb-1">
                    Quick Down Payment Presets
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[3, 5, 10, 20].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setDownPayment(Math.round((homePrice * pct) / 100))}
                        className={`flex-1 py-2 text-xs font-semibold rounded border transition-colors ${
                          downPaymentPercent === pct
                            ? "bg-navy-midnight text-white border-navy-midnight shadow-sm"
                            : "bg-ivory-warm text-navy-dark border-border-subtle hover:border-slate-300"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Group 2: Interest Rate & Loan Term */}
            <div className="p-5 rounded-xl bg-white border border-border-subtle shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight pb-2 border-b border-border-subtle flex items-center justify-between">
                <span>2. Interest Rate & Loan Duration</span>
                <span className="text-[11px] font-normal text-slate-400">Step 2 of 2</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Interest Rate (%)" helperText="Annual Percentage Rate">
                  <PercentageInput
                    value={interestRate}
                    onChange={(val) => setInterestRate(val)}
                    step={0.125}
                    min={0.5}
                    max={15}
                  />
                </FormField>

                <FormField label="Loan Term">
                  <Select
                    value={loanTermYears.toString()}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    options={[
                      { value: "30", label: "30-Year Fixed Term" },
                      { value: "20", label: "20-Year Fixed Term" },
                      { value: "15", label: "15-Year Fixed Term" },
                      { value: "10", label: "10-Year Fixed Term" },
                    ]}
                  />
                </FormField>
              </div>
            </div>

            {/* Group 3: Taxes, Insurance & Escrows */}
            <div className="p-5 rounded-xl bg-ivory-warm border border-border-subtle space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight pb-2 border-b border-border-subtle flex items-center justify-between">
                <span>3. Property Taxes, Home Insurance & HOA</span>
                <span className="text-[11px] font-semibold text-slate-500">Escrow Items</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="Property Tax Rate">
                  <PercentageInput
                    value={propertyTaxRate}
                    onChange={(val) => setPropertyTaxRate(val)}
                    step={0.1}
                  />
                </FormField>

                <FormField label="Annual Home Insurance">
                  <CurrencyInput
                    value={annualInsurance}
                    onChange={(val) => setAnnualInsurance(val)}
                  />
                </FormField>

                <FormField label="Monthly HOA Dues">
                  <CurrencyInput
                    value={monthlyHoa}
                    onChange={(val) => setMonthlyHoa(val)}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Right Panel: Sticky Live Results Panel */}
          <div className="lg:col-span-5 sticky top-24 bg-ivory-warm rounded-2xl p-6 sm:p-7 border border-border-subtle shadow-card flex flex-col justify-between">
            <div>
              {/* Monthly vs Yearly Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Estimated {viewMode === "monthly" ? "Monthly" : "Annual"} Payment
                </span>
                <div className="flex bg-white rounded-lg p-0.5 border border-border-subtle">
                  <button
                    type="button"
                    onClick={() => setViewMode("monthly")}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      viewMode === "monthly"
                        ? "bg-navy-midnight text-white shadow-xs"
                        : "text-slate-600 hover:text-navy-midnight"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("yearly")}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      viewMode === "yearly"
                        ? "bg-navy-midnight text-white shadow-xs"
                        : "text-slate-600 hover:text-navy-midnight"
                    }`}
                  >
                    Annual
                  </button>
                </div>
              </div>

              {/* Main Total Callout */}
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-4xl sm:text-5xl font-black text-navy-midnight tracking-tight">
                  ${displayTotal.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  / {viewMode === "monthly" ? "month" : "year"}
                </span>
              </div>

              {/* Visual Layered Segmented Bar */}
              <div className="mt-5">
                <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-slate-200 shadow-inner">
                  <div
                    style={{ width: `${pAndIPct}%` }}
                    className="bg-navy-midnight transition-all duration-300"
                    title={`P&I: $${displayPAndI}`}
                  />
                  <div
                    style={{ width: `${taxPct}%` }}
                    className="bg-brass transition-all duration-300"
                    title={`Tax: $${displayTax}`}
                  />
                  <div
                    style={{ width: `${insPct}%` }}
                    className="bg-navy-light transition-all duration-300"
                    title={`Insurance: $${displayIns}`}
                  />
                  {result.monthlyPmi > 0 && (
                    <div
                      style={{ width: `${pmiPct}%` }}
                      className="bg-amber-500 transition-all duration-300"
                      title={`PMI: $${displayPmi}`}
                    />
                  )}
                  {result.monthlyHoa > 0 && (
                    <div
                      style={{ width: `${hoaPct}%` }}
                      className="bg-slate-400 transition-all duration-300"
                      title={`HOA: $${displayHoa}`}
                    />
                  )}
                </div>
              </div>

              {/* Itemized Legend */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-border-subtle/60">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-navy-midnight inline-block" />
                    Principal & Interest
                  </span>
                  <span className="font-bold text-navy-midnight">
                    ${displayPAndI.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-border-subtle/60">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-brass inline-block" />
                    Property Taxes
                  </span>
                  <span className="font-bold text-navy-midnight">
                    ${displayTax.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-border-subtle/60">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-navy-light inline-block" />
                    Homeowners Insurance
                  </span>
                  <span className="font-bold text-navy-midnight">
                    ${displayIns.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-border-subtle/60">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    Private Mortgage Insurance
                  </span>
                  <span className="font-bold text-navy-midnight">
                    {result.monthlyPmi > 0 ? (
                      `$${displayPmi.toLocaleString()}`
                    ) : (
                      <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                        $0 (≥20% Down)
                      </span>
                    )}
                  </span>
                </div>

                {result.monthlyHoa > 0 && (
                  <div className="flex items-center justify-between pb-2 border-b border-border-subtle/60">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                      Monthly HOA
                    </span>
                    <span className="font-bold text-navy-midnight">
                      ${displayHoa.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Loan Summary Totals */}
              <div className="mt-5 pt-4 border-t border-border-subtle grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-border-subtle">
                  <span className="text-slate-400 block">Total Financed</span>
                  <span className="font-black text-navy-midnight text-sm">
                    ${result.loanAmount.toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-border-subtle">
                  <span className="text-slate-400 block">Total Interest Paid</span>
                  <span className="font-black text-navy-midnight text-sm">
                    ${Math.round(result.totalInterestPaid).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <Button
                href={`/get-started?price=${homePrice}&down=${downPayment}&rate=${interestRate}`}
                variant="brass"
                size="md"
                className="w-full text-navy-deep font-bold shadow-sm"
              >
                Pre-Approve for This Payment →
              </Button>

              <button
                type="button"
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full text-center text-xs font-bold text-navy-midnight hover:text-brass py-1 transition-colors"
              >
                {showAmortization ? "▲ Hide Amortization Schedule" : "▼ View 30-Year Annual Amortization Table"}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Amortization Schedule */}
        {showAmortization && (
          <div className="mt-10 pt-8 border-t border-border-subtle">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-heading font-bold text-lg text-navy-midnight">
                  Annual Principal & Interest Amortization ({loanTermYears} Years)
                </h4>
                <p className="text-xs text-slate-500">
                  Year-by-year reduction of your principal loan balance.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportPDF}
                className="text-xs font-bold text-navy-midnight hover:underline"
              >
                Download Table PDF ↗
              </button>
            </div>
            <div className="overflow-x-auto max-h-96 border border-border-subtle rounded-xl shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-navy-midnight text-white sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Year</th>
                    <th className="py-2.5 px-3 font-semibold">Principal Paid</th>
                    <th className="py-2.5 px-3 font-semibold">Interest Paid</th>
                    <th className="py-2.5 px-3 font-semibold">Total Interest to Date</th>
                    <th className="py-2.5 px-3 font-semibold">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-slate-700 bg-white">
                  {result.amortizationSchedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-bold text-navy-midnight">{row.year}</td>
                      <td className="py-2 px-3 font-semibold text-emerald-700">
                        ${row.principalPaid.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        ${row.interestPaid.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        ${row.totalInterestPaid.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 font-bold text-navy-midnight">
                        ${row.endingBalance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-50 px-6 py-3 border-t border-border-subtle text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>*Educational estimate adhering to Truth in Lending Act standards. Actual rates, taxes, and fees are finalized at official loan estimate.</span>
        <Link href="/calculators" className="font-bold text-navy-midnight hover:text-brass flex-shrink-0">
          All 7 Calculators Overview →
        </Link>
      </div>
    </div>
  );
}
