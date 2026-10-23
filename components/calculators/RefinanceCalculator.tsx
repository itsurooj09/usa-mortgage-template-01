"use client";

import React, { useState, useMemo } from "react";
import { calculateRefinance, RefinanceResult } from "@/lib/calculations/refinance";
import { CurrencyInput, PercentageInput, Select, Checkbox } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";
import { exportMortgageReport } from "@/lib/exportReport";

export function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState(380000);
  const [currentRate, setCurrentRate] = useState(7.25);
  const [remainingTermYears, setRemainingTermYears] = useState(27);
  const [newRate, setNewRate] = useState(5.875);
  const [newTermYears, setNewTermYears] = useState(30);
  const [refinanceCosts, setRefinanceCosts] = useState(4800);
  const [rollCostsIntoLoan, setRollCostsIntoLoan] = useState(false);
  const [cashOutAmount, setCashOutAmount] = useState(0);

  const result: RefinanceResult = useMemo(() => {
    return calculateRefinance({
      currentBalance,
      currentRate,
      remainingTermYears,
      newRate,
      newTermYears,
      refinanceCosts,
      rollCostsIntoLoan,
      cashOutAmount,
    });
  }, [
    currentBalance,
    currentRate,
    remainingTermYears,
    newRate,
    newTermYears,
    refinanceCosts,
    rollCostsIntoLoan,
    cashOutAmount,
  ]);

  const handleReset = () => {
    setCurrentBalance(380000);
    setCurrentRate(7.25);
    setRemainingTermYears(27);
    setNewRate(5.875);
    setNewTermYears(30);
    setRefinanceCosts(4800);
    setRollCostsIntoLoan(false);
    setCashOutAmount(0);
  };

  const handleExportPDF = () => {
    exportMortgageReport({
      calculatorName: "Mortgage Refinance & Break-Even Analysis",
      generatedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      inputs: [
        { label: "Current Mortgage Balance", value: `$${currentBalance.toLocaleString()}` },
        { label: "Current Interest Rate", value: `${currentRate}%` },
        { label: "Remaining Term", value: `${remainingTermYears} Years` },
        { label: "Proposed New Rate", value: `${newRate}%` },
        { label: "New Loan Duration", value: `${newTermYears} Years` },
        { label: "Estimated Refinance Closing Costs", value: `$${refinanceCosts.toLocaleString()}` },
        { label: "Cash-Out Equity (Optional)", value: cashOutAmount > 0 ? `$${cashOutAmount.toLocaleString()}` : "$0" },
      ],
      results: [
        { label: "Monthly Payment Savings", value: result.monthlySavings >= 0 ? `+$${Math.round(result.monthlySavings).toLocaleString()}/mo` : `-$${Math.abs(Math.round(result.monthlySavings)).toLocaleString()}/mo`, isHighlight: true },
        { label: "Break-Even Period", value: result.breakEvenMonths ? `${result.breakEvenMonths} Months` : "N/A" },
        { label: "Current Monthly P&I", value: `$${Math.round(result.currentMonthlyPAndI).toLocaleString()}/mo` },
        { label: "New Monthly P&I", value: `$${Math.round(result.newMonthlyPAndI).toLocaleString()}/mo` },
        { label: "Total Lifetime Net Savings", value: `$${Math.round(result.lifetimeSavings).toLocaleString()}` },
        { label: "Total Interest Reduction", value: `$${Math.round(result.interestSavings).toLocaleString()}` },
      ],
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      <div className="bg-ivory-warm px-6 py-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brass inline-block" />
          <span className="text-xs font-bold uppercase tracking-wider text-navy-midnight">
            Refinance & Equity Optimization Tool
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-slate-500 hover:text-navy-midnight hover:underline"
          >
            ↺ Reset
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
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-5 rounded-xl bg-ivory-warm border border-border-subtle">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight mb-3">
                Current Mortgage Terms
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="Current Balance">
                  <CurrencyInput
                    value={currentBalance}
                    onChange={(val) => setCurrentBalance(val)}
                  />
                </FormField>
                <FormField label="Current Rate (%)">
                  <PercentageInput
                    value={currentRate}
                    onChange={(val) => setCurrentRate(val)}
                    step={0.125}
                  />
                </FormField>
                <FormField label="Remaining Years">
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={remainingTermYears}
                    onChange={(e) => setRemainingTermYears(Number(e.target.value))}
                    className="w-full rounded-md border border-border-subtle bg-white px-3.5 py-2.5 text-sm font-medium text-navy-midnight focus:outline-none focus:ring-2 focus:ring-navy-midnight/20"
                  />
                </FormField>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-border-subtle shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight mb-3">
                Proposed New Mortgage Terms
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="New Rate (%)">
                  <PercentageInput
                    value={newRate}
                    onChange={(val) => setNewRate(val)}
                    step={0.125}
                  />
                </FormField>
                <FormField label="New Loan Term">
                  <Select
                    value={newTermYears.toString()}
                    onChange={(e) => setNewTermYears(Number(e.target.value))}
                    options={[
                      { value: "30", label: "30 Years" },
                      { value: "20", label: "20 Years" },
                      { value: "15", label: "15 Years" },
                      { value: "10", label: "10 Years" },
                    ]}
                  />
                </FormField>
                <FormField label="Est. Closing Costs">
                  <CurrencyInput
                    value={refinanceCosts}
                    onChange={(val) => setRefinanceCosts(val)}
                  />
                </FormField>
              </div>

              <div className="mt-4 pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Cash-Out Amount (Optional)">
                  <CurrencyInput
                    value={cashOutAmount}
                    onChange={(val) => setCashOutAmount(val)}
                  />
                </FormField>
                <div className="pt-6">
                  <Checkbox
                    id="rollCosts"
                    checked={rollCostsIntoLoan}
                    onChange={(e) => setRollCostsIntoLoan(e.target.checked)}
                    label="Roll closing costs into new loan balance"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 sticky top-24 bg-ivory-warm rounded-2xl p-6 sm:p-7 border border-border-subtle shadow-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Estimated Monthly Savings
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span
                  className={`font-heading text-4xl sm:text-5xl font-black ${
                    result.monthlySavings >= 0 ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {result.monthlySavings >= 0
                    ? `+$${Math.round(result.monthlySavings).toLocaleString()}`
                    : `-$${Math.abs(Math.round(result.monthlySavings)).toLocaleString()}`}
                </span>
                <span className="text-sm font-semibold text-slate-500">/ month</span>
              </div>

              <div className="mt-6 pt-6 border-t border-border-subtle space-y-3.5 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Break-Even Period:</span>
                  <span className="font-black text-navy-midnight">
                    {result.breakEvenMonths !== null ? `${result.breakEvenMonths} Months` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Current Monthly P&I:</span>
                  <span className="font-semibold text-slate-700">
                    ${Math.round(result.currentMonthlyPAndI).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">New Monthly P&I:</span>
                  <span className="font-bold text-navy-midnight">
                    ${Math.round(result.newMonthlyPAndI).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Lifetime Net Savings:</span>
                  <span
                    className={`font-bold ${
                      result.lifetimeSavings >= 0 ? "text-emerald-700" : "text-slate-700"
                    }`}
                  >
                    ${Math.round(result.lifetimeSavings).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Total Interest Saved:</span>
                  <span className="font-bold text-navy-midnight">
                    ${Math.round(result.interestSavings).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2.5">
              <Button
                href="/get-started?purpose=refinance"
                variant="brass"
                size="md"
                className="w-full text-navy-deep font-bold shadow-sm"
              >
                Lock In Your Refinance Rate →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
