"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  calculatePurchase,
  calculateAffordability,
  calculateRefinance,
  calculateRentVsBuy,
  calculateVaPurchase,
  calculateVaRefinance,
  calculateDscr,
  calculateFixFlip,
  PurchaseInput,
  AffordabilityInput,
  RefinanceInput,
  RentVsBuyInput,
  VaPurchaseInput,
  VaRefinanceInput,
  DscrInput,
  FixFlipInput,
} from "@/lib/calculators/vcsMath";

export type CalculatorTab =
  | "purchase"
  | "afford"
  | "refi"
  | "rentbuy"
  | "vapurchase"
  | "varefi"
  | "dscr"
  | "flip";

interface TabMeta {
  id: CalculatorTab;
  label: string;
  headline: string;
  subhead: string;
}

const TABS: TabMeta[] = [
  {
    id: "purchase",
    label: "Purchase",
    headline: "What will this house actually cost each month?",
    subhead:
      "Adjust the numbers and watch the payment update. Nothing here is submitted anywhere and no credit check is involved.",
  },
  {
    id: "afford",
    label: "Affordability",
    headline: "How much house can you comfortably carry?",
    subhead:
      "We work backwards from your income and debts to a price range — not just the maximum a lender would approve.",
  },
  {
    id: "refi",
    label: "Refinance",
    headline: "Is refinancing worth the closing costs?",
    subhead:
      "Compare your current loan against today's rates, and see how long it takes to earn back what you spend.",
  },
  {
    id: "rentbuy",
    label: "Rent vs Buy",
    headline: "Does buying beat renting for you?",
    subhead:
      "The answer depends almost entirely on how long you stay. Move the slider and watch the crossover point shift.",
  },
  {
    id: "vapurchase",
    label: "VA Purchase",
    headline: "Buy with your VA benefit and no down payment.",
    subhead:
      "No mortgage insurance, ever. We'll show the funding fee and how it compares against a conventional loan.",
  },
  {
    id: "varefi",
    label: "VA Refinance",
    headline: "Lower the rate on your VA loan.",
    subhead:
      "An IRRRL streamline needs no appraisal and no income documents. See whether you clear VA's recoupment test.",
  },
  {
    id: "dscr",
    label: "Debt-Service (DSCR)",
    headline: "Will the rent cover the debt?",
    subhead:
      "DSCR loans qualify the property, not you. This shows the ratio a lender will underwrite to, plus your real cash flow.",
  },
  {
    id: "flip",
    label: "Fix & Flip",
    headline: "What's actually left after you sell?",
    subhead:
      "Purchase, rehab, hard money, holding and selling costs — netted out against your after-repair value.",
  },
];

export function VonkMasterCalculatorSuite({
  initialTab = "dscr",
}: {
  initialTab?: CalculatorTab;
}) {
  const [activeTab, setActiveTab] = useState<CalculatorTab>(initialTab);

  // 1. Purchase State
  const [purchaseState, setPurchaseState] = useState<PurchaseInput>({
    homeValue: 400000,
    downPayment: 80000,
    rate: 6.5,
    term: 30,
    propertyTaxRate: 1.1,
    homeInsurance: 1800,
    pmiRate: 0.55,
    hoa: 0,
    extraPayment: 0,
  });

  // 2. Affordability State
  const [affordState, setAffordState] = useState<AffordabilityInput>({
    annualIncome: 120000,
    monthlyDebts: 750,
    cashAvailable: 60000,
    dtiCeiling: 43,
    rate: 6.5,
    term: 30,
    loanType: "conventional",
    propertyTaxRate: 1.1,
    homeInsurance: 1800,
    hoa: 0,
    pmiRate: 0.55,
  });

  // 3. Refinance State
  const [refiState, setRefiState] = useState<RefinanceInput>({
    currentBalance: 320000,
    currentRate: 7.25,
    yearsRemaining: 26,
    homeValue: 450000,
    newRate: 6.0,
    newTerm: 30,
    closingCosts: 5000,
    cashOut: 0,
    rollCosts: true,
  });

  // 4. Rent vs Buy State
  const [rentBuyState, setRentBuyState] = useState<RentVsBuyInput>({
    homeValue: 450000,
    downPayment: 90000,
    rate: 6.5,
    term: 30,
    monthlyRent: 2400,
    rentGrowth: 3,
    appreciation: 3.5,
    investReturn: 6,
    horizon: 10,
    propertyTaxRate: 1.1,
    homeInsurance: 1800,
    maintenanceRate: 1,
    closingCosts: 6000,
    sellingCosts: 6,
    hoa: 0,
  });

  // 5. VA Purchase State
  const [vaPurchaseState, setVaPurchaseState] = useState<VaPurchaseInput>({
    homeValue: 450000,
    downPayment: 0,
    rate: 6.25,
    term: 30,
    firstUse: true,
    exempt: false,
    financeFee: true,
    propertyTaxRate: 1.1,
    homeInsurance: 1800,
    hoa: 0,
  });

  // 6. VA Refinance State
  const [vaRefiState, setVaRefiState] = useState<VaRefinanceInput>({
    currentBalance: 350000,
    currentRate: 7.0,
    yearsRemaining: 27,
    newRate: 5.75,
    newTerm: 30,
    closingCosts: 4500,
    kind: "irrrl",
    exempt: false,
    firstUse: true,
    cashOut: 0,
  });

  // 7. DSCR State (Matching user screenshot defaults)
  const [dscrState, setDscrState] = useState<DscrInput>({
    purchasePrice: 500000,
    units: 1,
    monthlyRent: 3600,
    vacancyRate: 5,
    ltv: 80,
    rate: 8.0,
    term: 30,
    points: 2,
    closingCosts: 5000,
    annualTaxes: 4000,
    annualInsurance: 3000,
    annualMaintenance: 500,
    annualUtilities: 5000,
    monthlyHoa: 0,
    managementRate: 0,
  });

  // 8. Fix & Flip State
  const [flipState, setFlipState] = useState<FixFlipInput>({
    purchasePrice: 280000,
    rehabBudget: 60000,
    arv: 450000,
    holdMonths: 6,
    loanToCost: 85,
    rate: 11.0,
    points: 2,
    buyClosingCosts: 4000,
    sellingCosts: 6,
    monthlyCarrying: 800,
  });

  const activeMeta = TABS.find((t) => t.id === activeTab) || TABS[0];

  // Computed results
  const purchaseRes = calculatePurchase(purchaseState);
  const affordRes = calculateAffordability(affordState);
  const refiRes = calculateRefinance(refiState);
  const rentBuyRes = calculateRentVsBuy(rentBuyState);
  const vaPurchaseRes = calculateVaPurchase(vaPurchaseState);
  const vaRefiRes = calculateVaRefinance(vaRefiState);
  const dscrRes = calculateDscr(dscrState);
  const flipRes = calculateFixFlip(flipState);

  return (
    <div className="w-full space-y-8">
      {/* Top Header & Dynamic Titles */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div className="space-y-2 max-w-3xl">
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              {activeMeta.headline}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {activeMeta.subhead}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium whitespace-nowrap self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-teal-500 inline-block animate-pulse" />
            <span>Estimates only · not a rate quote</span>
          </div>
        </div>

        {/* Tab Selector Pills (Matching Reference media_1792747032892.png) */}
        <div className="overflow-x-auto pb-2 pt-1 flex items-center gap-2 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md font-bold"
                    : "bg-white text-slate-700 border border-slate-200/90 hover:border-slate-400 hover:text-slate-900 shadow-2xs"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Split: Inputs (Left) & Results Rail (Right) */}
      <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-10">
        
        {/* ==============================================================
         * LEFT COLUMN: NUMBERED SECTION CARDS (01, 02, 03)
         * ============================================================== */}
        <div className="w-full lg:flex-1 space-y-6">

          {/* TAB 7: DEBT-SERVICE (DSCR) */}
          {activeTab === "dscr" && (
            <>
              {/* 01 The property */}
              <SectionCard index="01" title="The property" fieldsCount="4 fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CurrencyField
                    label="Purchase price"
                    value={dscrState.purchasePrice}
                    min={50000}
                    max={2000000}
                    step={10000}
                    onChange={(v) => setDscrState({ ...dscrState, purchasePrice: v })}
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800 block">
                      Number of units
                    </label>
                    <div className="grid grid-cols-4 gap-2 h-12">
                      {[1, 2, 3, 4].map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setDscrState({ ...dscrState, units: u })}
                          className={`rounded-xl font-bold text-sm transition-colors border ${
                            dscrState.units === u
                              ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  <CurrencyField
                    label="Monthly rent per unit"
                    value={dscrState.monthlyRent}
                    min={500}
                    max={15000}
                    step={100}
                    onChange={(v) => setDscrState({ ...dscrState, monthlyRent: v })}
                  />

                  <PercentField
                    label="Vacancy allowance"
                    value={dscrState.vacancyRate || 5}
                    min={0}
                    max={25}
                    step={1}
                    caption="The share of the year you expect the unit to sit empty between tenants."
                    onChange={(v) => setDscrState({ ...dscrState, vacancyRate: v })}
                  />
                </div>
              </SectionCard>

              {/* 02 The financing */}
              <SectionCard index="02" title="The financing" fieldsCount="5 fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <PercentField
                    label="Loan to value"
                    value={dscrState.ltv || 80}
                    min={50}
                    max={90}
                    step={1}
                    onChange={(v) => setDscrState({ ...dscrState, ltv: v })}
                  />

                  <PercentField
                    label="Interest rate"
                    value={dscrState.rate || 8.0}
                    min={4}
                    max={14}
                    step={0.125}
                    onChange={(v) => setDscrState({ ...dscrState, rate: v })}
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800 block">
                      Loan term
                    </label>
                    <div className="grid grid-cols-2 gap-2 h-12">
                      {[30, 20].map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setDscrState({ ...dscrState, term })}
                          className={`rounded-xl font-bold text-sm transition-colors border ${
                            (dscrState.term || 30) === term
                              ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {term} years
                        </button>
                      ))}
                    </div>
                  </div>

                  <PercentField
                    label="Points"
                    value={dscrState.points || 0}
                    min={0}
                    max={5}
                    step={0.25}
                    onChange={(v) => setDscrState({ ...dscrState, points: v })}
                  />

                  <div className="sm:col-span-2">
                    <CurrencyField
                      label="Other closing costs"
                      value={dscrState.closingCosts || 0}
                      min={0}
                      max={25000}
                      step={500}
                      onChange={(v) => setDscrState({ ...dscrState, closingCosts: v })}
                    />
                  </div>
                </div>
              </SectionCard>

              {/* 03 Operating costs */}
              <SectionCard index="03" title="Operating costs" fieldsCount="6 fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CurrencyField
                    label="Property taxes"
                    value={dscrState.annualTaxes || 0}
                    suffix="per year"
                    min={0}
                    max={30000}
                    step={250}
                    onChange={(v) => setDscrState({ ...dscrState, annualTaxes: v })}
                  />

                  <CurrencyField
                    label="Insurance"
                    value={dscrState.annualInsurance || 0}
                    suffix="per year"
                    min={0}
                    max={15000}
                    step={100}
                    onChange={(v) => setDscrState({ ...dscrState, annualInsurance: v })}
                  />

                  <CurrencyField
                    label="Repairs per unit"
                    value={dscrState.annualMaintenance || 0}
                    suffix="per year"
                    min={0}
                    max={5000}
                    step={100}
                    onChange={(v) => setDscrState({ ...dscrState, annualMaintenance: v })}
                  />

                  <CurrencyField
                    label="Utilities you pay"
                    value={dscrState.annualUtilities || 0}
                    suffix="per year"
                    min={0}
                    max={20000}
                    step={250}
                    onChange={(v) => setDscrState({ ...dscrState, annualUtilities: v })}
                  />

                  <CurrencyField
                    label="HOA dues"
                    value={dscrState.monthlyHoa || 0}
                    suffix="per month"
                    min={0}
                    max={2000}
                    step={25}
                    onChange={(v) => setDscrState({ ...dscrState, monthlyHoa: v })}
                  />

                  <PercentField
                    label="Property management"
                    value={dscrState.managementRate || 0}
                    min={0}
                    max={15}
                    step={1}
                    caption="Share of collected rent paid to a manager. Leave at zero if you self-manage."
                    onChange={(v) => setDscrState({ ...dscrState, managementRate: v })}
                  />
                </div>
              </SectionCard>
            </>
          )}

          {/* TAB 1: PURCHASE */}
          {activeTab === "purchase" && (
            <>
              <SectionCard index="01" title="The loan" fieldsCount="4 fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CurrencyField
                    label="Home price"
                    value={purchaseState.homeValue}
                    min={50000}
                    max={2000000}
                    step={10000}
                    onChange={(v) => setPurchaseState({ ...purchaseState, homeValue: v })}
                  />

                  <CurrencyField
                    label={`Down payment (${purchaseRes.downPercent}%)`}
                    value={purchaseState.downPayment}
                    min={0}
                    max={purchaseState.homeValue}
                    step={5000}
                    onChange={(v) => setPurchaseState({ ...purchaseState, downPayment: v })}
                  />

                  <PercentField
                    label="Interest rate"
                    value={purchaseState.rate}
                    min={2}
                    max={12}
                    step={0.125}
                    onChange={(v) => setPurchaseState({ ...purchaseState, rate: v })}
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800 block">
                      Loan term
                    </label>
                    <div className="grid grid-cols-3 gap-2 h-12">
                      {[30, 20, 15].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setPurchaseState({ ...purchaseState, term: t })}
                          className={`rounded-xl font-bold text-xs sm:text-sm border transition-colors ${
                            purchaseState.term === t
                              ? "bg-teal-600 text-white border-teal-600"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {t} yrs
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard index="02" title="Taxes, insurance & dues" fieldsCount="4 fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <PercentField
                    label="Property tax rate"
                    value={purchaseState.propertyTaxRate || 1.1}
                    min={0.2}
                    max={3.5}
                    step={0.05}
                    caption="Annual, as a percentage of home price. US average is ~1.1%."
                    onChange={(v) => setPurchaseState({ ...purchaseState, propertyTaxRate: v })}
                  />

                  <CurrencyField
                    label="Home insurance"
                    value={purchaseState.homeInsurance || 1800}
                    suffix="per year"
                    min={300}
                    max={10000}
                    step={100}
                    onChange={(v) => setPurchaseState({ ...purchaseState, homeInsurance: v })}
                  />

                  <PercentField
                    label="Mortgage insurance (PMI)"
                    value={purchaseState.pmiRate || 0.55}
                    min={0.1}
                    max={2.0}
                    step={0.05}
                    caption="Charged when LTV is above 80%. Drops off automatically once below 80%."
                    onChange={(v) => setPurchaseState({ ...purchaseState, pmiRate: v })}
                  />

                  <CurrencyField
                    label="HOA dues"
                    value={purchaseState.hoa || 0}
                    suffix="per month"
                    min={0}
                    max={2000}
                    step={25}
                    onChange={(v) => setPurchaseState({ ...purchaseState, hoa: v })}
                  />
                </div>
              </SectionCard>

              <SectionCard index="03" title="Paying it off faster" fieldsCount="1 field">
                <CurrencyField
                  label="Extra toward principal"
                  value={purchaseState.extraPayment || 0}
                  suffix="per month"
                  min={0}
                  max={2500}
                  step={25}
                  caption="Every extra dollar goes straight to the principal balance, saving interest over the life of the loan."
                  onChange={(v) => setPurchaseState({ ...purchaseState, extraPayment: v })}
                />
              </SectionCard>
            </>
          )}

          {/* TAB 2: AFFORDABILITY */}
          {activeTab === "afford" && (
            <>
              <SectionCard index="01" title="Household income & debt" fieldsCount="4 fields">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800 block">
                      Mortgage Loan Program
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {(["conventional", "fha", "va", "usda", "jumbo"] as const).map((prog) => (
                        <button
                          key={prog}
                          type="button"
                          onClick={() => setAffordState({ ...affordState, loanType: prog })}
                          className={`py-2 px-3 rounded-xl font-bold text-xs uppercase border transition-colors ${
                            affordState.loanType === prog
                              ? "bg-teal-600 text-white border-teal-600"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {prog}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <CurrencyField
                      label="Gross annual income"
                      value={affordState.annualIncome}
                      min={30000}
                      max={1000000}
                      step={5000}
                      onChange={(v) => setAffordState({ ...affordState, annualIncome: v })}
                    />

                    <CurrencyField
                      label="Monthly debt payments"
                      value={affordState.monthlyDebts}
                      min={0}
                      max={15000}
                      step={50}
                      caption="Auto loans, minimum student loans, credit cards, personal debts."
                      onChange={(v) => setAffordState({ ...affordState, monthlyDebts: v })}
                    />

                    <CurrencyField
                      label="Cash available for down payment"
                      value={affordState.cashAvailable}
                      min={0}
                      max={500000}
                      step={5000}
                      onChange={(v) => setAffordState({ ...affordState, cashAvailable: v })}
                    />

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-800 block">
                        DTI ceiling comfort tier
                      </label>
                      <div className="grid grid-cols-3 gap-2 h-12">
                        {[
                          { val: 36, label: "36% Conserv." },
                          { val: 43, label: "43% Standard" },
                          { val: 50, label: "50% Aggressive" },
                        ].map((d) => (
                          <button
                            key={d.val}
                            type="button"
                            onClick={() => setAffordState({ ...affordState, dtiCeiling: d.val })}
                            className={`rounded-xl font-bold text-xs border transition-colors ${
                              affordState.dtiCeiling === d.val
                                ? "bg-teal-600 text-white border-teal-600"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard index="02" title="Financing terms" fieldsCount="3 fields">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <PercentField
                    label="Interest rate"
                    value={affordState.rate || 6.5}
                    min={3}
                    max={12}
                    step={0.125}
                    onChange={(v) => setAffordState({ ...affordState, rate: v })}
                  />

                  <PercentField
                    label="Property tax rate"
                    value={affordState.propertyTaxRate || 1.1}
                    min={0.2}
                    max={3.0}
                    step={0.05}
                    onChange={(v) => setAffordState({ ...affordState, propertyTaxRate: v })}
                  />

                  <CurrencyField
                    label="Home insurance"
                    value={affordState.homeInsurance || 1800}
                    suffix="per year"
                    min={300}
                    max={8000}
                    step={100}
                    onChange={(v) => setAffordState({ ...affordState, homeInsurance: v })}
                  />
                </div>
              </SectionCard>
            </>
          )}

          {/* TAB 3: REFINANCE */}
          {activeTab === "refi" && (
            <>
              <SectionCard index="01" title="The loan you have" fieldsCount="4 fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CurrencyField
                    label="Current mortgage balance"
                    value={refiState.currentBalance}
                    min={50000}
                    max={2000000}
                    step={5000}
                    onChange={(v) => setRefiState({ ...refiState, currentBalance: v })}
                  />

                  <PercentField
                    label="Current interest rate"
                    value={refiState.currentRate}
                    min={2}
                    max={12}
                    step={0.125}
                    onChange={(v) => setRefiState({ ...refiState, currentRate: v })}
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800 block">
                      Years remaining: {refiState.yearsRemaining || 26} yrs
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={refiState.yearsRemaining || 26}
                      onChange={(e) => setRefiState({ ...refiState, yearsRemaining: Number(e.target.value) })}
                      className="w-full h-2 bg-slate-200 rounded-lg accent-teal-600 cursor-pointer"
                    />
                  </div>

                  <CurrencyField
                    label="Estimated current home value"
                    value={refiState.homeValue || 450000}
                    min={50000}
                    max={2500000}
                    step={10000}
                    onChange={(v) => setRefiState({ ...refiState, homeValue: v })}
                  />
                </div>
              </SectionCard>

              <SectionCard index="02" title="The loan you're considering" fieldsCount="4 fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <PercentField
                    label="Proposed new interest rate"
                    value={refiState.newRate}
                    min={2}
                    max={12}
                    step={0.125}
                    onChange={(v) => setRefiState({ ...refiState, newRate: v })}
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800 block">
                      New loan term
                    </label>
                    <div className="grid grid-cols-3 gap-2 h-12">
                      {[30, 20, 15].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setRefiState({ ...refiState, newTerm: t })}
                          className={`rounded-xl font-bold text-xs sm:text-sm border transition-colors ${
                            refiState.newTerm === t
                              ? "bg-teal-600 text-white border-teal-600"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {t} yrs
                        </button>
                      ))}
                    </div>
                  </div>

                  <CurrencyField
                    label="Estimated closing costs"
                    value={refiState.closingCosts || 5000}
                    min={1000}
                    max={25000}
                    step={500}
                    onChange={(v) => setRefiState({ ...refiState, closingCosts: v })}
                  />

                  <CurrencyField
                    label="Cash-out amount"
                    value={refiState.cashOut || 0}
                    min={0}
                    max={300000}
                    step={5000}
                    caption="Funds taken from home equity for renovations, debts, or investments."
                    onChange={(v) => setRefiState({ ...refiState, cashOut: v })}
                  />
                </div>
              </SectionCard>
            </>
          )}

          {/* TAB 4: RENT VS BUY */}
          {activeTab === "rentbuy" && (
            <>
              <SectionCard index="01" title="If you buy" fieldsCount="4 fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CurrencyField
                    label="Target home price"
                    value={rentBuyState.homeValue}
                    min={100000}
                    max={2000000}
                    step={10000}
                    onChange={(v) => setRentBuyState({ ...rentBuyState, homeValue: v })}
                  />

                  <CurrencyField
                    label="Down payment"
                    value={rentBuyState.downPayment || 90000}
                    min={0}
                    max={rentBuyState.homeValue}
                    step={5000}
                    onChange={(v) => setRentBuyState({ ...rentBuyState, downPayment: v })}
                  />

                  <PercentField
                    label="Mortgage interest rate"
                    value={rentBuyState.rate || 6.5}
                    min={3}
                    max={12}
                    step={0.125}
                    onChange={(v) => setRentBuyState({ ...rentBuyState, rate: v })}
                  />

                  <PercentField
                    label="Expected annual home appreciation"
                    value={rentBuyState.appreciation || 3.5}
                    min={0}
                    max={10}
                    step={0.25}
                    onChange={(v) => setRentBuyState({ ...rentBuyState, appreciation: v })}
                  />
                </div>
              </SectionCard>

              <SectionCard index="02" title="If you rent & invest" fieldsCount="3 fields">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <CurrencyField
                    label="Current monthly rent"
                    value={rentBuyState.monthlyRent}
                    min={500}
                    max={10000}
                    step={50}
                    onChange={(v) => setRentBuyState({ ...rentBuyState, monthlyRent: v })}
                  />

                  <PercentField
                    label="Annual rent increase"
                    value={rentBuyState.rentGrowth || 3.0}
                    min={0}
                    max={10}
                    step={0.5}
                    onChange={(v) => setRentBuyState({ ...rentBuyState, rentGrowth: v })}
                  />

                  <PercentField
                    label="Investment portfolio return"
                    value={rentBuyState.investReturn || 6.0}
                    min={1}
                    max={12}
                    step={0.5}
                    caption="Expected return if savings are invested in index funds."
                    onChange={(v) => setRentBuyState({ ...rentBuyState, investReturn: v })}
                  />
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <label className="text-sm font-medium text-slate-800 block mb-2">
                    Evaluation Horizon: <span className="font-bold text-teal-700">{rentBuyState.horizon || 10} Years</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={rentBuyState.horizon || 10}
                    onChange={(e) => setRentBuyState({ ...rentBuyState, horizon: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-200 rounded-lg accent-teal-600 cursor-pointer"
                  />
                </div>
              </SectionCard>
            </>
          )}

          {/* TAB 5: VA PURCHASE */}
          {activeTab === "vapurchase" && (
            <>
              <SectionCard index="01" title="The VA purchase loan" fieldsCount="4 fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CurrencyField
                    label="Home purchase price"
                    value={vaPurchaseState.homeValue}
                    min={100000}
                    max={2000000}
                    step={10000}
                    onChange={(v) => setVaPurchaseState({ ...vaPurchaseState, homeValue: v })}
                  />

                  <CurrencyField
                    label="Down payment (0% down allowed for VA)"
                    value={vaPurchaseState.downPayment || 0}
                    min={0}
                    max={vaPurchaseState.homeValue}
                    step={5000}
                    onChange={(v) => setVaPurchaseState({ ...vaPurchaseState, downPayment: v })}
                  />

                  <PercentField
                    label="Interest rate"
                    value={vaPurchaseState.rate || 6.25}
                    min={3}
                    max={10}
                    step={0.125}
                    onChange={(v) => setVaPurchaseState({ ...vaPurchaseState, rate: v })}
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800 block">
                      First-time VA loan use?
                    </label>
                    <div className="grid grid-cols-2 gap-2 h-12">
                      {[
                        { val: true, label: "First Use (2.15%)" },
                        { val: false, label: "Subsequent (3.3%)" },
                      ].map((item) => (
                        <button
                          key={String(item.val)}
                          type="button"
                          onClick={() => setVaPurchaseState({ ...vaPurchaseState, firstUse: item.val })}
                          className={`rounded-xl font-bold text-xs border transition-colors ${
                            vaPurchaseState.firstUse === item.val
                              ? "bg-teal-600 text-white border-teal-600"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="va-exempt-check"
                    checked={Boolean(vaPurchaseState.exempt)}
                    onChange={(e) => setVaPurchaseState({ ...vaPurchaseState, exempt: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="va-exempt-check" className="text-sm text-slate-700 font-medium cursor-pointer">
                    Exempt from VA funding fee (Service-connected disability rating ≥ 10%)
                  </label>
                </div>
              </SectionCard>
            </>
          )}

          {/* TAB 6: VA REFINANCE (IRRRL) */}
          {activeTab === "varefi" && (
            <>
              <SectionCard index="01" title="Current VA loan" fieldsCount="3 fields">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <CurrencyField
                    label="Current VA balance"
                    value={vaRefiState.currentBalance}
                    min={100000}
                    max={2000000}
                    step={5000}
                    onChange={(v) => setVaRefiState({ ...vaRefiState, currentBalance: v })}
                  />

                  <PercentField
                    label="Current interest rate"
                    value={vaRefiState.currentRate}
                    min={3}
                    max={12}
                    step={0.125}
                    onChange={(v) => setVaRefiState({ ...vaRefiState, currentRate: v })}
                  />

                  <PercentField
                    label="Proposed new VA rate"
                    value={vaRefiState.newRate}
                    min={3}
                    max={10}
                    step={0.125}
                    onChange={(v) => setVaRefiState({ ...vaRefiState, newRate: v })}
                  />
                </div>
              </SectionCard>

              <SectionCard index="02" title="IRRRL streamline options" fieldsCount="2 fields">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CurrencyField
                    label="Estimated closing costs"
                    value={vaRefiState.closingCosts || 4500}
                    min={1000}
                    max={15000}
                    step={500}
                    onChange={(v) => setVaRefiState({ ...vaRefiState, closingCosts: v })}
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800 block">
                      VA funding fee
                    </label>
                    <div className="h-12 flex items-center px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-700">
                      {vaRefiState.exempt ? "$0 (Disability Exempt)" : "0.50% ($" + vaRefiRes.fundingFee.toLocaleString() + ")"}
                    </div>
                  </div>
                </div>
              </SectionCard>
            </>
          )}

          {/* TAB 8: FIX & FLIP */}
          {activeTab === "flip" && (
            <>
              <SectionCard index="01" title="The property & rehab" fieldsCount="3 fields">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <CurrencyField
                    label="Purchase price"
                    value={flipState.purchasePrice}
                    min={50000}
                    max={2000000}
                    step={10000}
                    onChange={(v) => setFlipState({ ...flipState, purchasePrice: v })}
                  />

                  <CurrencyField
                    label="Rehab budget"
                    value={flipState.rehabBudget}
                    min={5000}
                    max={500000}
                    step={5000}
                    onChange={(v) => setFlipState({ ...flipState, rehabBudget: v })}
                  />

                  <CurrencyField
                    label="After-repair value (ARV)"
                    value={flipState.arv}
                    min={100000}
                    max={3000000}
                    step={10000}
                    onChange={(v) => setFlipState({ ...flipState, arv: v })}
                  />
                </div>
              </SectionCard>

              <SectionCard index="02" title="Hard money loan" fieldsCount="3 fields">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <PercentField
                    label="Loan to cost (LTC)"
                    value={flipState.loanToCost || 85}
                    min={50}
                    max={95}
                    step={1}
                    onChange={(v) => setFlipState({ ...flipState, loanToCost: v })}
                  />

                  <PercentField
                    label="Interest rate (IO)"
                    value={flipState.rate || 11.0}
                    min={6}
                    max={18}
                    step={0.25}
                    onChange={(v) => setFlipState({ ...flipState, rate: v })}
                  />

                  <PercentField
                    label="Points"
                    value={flipState.points || 2.0}
                    min={0}
                    max={5}
                    step={0.5}
                    onChange={(v) => setFlipState({ ...flipState, points: v })}
                  />
                </div>
              </SectionCard>

              <SectionCard index="03" title="Holding & selling" fieldsCount="3 fields">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-800 block">
                      Hold period: {flipState.holdMonths || 6} months
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={24}
                      step={1}
                      value={flipState.holdMonths || 6}
                      onChange={(e) => setFlipState({ ...flipState, holdMonths: Number(e.target.value) })}
                      className="w-full h-2 bg-slate-200 rounded-lg accent-teal-600 cursor-pointer mt-2"
                    />
                  </div>

                  <CurrencyField
                    label="Monthly carrying costs"
                    value={flipState.monthlyCarrying || 800}
                    suffix="per mo"
                    min={100}
                    max={5000}
                    step={50}
                    onChange={(v) => setFlipState({ ...flipState, monthlyCarrying: v })}
                  />

                  <PercentField
                    label="Selling costs"
                    value={flipState.sellingCosts || 6.0}
                    min={1}
                    max={10}
                    step={0.5}
                    caption="Realtor commissions and transfer taxes."
                    onChange={(v) => setFlipState({ ...flipState, sellingCosts: v })}
                  />
                </div>
              </SectionCard>
            </>
          )}

          {/* Footnote Disclosures */}
          <div className="text-xs text-slate-500 leading-relaxed pt-2">
            Figures are estimates for illustration only and are not a loan offer, a commitment to lend, or a rate lock. Actual terms depend on credit approval, property details and market conditions.
          </div>
        </div>

        {/* ==============================================================
         * RIGHT COLUMN: STICKY RESULTS RAIL (DARK CARD, VERDICT, ROWS)
         * Exact visual design matching media_1792747032892.png
         * ============================================================== */}
        <aside className="w-full lg:w-[420px] flex-shrink-0 space-y-4 lg:sticky lg:top-24">
          
          {/* 1. Primary Dark Card */}
          <div className="bg-[#18181B] text-white rounded-2xl p-7 shadow-xl space-y-2 border border-slate-800">
            {activeTab === "dscr" && (
              <>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Debt-service coverage ratio
                </div>
                <div className="font-heading font-black text-5xl sm:text-6xl text-white tracking-tight py-1">
                  {dscrRes.dscr.toFixed(2)}×
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Net operating income divided by annual debt service
                </div>
              </>
            )}

            {activeTab === "purchase" && (
              <>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Estimated monthly payment
                </div>
                <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight py-1">
                  ${purchaseRes.total.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Principal, interest, taxes, insurance, and fees
                </div>
                {/* Stacked Breakdown Bar */}
                <div className="pt-3">
                  <div className="h-2.5 rounded-full overflow-hidden flex w-full bg-slate-800">
                    {purchaseRes.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: `${(item.value / purchaseRes.total) * 100}%`,
                          backgroundColor: item.color,
                        }}
                        title={`${item.label}: $${item.value.toLocaleString()}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "afford" && (
              <>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Maximum purchase price
                </div>
                <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight py-1">
                  ${Math.round(affordRes.maxPrice).toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Maximum home price supported by income, debts, and selected {affordState.dtiCeiling}% DTI ceiling
                </div>
              </>
            )}

            {activeTab === "refi" && (
              <>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Monthly payment savings
                </div>
                <div className={`font-heading font-black text-4xl sm:text-5xl tracking-tight py-1 ${refiRes.monthlySaving >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {refiRes.monthlySaving >= 0 ? `+$${refiRes.monthlySaving.toLocaleString()}` : `-$${Math.abs(refiRes.monthlySaving).toLocaleString()}`}
                  <span className="text-lg font-normal text-slate-400">/mo</span>
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Difference between current payment and proposed new payment
                </div>
              </>
            )}

            {activeTab === "rentbuy" && (
              <>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Net wealth advantage
                </div>
                <div className={`font-heading font-black text-4xl sm:text-5xl tracking-tight py-1 ${rentBuyRes.advantage >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {rentBuyRes.advantage >= 0 ? `+$${rentBuyRes.advantage.toLocaleString()}` : `-$${Math.abs(rentBuyRes.advantage).toLocaleString()}`}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  {rentBuyRes.advantage >= 0 ? `Buying creates more net equity over ${rentBuyState.horizon} years` : `Renting preserves more capital over ${rentBuyState.horizon} years`}
                </div>
              </>
            )}

            {activeTab === "vapurchase" && (
              <>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Estimated VA monthly payment
                </div>
                <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight py-1">
                  ${vaPurchaseRes.total.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  100% military financing with $0 down and $0 monthly PMI
                </div>
              </>
            )}

            {activeTab === "varefi" && (
              <>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Monthly IRRRL savings
                </div>
                <div className={`font-heading font-black text-4xl sm:text-5xl tracking-tight py-1 ${vaRefiRes.monthlySaving >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {vaRefiRes.monthlySaving >= 0 ? `+$${vaRefiRes.monthlySaving.toLocaleString()}` : `-$${Math.abs(vaRefiRes.monthlySaving).toLocaleString()}`}
                  <span className="text-lg font-normal text-slate-400">/mo</span>
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Streamlined payment drop with no appraisal required
                </div>
              </>
            )}

            {activeTab === "flip" && (
              <>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Projected net profit
                </div>
                <div className={`font-heading font-black text-4xl sm:text-5xl tracking-tight py-1 ${flipRes.netProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  ${flipRes.netProfit.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Net return after rehab, carrying costs, points, interest, and selling commissions
                </div>
              </>
            )}
          </div>

          {/* 2. Verdict Card (Exact match to media_1792747032892.png) */}
          {activeTab === "dscr" && (
            <div
              className={`rounded-2xl p-6 border ${
                dscrRes.tone === "bad"
                  ? "bg-rose-50/70 border-rose-200/90 text-rose-950"
                  : dscrRes.tone === "warn"
                  ? "bg-amber-50/70 border-amber-200/90 text-amber-950"
                  : "bg-emerald-50/70 border-emerald-200/90 text-emerald-950"
              }`}
            >
              <h3 className={`font-heading font-bold text-lg ${
                dscrRes.tone === "bad" ? "text-rose-900" : dscrRes.tone === "warn" ? "text-amber-900" : "text-emerald-900"
              }`}>
                {dscrRes.verdict}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mt-1.5 ${
                dscrRes.tone === "bad" ? "text-rose-800/90" : dscrRes.tone === "warn" ? "text-amber-800/90" : "text-emerald-800/90"
              }`}>
                {dscrRes.body}
              </p>
            </div>
          )}

          {activeTab === "refi" && (
            <div
              className={`rounded-2xl p-6 border ${
                refiRes.tone === "bad"
                  ? "bg-rose-50/70 border-rose-200/90 text-rose-950"
                  : refiRes.tone === "warn"
                  ? "bg-amber-50/70 border-amber-200/90 text-amber-950"
                  : "bg-emerald-50/70 border-emerald-200/90 text-emerald-950"
              }`}
            >
              <h3 className="font-heading font-bold text-lg">
                {refiRes.verdict}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mt-1.5">
                {refiRes.monthlySaving > 0
                  ? `You save $${refiRes.annualSaving.toLocaleString()} annually in mortgage payments, covering all closing costs within ${refiRes.breakEvenMonths} months.`
                  : "The new interest rate and terms increase your payment compared to your existing balance."}
              </p>
            </div>
          )}

          {activeTab === "rentbuy" && (
            <div
              className={`rounded-2xl p-6 border ${
                rentBuyRes.tone === "warn"
                  ? "bg-amber-50/70 border-amber-200/90 text-amber-950"
                  : "bg-emerald-50/70 border-emerald-200/90 text-emerald-950"
              }`}
            >
              <h3 className="font-heading font-bold text-lg">
                {rentBuyRes.verdict}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mt-1.5">
                {rentBuyRes.buyingWins
                  ? `After ${rentBuyState.horizon} years, equity appreciation and debt paydown generate a $${rentBuyRes.advantage.toLocaleString()} net worth advantage over renting.`
                  : `Over ${rentBuyState.horizon} years, investing your down payment and closing costs provides higher liquid capital than property appreciation.`}
              </p>
            </div>
          )}

          {activeTab === "varefi" && (
            <div
              className={`rounded-2xl p-6 border ${
                vaRefiRes.tone === "bad"
                  ? "bg-rose-50/70 border-rose-200/90 text-rose-950"
                  : "bg-emerald-50/70 border-emerald-200/90 text-emerald-950"
              }`}
            >
              <h3 className="font-heading font-bold text-lg">
                {vaRefiRes.verdict}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mt-1.5">
                {vaRefiRes.passesRecoupment
                  ? "Federal law requires VA streamline refinances to recoup all closing fees within 36 months. Your file easily satisfies this statutory threshold."
                  : "The proposed payment drop is insufficient to cover closing costs within the statutory 36-month recoupment period required by the VA."}
              </p>
            </div>
          )}

          {activeTab === "flip" && (
            <div
              className={`rounded-2xl p-6 border ${
                flipRes.tone === "bad"
                  ? "bg-rose-50/70 border-rose-200/90 text-rose-950"
                  : flipRes.tone === "warn"
                  ? "bg-amber-50/70 border-amber-200/90 text-amber-950"
                  : "bg-emerald-50/70 border-emerald-200/90 text-emerald-950"
              }`}
            >
              <h3 className="font-heading font-bold text-lg">
                {flipRes.verdict}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mt-1.5">
                {flipRes.body}
              </p>
            </div>
          )}

          {/* 3. Breakdown Rows Card (Exact match to media_1792747032892.png) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-1">
            {activeTab === "dscr" && (
              <>
                <Row label="Loan amount" value={`$${dscrRes.loanAmount.toLocaleString()}`} />
                <Row label="Down payment" value={`$${dscrRes.downPayment.toLocaleString()}`} />
                <Row label="Cash to close" value={`$${dscrRes.cashToClose.toLocaleString()}`} />
                <Row label="Gross annual rent" value={`$${dscrRes.grossAnnualRent.toLocaleString()}`} />
                <Row label="Operating expenses" value={`$${dscrRes.operatingExpenses.toLocaleString()}`} />
                <Row label="Net operating income" value={`$${dscrRes.noi.toLocaleString()}`} />
                <Row label="Annual debt service" value={`$${Math.round(dscrRes.annualDebtService).toLocaleString()}`} />
                <Row
                  label="Monthly cash flow"
                  value={`${dscrRes.monthlyCashFlow < 0 ? "-" : ""}$${Math.abs(dscrRes.monthlyCashFlow).toFixed(2)}`}
                  isNegative={dscrRes.monthlyCashFlow < 0}
                />
                <Row label="Cap rate" value={`${dscrRes.capRate.toFixed(2)}%`} />
                <Row
                  label="Cash on cash return"
                  value={`${dscrRes.cashOnCash.toFixed(2)}%`}
                  isNegative={dscrRes.cashOnCash < 0}
                />
              </>
            )}

            {activeTab === "purchase" && (
              <>
                <Row label="Loan amount" value={`$${purchaseRes.loanAmount.toLocaleString()}`} />
                <Row label="Down payment" value={`$${purchaseRes.downPayment.toLocaleString()} (${purchaseRes.downPercent}%)`} />
                <Row label="Principal & interest" value={`$${purchaseRes.principalInterest.toLocaleString()}`} />
                <Row label="Property taxes" value={`$${purchaseRes.tax.toLocaleString()}/mo`} />
                <Row label="Home insurance" value={`$${purchaseRes.insurance.toLocaleString()}/mo`} />
                {purchaseRes.pmi > 0 && (
                  <Row label="Mortgage insurance (PMI)" value={`$${purchaseRes.pmi.toLocaleString()}/mo`} />
                )}
                {purchaseRes.hoa > 0 && (
                  <Row label="HOA dues" value={`$${purchaseRes.hoa.toLocaleString()}/mo`} />
                )}
                <Row label="Total monthly payment" value={`$${purchaseRes.total.toLocaleString()}`} highlight />
                <Row label="Total lifetime interest" value={`$${purchaseRes.totalInterest.toLocaleString()}`} />
                {purchaseRes.monthsSaved > 0 && (
                  <Row label="Extra payments saved" value={`$${purchaseRes.interestSaved.toLocaleString()} (${purchaseRes.monthsSaved} mo)`} />
                )}
              </>
            )}

            {activeTab === "afford" && (
              <>
                <Row label="Maximum purchase price" value={`$${Math.round(affordRes.maxPrice).toLocaleString()}`} highlight />
                <Row label="Down payment applied" value={`$${Math.round(affordRes.downPayment).toLocaleString()} (${affordRes.downPercent.toFixed(1)}%)`} />
                <Row label="Estimated loan amount" value={`$${Math.round(affordRes.loanAmount).toLocaleString()}`} />
                <Row label="Monthly housing budget" value={`$${Math.round(affordRes.budget).toLocaleString()}`} />
                <Row label="Estimated monthly payment" value={`$${Math.round(affordRes.monthlyPayment).toLocaleString()}`} />
                <Row label="Front-end housing DTI" value={`${affordRes.frontEndDti.toFixed(1)}%`} />
                <Row label="Back-end total DTI" value={`${affordRes.backEndDti.toFixed(1)}%`} />
              </>
            )}

            {activeTab === "refi" && (
              <>
                <Row label="Current monthly payment" value={`$${refiRes.currentPayment.toLocaleString()}`} />
                <Row label="Proposed new payment" value={`$${refiRes.newPayment.toLocaleString()}`} />
                <Row label="Monthly savings" value={`$${refiRes.monthlySaving.toLocaleString()}`} highlight />
                <Row label="Annual savings" value={`$${refiRes.annualSaving.toLocaleString()}`} />
                <Row label="Break-even recoup period" value={`${refiRes.breakEvenMonths} months`} />
                <Row label="New loan amount" value={`$${refiRes.newLoanAmount.toLocaleString()}`} />
                <Row label="Lifetime interest diff" value={`$${refiRes.lifetimeDifference.toLocaleString()}`} />
              </>
            )}

            {activeTab === "rentbuy" && (
              <>
                <Row label="Time horizon" value={`${rentBuyRes.horizon} years`} />
                <Row label="Break-even crossover year" value={rentBuyRes.crossoverYear ? `Year ${rentBuyRes.crossoverYear}` : "Over 10 years"} />
                <Row label="Projected home value" value={`$${Math.round(rentBuyRes.finalHomeValue).toLocaleString()}`} />
                <Row label="Accumulated home equity" value={`$${Math.round(rentBuyRes.finalEquity).toLocaleString()}`} />
                <Row label="Total rent paid" value={`$${Math.round(rentBuyRes.totalRentPaid).toLocaleString()}`} />
                <Row label="Net buying advantage" value={`$${rentBuyRes.advantage.toLocaleString()}`} highlight />
              </>
            )}

            {activeTab === "vapurchase" && (
              <>
                <Row label="Base loan amount" value={`$${vaPurchaseRes.baseLoan.toLocaleString()}`} />
                <Row label="VA funding fee" value={`$${vaPurchaseRes.fundingFee.toLocaleString()} (${vaPurchaseRes.fundingFeeRate}%)`} />
                <Row label="Total loan balance" value={`$${vaPurchaseRes.totalLoan.toLocaleString()}`} />
                <Row label="VA monthly payment" value={`$${vaPurchaseRes.total.toLocaleString()}`} highlight />
                <Row label="Conventional equivalent" value={`$${vaPurchaseRes.conventionalPayment.toLocaleString()}`} />
                <Row label="Monthly VA advantage" value={`$${vaPurchaseRes.monthlyAdvantage.toLocaleString()}/mo`} />
              </>
            )}

            {activeTab === "varefi" && (
              <>
                <Row label="Current payment" value={`$${vaRefiRes.currentPayment.toLocaleString()}`} />
                <Row label="Proposed new payment" value={`$${vaRefiRes.newPayment.toLocaleString()}`} />
                <Row label="Monthly reduction" value={`$${vaRefiRes.monthlySaving.toLocaleString()}`} highlight />
                <Row label="VA funding fee (0.5%)" value={`$${vaRefiRes.fundingFee.toLocaleString()}`} />
                <Row label="New financed loan" value={`$${vaRefiRes.newLoanAmount.toLocaleString()}`} />
                <Row label="Recoupment period" value={`${vaRefiRes.recoupMonths} months (Limit: 36 mo)`} />
              </>
            )}

            {activeTab === "flip" && (
              <>
                <Row label="Total cost (Buy + Rehab)" value={`$${flipRes.totalCost.toLocaleString()}`} />
                <Row label="Hard money loan" value={`$${flipRes.loanAmount.toLocaleString()}`} />
                <Row label="Cash out-of-pocket" value={`$${flipRes.cashIn.toLocaleString()}`} />
                <Row label="Total project cost" value={`$${flipRes.totalProjectCost.toLocaleString()}`} />
                <Row label="Projected net profit" value={`$${flipRes.netProfit.toLocaleString()}`} highlight />
                <Row label="Return on investment (ROI)" value={`${flipRes.roi.toFixed(1)}%`} />
                <Row label="Annualized ROI" value={`${flipRes.annualizedRoi.toFixed(1)}%`} />
                <Row label="Profit margin (% of ARV)" value={`${flipRes.profitMargin.toFixed(1)}%`} />
                <Row label="70% rule max offer" value={`$${flipRes.maxOffer.toLocaleString()}`} />
              </>
            )}
          </div>

          {/* Action CTA Button */}
          <div className="pt-2">
            <Link
              href="/get-started"
              className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg"
            >
              Get Pre-Approved for this Scenario →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

// =====================================================================
// REUSABLE SUB-COMPONENTS
// =====================================================================

function SectionCard({
  index,
  title,
  fieldsCount,
  children,
}: {
  index: string;
  title: string;
  fieldsCount: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="text-slate-400 font-mono text-xs font-semibold">{index}</span>
          <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
            {title}
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">{fieldsCount}</span>
      </div>
      <div>{children}</div>
    </section>
  );
}

function CurrencyField({
  label,
  value,
  min,
  max,
  step = 1000,
  suffix,
  caption,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  caption?: string;
  onChange: (val: number) => void;
}) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-800 block">
        {label}
      </label>
      <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 h-12 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all shadow-2xs">
        <span className="text-slate-400 text-sm font-semibold mr-1.5 select-none">$</span>
        <input
          id={id}
          type="number"
          value={value === 0 ? "" : value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-slate-900 font-bold font-mono text-base outline-none"
        />
        {suffix && (
          <span className="text-slate-500 text-xs font-medium ml-1.5 select-none bg-slate-50 px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap">
            {suffix}
          </span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-lg accent-teal-600 cursor-pointer mt-1"
      />
      {caption && <p className="text-xs text-slate-500 leading-normal">{caption}</p>}
    </div>
  );
}

function PercentField({
  label,
  value,
  min,
  max,
  step = 0.125,
  caption,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  caption?: string;
  onChange: (val: number) => void;
}) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-800 block">
        {label}
      </label>
      <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 h-12 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all shadow-2xs">
        <input
          id={id}
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-slate-900 font-bold font-mono text-base outline-none"
        />
        <span className="text-slate-400 text-sm font-semibold ml-1.5 select-none">%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-lg accent-teal-600 cursor-pointer mt-1"
      />
      {caption && <p className="text-xs text-slate-500 leading-normal">{caption}</p>}
    </div>
  );
}

function Row({
  label,
  value,
  isNegative = false,
  highlight = false,
}: {
  label: string;
  value: string;
  isNegative?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-2 border-b border-slate-100 last:border-0 text-sm ${
        highlight ? "font-bold text-slate-900 bg-slate-50/50 -mx-2 px-2 rounded-lg" : ""
      }`}
    >
      <span className="text-slate-600 font-medium">{label}</span>
      <span
        className={`font-mono font-bold ${
          isNegative ? "text-rose-600" : highlight ? "text-slate-900 text-base" : "text-slate-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
