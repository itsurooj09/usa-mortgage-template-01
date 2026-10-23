"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateAffordability, AffordabilityResult } from "@/lib/calculations/affordability";
import { CurrencyInput, PercentageInput } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";

export function HomeAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [monthlyDebts, setMonthlyDebts] = useState(650);
  const [downPayment, setDownPayment] = useState(50000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [selectedTier, setSelectedTier] = useState<"conservative" | "moderate" | "aggressive">("moderate");

  const result: AffordabilityResult = useMemo(() => {
    return calculateAffordability({
      annualIncome,
      monthlyDebts,
      downPayment,
      interestRate,
      loanTermYears: 30,
    });
  }, [annualIncome, monthlyDebts, downPayment, interestRate]);

  const activeTier = result.tiers[selectedTier];

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-5">
            <FormField
              label="Annual Household Gross Income"
              helperText={`Equivalent to $${Math.round(annualIncome / 12).toLocaleString()} per month.`}
            >
              <CurrencyInput
                value={annualIncome}
                onChange={(val) => setAnnualIncome(val)}
                min={20000}
                max={2000000}
              />
            </FormField>

            <FormField
              label="Monthly Debt Obligations"
              helperText="Car loans, credit card minimums, student loans, personal loans."
            >
              <CurrencyInput
                value={monthlyDebts}
                onChange={(val) => setMonthlyDebts(val)}
              />
            </FormField>

            <FormField
              label="Down Payment Available"
              helperText="Funds set aside for purchasing the home."
            >
              <CurrencyInput
                value={downPayment}
                onChange={(val) => setDownPayment(val)}
              />
            </FormField>

            <FormField
              label="Estimated Interest Rate (%)"
              helperText="Current benchmark mortgage rate."
            >
              <PercentageInput
                value={interestRate}
                onChange={(val) => setInterestRate(val)}
                step={0.125}
              />
            </FormField>

            {/* DTI Tier Selector */}
            <div className="pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-navy-dark block mb-2">
                Underwriting Budget Tolerance
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["conservative", "moderate", "aggressive"] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedTier === tier
                        ? "bg-navy-midnight text-white border-navy-midnight shadow-sm"
                        : "bg-ivory-warm text-navy-dark border-border-subtle hover:border-slate-300"
                    }`}
                  >
                    <div className="text-xs font-bold capitalize">{tier}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">
                      {tier === "conservative" && "28/36% DTI"}
                      {tier === "moderate" && "31/43% DTI"}
                      {tier === "aggressive" && "36/48% DTI"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-6 bg-ivory-warm rounded-xl p-6 sm:p-8 border border-border-subtle flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Estimated Maximum Home Purchase Price
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-heading text-4xl sm:text-5xl font-black text-navy-midnight">
                  ${activeTier.maxPurchasePrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Based on {activeTier.tierName.toLowerCase()} qualifying guidelines ({activeTier.dtiFrontEnd}% / {activeTier.dtiBackEnd}% DTI).
              </p>

              {/* Breakdown */}
              <div className="mt-6 pt-6 border-t border-border-subtle space-y-3.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Max Monthly Housing Payment:</span>
                  <span className="font-bold text-navy-midnight">
                    ${activeTier.maxMonthlyHousingPayment.toLocaleString()} / mo
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Supported Loan Amount:</span>
                  <span className="font-semibold text-navy-midnight">
                    ${activeTier.maxLoanAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Your Down Payment:</span>
                  <span className="font-semibold text-navy-midnight">
                    ${downPayment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Est. Principal & Interest:</span>
                  <span className="font-semibold text-navy-midnight">
                    ${activeTier.estimatedMonthlyPAndI.toLocaleString()} / mo
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Est. Property Taxes & Insurance:</span>
                  <span className="font-semibold text-navy-midnight">
                    ${Math.round(activeTier.estimatedMonthlyTax + activeTier.estimatedMonthlyInsurance).toLocaleString()} / mo
                  </span>
                </div>
                {activeTier.estimatedMonthlyPmi > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Est. Monthly PMI:</span>
                    <span className="font-semibold text-amber-700">
                      ${activeTier.estimatedMonthlyPmi} / mo
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button
                href={`/get-started?price=${activeTier.maxPurchasePrice}&down=${downPayment}`}
                variant="brass"
                size="md"
                className="w-full text-navy-midnight font-bold"
              >
                Pre-Qualify for ${activeTier.maxPurchasePrice.toLocaleString()}
              </Button>
              <p className="text-[11px] text-slate-500 text-center">
                Calculations based on 30-year fixed conforming benchmarks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
