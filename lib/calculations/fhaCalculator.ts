/**
 * FHA Loan Calculator
 * Calculates Upfront MIP (1.75%), Annual MIP tiers based on HUD guidelines,
 * base vs total financed loan amount, and complete monthly payment breakdown.
 */

import { calculateMonthlyPrincipalAndInterest } from "./mortgagePayment";

export interface FhaLoanInput {
  purchasePrice: number;
  downPaymentPercent?: number; // minimum 3.5%
  downPaymentAmount?: number;
  interestRate: number;
  loanTermYears?: number; // 15 or 30 (default 30)
  annualPropertyTax?: number;
  annualHomeInsurance?: number;
  monthlyHoa?: number;
}

export interface FhaLoanResult {
  purchasePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  baseLoanAmount: number;
  upfrontMipRate: number; // 1.75%
  upfrontMipAmount: number;
  totalFinancedLoanAmount: number;
  annualMipRate: number; // e.g. 0.55% or 0.50%
  monthlyAnnualMip: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  ltv: number;
}

export function calculateFhaLoan(input: FhaLoanInput): FhaLoanResult {
  const purchasePrice = Math.max(0, input.purchasePrice);
  const termYears = input.loanTermYears || 30;

  // FHA requires minimum 3.5% down
  let downPayment: number;
  let downPaymentPercent: number;

  if (input.downPaymentAmount !== undefined) {
    downPayment = Math.max(purchasePrice * 0.035, input.downPaymentAmount);
    downPaymentPercent = purchasePrice > 0 ? (downPayment / purchasePrice) * 100 : 3.5;
  } else {
    downPaymentPercent = Math.max(3.5, input.downPaymentPercent ?? 3.5);
    downPayment = purchasePrice * (downPaymentPercent / 100);
  }

  const baseLoanAmount = Math.max(0, purchasePrice - downPayment);
  const ltv = purchasePrice > 0 ? (baseLoanAmount / purchasePrice) * 100 : 0;

  // UFMIP standard is 1.75%
  const upfrontMipRate = 1.75;
  const upfrontMipAmount = Math.round(baseLoanAmount * (upfrontMipRate / 100));
  const totalFinancedLoanAmount = baseLoanAmount + upfrontMipAmount;

  // Annual MIP calculation based on HUD Mortgagee Letter 2023-05
  let annualMipRate = 0.55;
  if (termYears > 15) {
    if (ltv <= 95) {
      annualMipRate = 0.50;
    } else {
      annualMipRate = 0.55;
    }
  } else {
    // 15-year terms
    if (ltv <= 90) {
      annualMipRate = 0.15;
    } else {
      annualMipRate = 0.40;
    }
  }

  const monthlyAnnualMip = Math.round(((baseLoanAmount * (annualMipRate / 100)) / 12) * 100) / 100;

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
    (monthlyPAndI + monthlyAnnualMip + monthlyPropertyTax + monthlyHomeInsurance + monthlyHoa) * 100
  ) / 100;

  return {
    purchasePrice,
    downPayment: Math.round(downPayment * 100) / 100,
    downPaymentPercent: Math.round(downPaymentPercent * 100) / 100,
    baseLoanAmount,
    upfrontMipRate,
    upfrontMipAmount,
    totalFinancedLoanAmount,
    annualMipRate,
    monthlyAnnualMip,
    monthlyPrincipalAndInterest: monthlyPAndI,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHoa,
    totalMonthlyPayment,
    ltv: Math.round(ltv * 100) / 100,
  };
}
