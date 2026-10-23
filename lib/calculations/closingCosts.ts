/**
 * Closing Costs & Cash-to-Close Calculator
 * Provides compliant itemized estimations for Loan Estimate sections A-H.
 */

export interface ClosingCostsInput {
  purchasePrice: number;
  downPayment: number;
  interestRate: number;
  loanType?: "conventional" | "fha" | "va";
  annualPropertyTax?: number;
  annualHomeInsurance?: number;
  sellerConcessions?: number;
  lenderCredits?: number;
}

export interface ClosingCostsItem {
  name: string;
  category: "lender" | "third_party" | "government" | "prepaids_escrow";
  amount: number;
}

export interface ClosingCostsResult {
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  itemizedFees: ClosingCostsItem[];
  totalLenderFees: number;
  totalThirdPartyFees: number;
  totalGovernmentFees: number;
  totalPrepaidsAndEscrow: number;
  totalClosingCosts: number;
  totalCredits: number;
  netClosingCosts: number;
  totalCashToClose: number;
  closingCostsPercentOfLoan: number;
}

export function calculateClosingCosts(input: ClosingCostsInput): ClosingCostsResult {
  const purchasePrice = Math.max(0, input.purchasePrice);
  const downPayment = Math.min(purchasePrice, Math.max(0, input.downPayment));
  const loanAmount = Math.max(0, purchasePrice - downPayment);
  const interestRate = Math.max(0, input.interestRate);

  const annualPropertyTax = input.annualPropertyTax ?? purchasePrice * 0.012;
  const annualHomeInsurance = input.annualHomeInsurance ?? 1400;

  // 1. Lender Fees
  const originationFee = Math.round(loanAmount * 0.0075); // 0.75%
  const underwritingFee = 895;
  const creditReportFee = 55;
  const appraisalFee = 575;
  const totalLenderFees = originationFee + underwritingFee + creditReportFee + appraisalFee;

  // 2. Third-Party Services
  const lendersTitleInsurance = Math.round(loanAmount * 0.0045); // 0.45%
  const settlementFee = 850;
  const titleSearchFee = 325;
  const surveyFee = 450;
  const floodCertFee = 20;
  const totalThirdPartyFees = lendersTitleInsurance + settlementFee + titleSearchFee + surveyFee + floodCertFee;

  // 3. Government Recording and Taxes
  const recordingFees = 185;
  const transferTaxes = Math.round(purchasePrice * 0.003); // 0.3% average
  const totalGovernmentFees = recordingFees + transferTaxes;

  // 4. Prepaids & Escrow Reserves
  const insurancePrepaid12Mo = Math.round(annualHomeInsurance);
  const dailyInterest = (loanAmount * (interestRate / 100)) / 365;
  const prepaidDailyInterest15Days = Math.round(dailyInterest * 15);
  const taxEscrow3Mo = Math.round((annualPropertyTax / 12) * 3);
  const insuranceEscrow2Mo = Math.round((annualHomeInsurance / 12) * 2);
  const totalPrepaidsAndEscrow =
    insurancePrepaid12Mo + prepaidDailyInterest15Days + taxEscrow3Mo + insuranceEscrow2Mo;

  const itemizedFees: ClosingCostsItem[] = [
    { name: "Loan Origination & Processing", category: "lender", amount: originationFee },
    { name: "Underwriting Fee", category: "lender", amount: underwritingFee },
    { name: "Appraisal Fee", category: "lender", amount: appraisalFee },
    { name: "Credit Report & Verification", category: "lender", amount: creditReportFee },
    { name: "Lender's Title Insurance", category: "third_party", amount: lendersTitleInsurance },
    { name: "Closing / Settlement Attorney Fee", category: "third_party", amount: settlementFee },
    { name: "Title Search & Examination", category: "third_party", amount: titleSearchFee },
    { name: "Property Survey", category: "third_party", amount: surveyFee },
    { name: "Flood Determination & Monitoring", category: "third_party", amount: floodCertFee },
    { name: "County Recording Fees", category: "government", amount: recordingFees },
    { name: "State / County Transfer Taxes", category: "government", amount: transferTaxes },
    { name: "Homeowners Insurance (12 Mos Pre-paid)", category: "prepaids_escrow", amount: insurancePrepaid12Mo },
    { name: "Prepaid Daily Interest (15 Days)", category: "prepaids_escrow", amount: prepaidDailyInterest15Days },
    { name: "Property Tax Escrow Reserve (3 Mos)", category: "prepaids_escrow", amount: taxEscrow3Mo },
    { name: "Home Insurance Escrow Reserve (2 Mos)", category: "prepaids_escrow", amount: insuranceEscrow2Mo },
  ];

  const totalClosingCosts = totalLenderFees + totalThirdPartyFees + totalGovernmentFees + totalPrepaidsAndEscrow;
  const sellerConcessions = Math.max(0, input.sellerConcessions ?? 0);
  const lenderCredits = Math.max(0, input.lenderCredits ?? 0);
  const totalCredits = sellerConcessions + lenderCredits;

  const netClosingCosts = Math.max(0, totalClosingCosts - totalCredits);
  const totalCashToClose = Math.round(downPayment + netClosingCosts);

  const closingCostsPercentOfLoan = loanAmount > 0 ? Math.round((totalClosingCosts / loanAmount) * 1000) / 10 : 0;

  return {
    purchasePrice,
    downPayment,
    loanAmount,
    itemizedFees,
    totalLenderFees,
    totalThirdPartyFees,
    totalGovernmentFees,
    totalPrepaidsAndEscrow,
    totalClosingCosts,
    totalCredits,
    netClosingCosts,
    totalCashToClose,
    closingCostsPercentOfLoan,
  };
}
