"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateAffordability, AffordabilityResult } from "@/lib/calculations/affordability";
import { CurrencyInput, PercentageInput, Select } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";
import { exportMortgageReport } from "@/lib/exportReport";

export function HomeAffordabilityCalculator() {
  // Household Income
  const [borrowerIncome, setBorrowerIncome] = useState(85000);
  const [coBorrowerIncome, setCoBorrowerIncome] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);

  // Monthly Debts Breakdown (From Reference 2 screenshot)
  const [carPayment, setCarPayment] = useState(450);
  const [studentLoans, setStudentLoans] = useState(200);
  const [creditCards, setCreditCards] = useState(150);
  const [otherDebts, setOtherDebts] = useState(0);

  // Loan Details
  const [downPayment, setDownPayment] = useState(50000);
  const [downPaymentMode, setDownPaymentMode] = useState<"dollar" | "percent">("dollar");
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  // Housing Costs
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [annualInsurance, setAnnualInsurance] = useState(1800);
  const [monthlyHoa, setMonthlyHoa] = useState(0);
  const [pmiRate, setPmiRate] = useState(0.5);

  // DTI & Comfort Level
  const [selectedTier, setSelectedTier] = useState<"conservative" | "moderate" | "aggressive">("conservative");

  // Summary and Breakdown View Modes
  const [summaryViewMode, setSummaryViewMode] = useState<"monthly" | "yearly">("monthly");
  const [breakdownViewMode, setBreakdownViewMode] = useState<"monthly" | "yearly">("monthly");

  // Accordion Sections Open State
  const [openSections, setOpenSections] = useState({
    debts: true,
    loanDetails: true,
    housingCosts: true,
    dti: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const totalMonthlyDebts = carPayment + studentLoans + creditCards + otherDebts;
  const totalAnnualIncome = borrowerIncome + coBorrowerIncome + otherIncome;

  const result: AffordabilityResult = useMemo(() => {
    return calculateAffordability({
      annualIncome: borrowerIncome + otherIncome,
      coBorrowerAnnualIncome: coBorrowerIncome,
      monthlyDebts: totalMonthlyDebts,
      downPayment,
      interestRate,
      loanTermYears,
      annualPropertyTaxRate: propertyTaxRate,
      annualHomeInsurance: annualInsurance,
      monthlyHoa,
    });
  }, [
    borrowerIncome,
    otherIncome,
    coBorrowerIncome,
    totalMonthlyDebts,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTaxRate,
    annualInsurance,
    monthlyHoa,
  ]);

  const activeTier = result.tiers[selectedTier];
  const summaryMultiplier = summaryViewMode === "yearly" ? 12 : 1;
  const breakdownMultiplier = breakdownViewMode === "yearly" ? 12 : 1;

  // Percentage of down payment relative to purchase price
  const downPaymentPercent = activeTier.maxPurchasePrice > 0
    ? ((downPayment / activeTier.maxPurchasePrice) * 100).toFixed(1)
    : "20.0";

  const handleExportPDF = () => {
    exportMortgageReport({
      calculatorName: "Home Affordability Financial Report",
      generatedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      inputs: [
        { label: "Annual Household Income", value: `$${totalAnnualIncome.toLocaleString()}/yr` },
        { label: "Monthly Car Payments", value: `$${carPayment.toLocaleString()}/mo` },
        { label: "Monthly Student Loans", value: `$${studentLoans.toLocaleString()}/mo` },
        { label: "Monthly Credit Cards", value: `$${creditCards.toLocaleString()}/mo` },
        { label: "Other Monthly Debts", value: `$${otherDebts.toLocaleString()}/mo` },
        { label: "Total Monthly Debt Obligations", value: `$${totalMonthlyDebts.toLocaleString()}/mo` },
        { label: "Down Payment Amount", value: `$${downPayment.toLocaleString()} (${downPaymentPercent}%)` },
        { label: "Mortgage Interest Rate", value: `${interestRate}%` },
        { label: "Loan Duration", value: `${loanTermYears} Years` },
        { label: "Selected Comfort Tier", value: `${activeTier.tierName} (${activeTier.dtiFrontEnd}% / ${activeTier.dtiBackEnd}% DTI)` },
      ],
      results: [
        { label: "Maximum Affordable Home Price", value: `$${activeTier.maxPurchasePrice.toLocaleString()}`, isHighlight: true },
        { label: "Supported Mortgage Loan Amount", value: `$${activeTier.maxLoanAmount.toLocaleString()}` },
        { label: "Maximum Monthly Housing Payment", value: `$${activeTier.maxMonthlyHousingPayment.toLocaleString()}/mo` },
        { label: "Monthly Principal & Interest", value: `$${Math.round(activeTier.estimatedMonthlyPAndI).toLocaleString()}/mo` },
        { label: "Monthly Property Tax", value: `$${Math.round(activeTier.estimatedMonthlyTax).toLocaleString()}/mo` },
        { label: "Monthly Homeowner's Insurance", value: `$${Math.round(activeTier.estimatedMonthlyInsurance).toLocaleString()}/mo` },
        { label: "Monthly Private Mortgage Insurance (PMI)", value: activeTier.estimatedMonthlyPmi > 0 ? `$${activeTier.estimatedMonthlyPmi}/mo` : "$0" },
      ],
    });
  };

  return (
    <div className="w-full">
      {/* Title & Subtitle Matching Reference 2 */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight">
          Home Affordability Calculator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Find out how much house you can afford based on your income and expenses
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Grouped Inputs & Accordions */}
        <div className="lg:col-span-6 space-y-4">
          {/* Household Income Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span>Annual Household Income</span>
                <span className="text-slate-400 font-semibold normal-case">
                  $/yr = {Math.round(borrowerIncome / 12).toLocaleString()} /mo
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={borrowerIncome}
                  onChange={(e) => setBorrowerIncome(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-navy-midnight font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  <span>Co-Borrower Annual Income</span>
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold" title="Spouse or co-signer gross annual income">?</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={coBorrowerIncome}
                    onChange={(e) => setCoBorrowerIncome(Number(e.target.value) || 0)}
                    className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-slate-300 bg-white text-navy-midnight font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">$/yr</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  <span>Other Annual Income</span>
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold" title="Bonuses, commissions, dividends, or alimony">?</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(Number(e.target.value) || 0)}
                    className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-slate-300 bg-white text-navy-midnight font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">$/yr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion 1: Monthly Debts */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("debts")}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-navy-midnight hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-base">💳</span>
                <span className="font-heading text-base font-bold">Monthly Debts</span>
              </div>
              <span className="text-slate-400 text-sm font-bold">
                {openSections.debts ? "▲" : "▼"}
              </span>
            </button>

            {openSections.debts && (
              <div className="p-6 pt-2 border-t border-slate-100 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Car Payment(s)</span>
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={carPayment}
                        onChange={(e) => setCarPayment(Number(e.target.value) || 0)}
                        className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400">$/mo</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Student Loans</span>
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={studentLoans}
                        onChange={(e) => setStudentLoans(Number(e.target.value) || 0)}
                        className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400">$/mo</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Credit Cards</span>
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={creditCards}
                        onChange={(e) => setCreditCards(Number(e.target.value) || 0)}
                        className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400">$/mo</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Other Debts</span>
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={otherDebts}
                        onChange={(e) => setOtherDebts(Number(e.target.value) || 0)}
                        className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400">$/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Loan Details */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("loanDetails")}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-navy-midnight hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-base">🏡</span>
                <span className="font-heading text-base font-bold">Loan Details</span>
              </div>
              <span className="text-slate-400 text-sm font-bold">
                {openSections.loanDetails ? "▲" : "▼"}
              </span>
            </button>

            {openSections.loanDetails && (
              <div className="p-6 pt-2 border-t border-slate-100 space-y-4">
                {/* Down Payment with $ / % display */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <span>Down Payment $ / %</span>
                    <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                        className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">$</span>
                    </div>
                    <div className="w-24 px-3 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-sm text-center border border-slate-200">
                      {downPaymentPercent}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Interest Rate</span>
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step={0.125}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                        className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Loan Term</span>
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                    </label>
                    <select
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
                    >
                      <option value={30}>30 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={15}>15 Years</option>
                      <option value={10}>10 Years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Housing Costs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("housingCosts")}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-navy-midnight hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-base">📊</span>
                <span className="font-heading text-base font-bold">Housing Costs</span>
              </div>
              <span className="text-slate-400 text-sm font-bold">
                {openSections.housingCosts ? "▲" : "▼"}
              </span>
            </button>

            {openSections.housingCosts && (
              <div className="p-6 pt-2 border-t border-slate-100 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Property Tax Rate</span>
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step={0.1}
                        value={propertyTaxRate}
                        onChange={(e) => setPropertyTaxRate(Number(e.target.value) || 0)}
                        className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Home Insurance</span>
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={annualInsurance}
                        onChange={(e) => setAnnualInsurance(Number(e.target.value) || 0)}
                        className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">$/yr</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>HOA Fees</span>
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={monthlyHoa}
                        onChange={(e) => setMonthlyHoa(Number(e.target.value) || 0)}
                        className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">$/mo</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>PMI Rate</span>
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] inline-flex items-center justify-center font-bold">?</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step={0.1}
                        value={pmiRate}
                        onChange={(e) => setPmiRate(Number(e.target.value) || 0)}
                        className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 4: DTI & Comfort Level */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("dti")}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-navy-midnight hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-base">⚖️</span>
                <span className="font-heading text-base font-bold">DTI & Comfort Level</span>
              </div>
              <span className="text-slate-400 text-sm font-bold">
                {openSections.dti ? "▲" : "▼"}
              </span>
            </button>

            {openSections.dti && (
              <div className="p-6 pt-2 border-t border-slate-100 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  {(["conservative", "moderate", "aggressive"] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedTier === tier
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 font-medium"
                      }`}
                    >
                      <div className="text-xs capitalize">{tier}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">
                        {tier === "conservative" && "28 / 36% DTI"}
                        {tier === "moderate" && "31 / 43% DTI"}
                        {tier === "aggressive" && "36 / 48% DTI"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Persistent Sticky Results Panel (Exact Reference 2 Layout) */}
        <div className="lg:col-span-6 sticky top-24 space-y-5">
          {/* Green Hero Header Card */}
          <div className="bg-[#059669] text-white rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-100">
                Your Home Affordability
              </span>
              <span className="text-xs font-semibold text-emerald-100 capitalize">
                {selectedTier} Estimate
              </span>
            </div>

            <div className="text-center py-4">
              <div className="text-[11px] uppercase tracking-widest text-emerald-100 font-bold mb-1">
                MAXIMUM HOME PRICE
              </div>
              <div className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-white">
                ${activeTier.maxPurchasePrice.toLocaleString()}
              </div>
              <p className="text-xs text-emerald-100 mt-2">
                Based on your income and DTI limits
              </p>
            </div>

            {/* Download PDF Report Button inside green card */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleExportPDF}
                className="w-full py-3.5 px-4 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download PDF Report</span>
              </button>
            </div>
          </div>

          {/* Summary Section with Monthly/Yearly toggle */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-heading font-bold text-base text-navy-midnight">
                Summary
              </h4>
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setSummaryViewMode("monthly")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    summaryViewMode === "monthly"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-navy-midnight"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setSummaryViewMode("yearly")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    summaryViewMode === "yearly"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-navy-midnight"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Max Monthly Payment</span>
                <span className="font-heading font-bold text-emerald-700 text-lg block mt-0.5">
                  ${Math.round(activeTier.maxMonthlyHousingPayment * summaryMultiplier).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Loan Amount</span>
                <span className="font-heading font-bold text-navy-midnight text-lg block mt-0.5">
                  ${activeTier.maxLoanAmount.toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block">Monthly Income</span>
                <span className="font-heading font-bold text-navy-midnight text-base block mt-0.5">
                  ${Math.round((totalAnnualIncome / 12) * summaryMultiplier).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Monthly Debts</span>
                <span className="font-heading font-bold text-amber-700 text-base block mt-0.5">
                  ${Math.round(totalMonthlyDebts * summaryMultiplier).toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block">Available for Housing</span>
                <span className="font-heading font-bold text-navy-midnight text-base block mt-0.5">
                  ${Math.round(activeTier.maxMonthlyHousingPayment * summaryMultiplier).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Remaining Budget</span>
                <span className="font-heading font-bold text-navy-midnight text-base block mt-0.5">
                  ${Math.round(Math.max(0, (totalAnnualIncome / 12) - totalMonthlyDebts - activeTier.maxMonthlyHousingPayment) * summaryMultiplier).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Debt-to-Income Ratios Progress Bars */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-heading font-bold text-base text-navy-midnight pb-2 border-b border-slate-100">
              Debt-to-Income Ratios
            </h4>

            <div className="grid grid-cols-2 gap-6">
              {/* Front-End */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-1.5">
                  <span>Front-End (Housing)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full"
                    style={{ width: `${Math.min(100, (activeTier.dtiFrontEnd / 28) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs mt-1.5">
                  <span className="font-bold text-emerald-700 text-sm">{activeTier.dtiFrontEnd}%</span>
                  <span className="text-slate-400">Max: 28%</span>
                </div>
              </div>

              {/* Back-End */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-1.5">
                  <span>Back-End (All Debts)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full"
                    style={{ width: `${Math.min(100, (activeTier.dtiBackEnd / 36) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs mt-1.5">
                  <span className="font-bold text-amber-700 text-sm">{activeTier.dtiBackEnd}%</span>
                  <span className="text-slate-400">Max: 36%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-heading font-bold text-base text-navy-midnight">
                Payment Breakdown
              </h4>
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setBreakdownViewMode("monthly")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    breakdownViewMode === "monthly"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-navy-midnight"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBreakdownViewMode("yearly")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    breakdownViewMode === "yearly"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-navy-midnight"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                  <span className="text-slate-700 font-medium">Principal & Interest</span>
                </div>
                <span className="font-bold text-navy-midnight font-heading">
                  ${Math.round(activeTier.estimatedMonthlyPAndI * breakdownMultiplier).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-slate-700 font-medium">Property Tax</span>
                </div>
                <span className="font-bold text-navy-midnight font-heading">
                  ${Math.round(activeTier.estimatedMonthlyTax * breakdownMultiplier).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="text-slate-700 font-medium">Home Insurance</span>
                </div>
                <span className="font-bold text-navy-midnight font-heading">
                  ${Math.round(activeTier.estimatedMonthlyInsurance * breakdownMultiplier).toLocaleString()}
                </span>
              </div>

              {monthlyHoa > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                    <span className="text-slate-700 font-medium">HOA Fees</span>
                  </div>
                  <span className="font-bold text-navy-midnight font-heading">
                    ${Math.round(monthlyHoa * breakdownMultiplier).toLocaleString()}
                  </span>
                </div>
              )}

              {activeTier.estimatedMonthlyPmi > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="text-slate-700 font-medium">PMI (Private Mortgage Insurance)</span>
                  </div>
                  <span className="font-bold text-rose-700 font-heading">
                    ${Math.round(activeTier.estimatedMonthlyPmi * breakdownMultiplier).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-bold">
              <span className="text-navy-midnight">Total Estimated Payment</span>
              <span className="text-xl text-emerald-700 font-heading">
                ${Math.round(activeTier.maxMonthlyHousingPayment * breakdownMultiplier).toLocaleString()}
                <span className="text-xs font-normal text-slate-500"> / {breakdownViewMode === "monthly" ? "mo" : "yr"}</span>
              </span>
            </div>

            <div className="pt-3">
              <Button
                href={`/get-started?price=${activeTier.maxPurchasePrice}&down=${downPayment}`}
                variant="brass"
                size="md"
                className="w-full text-navy-deep font-bold justify-center shadow-md"
              >
                Get Pre-Approved for ${activeTier.maxPurchasePrice.toLocaleString()} →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
