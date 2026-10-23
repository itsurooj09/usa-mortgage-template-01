/**
 * VA Loan Calculator
 * Calculates VA Funding Fee tiers, zero PMI benefit,
 * financed vs cash funding fee, and complete monthly payment breakdown.
 */

import { calculateMonthlyPrincipalAndInterest } from "./mortgagePayment";

export interface VaLoanInput {
  purchasePrice: number;
  downPayment?: number; // 0 or more
  interestRate: number;
  loanTermYears?: number; // 15 or 30
  militaryStatus?: "active_veteran" | "national_guard_reserves";
  usageCount?: "first_time" | "subsequent";
  isDisabilityExempt?: boolean; // Purple heart or service-connected disability = 0% fee
  rollFeeIntoLoan?: boolean;
  annualPropertyTax?: number;
  annualHomeInsurance?: number;
  monthlyHoa?: number;
}

export interface VaLoanResult {
  purchasePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  baseLoanAmount: number;
  fundingFeeRate: number; // percentage
  fundingFeeAmount: number;
  totalFinancedLoanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPmi: 0; // Always $0 for VA loans
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  isDisabilityExempt: boolean;
}

export function calculateVaFundingFeeRate(
  downPaymentPercent: number,
  usageCount: "first_time" | "subsequent" = "first_time",
  isDisabilityExempt: boolean = false
): number {
  if (isDisabilityExempt) return 0;

  if (downPaymentPercent >= 10) {
    return 1.25;
  }
  if (downPaymentPercent >= 5) {
    return 1.50;
  }

  // Under 5% down
  if (usageCount === "subsequent") {
    return 3.30;
  }
  return 2.15;
}

export function calculateVaLoan(input: VaLoanInput): VaLoanResult {
  const purchasePrice = Math.max(0, input.purchasePrice);
  const downPayment = Math.min(purchasePrice, Math.max(0, input.downPayment ?? 0));
  const downPaymentPercent = purchasePrice > 0 ? (downPayment / purchasePrice) * 100 : 0;
  const termYears = input.loanTermYears || 30;

  const baseLoanAmount = Math.max(0, purchasePrice - downPayment);
  const isExempt = Boolean(input.isDisabilityExempt);
  const usageCount = input.usageCount ?? "first_time";

  const fundingFeeRate = calculateVaFundingFeeRate(downPaymentPercent, usageCount, isExempt);
  const fundingFeeAmount = Math.round(baseLoanAmount * (fundingFeeRate / 100));

  const rollFee = input.rollFeeIntoLoan ?? true;
  const totalFinancedLoanAmount = rollFee ? baseLoanAmount + fundingFeeAmount : baseLoanAmount;

  const monthlyPAndI = calculateMonthlyPrincipalAndInterest(
    totalFinancedLoanAmount,
    input.interestRate,
    termYears
  );

  const annualPropertyTax = input.annualPropertyTax ?? purchasePrice * 0.012;
  const monthlyPropertyTax = Math.round((annualPropertyTax / 12) * 100) / 100;

  const annualHomeInsurance = input.annualHomeInsurance ?? 1400;
  const monthlyHomeInsurance = Math.round((annualHomeInsurance / 12) * 100) / 100;

  const monthlyHoa = Math.max(0, input.monthlyHoa ?? 0);

  const totalMonthlyPayment = Math.round(
    (monthlyPAndI + monthlyPropertyTax + monthlyHomeInsurance + monthlyHoa) * 100
  ) / 100;

  return {
    purchasePrice,
    downPayment,
    downPaymentPercent: Math.round(downPaymentPercent * 100) / 100,
    baseLoanAmount,
    fundingFeeRate,
    fundingFeeAmount,
    totalFinancedLoanAmount,
    monthlyPrincipalAndInterest: monthlyPAndI,
    monthlyPmi: 0,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHoa,
    totalMonthlyPayment,
    isDisabilityExempt: isExempt,
  };
}
