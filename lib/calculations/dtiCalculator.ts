/**
 * Debt-to-Income (DTI) Calculator
 * Analyzes front-end (housing ratio) and back-end (total debt ratio)
 * against Fannie Mae, Freddie Mac, FHA, and VA underwriting guidelines.
 */

export interface DtiIncomeBreakdown {
  baseSalary: number;
  bonusOvertime?: number;
  pensionSocialSecurity?: number;
  otherIncome?: number;
}

export interface DtiDebtBreakdown {
  creditCards: number;
  autoLoans: number;
  studentLoans: number;
  personalLoans: number;
  otherDebts?: number;
}

export interface DtiHousingCosts {
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  pmi?: number;
  hoaFees?: number;
}

export interface DtiInput {
  income: DtiIncomeBreakdown;
  debts: DtiDebtBreakdown;
  housing: DtiHousingCosts;
}

export interface DtiResult {
  totalMonthlyIncome: number;
  totalMonthlyNonHousingDebts: number;
  totalMonthlyHousingPayment: number;
  totalMonthlyDebtObligations: number;
  frontEndDti: number; // percentage, e.g. 24.5
  backEndDti: number; // percentage, e.g. 38.2
  status: "Optimal" | "Good" | "Needs Attention" | "High Risk";
  statusColor: string;
  summary: string;
  maxRecommendedHousingPayment: number; // at 28% front-end
  maxAllowedTotalDebt: number; // at 43% back-end
  remainingDebtCapacity: number;
}

export function calculateDti(input: DtiInput): DtiResult {
  const totalMonthlyIncome = Math.max(
    0,
    (input.income.baseSalary || 0) +
      (input.income.bonusOvertime || 0) +
      (input.income.pensionSocialSecurity || 0) +
      (input.income.otherIncome || 0)
  );

  const totalMonthlyNonHousingDebts = Math.max(
    0,
    (input.debts.creditCards || 0) +
      (input.debts.autoLoans || 0) +
      (input.debts.studentLoans || 0) +
      (input.debts.personalLoans || 0) +
      (input.debts.otherDebts || 0)
  );

  const totalMonthlyHousingPayment = Math.max(
    0,
    (input.housing.principalAndInterest || 0) +
      (input.housing.propertyTax || 0) +
      (input.housing.homeInsurance || 0) +
      (input.housing.pmi || 0) +
      (input.housing.hoaFees || 0)
  );

  const totalMonthlyDebtObligations = totalMonthlyNonHousingDebts + totalMonthlyHousingPayment;

  let frontEndDti = 0;
  let backEndDti = 0;

  if (totalMonthlyIncome > 0) {
    frontEndDti = Math.round((totalMonthlyHousingPayment / totalMonthlyIncome) * 1000) / 10;
    backEndDti = Math.round((totalMonthlyDebtObligations / totalMonthlyIncome) * 1000) / 10;
  }

  let status: DtiResult["status"] = "Optimal";
  let statusColor = "text-emerald-600";
  let summary = "Your debt-to-income ratio is in the top tier for conventional and jumbo loan approval.";

  if (backEndDti <= 36 && frontEndDti <= 28) {
    status = "Optimal";
    statusColor = "text-emerald-600";
    summary = "Excellent debt balance. You meet the strictest conventional qualifying standards (28/36 rule).";
  } else if (backEndDti <= 43) {
    status = "Good";
    statusColor = "text-emerald-700";
    summary = "Solid qualifying range. Well within standard Fannie Mae/Freddie Mac and FHA guidelines (up to 43%).";
  } else if (backEndDti <= 50) {
    status = "Needs Attention";
    statusColor = "text-amber-600";
    summary = "Above average. May require higher credit score (700+), larger down payment, or cash reserves for automated underwriting approval.";
  } else {
    status = "High Risk";
    statusColor = "text-red-600";
    summary = "Exceeds standard conforming thresholds (50%). Consider paying down revolving balances or exploring FHA manual underwriting options.";
  }

  const maxRecommendedHousingPayment = Math.round(totalMonthlyIncome * 0.28);
  const maxAllowedTotalDebt = Math.round(totalMonthlyIncome * 0.43);
  const remainingDebtCapacity = Math.max(0, maxAllowedTotalDebt - totalMonthlyDebtObligations);

  return {
    totalMonthlyIncome,
    totalMonthlyNonHousingDebts,
    totalMonthlyHousingPayment,
    totalMonthlyDebtObligations,
    frontEndDti,
    backEndDti,
    status,
    statusColor,
    summary,
    maxRecommendedHousingPayment,
    maxAllowedTotalDebt,
    remainingDebtCapacity,
  };
}
