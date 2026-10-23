/**
 * Complete Mathematical Core for the Mortgage Calculator Suite
 * Ported and typed directly from the verified Vonk Calculator Suite (VCS).
 * 
 * Supports all 8 financial models:
 * 1. purchase (Purchase PITI & Amortization)
 * 2. affordability (DTI-based Maximum Purchase Power)
 * 3. refinance (Rate-and-Term / Cash-Out Break-Even Analysis)
 * 4. rentVsBuy (Long-term Wealth Comparison)
 * 5. vaPurchase (100% Military Financing with VA Funding Fee & No PMI)
 * 6. vaRefinance (VA IRRRL Streamline & Statutory Recoupment Test)
 * 7. dscr (Debt-Service Coverage Ratio for Real Estate Investors)
 * 8. fixFlip (70% Rule Hard Money & Renovation Profit Modeling)
 */

export function cleanNum(v: unknown, fallback = 0): number {
  if (typeof v === "number") return isFinite(v) ? v : fallback;
  if (typeof v === "string") {
    const x = parseFloat(v.replace(/[^0-9.-]/g, ""));
    return isFinite(x) ? x : fallback;
  }
  return fallback;
}

export function cents(v: number): number {
  return Math.round((v + Number.EPSILON) * 100) / 100;
}

export function atLeast(v: number, min: number): number {
  return v < min ? min : v;
}

export function within(v: number, min: number, max: number): number {
  if (v < min) return min;
  if (v > max) return max;
  return v;
}

/**
 * Monthly payment for a fully amortizing loan (Excel PMT with fv=0, type=0).
 */
export function pmt(annualRate: number, years: number, principal: number): number {
  const r = annualRate / 100 / 12;
  const nper = Math.round(years * 12);
  if (nper <= 0) return 0;
  if (r === 0) return principal / nper;
  return (principal * r) / (1 - Math.pow(1 + r, -nper));
}

/**
 * Remaining loan balance after a given number of monthly payments.
 */
export function balanceAfter(annualRate: number, years: number, principal: number, monthsPaid: number): number {
  const r = annualRate / 100 / 12;
  const nper = Math.round(years * 12);
  if (monthsPaid >= nper) return 0;
  if (r === 0) return principal * (1 - monthsPaid / nper);
  const p = pmt(annualRate, years, principal);
  return principal * Math.pow(1 + r, monthsPaid) - p * ((Math.pow(1 + r, monthsPaid) - 1) / r);
}

/**
 * Monthly PMI. Automatically drops off below 80% LTV under HPA statutory guidelines.
 */
export function pmiMonthly(loanAmount: number, homeValue: number, annualPct: number): number {
  if (!annualPct || homeValue <= 0) return 0;
  const ltv = (loanAmount / homeValue) * 100;
  if (ltv <= 80) return 0;
  return (loanAmount * (annualPct / 100)) / 12;
}

/**
 * FHA annual Mortgage Insurance Premium (MIP) percentage.
 */
export function fhaAnnualMip(baseLoanAmount: number, ltv: number, term: number, limit = 806500): number {
  if (term > 15) {
    if (baseLoanAmount > limit) return ltv > 95 ? 0.75 : 0.7;
    return ltv > 90 ? 0.55 : 0.5;
  }
  if (baseLoanAmount > limit) {
    if (ltv > 90) return 0.65;
    return ltv > 78 ? 0.4 : 0.15;
  }
  return ltv > 90 ? 0.4 : 0.15;
}

/**
 * VA Funding Fee rate tiers based on down payment and prior entitlement use.
 */
export function vaFundingFeeRate(
  downPercent: number,
  firstUse = true,
  fees?: { fuTen?: number; fuFive?: number; fuNone?: number; afuTen?: number; afuFive?: number; afuNone?: number }
): number {
  if (firstUse) {
    if (downPercent >= 10) return fees?.fuTen ?? 1.25;
    if (downPercent >= 5) return fees?.fuFive ?? 1.5;
    return fees?.fuNone ?? 2.15;
  }
  if (downPercent >= 10) return fees?.afuTen ?? 1.25;
  if (downPercent >= 5) return fees?.afuFive ?? 1.5;
  return fees?.afuNone ?? 3.3;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export interface AmortizationSchedule {
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  months: number;
  payoffYears: number;
}

export function amortize(opts: { principal: number; rate: number; years: number; extra?: number }): AmortizationSchedule {
  const principal = cleanNum(opts.principal);
  const annualRate = cleanNum(opts.rate);
  const years = cleanNum(opts.years, 30);
  const extra = cleanNum(opts.extra, 0);

  const r = annualRate / 100 / 12;
  const scheduled = pmt(annualRate, years, principal);
  const maxMonths = Math.round(years * 12);

  let balance = principal;
  let totalInterest = 0;
  let monthsCount = 0;
  const guard = maxMonths + 360;

  for (let m = 1; balance > 0.005 && m <= guard; m++) {
    const interest = balance * r;
    let principalPart = scheduled - interest + extra;
    if (principalPart > balance) principalPart = balance;
    balance -= principalPart;
    totalInterest += interest;
    monthsCount = m;
  }

  return {
    monthlyPayment: scheduled,
    totalInterest: cents(totalInterest),
    totalPaid: cents(totalInterest + principal),
    months: monthsCount,
    payoffYears: cents(monthsCount / 12),
  };
}

/* =====================================================================
 * 1. PURCHASE CALCULATOR
 * ===================================================================== */
export interface PurchaseInput {
  homeValue: number;
  downPayment: number;
  rate: number;
  term?: number;
  propertyTaxRate?: number;
  homeInsurance?: number;
  pmiRate?: number;
  hoa?: number;
  extraPayment?: number;
}

export interface PurchaseResult {
  homeValue: number;
  downPayment: number;
  downPercent: number;
  loanAmount: number;
  ltv: number;
  principalInterest: number;
  tax: number;
  insurance: number;
  pmi: number;
  hoa: number;
  total: number;
  totalInterest: number;
  payoffYears: number;
  monthsSaved: number;
  interestSaved: number;
  breakdown: Array<{ label: string; value: number; color: string }>;
}

export function calculatePurchase(i: PurchaseInput): PurchaseResult {
  const homeValue = atLeast(cleanNum(i.homeValue, 400000), 0);
  const downPayment = within(cleanNum(i.downPayment, 80000), 0, homeValue);
  const loanAmount = Math.max(0, homeValue - downPayment);
  const rate = atLeast(cleanNum(i.rate, 6.5), 0);
  const years = cleanNum(i.term, 30);

  const principalInterest = cents(pmt(rate, years, loanAmount));
  const tax = cents((homeValue * (atLeast(cleanNum(i.propertyTaxRate, 1.1), 0) / 100)) / 12);
  const insurance = cents(atLeast(cleanNum(i.homeInsurance, 1800), 0) / 12);
  const hoa = cents(atLeast(cleanNum(i.hoa, 0), 0));
  const pmi = cents(pmiMonthly(loanAmount, homeValue, atLeast(cleanNum(i.pmiRate, 0.55), 0)));

  const total = cents(principalInterest + tax + insurance + hoa + pmi);
  const ltv = homeValue > 0 ? (loanAmount / homeValue) * 100 : 0;
  const downPercent = homeValue > 0 ? (downPayment / homeValue) * 100 : 0;

  const sched = amortize({
    principal: loanAmount,
    rate,
    years,
    extra: cleanNum(i.extraPayment, 0),
  });

  const baseline = amortize({ principal: loanAmount, rate, years, extra: 0 });

  return {
    homeValue,
    downPayment,
    downPercent: cents(downPercent),
    loanAmount,
    ltv: cents(ltv),
    principalInterest,
    tax,
    insurance,
    pmi,
    hoa,
    total,
    totalInterest: sched.totalInterest,
    payoffYears: sched.payoffYears,
    monthsSaved: baseline.months - sched.months,
    interestSaved: cents(baseline.totalInterest - sched.totalInterest),
    breakdown: [
      { label: "Principal & Interest", value: principalInterest, color: "#10243A" },
      { label: "Property Taxes", value: tax, color: "#C5A46D" },
      { label: "Homeowners Insurance", value: insurance, color: "#64748B" },
      { label: "Mortgage Insurance (PMI)", value: pmi, color: "#E11D48" },
      { label: "HOA Dues", value: hoa, color: "#94A3B8" },
    ].filter((b) => b.value > 0),
  };
}

/* =====================================================================
 * 2. AFFORDABILITY CALCULATOR
 * ===================================================================== */
export interface AffordabilityInput {
  annualIncome: number;
  monthlyDebts: number;
  cashAvailable: number;
  dtiCeiling?: number; // 36, 43, 50
  rate?: number;
  term?: number;
  loanType?: "conventional" | "fha" | "va" | "usda" | "jumbo";
  propertyTaxRate?: number;
  homeInsurance?: number;
  pmiRate?: number;
  hoa?: number;
}

export interface AffordabilityResult {
  maxPrice: number;
  downPayment: number;
  downPercent: number;
  loanAmount: number;
  budget: number;
  monthlyPayment: number;
  frontEndDti: number;
  backEndDti: number;
  insufficient: boolean;
  breakdown: Array<{ label: string; value: number; color: string }>;
}

export function calculateAffordability(i: AffordabilityInput): AffordabilityResult {
  const loanType = i.loanType || "conventional";
  const monthlyIncome = cleanNum(i.annualIncome, 120000) / 12;
  const monthlyDebts = cleanNum(i.monthlyDebts, 750);
  const cash = cleanNum(i.cashAvailable, 60000);
  const rate = atLeast(cleanNum(i.rate, 6.5), 0);
  const years = Math.max(1, cleanNum(i.term, 30));
  const dtiCeiling = within(cleanNum(i.dtiCeiling, 43), 1, 100);
  const taxRate = cleanNum(i.propertyTaxRate, 1.1);
  const insuranceAnnual = cleanNum(i.homeInsurance, 1800);
  const hoa = cleanNum(i.hoa, 0);
  const pmiRate = cleanNum(i.pmiRate, 0.55);

  const minDownPct = loanType === "fha" ? 3.5 : loanType === "va" || loanType === "usda" ? 0 : loanType === "jumbo" ? 10 : 3;
  const budget = monthlyIncome * (dtiCeiling / 100) - monthlyDebts;

  if (budget <= 0) {
    return {
      maxPrice: 0,
      downPayment: 0,
      downPercent: 0,
      loanAmount: 0,
      budget: 0,
      monthlyPayment: 0,
      frontEndDti: 0,
      backEndDti: 0,
      insufficient: true,
      breakdown: [],
    };
  }

  function paymentAt(price: number) {
    const down = Math.max(price * (minDownPct / 100), Math.min(cash, price * 0.2));
    const base = Math.max(0, price - down);
    const pi = pmt(rate, years, base);
    const mi = (loanType === "conventional" || loanType === "jumbo") ? pmiMonthly(base, price, pmiRate) : (base * 0.0055) / 12;
    const tax = (price * (taxRate / 100)) / 12;
    const ins = insuranceAnnual / 12;
    return {
      price,
      down,
      base,
      pi,
      mi,
      tax,
      ins,
      total: pi + mi + tax + ins + hoa,
    };
  }

  // Bisection search for max purchase price
  let lo = 0;
  let hi = 5000000;
  for (let k = 0; k < 50; k++) {
    const mid = (lo + hi) / 2;
    if (paymentAt(mid).total > budget) hi = mid;
    else lo = mid;
  }

  const res = paymentAt(lo);
  const frontEnd = monthlyIncome > 0 ? (res.total / monthlyIncome) * 100 : 0;
  const backEnd = monthlyIncome > 0 ? ((res.total + monthlyDebts) / monthlyIncome) * 100 : 0;

  return {
    maxPrice: cents(res.price),
    downPayment: cents(res.down),
    downPercent: res.price > 0 ? cents((res.down / res.price) * 100) : 0,
    loanAmount: cents(res.base),
    budget: cents(budget),
    monthlyPayment: cents(res.total),
    frontEndDti: cents(frontEnd),
    backEndDti: cents(backEnd),
    insufficient: false,
    breakdown: [
      { label: "Principal & Interest", value: cents(res.pi), color: "#10243A" },
      { label: "Property Taxes", value: cents(res.tax), color: "#C5A46D" },
      { label: "Homeowners Insurance", value: cents(res.ins), color: "#64748B" },
      { label: "Mortgage Insurance", value: cents(res.mi), color: "#E11D48" },
      { label: "HOA Dues", value: cents(hoa), color: "#94A3B8" },
    ].filter((b) => b.value > 0),
  };
}

/* =====================================================================
 * 3. REFINANCE CALCULATOR
 * ===================================================================== */
export interface RefinanceInput {
  currentBalance: number;
  currentRate: number;
  yearsRemaining?: number;
  homeValue?: number;
  newRate: number;
  newTerm?: number;
  closingCosts?: number;
  cashOut?: number;
  rollCosts?: boolean;
}

export interface RefinanceResult {
  currentPayment: number;
  newPayment: number;
  monthlySaving: number;
  annualSaving: number;
  breakEvenMonths: number;
  newLoanAmount: number;
  ltv: number;
  lifetimeDifference: number;
  verdict: string;
  tone: "good" | "warn" | "bad";
}

export function calculateRefinance(i: RefinanceInput): RefinanceResult {
  const balance = atLeast(cleanNum(i.currentBalance, 320000), 0);
  const currentRate = atLeast(cleanNum(i.currentRate, 7.25), 0);
  const yearsLeft = Math.max(1, cleanNum(i.yearsRemaining, 26));
  const homeValue = atLeast(cleanNum(i.homeValue, 450000), 0);
  const newRate = atLeast(cleanNum(i.newRate, 6.0), 0);
  const newYears = Math.max(1, cleanNum(i.newTerm, 30));
  const closingCosts = atLeast(cleanNum(i.closingCosts, 5000), 0);
  const cashOut = atLeast(cleanNum(i.cashOut, 0), 0);
  const rollCosts = i.rollCosts !== false;

  const currentPayment = cents(pmt(currentRate, yearsLeft, balance));
  const newPrincipal = balance + cashOut + (rollCosts ? closingCosts : 0);
  const newPayment = cents(pmt(newRate, newYears, newPrincipal));

  const monthlySaving = cents(currentPayment - newPayment);
  const outOfPocket = rollCosts ? 0 : closingCosts;
  const breakEvenMonths = monthlySaving > 0 ? (rollCosts ? closingCosts : outOfPocket) / monthlySaving : Infinity;
  const breakEvenMonthsRounded = isFinite(breakEvenMonths) ? Math.ceil(breakEvenMonths) : Infinity;

  const currentSched = amortize({ principal: balance, rate: currentRate, years: yearsLeft });
  const newSched = amortize({ principal: newPrincipal, rate: newRate, years: newYears });
  const lifetimeDifference = cents(currentSched.totalInterest - newSched.totalInterest);
  const ltv = homeValue > 0 ? cents((newPrincipal / homeValue) * 100) : 0;

  let verdict = "This raises your payment";
  let tone: "good" | "warn" | "bad" = "bad";

  if (monthlySaving > 0) {
    if (breakEvenMonthsRounded <= 24) {
      verdict = `You break even in ${breakEvenMonthsRounded} months`;
      tone = "good";
    } else if (breakEvenMonthsRounded <= 48) {
      verdict = `Break-even takes ${Math.ceil(breakEvenMonthsRounded / 12)} years`;
      tone = "warn";
    } else {
      verdict = "Break-even is a long way out";
      tone = "warn";
    }
  }

  return {
    currentPayment,
    newPayment,
    monthlySaving,
    annualSaving: cents(monthlySaving * 12),
    breakEvenMonths: breakEvenMonthsRounded,
    newLoanAmount: newPrincipal,
    ltv,
    lifetimeDifference,
    verdict,
    tone,
  };
}

/* =====================================================================
 * 4. RENT VS BUY CALCULATOR
 * ===================================================================== */
export interface RentVsBuyInput {
  homeValue: number;
  downPayment?: number;
  rate?: number;
  term?: number;
  monthlyRent: number;
  rentGrowth?: number;
  appreciation?: number;
  investReturn?: number;
  horizon?: number;
  propertyTaxRate?: number;
  homeInsurance?: number;
  maintenanceRate?: number;
  closingCosts?: number;
  sellingCosts?: number;
  hoa?: number;
}

export interface RentVsBuyResult {
  monthlyPayment: number;
  loanAmount: number;
  crossoverYear: number | null;
  horizon: number;
  advantage: number;
  buyingWins: boolean;
  finalEquity: number;
  finalHomeValue: number;
  totalRentPaid: number;
  verdict: string;
  tone: "good" | "warn";
}

export function calculateRentVsBuy(i: RentVsBuyInput): RentVsBuyResult {
  const homeValue = atLeast(cleanNum(i.homeValue, 450000), 0);
  const downPayment = within(cleanNum(i.downPayment, 90000), 0, homeValue);
  const rate = atLeast(cleanNum(i.rate, 6.5), 0);
  const years = cleanNum(i.term, 30);
  const horizon = Math.max(1, Math.round(cleanNum(i.horizon, 10)));
  const monthlyRent = cleanNum(i.monthlyRent, 2400);
  const rentGrowth = cleanNum(i.rentGrowth, 3) / 100;
  const appreciation = cleanNum(i.appreciation, 3.5) / 100;
  const investReturn = cleanNum(i.investReturn, 6) / 100;
  const taxRate = cleanNum(i.propertyTaxRate, 1.1) / 100;
  const insuranceAnnual = cleanNum(i.homeInsurance, 1800);
  const maintenanceRate = cleanNum(i.maintenanceRate, 1) / 100;
  const closingBuy = cleanNum(i.closingCosts, 6000);
  const sellingCostRate = cleanNum(i.sellingCosts, 6) / 100;
  const hoa = cleanNum(i.hoa, 0);

  const loanAmount = Math.max(0, homeValue - downPayment);
  const payment = pmt(rate, years, loanAmount);

  let rentPortfolio = downPayment + closingBuy;
  let buyPortfolio = 0;
  let rentPaid = 0;
  let crossoverYear: number | null = null;
  let lastEquity = 0;
  let lastHomeValue = homeValue;

  for (let y = 1; y <= horizon; y++) {
    const val = homeValue * Math.pow(1 + appreciation, y);
    const bal = balanceAfter(rate, years, loanAmount, y * 12);

    const ownerCost =
      payment * 12 +
      homeValue * Math.pow(1 + appreciation, y - 1) * taxRate +
      insuranceAnnual * Math.pow(1.03, y - 1) +
      homeValue * maintenanceRate * Math.pow(1 + appreciation, y - 1) +
      hoa * 12;

    const yearRent = monthlyRent * 12 * Math.pow(1 + rentGrowth, y - 1);
    rentPaid += yearRent;

    rentPortfolio *= 1 + investReturn;
    buyPortfolio *= 1 + investReturn;

    const diff = ownerCost - yearRent;
    if (diff > 0) rentPortfolio += diff * (1 + investReturn / 2);
    else buyPortfolio += -diff * (1 + investReturn / 2);

    const netSaleProceeds = val * (1 - sellingCostRate) - bal;
    const buyPosition = netSaleProceeds + buyPortfolio;

    if (crossoverYear === null && buyPosition > rentPortfolio) {
      crossoverYear = y;
    }

    if (y === horizon) {
      lastEquity = val - bal;
      lastHomeValue = val;
    }
  }

  const finalNetSale = lastHomeValue * (1 - sellingCostRate) - balanceAfter(rate, years, loanAmount, horizon * 12);
  const buyPosition = finalNetSale + buyPortfolio;
  const advantage = cents(buyPosition - rentPortfolio);

  return {
    monthlyPayment: cents(payment),
    loanAmount,
    crossoverYear,
    horizon,
    advantage,
    buyingWins: advantage > 0,
    finalEquity: cents(lastEquity),
    finalHomeValue: cents(lastHomeValue),
    totalRentPaid: cents(rentPaid),
    verdict: crossoverYear === null ? `Renting stays ahead over ${horizon} years` : `Buying pulls ahead in year ${crossoverYear}`,
    tone: crossoverYear === null ? "warn" : "good",
  };
}

/* =====================================================================
 * 5. VA PURCHASE CALCULATOR
 * ===================================================================== */
export interface VaPurchaseInput {
  homeValue: number;
  downPayment?: number;
  rate?: number;
  term?: number;
  firstUse?: boolean;
  exempt?: boolean;
  financeFee?: boolean;
  propertyTaxRate?: number;
  homeInsurance?: number;
  hoa?: number;
}

export interface VaPurchaseResult {
  baseLoan: number;
  fundingFeeRate: number;
  fundingFee: number;
  totalLoan: number;
  downPercent: number;
  principalInterest: number;
  tax: number;
  insurance: number;
  hoa: number;
  total: number;
  conventionalPayment: number;
  monthlyAdvantage: number;
}

export function calculateVaPurchase(i: VaPurchaseInput): VaPurchaseResult {
  const homeValue = atLeast(cleanNum(i.homeValue, 450000), 0);
  const downPayment = within(cleanNum(i.downPayment, 0), 0, homeValue);
  const baseLoan = Math.max(0, homeValue - downPayment);
  const downPercent = homeValue > 0 ? (downPayment / homeValue) * 100 : 0;
  const rate = atLeast(cleanNum(i.rate, 6.25), 0);
  const years = cleanNum(i.term, 30);
  const exempt = Boolean(i.exempt);
  const firstUse = i.firstUse !== false;

  const feeRate = exempt ? 0 : vaFundingFeeRate(downPercent, firstUse);
  const fundingFee = cents(baseLoan * (feeRate / 100));
  const totalLoan = baseLoan + (i.financeFee !== false ? fundingFee : 0);

  const principalInterest = cents(pmt(rate, years, totalLoan));
  const tax = cents((homeValue * (cleanNum(i.propertyTaxRate, 1.1) / 100)) / 12);
  const insurance = cents(cleanNum(i.homeInsurance, 1800) / 12);
  const hoa = cents(cleanNum(i.hoa, 0));
  const total = cents(principalInterest + tax + insurance + hoa);

  // Conventional comparison with 5% down and PMI
  const convLoan = homeValue * 0.95;
  const convPI = pmt(rate, years, convLoan);
  const convPMI = pmiMonthly(convLoan, homeValue, 0.55);
  const convTotal = cents(convPI + convPMI + tax + insurance + hoa);

  return {
    baseLoan,
    fundingFeeRate: feeRate,
    fundingFee,
    totalLoan,
    downPercent: cents(downPercent),
    principalInterest,
    tax,
    insurance,
    hoa,
    total,
    conventionalPayment: convTotal,
    monthlyAdvantage: cents(convTotal - total),
  };
}

/* =====================================================================
 * 6. VA REFINANCE (IRRRL & Cash-Out)
 * ===================================================================== */
export interface VaRefinanceInput {
  currentBalance: number;
  currentRate: number;
  yearsRemaining?: number;
  newRate: number;
  newTerm?: number;
  closingCosts?: number;
  kind?: "irrrl" | "cashout";
  exempt?: boolean;
  firstUse?: boolean;
  cashOut?: number;
}

export interface VaRefinanceResult {
  currentPayment: number;
  newPayment: number;
  monthlySaving: number;
  fundingFee: number;
  newLoanAmount: number;
  recoupMonths: number;
  passesRecoupment: boolean;
  verdict: string;
  tone: "good" | "bad";
}

export function calculateVaRefinance(i: VaRefinanceInput): VaRefinanceResult {
  const balance = atLeast(cleanNum(i.currentBalance, 350000), 0);
  const currentRate = atLeast(cleanNum(i.currentRate, 7.0), 0);
  const yearsLeft = Math.max(1, cleanNum(i.yearsRemaining, 27));
  const newRate = atLeast(cleanNum(i.newRate, 5.75), 0);
  const newYears = Math.max(1, cleanNum(i.newTerm, 30));
  const closingCosts = atLeast(cleanNum(i.closingCosts, 4500), 0);
  const kind = i.kind || "irrrl";
  const exempt = Boolean(i.exempt);
  const firstUse = i.firstUse !== false;
  const cashOut = kind === "cashout" ? cleanNum(i.cashOut, 0) : 0;

  let feeRate = 0;
  if (!exempt) {
    if (kind === "irrrl") feeRate = 0.5;
    else feeRate = firstUse ? 2.15 : 3.3;
  }

  const fundingFee = cents((balance + cashOut) * (feeRate / 100));
  const newPrincipal = balance + cashOut + closingCosts + fundingFee;

  const currentPayment = cents(pmt(currentRate, yearsLeft, balance));
  const newPayment = cents(pmt(newRate, newYears, newPrincipal));
  const monthlySaving = cents(currentPayment - newPayment);

  const recoupCosts = closingCosts + fundingFee;
  const recoupMonths = monthlySaving > 0 ? recoupCosts / monthlySaving : Infinity;
  const recoupMonthsRounded = isFinite(recoupMonths) ? Math.ceil(recoupMonths) : Infinity;
  const passesRecoupment = isFinite(recoupMonths) && recoupMonths <= 36;

  let verdict = "This raises your payment";
  let tone: "good" | "bad" = "bad";

  if (monthlySaving > 0) {
    if (passesRecoupment) {
      verdict = `Recoups in ${recoupMonthsRounded} months (Clears VA 36-mo rule)`;
      tone = "good";
    } else {
      verdict = `Fails VA statutory recoupment at ${recoupMonthsRounded} months`;
      tone = "bad";
    }
  }

  return {
    currentPayment,
    newPayment,
    monthlySaving,
    fundingFee,
    newLoanAmount: newPrincipal,
    recoupMonths: recoupMonthsRounded,
    passesRecoupment,
    verdict,
    tone,
  };
}

/* =====================================================================
 * 7. DEBT-SERVICE COVERAGE RATIO (DSCR) CALCULATOR
 * Exact match to user screenshot media_1792747032892.png
 * ===================================================================== */
export interface DscrInput {
  purchasePrice: number;
  units?: number;
  monthlyRent: number;
  vacancyRate?: number;
  ltv?: number;
  rate?: number;
  term?: number;
  points?: number;
  closingCosts?: number;
  annualTaxes?: number;
  annualInsurance?: number;
  annualMaintenance?: number; // repairs per unit
  annualUtilities?: number;
  monthlyHoa?: number;
  managementRate?: number;
}

export interface DscrResult {
  loanAmount: number;
  downPayment: number;
  cashToClose: number;
  grossAnnualRent: number;
  vacancyLoss: number;
  effectiveGrossIncome: number;
  operatingExpenses: number;
  noi: number;
  annualDebtService: number;
  monthlyDebtService: number;
  dscr: number;
  monthlyCashFlow: number;
  capRate: number;
  cashOnCash: number;
  verdict: string;
  tone: "good" | "warn" | "bad";
  body: string;
}

export function calculateDscr(i: DscrInput): DscrResult {
  const price = atLeast(cleanNum(i.purchasePrice, 500000), 0);
  const units = Math.max(1, cleanNum(i.units, 1));
  const monthlyRentPerUnit = cleanNum(i.monthlyRent, 3600);
  const ltvPct = within(cleanNum(i.ltv, 80), 0, 100);
  const rate = atLeast(cleanNum(i.rate, 8.0), 0);
  const years = Math.max(1, cleanNum(i.term, 30));
  const points = cleanNum(i.points, 2);
  const closingCosts = cleanNum(i.closingCosts, 5000);
  const vacancyPct = cleanNum(i.vacancyRate, 5);
  const annualTaxes = cleanNum(i.annualTaxes, 4000);
  const annualInsurance = cleanNum(i.annualInsurance, 3000);
  const annualMaintenance = cleanNum(i.annualMaintenance, 500);
  const annualUtilities = cleanNum(i.annualUtilities, 5000);
  const monthlyHoa = cleanNum(i.monthlyHoa, 0);
  const mgmtPct = cleanNum(i.managementRate, 0);

  const loanAmount = cents((price * ltvPct) / 100);
  const downPayment = cents(price - loanAmount);
  const mortgagePayment = pmt(rate, years, loanAmount);

  const grossAnnualRent = cents(monthlyRentPerUnit * units * 12);
  const vacancyLoss = cents((grossAnnualRent * vacancyPct) / 100);
  const effectiveGrossIncome = cents(grossAnnualRent - vacancyLoss);
  const management = cents((effectiveGrossIncome * mgmtPct) / 100);

  const operatingExpenses = cents(
    annualTaxes + annualInsurance + annualMaintenance * units + annualUtilities + monthlyHoa * 12 + management
  );

  const noi = cents(effectiveGrossIncome - operatingExpenses);
  const annualDebtService = cents(mortgagePayment * 12);

  const ratio = annualDebtService > 0 ? cents(noi / annualDebtService) : 0;
  const cashFlow = cents(noi - annualDebtService);
  const monthlyCashFlow = cents(cashFlow / 12);
  const capRate = price > 0 ? cents((noi / price) * 100) : 0;

  const originationAmount = cents((loanAmount * points) / 100);
  const totalClosing = cents(originationAmount + closingCosts);
  const cashToClose = cents(downPayment + totalClosing);
  const cashOnCash = cashToClose > 0 ? cents((cashFlow / cashToClose) * 100) : 0;

  let verdict: string;
  let tone: "good" | "warn" | "bad";
  let body: string;

  if (ratio >= 1.25) {
    verdict = "Comfortably bankable";
    tone = "good";
    body = "Meets or exceeds standard DSCR requirements (1.20× - 1.25×). Lenders will underwrite this property favorably.";
  } else if (ratio >= 1.0) {
    verdict = "Thin but fundable";
    tone = "warn";
    body = "Cash flow covers debt service but leaves a narrow margin for unexpected repairs or extended vacancies.";
  } else {
    verdict = "Below most lender minimums";
    tone = "bad";
    body = "The rent does not cover the debt service. You would need a larger down payment, a lower rate, or higher rent to make this fundable.";
  }

  return {
    loanAmount,
    downPayment,
    cashToClose,
    grossAnnualRent,
    vacancyLoss,
    effectiveGrossIncome,
    operatingExpenses,
    noi,
    annualDebtService,
    monthlyDebtService: cents(mortgagePayment),
    dscr: ratio,
    monthlyCashFlow,
    capRate,
    cashOnCash,
    verdict,
    tone,
    body,
  };
}

/* =====================================================================
 * 8. FIX & FLIP CALCULATOR
 * ===================================================================== */
export interface FixFlipInput {
  purchasePrice: number;
  rehabBudget: number;
  arv: number;
  holdMonths?: number;
  loanToCost?: number;
  rate?: number;
  points?: number;
  buyClosingCosts?: number;
  sellingCosts?: number;
  monthlyCarrying?: number;
}

export interface FixFlipResult {
  totalCost: number;
  loanAmount: number;
  cashIn: number;
  totalProjectCost: number;
  netProfit: number;
  totalCashInvested: number;
  roi: number;
  annualizedRoi: number;
  profitMargin: number;
  maxOffer: number;
  passesSeventy: boolean;
  verdict: string;
  tone: "good" | "warn" | "bad";
  body: string;
}

export function calculateFixFlip(i: FixFlipInput): FixFlipResult {
  const price = atLeast(cleanNum(i.purchasePrice, 280000), 0);
  const rehab = atLeast(cleanNum(i.rehabBudget, 60000), 0);
  const arv = atLeast(cleanNum(i.arv, 450000), 0);
  const holdMonths = Math.max(1, cleanNum(i.holdMonths, 6));
  const ltcPct = within(cleanNum(i.loanToCost, 85), 0, 100);
  const rate = atLeast(cleanNum(i.rate, 11), 0);
  const points = cleanNum(i.points, 2);
  const buyClosing = cleanNum(i.buyClosingCosts, 4000);
  const sellCostPct = cleanNum(i.sellingCosts, 6);
  const monthlyCarry = cleanNum(i.monthlyCarrying, 800);

  const totalCost = price + rehab;
  const loanAmount = cents((totalCost * ltcPct) / 100);
  const cashIn = cents(totalCost - loanAmount);

  const pointsCost = cents((loanAmount * points) / 100);
  const interestCost = cents(((loanAmount * (rate / 100)) / 12) * holdMonths);
  const carryingCost = cents(monthlyCarry * holdMonths);
  const sellingCost = cents((arv * sellCostPct) / 100);

  const totalProjectCost = cents(price + rehab + pointsCost + interestCost + carryingCost + buyClosing + sellingCost);
  const netProfit = cents(arv - totalProjectCost);
  const totalCashInvested = cents(cashIn + pointsCost + interestCost + carryingCost + buyClosing);

  const roi = totalCashInvested > 0 ? cents((netProfit / totalCashInvested) * 100) : 0;
  const annualizedRoi = cents(roi * (12 / holdMonths));
  const profitMargin = arv > 0 ? cents((netProfit / arv) * 100) : 0;

  // 70% rule: Maximum Allowable Offer (MAO) = (ARV * 70%) - Rehab
  const maxOffer = cents(arv * 0.7 - rehab);
  const passesSeventy = price <= maxOffer;

  let verdict: string;
  let tone: "good" | "warn" | "bad";
  let body: string;

  if (netProfit <= 0) {
    verdict = "This deal loses money";
    tone = "bad";
    body = "Projected holding, hard money financing, and selling costs exceed your post-rehab sales spread.";
  } else if (!passesSeventy) {
    verdict = "Profitable, but over the 70% rule";
    tone = "warn";
    body = `Projected net profit of $${netProfit.toLocaleString()}. However, the purchase price exceeds the maximum recommended offer of $${maxOffer.toLocaleString()} under standard hard-money risk formulas.`;
  } else {
    verdict = "Clears the 70% rule";
    tone = "good";
    body = `Strong investment spread. Purchase price sits within the maximum allowable offer ($${maxOffer.toLocaleString()}) with healthy profit cushion.`;
  }

  return {
    totalCost,
    loanAmount,
    cashIn,
    totalProjectCost,
    netProfit,
    totalCashInvested,
    roi,
    annualizedRoi,
    profitMargin,
    maxOffer,
    passesSeventy,
    verdict,
    tone,
    body,
  };
}
