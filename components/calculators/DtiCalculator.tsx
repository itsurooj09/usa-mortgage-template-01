"use client";

import React, { useState, useMemo } from "react";
import { calculateDti, DtiResult } from "@/lib/calculations/dtiCalculator";
import { CurrencyInput } from "../forms/SpecialInputs";
import { FormField } from "../forms/FormField";
import { Button } from "../ui/Button";

export function DtiCalculator() {
  const [baseSalary, setBaseSalary] = useState(8500);
  const [bonusOvertime, setBonusOvertime] = useState(500);

  const [creditCards, setCreditCards] = useState(250);
  const [autoLoans, setAutoLoans] = useState(450);
  const [studentLoans, setStudentLoans] = useState(300);
  const [personalLoans, setPersonalLoans] = useState(0);

  const [principalAndInterest, setPrincipalAndInterest] = useState(2100);
  const [propertyTax, setPropertyTax] = useState(420);
  const [homeInsurance, setHomeInsurance] = useState(120);
  const [hoaFees, setHoaFees] = useState(50);

  const result: DtiResult = useMemo(() => {
    return calculateDti({
      income: { baseSalary, bonusOvertime },
      debts: { creditCards, autoLoans, studentLoans, personalLoans },
      housing: { principalAndInterest, propertyTax, homeInsurance, hoaFees },
    });
  }, [
    baseSalary,
    bonusOvertime,
    creditCards,
    autoLoans,
    studentLoans,
    personalLoans,
    principalAndInterest,
    propertyTax,
    homeInsurance,
    hoaFees,
  ]);

  return (
    <div className="bg-white rounded-2xl border border-border-subtle shadow-card overflow-hidden">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-4 rounded-xl bg-ivory-warm border border-border-subtle">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight mb-3">
                1. Monthly Gross Income
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField label="Base Salary / Wages">
                  <CurrencyInput value={baseSalary} onChange={(v) => setBaseSalary(v)} />
                </FormField>
                <FormField label="Bonus / Commission / Other">
                  <CurrencyInput value={bonusOvertime} onChange={(v) => setBonusOvertime(v)} />
                </FormField>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight mb-3">
                2. Monthly Non-Housing Debts
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <FormField label="Credit Cards">
                  <CurrencyInput value={creditCards} onChange={(v) => setCreditCards(v)} />
                </FormField>
                <FormField label="Auto Loans">
                  <CurrencyInput value={autoLoans} onChange={(v) => setAutoLoans(v)} />
                </FormField>
                <FormField label="Student Loans">
                  <CurrencyInput value={studentLoans} onChange={(v) => setStudentLoans(v)} />
                </FormField>
                <FormField label="Personal Loans">
                  <CurrencyInput value={personalLoans} onChange={(v) => setPersonalLoans(v)} />
                </FormField>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-midnight mb-3">
                3. Proposed Monthly Housing Costs
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <FormField label="Principal & Int.">
                  <CurrencyInput value={principalAndInterest} onChange={(v) => setPrincipalAndInterest(v)} />
                </FormField>
                <FormField label="Property Taxes">
                  <CurrencyInput value={propertyTax} onChange={(v) => setPropertyTax(v)} />
                </FormField>
                <FormField label="Home Insurance">
                  <CurrencyInput value={homeInsurance} onChange={(v) => setHomeInsurance(v)} />
                </FormField>
                <FormField label="HOA Dues">
                  <CurrencyInput value={hoaFees} onChange={(v) => setHoaFees(v)} />
                </FormField>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-5 bg-ivory-warm rounded-xl p-6 sm:p-7 border border-border-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Underwriting Evaluation
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    result.status === "Optimal"
                      ? "bg-emerald-100 text-emerald-800"
                      : result.status === "Good"
                      ? "bg-emerald-50 text-emerald-700"
                      : result.status === "Needs Attention"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.status}
                </span>
              </div>

              {/* Ratios Display */}
              <div className="grid grid-cols-2 gap-4 my-6 py-5 border-y border-border-subtle text-center">
                <div className="border-r border-border-subtle pr-2">
                  <span className="text-xs text-slate-500 font-medium block">Front-End DTI</span>
                  <span className="font-heading text-3xl font-extrabold text-navy-midnight">
                    {result.frontEndDti}%
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Benchmark: &le; 28%</span>
                </div>

                <div className="pl-2">
                  <span className="text-xs text-slate-500 font-medium block">Back-End DTI</span>
                  <span className="font-heading text-3xl font-extrabold text-navy-midnight">
                    {result.backEndDti}%
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Conforming: &le; 43%</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-white p-3.5 rounded-lg border border-border-subtle">
                {result.summary}
              </p>

              <div className="mt-5 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Gross Monthly Income:</span>
                  <span className="font-semibold text-navy-midnight">${result.totalMonthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Non-Housing Debts:</span>
                  <span className="font-semibold text-navy-midnight">${result.totalMonthlyNonHousingDebts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Proposed Housing Outlay:</span>
                  <span className="font-semibold text-navy-midnight">${result.totalMonthlyHousingPayment.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                href="/get-started"
                variant="brass"
                size="md"
                className="w-full text-navy-midnight font-bold"
              >
                Review Approval Options with an Advisor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
