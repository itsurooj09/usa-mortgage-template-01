"use client";

import React, { useState, useMemo } from "react";
import { calculateClosingCosts, ClosingCostsResult } from "@/lib/calculations/closingCosts";
import { CurrencyInput, PercentageInput } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";
import { exportMortgageReport } from "@/lib/exportReport";

export function ClosingCostsCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(425000);
  const [downPayment, setDownPayment] = useState(85000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [sellerConcessions, setSellerConcessions] = useState(2500);

  const result: ClosingCostsResult = useMemo(() => {
    return calculateClosingCosts({
      purchasePrice,
      downPayment,
      interestRate,
      sellerConcessions,
    });
  }, [purchasePrice, downPayment, interestRate, sellerConcessions]);

  const handleReset = () => {
    setPurchasePrice(425000);
    setDownPayment(85000);
    setInterestRate(6.5);
    setSellerConcessions(2500);
  };

  const handleExportPDF = () => {
    exportMortgageReport({
      calculatorName: "TRID Loan Estimate & Cash-to-Close Analysis",
      generatedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      inputs: [
        { label: "Purchase Price", value: `$${purchasePrice.toLocaleString()}` },
        { label: "Down Payment", value: `$${downPayment.toLocaleString()}` },
        { label: "Base Loan Amount", value: `$${result.loanAmount.toLocaleString()}` },
        { label: "Interest Rate", value: `${interestRate}%` },
        { label: "Seller Concessions / Credits", value: `$${sellerConcessions.toLocaleString()}` },
      ],
      results: [
        { label: "Total Cash Required at Closing", value: `$${result.totalCashToClose.toLocaleString()}`, isHighlight: true },
        { label: "Net Closing Costs (After Credits)", value: `$${result.netClosingCosts.toLocaleString()}` },
        { label: "Total Lender Fees (Origination/Appraisal)", value: `$${result.totalLenderFees.toLocaleString()}` },
        { label: "Third-Party Settlement & Title Fees", value: `$${result.totalThirdPartyFees.toLocaleString()}` },
        { label: "Government Transfer & Recording Fees", value: `$${result.totalGovernmentFees.toLocaleString()}` },
        { label: "Prepaids & Escrow Reserves", value: `$${result.totalPrepaidsAndEscrow.toLocaleString()}` },
      ],
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      <div className="bg-ivory-warm px-6 py-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brass inline-block" />
          <span className="text-xs font-bold uppercase tracking-wider text-navy-midnight">
            Loan Estimate & Cash-to-Close Tool
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
          <div className="lg:col-span-5 space-y-5">
            <FormField label="Home Purchase Price">
              <CurrencyInput
                value={purchasePrice}
                onChange={(val) => setPurchasePrice(val)}
                min={50000}
              />
            </FormField>

            <FormField label="Down Payment ($)">
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

            <FormField label="Seller Concessions / Credits (Optional)">
              <CurrencyInput
                value={sellerConcessions}
                onChange={(val) => setSellerConcessions(val)}
              />
            </FormField>

            <div className="p-4 rounded-xl bg-ivory-warm border border-border-subtle text-xs text-slate-600 space-y-2">
              <p className="font-bold text-navy-midnight">TRID Loan Estimate Sections</p>
              <div className="flex justify-between">
                <span>Lender Origination & Underwriting:</span>
                <span className="font-semibold text-navy-midnight">${result.totalLenderFees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Third-Party Title & Settlement:</span>
                <span className="font-semibold text-navy-midnight">${result.totalThirdPartyFees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Government Taxes & Recording:</span>
                <span className="font-semibold text-navy-midnight">${result.totalGovernmentFees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Prepaids & Escrow Reserves:</span>
                <span className="font-semibold text-navy-midnight">${result.totalPrepaidsAndEscrow.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Results Summary & Itemized Table */}
          <div className="lg:col-span-7 sticky top-24 bg-ivory-warm rounded-2xl p-6 sm:p-8 border border-border-subtle shadow-card flex flex-col justify-between">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-border-subtle">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Net Closing Costs
                  </span>
                  <div className="mt-1 font-heading text-3xl font-black text-navy-midnight">
                    ${result.netClosingCosts.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    ({result.closingCostsPercentOfLoan}% of loan balance)
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Total Cash to Close
                  </span>
                  <div className="mt-1 font-heading text-3xl font-black text-emerald-800">
                    ${result.totalCashToClose.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    (Down Payment + Net Fees)
                  </span>
                </div>
              </div>

              {/* Itemized list */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight mb-3">
                  Itemized Fee Breakdown
                </h4>
                <div className="max-h-72 overflow-y-auto space-y-2 pr-1 text-xs">
                  {result.itemizedFees.map((fee, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between py-1.5 px-3 rounded-lg bg-white border border-border-subtle"
                    >
                      <span className="text-slate-700">{fee.name}</span>
                      <span className="font-bold text-navy-midnight">
                        ${fee.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {result.totalCredits > 0 && (
                    <div className="flex justify-between py-1.5 px-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                      <span>Seller Concessions / Credits</span>
                      <span>-${result.totalCredits.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle">
              <Button
                href={`/get-started?price=${purchasePrice}&down=${downPayment}`}
                variant="brass"
                size="md"
                className="w-full text-navy-deep font-bold shadow-sm"
              >
                Request an Official Loan Estimate →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
