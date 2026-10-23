"use client";

import React, { useState, useMemo } from "react";
import { calculateVaLoan, VaLoanResult } from "@/lib/calculations/vaCalculator";
import { CurrencyInput, PercentageInput, Select, Checkbox } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";

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

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-5">
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

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
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
          <div className="lg:col-span-6 bg-ivory-warm rounded-xl p-6 sm:p-8 border border-border-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Estimated Monthly VA Payment
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  $0 Monthly PMI
                </span>
              </div>
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
                  <span className="text-slate-600">VA Funding Fee ({result.fundingFeeRate}%):</span>
                  <span className="font-semibold text-navy-midnight">
                    {result.isDisabilityExempt ? (
                      <span className="text-emerald-700 font-bold">$0 (EXEMPT)</span>
                    ) : (
                      `+$${result.fundingFeeAmount.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Financed Balance:</span>
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
                  <span className="text-slate-600">Monthly Private Mortgage Insurance:</span>
                  <span className="font-bold text-emerald-700">$0 / mo (Never Required)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Estimated Taxes & Insurance:</span>
                  <span className="font-semibold text-navy-midnight">
                    ${Math.round(result.monthlyPropertyTax + result.monthlyHomeInsurance).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                href={`/get-started?program=va&price=${purchasePrice}`}
                variant="brass"
                size="md"
                className="w-full text-navy-midnight font-bold"
              >
                Verify Your VA Loan Eligibility
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
