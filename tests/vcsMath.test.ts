import { describe, it, expect } from "vitest";
import {
  calculatePurchase,
  calculateAffordability,
  calculateRefinance,
  calculateRentVsBuy,
  calculateVaPurchase,
  calculateVaRefinance,
  calculateDscr,
  calculateFixFlip,
} from "../lib/calculators/vcsMath";

describe("Vonk Calculator Suite (VCS) Math Core", () => {
  it("reproduces exact DSCR calculations from the user screenshot", () => {
    const res = calculateDscr({
      purchasePrice: 500000,
      units: 1,
      monthlyRent: 3600,
      vacancyRate: 5,
      ltv: 80,
      rate: 8,
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

    expect(res.loanAmount).toBe(400000);
    expect(res.downPayment).toBe(100000);
    expect(res.cashToClose).toBe(113000);
    expect(res.grossAnnualRent).toBe(43200);
    expect(res.operatingExpenses).toBe(12500);
    expect(res.noi).toBe(28540);
    expect(Math.round(res.annualDebtService)).toBe(35221);
    expect(res.dscr).toBe(0.81);
    expect(Math.round(res.monthlyCashFlow * 100) / 100).toBe(-556.72);
    expect(res.capRate).toBe(5.71);
    expect(res.cashOnCash).toBe(-5.91);
    expect(res.verdict).toBe("Below most lender minimums");
    expect(res.tone).toBe("bad");
  });

  it("calculates purchase loan PITI and breakdown correctly", () => {
    const res = calculatePurchase({
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

    expect(res.loanAmount).toBe(320000);
    expect(res.downPercent).toBe(20);
    expect(res.pmi).toBe(0); // 20% down eliminates PMI!
    expect(res.principalInterest).toBeGreaterThan(2000);
    expect(res.total).toBeGreaterThan(2400);
  });

  it("calculates affordability with DTI constraint", () => {
    const res = calculateAffordability({
      annualIncome: 120000,
      monthlyDebts: 750,
      cashAvailable: 60000,
      dtiCeiling: 43,
      rate: 6.5,
      term: 30,
    });

    expect(res.maxPrice).toBeGreaterThan(300000);
    expect(res.backEndDti).toBeLessThanOrEqual(43.5);
    expect(res.insufficient).toBe(false);
  });

  it("calculates refinance break-even months correctly", () => {
    const res = calculateRefinance({
      currentBalance: 320000,
      currentRate: 7.25,
      yearsRemaining: 26,
      newRate: 6.0,
      newTerm: 30,
      closingCosts: 5000,
      rollCosts: true,
    });

    expect(res.monthlySaving).toBeGreaterThan(0);
    expect(res.breakEvenMonths).toBeGreaterThan(0);
    expect(res.tone).toBe("good");
  });

  it("calculates Fix & Flip with 70% rule", () => {
    const res = calculateFixFlip({
      purchasePrice: 280000,
      rehabBudget: 60000,
      arv: 450000,
      holdMonths: 6,
      loanToCost: 85,
      rate: 11,
      points: 2,
      buyClosingCosts: 4000,
      sellingCosts: 6,
      monthlyCarrying: 800,
    });

    expect(res.totalCost).toBe(340000);
    expect(res.netProfit).toBeGreaterThan(0);
    expect(res.maxOffer).toBe(255000); // 450k * 0.7 - 60k = 255k
  });
});
