"use client";

import React, { useState, useMemo } from "react";
import { calculateFhaLoan, FhaLoanResult } from "@/lib/calculations/fhaCalculator";
import { CurrencyInput, PercentageInput, Select } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";

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

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-5">
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

            <div className="p-4 bg-ivory-warm rounded-lg border border-border-subtle text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-navy-midnight">HUD Guidelines Applied:</p>
              <p>• Upfront MIP: 1.75% (${result.upfrontMipAmount.toLocaleString()}) financed into loan.</p>
              <p>• Annual MIP: {result.annualMipRate}% (${Math.round(result.monthlyAnnualMip)}/month).</p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-6 bg-ivory-warm rounded-xl p-6 sm:p-8 border border-border-subtle flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Monthly FHA Payment
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-heading text-4xl sm:text-5xl font-extrabold text-navy-midnight">
                  ${Math.round(result.totalMonthlyPayment).toLocaleString()}
                </span>
                <span className="text-sm font-medium text-slate-500">/ mo</span>
              </div>

              <div className="mt-6 pt-6 border-t border-border-subtle space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Base Loan Amount:</span>
                  <span className="font-semibold text-navy-midnight">
                    ${result.baseLoanAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Upfront MIP (1.75% Financed):</span>
                  <span className="font-semibold text-navy-midnight">
                    +${result.upfrontMipAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Financed Loan:</span>
                  <span className="font-bold text-navy-midnight">
                    ${result.totalFinancedLoanAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Monthly Principal & Interest:</span>
                  <span className="font-semibold text-navy-midnight">
                    ${Math.round(result.monthlyPrincipalAndInterest).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Monthly FHA Mortgage Insurance:</span>
                  <span className="font-semibold text-amber-700">
                    ${Math.round(result.monthlyAnnualMip)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Monthly Taxes & Insurance (Est.):</span>
                  <span className="font-semibold text-navy-midnight">
                    ${Math.round(result.monthlyPropertyTax + result.monthlyHomeInsurance).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                href={`/get-started?program=fha&price=${purchasePrice}`}
                variant="brass"
                size="md"
                className="w-full text-navy-midnight font-bold"
              >
                Apply for FHA Pre-Approval
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
