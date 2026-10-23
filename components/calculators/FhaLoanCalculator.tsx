"use client";

import React, { useState, useMemo } from "react";
import { calculateFhaLoan, FhaLoanResult } from "@/lib/calculations/fhaCalculator";
import { CurrencyInput, PercentageInput, Select } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";
import { exportMortgageReport } from "@/lib/exportReport";

export function FhaLoanCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(350000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(3.5);
  const [interestRate, setInterestRate] = useState(6.125);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const result: FhaLoanResult = useMemo(() => {
    return calculateFhaLoan({
      purchasePrice,
      downPaymentPercent,
      interestRate,
      loanTermYears,
    });
  }, [purchasePrice, downPaymentPercent, interestRate, loanTermYears]);

  const handleReset = () => {
    setPurchasePrice(350000);
    setDownPaymentPercent(3.5);
    setInterestRate(6.125);
    setLoanTermYears(30);
  };

  const handleExportPDF = () => {
    exportMortgageReport({
      calculatorName: "FHA Government Loan & MIP Analysis",
      generatedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      inputs: [
        { label: "Home Purchase Price", value: `$${purchasePrice.toLocaleString()}` },
        { label: "Down Payment (Min. 3.5%)", value: `$${result.downPayment.toLocaleString()} (${result.downPaymentPercent}%)` },
        { label: "Base Loan Amount", value: `$${result.baseLoanAmount.toLocaleString()}` },
        { label: "Interest Rate (APR)", value: `${interestRate}%` },
        { label: "Loan Term", value: `${loanTermYears} Years Fixed` },
      ],
      results: [
        { label: "Total Monthly FHA Payment", value: `$${Math.round(result.totalMonthlyPayment).toLocaleString()}/mo`, isHighlight: true },
        { label: "Upfront MIP (1.75% Financed)", value: `+$${result.upfrontMipAmount.toLocaleString()}` },
        { label: "Total Financed Loan Balance", value: `$${result.totalFinancedLoanAmount.toLocaleString()}` },
        { label: "Monthly Principal & Interest", value: `$${Math.round(result.monthlyPrincipalAndInterest).toLocaleString()}/mo` },
        { label: "Monthly FHA Annual MIP", value: `$${Math.round(result.monthlyAnnualMip).toLocaleString()}/mo` },
        { label: "Estimated Taxes & Insurance", value: `$${Math.round(result.monthlyPropertyTax + result.monthlyHomeInsurance).toLocaleString()}/mo` },
      ],
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      <div className="bg-ivory-warm px-6 py-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brass inline-block" />
          <span className="text-xs font-bold uppercase tracking-wider text-navy-midnight">
            FHA Government Mortgage Calculator
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
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5">
            <FormField label="Home Purchase Price">
              <CurrencyInput
                value={purchasePrice}
                onChange={(val) => setPurchasePrice(val)}
                min={50000}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Down Payment (%)"
                helperText={`Minimum 3.5% = $${Math.round(purchasePrice * 0.035).toLocaleString()}`}
              >
                <PercentageInput
                  value={downPaymentPercent}
                  onChange={(val) => setDownPaymentPercent(Math.max(3.5, val))}
                  min={3.5}
                  max={50}
                  step={0.5}
                />
              </FormField>

              <FormField label="Interest Rate (%)">
                <PercentageInput
                  value={interestRate}
                  onChange={(val) => setInterestRate(val)}
                  step={0.125}
                />
              </FormField>
            </div>

            <FormField label="Loan Term">
              <Select
                value={loanTermYears.toString()}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                options={[
                  { value: "30", label: "30-Year Fixed FHA" },
                  { value: "15", label: "15-Year Fixed FHA" },
                ]}
              />
            </FormField>

            <div className="p-4 bg-ivory-warm rounded-xl border border-border-subtle text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-navy-midnight">HUD Guidelines Applied:</p>
              <p>• Upfront MIP: 1.75% (${result.upfrontMipAmount.toLocaleString()}) financed into loan.</p>
              <p>• Annual MIP: {result.annualMipRate}% (${Math.round(result.monthlyAnnualMip)}/month).</p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-5 sticky top-24 bg-ivory-warm rounded-2xl p-6 sm:p-7 border border-border-subtle shadow-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Monthly FHA Payment
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-heading text-4xl sm:text-5xl font-black text-navy-midnight">
                  ${Math.round(result.totalMonthlyPayment).toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-slate-500">/ mo</span>
              </div>

              <div className="mt-6 pt-6 border-t border-border-subtle space-y-3 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Base Loan Amount:</span>
                  <span className="font-bold text-navy-midnight">
                    ${result.baseLoanAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Upfront MIP (1.75% Financed):</span>
                  <span className="font-bold text-navy-midnight">
                    +${result.upfrontMipAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Total Financed Balance:</span>
                  <span className="font-bold text-navy-midnight">
                    ${result.totalFinancedLoanAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Monthly P&I:</span>
                  <span className="font-bold text-navy-midnight">
                    ${Math.round(result.monthlyPrincipalAndInterest).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Monthly FHA MIP:</span>
                  <span className="font-bold text-amber-700">
                    ${Math.round(result.monthlyAnnualMip)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                  <span className="text-slate-600">Estimated Taxes & Insurance:</span>
                  <span className="font-bold text-navy-midnight">
                    ${Math.round(result.monthlyPropertyTax + result.monthlyHomeInsurance).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2.5">
              <Button
                href={`/get-started?program=fha&price=${purchasePrice}`}
                variant="brass"
                size="md"
                className="w-full text-navy-deep font-bold shadow-sm"
              >
                Apply for FHA Pre-Approval →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
