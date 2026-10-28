"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config/siteConfig";

export interface QuoteFormData {
  goal: "purchase" | "refinance";
  propertyType: "Single Family" | "Townhouse" | "Condominium" | "Multi-Family";
  purchaseTiming?: "Signed a purchase contract" | "Found a home" | "Looking to buy within one month" | "Looking to buy within 1 to 3 months" | "1 to 3 months" | "> 3 months" | string;
  occupancy: "Primary Residence" | "Vacation Property" | "Investment Property";
  militaryService: "Yes" | "No";
  firstTimeBuyer?: "Yes" | "No";
  propertyValue: number;
  downPayment: number;
  firstMortgageBalance: number;
  firstMortgageRate: number;
  secondMortgage?: "Yes" | "No";
  cashOutAmount: number;
  employmentStatus: "Employed" | "Self-Employed / 1099" | "Retired" | "Other";
  annualIncome: "< $50,000" | "$50,000 - $75,000" | "$75,000 - $100,000" | "$100,000 - $150,000" | "$150,000+";
  creditScoreTier: "Excellent (740+)" | "Good (700-739)" | "Average (660-699)" | "Fair (600-659)" | "Poor (< 600)";
  zipCode: string;
  city: string;
  state: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tcpaConsent: boolean;
  honeypot: string;
}

export function VonkQuoteWizard() {
  const [data, setData] = useState<QuoteFormData>({
    goal: "purchase",
    propertyType: "Single Family",
    purchaseTiming: "Looking to buy within 1 to 3 months",
    occupancy: "Primary Residence",
    militaryService: "No",
    firstTimeBuyer: "Yes",
    propertyValue: 425000,
    downPayment: 42500,
    firstMortgageBalance: 280000,
    firstMortgageRate: 6.875,
    secondMortgage: "No",
    cashOutAmount: 0,
    employmentStatus: "Employed",
    annualIncome: "$75,000 - $100,000",
    creditScoreTier: "Good (700-739)",
    zipCode: "28202",
    city: "Charlotte",
    state: "NC",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    tcpaConsent: false,
    honeypot: "",
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteResult, setQuoteResult] = useState<{
    submitted: boolean;
    quoteId: string;
    monthlyPAndI: number;
    monthlyTaxes: number;
    monthlyInsurance: number;
    monthlyPmi: number;
    monthlyTotal: number;
    estRate: number;
    estApr: number;
    recommendedProgram: string;
    loanAmount: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dynamic steps based on goal
  const isPurchase = data.goal === "purchase";

  // Step definitions
  const steps = isPurchase
    ? [
        { id: "goal", title: "What is your primary loan goal?" },
        { id: "propertyType", title: "What type of property are you financing?" },
        { id: "timing", title: "When are you planning to purchase?" },
        { id: "occupancy", title: "How will you use this property?" },
        { id: "military", title: "Have you or your spouse served in the US Military?" },
        { id: "firstTime", title: "Are you a first-time homebuyer?" },
        { id: "price", title: "What is your estimated purchase price?" },
        { id: "downPayment", title: "What is your planned down payment?" },
        { id: "employment", title: "What is your current employment status?" },
        { id: "income", title: "What is your household annual gross income?" },
        { id: "credit", title: "What is your estimated credit score range?" },
        { id: "location", title: "Where is the property located?" },
        { id: "borrower", title: "What is your legal name?" },
        { id: "contact", title: "Where should we deliver your custom quote?" },
      ]
    : [
        { id: "goal", title: "What is your primary loan goal?" },
        { id: "propertyType", title: "What type of property are you financing?" },
        { id: "occupancy", title: "How will you use this property?" },
        { id: "military", title: "Have you or your spouse served in the US Military?" },
        { id: "price", title: "What is the estimated market value of your home?" },
        { id: "balance", title: "What is your current 1st mortgage balance?" },
        { id: "rate", title: "What is your current interest rate?" },
        { id: "secondMortgage", title: "Do you have a second mortgage or HELOC?" },
        { id: "cashOut", title: "Do you want to borrow additional cash from your equity?" },
        { id: "employment", title: "What is your current employment status?" },
        { id: "income", title: "What is your household annual gross income?" },
        { id: "credit", title: "What is your estimated credit score range?" },
        { id: "location", title: "Where is the property located?" },
        { id: "borrower", title: "What is your legal name?" },
        { id: "contact", title: "Where should we deliver your custom quote?" },
      ];

  const currentStep = steps[stepIndex];
  const progressPct = Math.round(((stepIndex + 1) / steps.length) * 100);

  const nextStep = () => {
    setErrorMsg(null);
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setErrorMsg(null);
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleSelectOption = (update: Partial<QuoteFormData>) => {
    setData((prev) => ({ ...prev, ...update }));
    // Auto-advance for crisp single-click experience
    setTimeout(() => {
      if (stepIndex < steps.length - 1) {
        setStepIndex((prev) => prev + 1);
      }
    }, 150);
  };

  // Submit quote
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.firstName.trim() || !data.lastName.trim()) {
      setErrorMsg("Please enter both your first and last name.");
      return;
    }
    if (!data.email.trim() || !data.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!data.phone.trim() || data.phone.replace(/[^0-9]/g, "").length < 10) {
      setErrorMsg("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!data.tcpaConsent) {
      setErrorMsg("Please check the consent box to receive your rate quote.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // Calculate quote metrics
    const loanBal = isPurchase
      ? Math.max(0, data.propertyValue - data.downPayment)
      : data.firstMortgageBalance + data.cashOutAmount;

    let baseRate = 6.375;
    let recProg = "30-Year Conventional Fixed";

    if (data.militaryService === "Yes") {
      baseRate = 5.99;
      recProg = "30-Year VA Military Advantage (0% Down, $0 PMI)";
    } else if (data.creditScoreTier.includes("Poor") || data.creditScoreTier.includes("Fair")) {
      baseRate = 6.25;
      recProg = "FHA Government Guaranteed (Low Down Payment)";
    } else if (loanBal > 806495) {
      baseRate = 6.625;
      recProg = "Premier Jumbo Capital Loan";
    }

    const monthlyInterestRate = baseRate / 100 / 12;
    const numPayments = 360;
    const monthlyPAndI = Math.round(
      (loanBal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numPayments))) /
        (Math.pow(1 + monthlyInterestRate, numPayments) - 1)
    );

    const monthlyTaxes = Math.round((data.propertyValue * 0.011) / 12);
    const monthlyInsurance = Math.round(1350 / 12);
    const ltv = (loanBal / data.propertyValue) * 100;
    const monthlyPmi =
      isPurchase && ltv > 80 && data.militaryService !== "Yes"
        ? Math.round((loanBal * 0.0055) / 12)
        : 0;

    const monthlyTotal = monthlyPAndI + monthlyTaxes + monthlyInsurance + monthlyPmi;

    try {
      // Post to lead endpoint
      const payload = {
        loanPurpose: isPurchase ? "buy" : "refinance",
        propertyStatus: isPurchase ? "Shopping for a home" : "Refinancing existing home",
        propertyType: data.propertyType,
        occupancy: data.occupancy,
        state: data.state || "NC",
        zipCode: data.zipCode || "28202",
        propertyValue: Number(data.propertyValue),
        downPayment: isPurchase ? Number(data.downPayment) : 0,
        currentMortgageBalance: !isPurchase ? Number(data.firstMortgageBalance) : 0,
        cashOutAmount: !isPurchase ? Number(data.cashOutAmount) : 0,
        creditScoreRange: data.creditScoreTier,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        preferredContact: "phone",
        preferredTime: "Morning",
        tcpaConsent: true,
        sourceCampaign: "Vonk-Style Instant Rate Quote",
        websiteCompanyField: data.honeypot,
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setQuoteResult({
        submitted: true,
        quoteId: `NQ-${Date.now().toString(36).toUpperCase()}`,
        monthlyPAndI,
        monthlyTaxes,
        monthlyInsurance,
        monthlyPmi,
        monthlyTotal,
        estRate: baseRate,
        estApr: Number((baseRate + 0.14).toFixed(3)),
        recommendedProgram: recProg,
        loanAmount: loanBal,
      });
    } catch {
      setErrorMsg("An error occurred generating your quote. Please contact our desk directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If quote result is ready, display breakdown view
  if (quoteResult) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-4xl mx-auto animate-fadeIn">
        {/* Quote Success Header */}
        <div className="text-center pb-8 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Custom Loan Estimate Ready • Ref ID: {quoteResult.quoteId}</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-navy-midnight">
            Your Instant Rate & Payment Quote
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Prepared specifically for <strong>{data.firstName} {data.lastName}</strong> for {data.city}, {data.state} {data.zipCode}.
          </p>
        </div>

        {/* Primary Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-navy-midnight text-white rounded-2xl p-6 text-center space-y-1 shadow-lg border border-navy-light/40">
            <span className="text-xs uppercase font-bold text-brass tracking-wider">
              Est. Total Monthly Payment
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-white">
              ${quoteResult.monthlyTotal.toLocaleString()}
            </div>
            <span className="text-xs text-slate-300">Principal, Interest, Taxes & Insurance (PITI)</span>
          </div>

          <div className="bg-ivory-warm rounded-2xl p-6 text-center space-y-1 border border-border-subtle">
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Benchmark Rate / APR
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight">
              {quoteResult.estRate.toFixed(3)}%
            </div>
            <span className="text-xs text-slate-500 font-semibold">{quoteResult.estApr.toFixed(3)}% Est. APR</span>
          </div>

          <div className="bg-ivory-warm rounded-2xl p-6 text-center space-y-1 border border-border-subtle">
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Financed Loan Balance
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight">
              ${quoteResult.loanAmount.toLocaleString()}
            </div>
            <span className="text-xs text-slate-500">
              {isPurchase ? `Purchase Price: $${data.propertyValue.toLocaleString()}` : `Home Value: $${data.propertyValue.toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* Monthly Payment Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 mb-8 space-y-4">
          <h3 className="font-heading font-bold text-lg text-navy-midnight flex items-center justify-between">
            <span>Itemized Monthly Cost Breakdown</span>
            <span className="text-xs font-semibold text-brass-dark">30-Year Fixed Term</span>
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Principal & Interest (P&I)</span>
              <span className="font-bold text-navy-midnight">${quoteResult.monthlyPAndI.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Estimated Property Taxes</span>
              <span className="font-bold text-navy-midnight">${quoteResult.monthlyTaxes.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Homeowners Hazard Insurance</span>
              <span className="font-bold text-navy-midnight">${quoteResult.monthlyInsurance.toLocaleString()}</span>
            </div>
            {quoteResult.monthlyPmi > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-slate-100 text-amber-700">
                <span>Private Mortgage Insurance (Cancellable at 20% equity)</span>
                <span className="font-bold">${quoteResult.monthlyPmi.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 font-heading font-bold text-base text-navy-midnight">
              <span>Total Estimated Monthly Out-of-Pocket</span>
              <span className="text-brass-dark text-lg">${quoteResult.monthlyTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Recommended Loan Program Banner */}
        <div className="p-5 rounded-2xl bg-brass/10 border border-brass/30 mb-8 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-brass text-navy-deep flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5">
            ★
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-navy-midnight">
              Recommended Lending Match
            </span>
            <h4 className="font-heading font-bold text-lg text-navy-midnight mt-0.5">
              {quoteResult.recommendedProgram}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Based on your credit rating tier ({data.creditScoreTier}) and down payment structure, this program maximizes your monthly savings and provides competitive wholesale rate lock terms.
            </p>
          </div>
        </div>

        {/* Action Next Steps */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/apply-now"
            className="w-full sm:w-auto inline-flex items-center justify-center font-bold text-sm sm:text-base px-8 py-3.5 rounded-lg bg-brass text-navy-deep hover:bg-brass-hover transition-colors shadow-md text-center"
          >
            Lock In This Rate & Apply Now →
          </Link>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
            className="w-full sm:w-auto inline-flex items-center justify-center font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg border border-slate-400 text-navy-midnight hover:bg-ivory-warm transition-colors text-center"
          >
            📞 Speak with Senior Lending Officer
          </a>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6 leading-relaxed">
          Quote Ref #{quoteResult.quoteId} • {siteConfig.brand.legalName} • NMLS #{siteConfig.brand.nmlsId} • Disclosures delivered to {data.email}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-3xl mx-auto">
      {/* Top Header & Step Tracker */}
      <div className="pb-6 mb-6 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span className="uppercase tracking-wider text-brass font-bold">
            Step {stepIndex + 1} of {steps.length}
          </span>
          <span>{progressPct}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-brass transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <h2 className="font-heading font-black text-xl sm:text-2xl text-navy-midnight mt-5">
          {currentStep.title}
        </h2>
      </div>

      {/* Honeypot Spam Protection */}
      <input
        type="text"
        name="websiteCompanyField"
        value={data.honeypot}
        onChange={(e) => setData({ ...data, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Step Content */}
      <div className="min-h-[260px] flex flex-col justify-center">
        {/* Step: Goal */}
        {currentStep.id === "goal" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSelectOption({ goal: "purchase" })}
              className={`p-6 rounded-2xl border-2 text-left transition-all group ${
                data.goal === "purchase"
                  ? "border-navy-midnight bg-navy-midnight/5 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-xl mb-3">
                🏡
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-midnight group-hover:text-brass-dark">
                I want to purchase a home
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Single-family, townhouse, condo, or multi-unit residential property.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleSelectOption({ goal: "refinance" })}
              className={`p-6 rounded-2xl border-2 text-left transition-all group ${
                data.goal === "refinance"
                  ? "border-navy-midnight bg-navy-midnight/5 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-xl mb-3">
                🔄
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-midnight group-hover:text-brass-dark">
                I want to refinance a home
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Lower your monthly interest rate, drop PMI, or cash out built-up home equity.
              </p>
            </button>
          </div>
        )}

        {/* Step: Property Type */}
        {currentStep.id === "propertyType" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {(["Single Family", "Townhouse", "Condominium", "Multi-Family"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleSelectOption({ propertyType: type })}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  data.propertyType === type
                    ? "border-navy-midnight bg-navy-midnight text-white shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white text-navy-midnight"
                }`}
              >
                <div className="font-bold text-base">{type}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step: Timing (Purchase Only) */}
        {currentStep.id === "timing" && (
          <div className="space-y-3">
            {[
              "Signed a purchase contract",
              "Found a home",
              "Looking to buy within one month",
              "1 to 3 months",
              "> 3 months",
            ].map((timing) => (
              <button
                key={timing}
                type="button"
                onClick={() => handleSelectOption({ purchaseTiming: timing as any })}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                  data.purchaseTiming === timing
                    ? "border-navy-midnight bg-navy-midnight text-white font-bold"
                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-800"
                }`}
              >
                <span>{timing}</span>
                <span className="text-xs">→</span>
              </button>
            ))}
          </div>
        )}

        {/* Step: Occupancy */}
        {currentStep.id === "occupancy" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {(["Primary Residence", "Vacation Property", "Investment Property"] as const).map((occ) => (
              <button
                key={occ}
                type="button"
                onClick={() => handleSelectOption({ occupancy: occ })}
                className={`p-5 rounded-xl border-2 text-center transition-all ${
                  data.occupancy === occ
                    ? "border-navy-midnight bg-navy-midnight text-white shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white text-navy-midnight"
                }`}
              >
                <div className="font-bold text-sm sm:text-base">{occ}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step: Military Service */}
        {currentStep.id === "military" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(["Yes", "No"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelectOption({ militaryService: opt })}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                  data.militaryService === opt
                    ? "border-navy-midnight bg-navy-midnight text-white shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white text-navy-midnight"
                }`}
              >
                <div className="font-heading font-black text-2xl">{opt}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {opt === "Yes" ? "Qualifies for 0% down VA financing" : "Conventional, FHA or Jumbo programs"}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step: First-Time Homebuyer (Purchase Only) */}
        {currentStep.id === "firstTime" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(["Yes", "No"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelectOption({ firstTimeBuyer: opt })}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                  data.firstTimeBuyer === opt
                    ? "border-navy-midnight bg-navy-midnight text-white shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white text-navy-midnight"
                }`}
              >
                <div className="font-heading font-black text-2xl">{opt}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {opt === "Yes" ? "Access 3% down payment programs & grants" : "Standard repeat buyer programs"}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step: Purchase Price / Home Value */}
        {currentStep.id === "price" && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                {isPurchase ? "Target Purchase Price" : "Current Estimated Home Value"}
              </span>
              <div className="font-heading font-black text-4xl text-navy-midnight">
                ${data.propertyValue.toLocaleString()}
              </div>
            </div>

            <input
              type="range"
              min={120000}
              max={1500000}
              step={10000}
              value={data.propertyValue}
              onChange={(e) => {
                const val = Number(e.target.value);
                setData({
                  ...data,
                  propertyValue: val,
                  downPayment: Math.round(val * 0.1),
                });
              }}
              className="w-full accent-navy-midnight cursor-pointer"
            />

            <div className="grid grid-cols-4 gap-2">
              {[250000, 400000, 650000, 950000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      propertyValue: preset,
                      downPayment: Math.round(preset * 0.1),
                    })
                  }
                  className="py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  ${(preset / 1000).toFixed(0)}k
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full py-3.5 rounded-xl bg-navy-midnight text-white font-bold hover:bg-navy-dark transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step: Down Payment (Purchase Only) */}
        {currentStep.id === "downPayment" && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Planned Down Payment Funds
              </span>
              <div className="font-heading font-black text-4xl text-navy-midnight">
                ${data.downPayment.toLocaleString()}
              </div>
              <span className="text-xs text-brass-dark font-bold">
                {Math.round((data.downPayment / data.propertyValue) * 100)}% of Purchase Price
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[3, 5, 10, 20].map((pct) => {
                const amt = Math.round((data.propertyValue * pct) / 100);
                return (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setData({ ...data, downPayment: amt })}
                    className={`py-2 rounded-xl border text-xs font-bold transition-colors ${
                      data.downPayment === amt
                        ? "bg-navy-midnight text-white border-navy-midnight"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {pct}% (${(amt / 1000).toFixed(0)}k)
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full py-3.5 rounded-xl bg-navy-midnight text-white font-bold hover:bg-navy-dark transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step: Current Mortgage Balance (Refi Only) */}
        {currentStep.id === "balance" && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                1st Mortgage Principal Balance
              </span>
              <div className="font-heading font-black text-4xl text-navy-midnight">
                ${data.firstMortgageBalance.toLocaleString()}
              </div>
            </div>

            <input
              type="range"
              min={50000}
              max={1200000}
              step={10000}
              value={data.firstMortgageBalance}
              onChange={(e) => setData({ ...data, firstMortgageBalance: Number(e.target.value) })}
              className="w-full accent-navy-midnight cursor-pointer"
            />

            <button
              type="button"
              onClick={nextStep}
              className="w-full py-3.5 rounded-xl bg-navy-midnight text-white font-bold hover:bg-navy-dark transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step: Current Rate (Refi Only) */}
        {currentStep.id === "rate" && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Current Interest Rate
              </span>
              <div className="font-heading font-black text-4xl text-navy-midnight">
                {data.firstMortgageRate.toFixed(3)}%
              </div>
            </div>

            <input
              type="range"
              min={3.0}
              max={9.5}
              step={0.125}
              value={data.firstMortgageRate}
              onChange={(e) => setData({ ...data, firstMortgageRate: Number(e.target.value) })}
              className="w-full accent-navy-midnight cursor-pointer"
            />

            <button
              type="button"
              onClick={nextStep}
              className="w-full py-3.5 rounded-xl bg-navy-midnight text-white font-bold hover:bg-navy-dark transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step: Second Mortgage (Refi Only) */}
        {currentStep.id === "secondMortgage" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(["Yes", "No"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelectOption({ secondMortgage: opt })}
                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                  data.secondMortgage === opt
                    ? "border-navy-midnight bg-navy-midnight text-white shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white text-navy-midnight"
                }`}
              >
                <div className="font-heading font-black text-2xl">{opt}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step: Cash Out (Refi Only) */}
        {currentStep.id === "cashOut" && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Additional Cash Borrowed
              </span>
              <div className="font-heading font-black text-4xl text-navy-midnight">
                ${data.cashOutAmount.toLocaleString()}
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={250000}
              step={5000}
              value={data.cashOutAmount}
              onChange={(e) => setData({ ...data, cashOutAmount: Number(e.target.value) })}
              className="w-full accent-navy-midnight cursor-pointer"
            />

            <div className="grid grid-cols-4 gap-2">
              {[0, 25000, 50000, 100000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setData({ ...data, cashOutAmount: amt })}
                  className="py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  ${(amt / 1000).toFixed(0)}k
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full py-3.5 rounded-xl bg-navy-midnight text-white font-bold hover:bg-navy-dark transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step: Employment Status */}
        {currentStep.id === "employment" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {(["Employed", "Self-Employed / 1099", "Retired", "Other"] as const).map((emp) => (
              <button
                key={emp}
                type="button"
                onClick={() => handleSelectOption({ employmentStatus: emp })}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  data.employmentStatus === emp
                    ? "border-navy-midnight bg-navy-midnight text-white shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white text-navy-midnight"
                }`}
              >
                <div className="font-bold text-base">{emp}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step: Annual Income */}
        {currentStep.id === "income" && (
          <div className="space-y-3">
            {[
              "< $50,000",
              "$50,000 - $75,000",
              "$75,000 - $100,000",
              "$100,000 - $150,000",
              "$150,000+",
            ].map((inc) => (
              <button
                key={inc}
                type="button"
                onClick={() => handleSelectOption({ annualIncome: inc as any })}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                  data.annualIncome === inc
                    ? "border-navy-midnight bg-navy-midnight text-white font-bold"
                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-800"
                }`}
              >
                <span>{inc}</span>
                <span className="text-xs">→</span>
              </button>
            ))}
          </div>
        )}

        {/* Step: Credit Score */}
        {currentStep.id === "credit" && (
          <div className="space-y-3">
            {[
              "Excellent (740+)",
              "Good (700-739)",
              "Average (660-699)",
              "Fair (600-659)",
              "Poor (< 600)",
            ].map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => handleSelectOption({ creditScoreTier: tier as any })}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                  data.creditScoreTier === tier
                    ? "border-navy-midnight bg-navy-midnight text-white font-bold"
                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-800"
                }`}
              >
                <span>{tier}</span>
                <span className="text-xs">→</span>
              </button>
            ))}
          </div>
        )}

        {/* Step: Location */}
        {currentStep.id === "location" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-navy-midnight block mb-1">ZIP Code</label>
                <input
                  type="text"
                  maxLength={5}
                  value={data.zipCode}
                  onChange={(e) => setData({ ...data, zipCode: e.target.value.replace(/[^0-9]/g, "") })}
                  placeholder="28202"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-midnight"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-navy-midnight block mb-1">City</label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  placeholder="Charlotte"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-midnight"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-navy-midnight block mb-1">State</label>
                <input
                  type="text"
                  maxLength={2}
                  value={data.state}
                  onChange={(e) => setData({ ...data, state: e.target.value.toUpperCase() })}
                  placeholder="NC"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-midnight uppercase"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full py-3.5 rounded-xl bg-navy-midnight text-white font-bold hover:bg-navy-dark transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step: Borrower Name */}
        {currentStep.id === "borrower" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-navy-midnight block mb-1">First Name *</label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => setData({ ...data, firstName: e.target.value })}
                  placeholder="e.g. John"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-midnight"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-navy-midnight block mb-1">Last Name *</label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => setData({ ...data, lastName: e.target.value })}
                  placeholder="e.g. Smith"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-midnight"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!data.firstName.trim() || !data.lastName.trim()) {
                  setErrorMsg("Please enter both first and last name to proceed.");
                  return;
                }
                nextStep();
              }}
              className="w-full py-3.5 rounded-xl bg-navy-midnight text-white font-bold hover:bg-navy-dark transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step: Contact & Consent */}
        {currentStep.id === "contact" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-navy-midnight block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="john.smith@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-midnight"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-navy-midnight block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="(704) 555-0199"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-midnight"
                />
              </div>
            </div>

            {/* TCPA Consent */}
            <div className="p-4 rounded-xl bg-ivory-warm border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
              <input
                type="checkbox"
                id="tcpa"
                checked={data.tcpaConsent}
                onChange={(e) => setData({ ...data, tcpaConsent: e.target.checked })}
                className="mt-0.5 accent-navy-midnight w-4 h-4 cursor-pointer"
              />
              <label htmlFor="tcpa" className="cursor-pointer leading-relaxed">
                By checking this box, I authorize Northstar Mortgage to deliver telephone calls, automated SMS messages, and emails regarding my loan quote to the contact info provided above. Consent is not a condition of loan approval.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-brass text-navy-deep font-bold text-base hover:bg-brass-hover transition-colors shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Calculating Instant Quote..." : "Reveal My Instant Mortgage Quote →"}
            </button>
          </form>
        )}
      </div>

      {/* Error Notice */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={prevStep}
            className="text-slate-500 hover:text-navy-midnight flex items-center gap-1 py-1"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}
        <span className="text-slate-400">
          Instant Soft Pull • Zero FICO Score Impact
        </span>
      </div>
    </div>
  );
}
