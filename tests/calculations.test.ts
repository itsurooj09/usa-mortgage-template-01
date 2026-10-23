import { describe, it, expect } from "vitest";
import {
  calculateMonthlyPrincipalAndInterest,
  calculateMortgagePayment,
  calculateAffordability,
  calculateRefinance,
  calculateFhaLoan,
  calculateVaLoan,
  calculateVaFundingFeeRate,
  calculateClosingCosts,
  calculateDti,
} from "../lib/calculations";

describe("Mortgage Payment Calculator", () => {
  it("calculates standard 30-year fixed conforming loan payment accurately", () => {
    // $400,000 home, 20% down ($80,000), $320,000 principal at 6.5% for 30 years
    const monthlyPAndI = calculateMonthlyPrincipalAndInterest(320000, 6.5, 30);
    expect(monthlyPAndI).toBeCloseTo(2022.61, 1);
  });

  it("handles zero interest rate correctly", () => {
    const monthlyPAndI = calculateMonthlyPrincipalAndInterest(120000, 0, 10);
    expect(monthlyPAndI).toBe(1000);
  });

  it("calculates full PITI with PMI when down payment is less than 20%", () => {
    const result = calculateMortgagePayment({
      homePrice: 400000,
      downPayment: 40000, // 10% down
      interestRate: 6.5,
      loanTermYears: 30,
      annualPropertyTax: 4800,
      annualHomeInsurance: 1200,
      monthlyHoa: 50,
      pmiRate: 0.55,
    });

    expect(result.loanAmount).toBe(360000);
    expect(result.downPaymentPercent).toBe(10);
    expect(result.monthlyPrincipalAndInterest).toBeCloseTo(2275.44, 1);
    expect(result.monthlyPropertyTax).toBe(400);
    expect(result.monthlyHomeInsurance).toBe(100);
    expect(result.monthlyPmi).toBe(165); // 360,000 * 0.0055 / 12
    expect(result.monthlyHoa).toBe(50);
    expect(result.totalMonthlyPayment).toBeCloseTo(2275.44 + 400 + 100 + 165 + 50, 1);
    expect(result.amortizationSchedule.length).toBe(30);
    expect(result.amortizationSchedule[29].endingBalance).toBe(0);
  });

  it("sets PMI to $0 when down payment is 20% or more", () => {
    const result = calculateMortgagePayment({
      homePrice: 500000,
      downPayment: 100000, // 20% down
      interestRate: 6.0,
      loanTermYears: 30,
    });
    expect(result.monthlyPmi).toBe(0);
  });
});

describe("Home Affordability Calculator", () => {
  it("determines conservative, moderate, and aggressive purchasing ranges", () => {
    const result = calculateAffordability({
      annualIncome: 120000, // $10,000/mo
      monthlyDebts: 600,
      downPayment: 50000,
      interestRate: 6.5,
      loanTermYears: 30,
    });

    expect(result.grossMonthlyIncome).toBe(10000);
    expect(result.recommendedPrice).toBeGreaterThan(result.tiers.conservative.maxPurchasePrice);
    expect(result.tiers.aggressive.maxPurchasePrice).toBeGreaterThan(result.recommendedPrice);
    expect(result.tiers.moderate.maxLoanAmount).toBeGreaterThan(200000);
  });
});

describe("Refinance Calculator", () => {
  it("calculates monthly savings, break-even period, and total lifetime savings", () => {
    const result = calculateRefinance({
      currentBalance: 350000,
      currentRate: 7.25,
      remainingTermYears: 28,
      newRate: 5.75,
      newTermYears: 30,
      refinanceCosts: 4500,
      rollCostsIntoLoan: false,
    });

    expect(result.currentMonthlyPAndI).toBeGreaterThan(result.newMonthlyPAndI);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.breakEvenMonths).not.toBeNull();
    expect(result.breakEvenMonths!).toBeGreaterThan(0);
  });
});

describe("FHA Loan Calculator", () => {
  it("computes 1.75% Upfront MIP and annual MIP with 3.5% down payment", () => {
    const result = calculateFhaLoan({
      purchasePrice: 300000,
      downPaymentPercent: 3.5,
      interestRate: 6.0,
      loanTermYears: 30,
    });

    expect(result.downPayment).toBe(10500);
    expect(result.baseLoanAmount).toBe(289500);
    expect(result.upfrontMipRate).toBe(1.75);
    expect(result.upfrontMipAmount).toBe(5066);
    expect(result.totalFinancedLoanAmount).toBe(294566);
    expect(result.annualMipRate).toBe(0.55);
    expect(result.monthlyAnnualMip).toBeCloseTo((289500 * 0.0055) / 12, 1);
  });
});

describe("VA Loan Calculator", () => {
  it("correctly identifies 0% down payment and 0% monthly PMI benefit", () => {
    const result = calculateVaLoan({
      purchasePrice: 400000,
      downPayment: 0,
      interestRate: 6.0,
      loanTermYears: 30,
      usageCount: "first_time",
      isDisabilityExempt: false,
    });

    expect(result.downPayment).toBe(0);
    expect(result.fundingFeeRate).toBe(2.15);
    expect(result.fundingFeeAmount).toBe(8600); // 400,000 * 0.0215
    expect(result.totalFinancedLoanAmount).toBe(408600);
    expect(result.monthlyPmi).toBe(0);
  });

  it("waives VA funding fee for service-connected disability exempt veterans", () => {
    const rate = calculateVaFundingFeeRate(0, "first_time", true);
    expect(rate).toBe(0);

    const result = calculateVaLoan({
      purchasePrice: 400000,
      downPayment: 0,
      interestRate: 6.0,
      isDisabilityExempt: true,
    });

    expect(result.fundingFeeRate).toBe(0);
    expect(result.fundingFeeAmount).toBe(0);
    expect(result.totalFinancedLoanAmount).toBe(400000);
  });
});

describe("Closing Costs Calculator", () => {
  it("computes itemized closing fees and total cash-to-close", () => {
    const result = calculateClosingCosts({
      purchasePrice: 450000,
      downPayment: 90000, // 20% down
      interestRate: 6.5,
      sellerConcessions: 2000,
    });

    expect(result.loanAmount).toBe(360000);
    expect(result.totalLenderFees).toBeGreaterThan(0);
    expect(result.totalThirdPartyFees).toBeGreaterThan(0);
    expect(result.totalGovernmentFees).toBeGreaterThan(0);
    expect(result.totalPrepaidsAndEscrow).toBeGreaterThan(0);
    expect(result.totalCredits).toBe(2000);
    expect(result.totalCashToClose).toBe(90000 + result.netClosingCosts);
  });
});

describe("DTI Calculator", () => {
  it("evaluates conforming underwriting front-end and back-end ratios", () => {
    const result = calculateDti({
      income: {
        baseSalary: 8000,
        bonusOvertime: 500,
      },
      debts: {
        creditCards: 200,
        autoLoans: 450,
        studentLoans: 300,
        personalLoans: 0,
      },
      housing: {
        principalAndInterest: 1800,
        propertyTax: 350,
        homeInsurance: 100,
        pmi: 0,
        hoaFees: 50,
      },
    });

    expect(result.totalMonthlyIncome).toBe(8500);
    expect(result.totalMonthlyNonHousingDebts).toBe(950);
    expect(result.totalMonthlyHousingPayment).toBe(2300);
    // front-end: 2300 / 8500 = 27.1%
    expect(result.frontEndDti).toBe(27.1);
    // back-end: (2300 + 950) / 8500 = 3250 / 8500 = 38.2%
    expect(result.backEndDti).toBe(38.2);
    expect(result.status).toBe("Good");
  });
});
