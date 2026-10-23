/**
 * Core Mortgage Financial Calculation Engine
 * Tested formulas adhering to US CFPB, Fannie Mae, and FHA guidelines.
 */

export interface MortgagePaymentInput {
  homePrice: number;
  downPayment: number;
  interestRate: number; // e.g., 6.5 for 6.5%
  loanTermYears: number; // e.g. 15, 20, 30
  annualPropertyTax?: number;
  annualHomeInsurance?: number;
  monthlyHoa?: number;
  pmiRate?: number; // annual percentage, e.g. 0.55%
}

export interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalInterestPaid: number;
  endingBalance: number;
}

export interface MortgagePaymentResult {
  homePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCostOfLoan: number;
  amortizationSchedule: AmortizationYear[];
}

export function calculateMonthlyPrincipalAndInterest(
  principal: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  if (principal <= 0) return 0;
  if (annualInterestRate <= 0) {
    const totalMonths = Math.max(1, loanTermYears * 12);
    return Math.round((principal / totalMonths) * 100) / 100;
  }

  const monthlyRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const factor = Math.pow(1 + monthlyRate, numberOfPayments);
  const monthlyPayment = principal * ((monthlyRate * factor) / (factor - 1));

  return Math.round(monthlyPayment * 100) / 100;
}

export function calculateMortgagePayment(
  input: MortgagePaymentInput
): MortgagePaymentResult {
  const homePrice = Math.max(0, input.homePrice);
  const downPayment = Math.min(homePrice, Math.max(0, input.downPayment));
  const loanAmount = Math.max(0, homePrice - downPayment);
  const downPaymentPercent =
    homePrice > 0 ? Math.round((downPayment / homePrice) * 10000) / 100 : 0;

  const interestRate = Math.max(0, input.interestRate);
  const loanTermYears = Math.max(1, input.loanTermYears);

  const monthlyPAndI = calculateMonthlyPrincipalAndInterest(
    loanAmount,
    interestRate,
    loanTermYears
  );

  const annualPropertyTax = input.annualPropertyTax ?? homePrice * 0.012; // default 1.2%
  const monthlyPropertyTax = Math.round((annualPropertyTax / 12) * 100) / 100;

  const annualHomeInsurance = input.annualHomeInsurance ?? 1400;
  const monthlyHomeInsurance =
    Math.round((annualHomeInsurance / 12) * 100) / 100;

  const monthlyHoa = Math.max(0, input.monthlyHoa ?? 0);

  // PMI applies when LTV > 80% (down payment < 20%)
  let monthlyPmi = 0;
  if (downPaymentPercent < 20 && loanAmount > 0) {
    const pmiRate = input.pmiRate ?? 0.55; // 0.55% annual PMI default
    monthlyPmi = Math.round(((loanAmount * (pmiRate / 100)) / 12) * 100) / 100;
  }

  const totalMonthlyPayment =
    Math.round(
      (monthlyPAndI +
        monthlyPropertyTax +
        monthlyHomeInsurance +
        monthlyPmi +
        monthlyHoa) *
        100
    ) / 100;

  // Build annual amortization schedule
  const totalMonths = loanTermYears * 12;
  const monthlyRate = interestRate / 100 / 12;
  let currentBalance = loanAmount;
  let cumulativeInterest = 0;
  const amortizationSchedule: AmortizationYear[] = [];

  let yearlyPrincipal = 0;
  let yearlyInterest = 0;

  for (let month = 1; month <= totalMonths; month++) {
    if (currentBalance <= 0) break;

    const interestForMonth =
      monthlyRate > 0 ? currentBalance * monthlyRate : 0;
    const principalForMonth =
      month === totalMonths
        ? currentBalance
        : Math.min(currentBalance, monthlyPAndI - interestForMonth);

    yearlyInterest += interestForMonth;
    yearlyPrincipal += principalForMonth;
    cumulativeInterest += interestForMonth;
    currentBalance = Math.max(0, currentBalance - principalForMonth);

    if (month % 12 === 0 || month === totalMonths) {
      const yearNumber = Math.ceil(month / 12);
      amortizationSchedule.push({
        year: yearNumber,
        principalPaid: Math.round(yearlyPrincipal * 100) / 100,
        interestPaid: Math.round(yearlyInterest * 100) / 100,
        totalInterestPaid: Math.round(cumulativeInterest * 100) / 100,
        endingBalance: Math.round(currentBalance * 100) / 100,
      });
      yearlyPrincipal = 0;
      yearlyInterest = 0;
    }
  }

  const totalInterestPaid = Math.round(cumulativeInterest * 100) / 100;
  const totalCostOfLoan =
    Math.round((downPayment + loanAmount + totalInterestPaid) * 100) / 100;

  return {
    homePrice,
    downPayment,
    downPaymentPercent,
    loanAmount,
    interestRate,
    loanTermYears,
    monthlyPrincipalAndInterest: monthlyPAndI,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyPmi,
    monthlyHoa,
    totalMonthlyPayment,
    totalInterestPaid,
    totalCostOfLoan,
    amortizationSchedule,
  };
}
