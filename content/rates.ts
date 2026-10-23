export interface MortgageRateTier {
  id: string;
  program: string;
  termYears: number;
  rate: number;
  apr: number;
  points: number;
  downPaymentPercent: number;
  monthlyPaymentEstimate: number; // based on $400k loan
  change7d: number; // change over 7 days in percentage points
}

export interface RateFeedMetadata {
  asOfDate: string;
  source: string;
  nextUpdateExpected: string;
  conformingBaselineLimit: number;
  disclaimer: string;
}

export const rateMetadata: RateFeedMetadata = {
  asOfDate: "October 23, 2026",
  source: "Freddie Mac Primary Mortgage Market Survey (PMMS) & Northstar Capital Pricing Desk",
  nextUpdateExpected: "Weekly every Thursday at 12:00 PM EST",
  conformingBaselineLimit: 766550,
  disclaimer:
    "Rates and APRs (Annual Percentage Rates) displayed represent national weekly market benchmark averages based on standard conventional conforming or government underwriting criteria for borrowers with prime credit (740+ FICO) and 20% down payment (or 3.5% down for FHA, 0% for VA). Actual rates and loan terms may vary depending on property location, credit profile, loan-to-value ratio, and market fluctuations. Rates are for informational purposes and do not represent a formal loan estimate, commitment to lend, or rate lock guarantee.",
};

export const currentRates: MortgageRateTier[] = [
  {
    id: "30-year-fixed",
    program: "30-Year Fixed Conforming",
    termYears: 30,
    rate: 6.42,
    apr: 6.55,
    points: 0.4,
    downPaymentPercent: 20,
    monthlyPaymentEstimate: 2507,
    change7d: -0.06,
  },
  {
    id: "15-year-fixed",
    program: "15-Year Fixed Conforming",
    termYears: 15,
    rate: 5.68,
    apr: 5.86,
    points: 0.5,
    downPaymentPercent: 20,
    monthlyPaymentEstimate: 3308,
    change7d: -0.04,
  },
  {
    id: "fha-30-year",
    program: "FHA 30-Year Fixed",
    termYears: 30,
    rate: 6.12,
    apr: 6.98,
    points: 0.3,
    downPaymentPercent: 3.5,
    monthlyPaymentEstimate: 2430,
    change7d: -0.08,
  },
  {
    id: "va-30-year",
    program: "VA 30-Year Fixed",
    termYears: 30,
    rate: 6.05,
    apr: 6.31,
    points: 0.3,
    downPaymentPercent: 0,
    monthlyPaymentEstimate: 2411,
    change7d: -0.05,
  },
  {
    id: "jumbo-30-year",
    program: "Jumbo 30-Year Fixed",
    termYears: 30,
    rate: 6.65,
    apr: 6.78,
    points: 0.5,
    downPaymentPercent: 20,
    monthlyPaymentEstimate: 2568,
    change7d: 0.02,
  },
  {
    id: "7-1-arm",
    program: "7/1 Adjustable-Rate Mortgage (SOFR)",
    termYears: 30,
    rate: 5.95,
    apr: 6.72,
    points: 0.4,
    downPaymentPercent: 20,
    monthlyPaymentEstimate: 2386,
    change7d: -0.03,
  },
];
