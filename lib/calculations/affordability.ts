/**
 * Home Affordability Calculator
 * Calculates recommended and maximum purchase price based on Front-End & Back-End DTI.
 */

export interface AffordabilityInput {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  loanTermYears?: number; // default 30
  annualPropertyTaxRate?: number; // e.g. 1.2%
  annualHomeInsurance?: number; // e.g. 1400
  frontEndDtiMax?: number; // default 28%
  backEndDtiMax?: number; // default 36% conservative, 43% moderate, 50% max
}

export interface AffordabilityTier {
  tierName: "Conservative" | "Moderate" | "Aggressive";
  dtiFrontEnd: number;
  dtiBackEnd: number;
  maxMonthlyHousingPayment: number;
  maxLoanAmount: number;
  maxPurchasePrice: number;
  estimatedMonthlyTax: number;
  estimatedMonthlyInsurance: number;
  estimatedMonthlyPmi: number;
  estimatedMonthlyPAndI: number;
}

export interface AffordabilityResult {
  grossMonthlyIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  tiers: {
    conservative: AffordabilityTier;
    moderate: AffordabilityTier;
    aggressive: AffordabilityTier;
  };
  recommendedPrice: number;
  maxBorrowingCapacity: number;
}

function calculateMaxLoanFromMonthlyPAndI(
  monthlyPAndI: number,
  annualRate: number,
  years: number
): number {
  if (monthlyPAndI <= 0) return 0;
  if (annualRate <= 0) return monthlyPAndI * years * 12;

  const r = annualRate / 100 / 12;
  const n = years * 12;
  const factor = Math.pow(1 + r, n);
  const loan = monthlyPAndI * ((factor - 1) / (r * factor));
  return Math.round(loan);
}

function solveTier(
  grossMonthlyIncome: number,
  monthlyDebts: number,
  downPayment: number,
  interestRate: number,
  termYears: number,
  frontDti: number,
  backDti: number,
  tierName: "Conservative" | "Moderate" | "Aggressive",
  taxRate: number,
  annualInsurance: number
): AffordabilityTier {
  const frontMaxPayment = grossMonthlyIncome * (frontDti / 100);
  const backMaxPayment = Math.max(0, grossMonthlyIncome * (backDti / 100) - monthlyDebts);
  const maxHousingPayment = Math.round(Math.min(frontMaxPayment, backMaxPayment));

  const monthlyInsurance = Math.round(annualInsurance / 12);

  // Iterative refinement to account for property tax and PMI relative to purchase price
  let estimatedPrice = Math.max(0, downPayment + maxHousingPayment * 150);
  for (let i = 0; i < 5; i++) {
    const monthlyTax = (estimatedPrice * (taxRate / 100)) / 12;
    const loan = Math.max(0, estimatedPrice - downPayment);
    const ltv = estimatedPrice > 0 ? loan / estimatedPrice : 0;
    const monthlyPmi = ltv > 0.8 ? (loan * 0.0055) / 12 : 0;

    const availablePAndI = Math.max(0, maxHousingPayment - monthlyTax - monthlyInsurance - monthlyPmi);
    const calculatedLoan = calculateMaxLoanFromMonthlyPAndI(availablePAndI, interestRate, termYears);
    estimatedPrice = calculatedLoan + downPayment;
  }

  const finalLoan = Math.max(0, Math.round(estimatedPrice - downPayment));
  const finalPrice = Math.round(estimatedPrice);
  const finalTax = Math.round(((finalPrice * (taxRate / 100)) / 12) * 100) / 100;
  const finalPmi = finalPrice > 0 && (finalLoan / finalPrice) > 0.8 ? Math.round(((finalLoan * 0.0055) / 12) * 100) / 100 : 0;
  const finalPAndI = Math.round(Math.max(0, maxHousingPayment - finalTax - monthlyInsurance - finalPmi) * 100) / 100;

  return {
    tierName,
    dtiFrontEnd: frontDti,
    dtiBackEnd: backDti,
    maxMonthlyHousingPayment: maxHousingPayment,
    maxLoanAmount: finalLoan,
    maxPurchasePrice: finalPrice,
    estimatedMonthlyTax: finalTax,
    estimatedMonthlyInsurance: monthlyInsurance,
    estimatedMonthlyPmi: finalPmi,
    estimatedMonthlyPAndI: finalPAndI,
  };
}

export function calculateAffordability(input: AffordabilityInput): AffordabilityResult {
  const annualIncome = Math.max(0, input.annualIncome);
  const grossMonthlyIncome = Math.round(annualIncome / 12);
  const monthlyDebts = Math.max(0, input.monthlyDebts);
  const downPayment = Math.max(0, input.downPayment);
  const interestRate = Math.max(0.1, input.interestRate);
  const loanTermYears = input.loanTermYears || 30;
  const taxRate = input.annualPropertyTaxRate ?? 1.2;
  const annualInsurance = input.annualHomeInsurance ?? 1400;

  const conservative = solveTier(grossMonthlyIncome, monthlyDebts, downPayment, interestRate, loanTermYears, 28, 36, "Conservative", taxRate, annualInsurance);
  const moderate = solveTier(grossMonthlyIncome, monthlyDebts, downPayment, interestRate, loanTermYears, 31, 43, "Moderate", taxRate, annualInsurance);
  const aggressive = solveTier(grossMonthlyIncome, monthlyDebts, downPayment, interestRate, loanTermYears, 36, 48, "Aggressive", taxRate, annualInsurance);

  return {
    grossMonthlyIncome,
    monthlyDebts,
    downPayment,
    interestRate,
    tiers: {
      conservative,
      moderate,
      aggressive,
    },
    recommendedPrice: moderate.maxPurchasePrice,
    maxBorrowingCapacity: moderate.maxLoanAmount,
  };
}
