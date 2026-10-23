/**
 * Refinance Calculator
 * Compares current loan terms vs proposed new loan to determine monthly savings,
 * lifetime savings, break-even period, and total interest difference.
 */

import { calculateMonthlyPrincipalAndInterest } from "./mortgagePayment";

export interface RefinanceInput {
  currentBalance: number;
  currentRate: number; // e.g. 7.25%
  remainingTermYears: number; // e.g. 27
  newRate: number; // e.g. 5.75%
  newTermYears: number; // e.g. 30 or 15
  refinanceCosts: number; // e.g. 5000
  rollCostsIntoLoan?: boolean;
  cashOutAmount?: number;
}

export interface RefinanceResult {
  currentMonthlyPAndI: number;
  newMonthlyPAndI: number;
  monthlySavings: number;
  totalCurrentRemainingPayments: number;
  totalNewPayments: number;
  lifetimeSavings: number;
  breakEvenMonths: number | null; // null if no monthly savings
  newLoanAmount: number;
  currentRemainingInterest: number;
  newTotalInterest: number;
  interestSavings: number;
}

export function calculateRefinance(input: RefinanceInput): RefinanceResult {
  const currentBalance = Math.max(0, input.currentBalance);
  const currentRate = Math.max(0, input.currentRate);
  const remainingTermYears = Math.max(1, input.remainingTermYears);
  const remainingTermMonths = remainingTermYears * 12;

  const currentMonthlyPAndI = calculateMonthlyPrincipalAndInterest(
    currentBalance,
    currentRate,
    remainingTermYears
  );

  const refinanceCosts = Math.max(0, input.refinanceCosts);
  const cashOutAmount = Math.max(0, input.cashOutAmount ?? 0);
  const rollCosts = input.rollCostsIntoLoan ?? false;

  const newLoanAmount = currentBalance + cashOutAmount + (rollCosts ? refinanceCosts : 0);
  const newRate = Math.max(0, input.newRate);
  const newTermYears = Math.max(1, input.newTermYears);
  const newTermMonths = newTermYears * 12;

  const newMonthlyPAndI = calculateMonthlyPrincipalAndInterest(
    newLoanAmount,
    newRate,
    newTermYears
  );

  const monthlySavings = Math.round((currentMonthlyPAndI - newMonthlyPAndI) * 100) / 100;

  // Break-even period in months = Upfront out-of-pocket costs / Monthly savings
  const effectiveClosingCosts = rollCosts ? refinanceCosts : refinanceCosts;
  let breakEvenMonths: number | null = null;
  if (monthlySavings > 0) {
    breakEvenMonths = Math.ceil(effectiveClosingCosts / monthlySavings);
  }

  const totalCurrentRemainingPayments = Math.round(currentMonthlyPAndI * remainingTermMonths * 100) / 100;
  const totalNewPayments = Math.round(newMonthlyPAndI * newTermMonths * 100) / 100;

  const currentRemainingInterest = Math.max(0, Math.round((totalCurrentRemainingPayments - currentBalance) * 100) / 100);
  const newTotalInterest = Math.max(0, Math.round((totalNewPayments - newLoanAmount) * 100) / 100);
  const interestSavings = Math.round((currentRemainingInterest - newTotalInterest) * 100) / 100;

  // Lifetime savings = Total Current Remaining - Total New Payments - (if out of pocket, closing costs)
  const outOfPocketCost = rollCosts ? 0 : refinanceCosts;
  const lifetimeSavings = Math.round(
    (totalCurrentRemainingPayments - (totalNewPayments + outOfPocketCost - cashOutAmount)) * 100
  ) / 100;

  return {
    currentMonthlyPAndI,
    newMonthlyPAndI,
    monthlySavings,
    totalCurrentRemainingPayments,
    totalNewPayments,
    lifetimeSavings,
    breakEvenMonths,
    newLoanAmount,
    currentRemainingInterest,
    newTotalInterest,
    interestSavings,
  };
}
