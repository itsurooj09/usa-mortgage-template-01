"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateMortgagePayment, MortgagePaymentResult } from "@/lib/calculations/mortgagePayment";
import { CurrencyInput, PercentageInput, Select } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";

export function MortgagePaymentCalculator({
  defaultPrice = 450000,
  defaultDownPayment = 90000,
  defaultRate = 6.5,
  defaultTerm = 30,
  compact = false,
}: {
  defaultPrice?: number;
  defaultDownPayment?: number;
  defaultRate?: number;
  defaultTerm?: number;
  compact?: boolean;
}) {
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(defaultDownPayment);
  const [interestRate, setInterestRate] = useState(defaultRate);
  const [loanTermYears, setLoanTermYears] = useState(defaultTerm);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [annualInsurance, setAnnualInsurance] = useState(1400);
  const [monthlyHoa, setMonthlyHoa] = useState(0);
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

  const pAndIPercent = result.totalMonthlyPayment > 0
    ? Math.round((result.monthlyPrincipalAndInterest / result.totalMonthlyPayment) * 100)
    : 0;
  const taxPercent = result.totalMonthlyPayment > 0
    ? Math.round((result.monthlyPropertyTax / result.totalMonthlyPayment) * 100)
    : 0;
  const insPercent = result.totalMonthlyPayment > 0
    ? Math.round((result.monthlyHomeInsurance / result.totalMonthlyPayment) * 100)
    : 0;
  const pmiPercent = result.totalMonthlyPayment > 0
    ? Math.round((result.monthlyPmi / result.totalMonthlyPayment) * 100)
    : 0;
  const hoaPercent = result.totalMonthlyPayment > 0
    ? Math.round((result.monthlyHoa / result.totalMonthlyPayment) * 100)
    : 0;

  const handleDownPercentChange = (pct: number) => {
    const calculatedDown = Math.round((homePrice * pct) / 100);
    setDownPayment(calculatedDown);
  };

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-dark">
                  Home Purchase Price
                </label>
                <span className="text-lg font-bold text-navy-midnight">
                  ${homePrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={50000}
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
                  min={10000}
                />
              </div>
            </div>

            {/* Down Payment Dual Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-dark">
                    Down Payment ($)
                  </label>
                  <span className="text-xs text-slate-500 font-semibold">{downPaymentPercent}%</span>
                </div>
                <CurrencyInput
                  value={downPayment}
                  onChange={(val) => setDownPayment(val)}
                  max={homePrice}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-navy-dark block mb-1">
                  Down Payment (%)
                </label>
                <div className="flex items-center gap-1.5">
                  {[3, 5, 10, 20].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handleDownPercentChange(pct)}
                      className={`flex-1 py-2 text-xs font-semibold rounded border transition-colors ${
                        downPaymentPercent === pct
                          ? "bg-navy-midnight text-white border-navy-midnight"
                          : "bg-ivory-warm text-navy-dark border-border-subtle hover:border-slate-300"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interest Rate & Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Interest Rate (%)" helperText="Annual percentage rate">
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
                    { value: "30", label: "30-Year Fixed" },
                    { value: "20", label: "20-Year Fixed" },
                    { value: "15", label: "15-Year Fixed" },
                    { value: "10", label: "10-Year Fixed" },
                  ]}
                />
              </FormField>
            </div>

            {/* Advanced Taxes, Insurance, HOA Accordion */}
            <div className="pt-4 border-t border-border-subtle space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Taxes, Insurance & Dues
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="Property Tax Rate">
                  <PercentageInput
                    value={propertyTaxRate}
                    onChange={(val) => setPropertyTaxRate(val)}
                    step={0.1}
                  />
                </FormField>
                <FormField label="Annual Home Ins.">
                  <CurrencyInput
                    value={annualInsurance}
                    onChange={(val) => setAnnualInsurance(val)}
                  />
                </FormField>
                <FormField label="Monthly HOA">
                  <CurrencyInput
                    value={monthlyHoa}
                    onChange={(val) => setMonthlyHoa(val)}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-5 bg-ivory-warm rounded-xl p-6 sm:p-7 border border-border-subtle flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Estimated Monthly Payment
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-heading text-4xl sm:text-5xl font-extrabold text-navy-midnight">
                  ${Math.round(result.totalMonthlyPayment).toLocaleString()}
                </span>
                <span className="text-sm font-medium text-slate-500">/ month</span>
              </div>

              {/* Progress Breakdown Bar */}
              <div className="mt-6">
                <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-200">
                  <div
                    style={{ width: `${pAndIPercent}%` }}
                    className="bg-navy-midnight transition-all duration-300"
                    title={`Principal & Interest: $${result.monthlyPrincipalAndInterest}`}
                  />
                  <div
                    style={{ width: `${taxPercent}%` }}
                    className="bg-brass transition-all duration-300"
                    title={`Property Tax: $${result.monthlyPropertyTax}`}
                  />
                  <div
                    style={{ width: `${insPercent}%` }}
                    className="bg-navy-light transition-all duration-300"
                    title={`Homeowners Insurance: $${result.monthlyHomeInsurance}`}
                  />
                  {result.monthlyPmi > 0 && (
                    <div
                      style={{ width: `${pmiPercent}%` }}
                      className="bg-amber-500 transition-all duration-300"
                      title={`PMI: $${result.monthlyPmi}`}
                    />
                  )}
                  {result.monthlyHoa > 0 && (
                    <div
                      style={{ width: `${hoaPercent}%` }}
                      className="bg-slate-400 transition-all duration-300"
                      title={`HOA: $${result.monthlyHoa}`}
                    />
                  )}
                </div>
              </div>

              {/* Itemized Legend */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-navy-midnight inline-block" />
                    Principal & Interest
                  </span>
                  <span className="font-semibold text-navy-midnight">
                    ${Math.round(result.monthlyPrincipalAndInterest).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-brass inline-block" />
                    Property Taxes (Est.)
                  </span>
                  <span className="font-semibold text-navy-midnight">
                    ${Math.round(result.monthlyPropertyTax).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-navy-light inline-block" />
                    Homeowners Insurance
                  </span>
                  <span className="font-semibold text-navy-midnight">
                    ${Math.round(result.monthlyHomeInsurance).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    PMI (Mortgage Insurance)
                  </span>
                  <span className="font-semibold text-navy-midnight">
                    {result.monthlyPmi > 0 ? (
                      `$${Math.round(result.monthlyPmi)}`
                    ) : (
                      <span className="text-emerald-700 font-medium">$0 (≥20% Down)</span>
                    )}
                  </span>
                </div>

                {result.monthlyHoa > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                      HOA Dues
                    </span>
                    <span className="font-semibold text-navy-midnight">
                      ${Math.round(result.monthlyHoa).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Loan Metrics */}
              <div className="mt-6 pt-5 border-t border-border-subtle grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Total Financed</span>
                  <span className="font-bold text-navy-midnight text-sm">
                    ${result.loanAmount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Total Interest Paid</span>
                  <span className="font-bold text-navy-midnight text-sm">
                    ${Math.round(result.totalInterestPaid).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button
                href={`/get-started?price=${homePrice}&down=${downPayment}`}
                variant="brass"
                size="md"
                className="w-full text-navy-midnight font-bold"
              >
                Get Pre-Approved with This Payment
              </Button>

              <button
                type="button"
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full text-center text-xs font-semibold text-navy-midnight hover:underline py-1"
              >
                {showAmortization ? "Hide Amortization Schedule ▲" : "View Annual Amortization Schedule ▼"}
              </button>
            </div>
          </div>
        </div>

        {/* Amortization Schedule Drawer */}
        {showAmortization && (
          <div className="mt-10 pt-8 border-t border-border-subtle">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold font-heading text-navy-midnight">
                Annual Amortization Schedule ({loanTermYears} Years)
              </h4>
              <span className="text-xs text-slate-500">
                Principal Paid vs. Interest Paid by Year
              </span>
            </div>
            <div className="overflow-x-auto max-h-96 border border-border-subtle rounded-lg">
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
                <tbody className="divide-y divide-border-subtle text-slate-700">
                  {result.amortizationSchedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-bold text-navy-midnight">{row.year}</td>
                      <td className="py-2 px-3 font-medium text-emerald-700">
                        ${row.principalPaid.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        ${row.interestPaid.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        ${row.totalInterestPaid.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 font-semibold text-navy-midnight">
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

      <div className="bg-slate-50 px-6 py-3 border-t border-border-subtle text-[11px] text-slate-500 flex items-center justify-between">
        <span>*Figures shown are educational estimates. Actual rates and fees depend on official loan application and underwriter approval.</span>
        <Link href="/calculators" className="font-semibold text-navy-midnight hover:underline ml-2 flex-shrink-0">
          All Calculators →
        </Link>
      </div>
    </div>
  );
}
