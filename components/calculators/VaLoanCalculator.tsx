"use client";

import React, { useState, useMemo } from "react";
import { calculateVaLoan, VaLoanResult } from "@/lib/calculations/vaCalculator";
import { CurrencyInput, PercentageInput, Select, Checkbox } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";
import { exportMortgageReport } from "@/lib/exportReport";

export function VaLoanCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(420000);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(6.0);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [usageCount, setUsageCount] = useState<"first_time" | "subsequent">("first_time");
  const [isDisabilityExempt, setIsDisabilityExempt] = useState(false);

  const result: VaLoanResult = useMemo(() => {
    return calculateVaLoan({
      purchasePrice,
      downPayment,
      interestRate,
      loanTermYears,
      usageCount,
      isDisabilityExempt,
    });
  }, [purchasePrice, downPayment, interestRate, loanTermYears, usageCount, isDisabilityExempt]);

  const handleReset = () => {
    setPurchasePrice(420000);
    setDownPayment(0);
    setInterestRate(6.0);
    setLoanTermYears(30);
    setUsageCount("first_time");
    setIsDisabilityExempt(false);
  };

  const handleExportPDF = () => {
    exportMortgageReport({
      calculatorName: "VA Military Loan & Entitlement Analysis",
      generatedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      inputs: [
        { label: "Purchase Price", value: `$${purchasePrice.toLocaleString()}` },
        { label: "Down Payment (0% Allowed)", value: `$${downPayment.toLocaleString()}` },
        { label: "VA Benefit Usage", value: usageCount === "first_time" ? "First-Time Use" : "Subsequent Use" },
        { label: "Service Disability Exemption", value: isDisabilityExempt ? "Yes (100% Fee Waived)" : "No" },
        { label: "Interest Rate", value: `${interestRate}%` },
      ],
      results: [
        { label: "Estimated Total Monthly VA Payment", value: `$${Math.round(result.totalMonthlyPayment).toLocaleString()}/mo`, isHighlight: true },
        { label: "Monthly Private Mortgage Insurance (PMI)", value: "$0 (Never Required)", isHighlight: true },
        { label: "VA Funding Fee Amount", value: isDisabilityExempt ? "$0 (EXEMPT)" : `+$${result.fundingFeeAmount.toLocaleString()} (${result.fundingFeeRate}%)` },
        { label: "Total Financed Loan Balance", value: `$${result.totalFinancedLoanAmount.toLocaleString()}` },
        { label: "Monthly Principal & Interest", value: `$${Math.round(result.monthlyPrincipalAndInterest).toLocaleString()}/mo` },
      ],
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      <div className="bg-ivory-warm px-6 py-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brass inline-block" />
          <span className="text-xs font-bold uppercase tracking-wider text-navy-midnight">
            VA Veteran & Military Loan Tool
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
            <FormField label="Purchase Price">
              <CurrencyInput
                value={purchasePrice}
                onChange={(val) => setPurchasePrice(val)}
                min={50000}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Down Payment ($)" helperText="0% Down Accepted!">
                <CurrencyInput
                  value={downPayment}
                  onChange={(val) => setDownPayment(val)}
                  max={purchasePrice}
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

            <FormField label="VA Benefit History">
              <Select
                value={usageCount}
                onChange={(e) => setUsageCount(e.target.value as any)}
                options={[
                  { value: "first_time", label: "First-Time VA Loan Use (Lower Fee)" },
                  { value: "subsequent", label: "Subsequent Use (Second or Later VA Loan)" },
                ]}
              />
            </FormField>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <Checkbox
                id="disabilityExempt"
                checked={isDisabilityExempt}
                onChange={(e) => setIsDisabilityExempt(e.target.checked)}
                label={
                  <span className="font-semibold text-emerald-950">
                    Service-Connected Disability (100% Fee Exemption)
                  </span>
                }
              />
              <p className="text-[11px] text-emerald-800 mt-1 pl-7">
                Veterans receiving VA disability compensation or Purple Heart recipients are 100% exempt from the VA funding fee.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-5 sticky top-24 bg-ivory-warm rounded-2xl p-6 sm:p-7 border border-border-subtle shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Estimated Monthly VA Payment
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  $0 Monthly PMI
                </span>
              </div>
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
                  <span className="text-slate-600">VA Funding Fee ({result.fundingFeeRate}%):</span>
                  <span className="font-bold text-navy-midnight">
                    {result.isDisabilityExempt ? (
                      <span className="text-emerald-700 font-bold">$0 (EXEMPT)</span>
                    ) : (
                      `+$${result.fundingFeeAmount.toLocaleString()}`
                    )}
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
                  <span className="text-slate-600">Monthly Private Mortgage Insurance:</span>
                  <span className="font-black text-emerald-700">$0 / mo (Never Required)</span>
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
                href={`/get-started?program=va&price=${purchasePrice}`}
                variant="brass"
                size="md"
                className="w-full text-navy-deep font-bold shadow-sm"
              >
                Verify Your VA Loan Eligibility →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
