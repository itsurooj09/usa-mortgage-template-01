export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Buying" | "Refinancing" | "Credit & Income" | "Closing & Fees";
}

export const allFaqs: FaqItem[] = [
  {
    category: "General",
    question: "What is the difference between Pre-Qualification and Pre-Approval?",
    answer:
      "A Pre-Qualification is an informal estimate of your borrowing potential based on self-reported financial figures without independent document verification. A Pre-Approval is a formal underwriting review where a licensed lender examines your verified W-2s, tax returns, paystubs, bank statements, and runs an official tri-merge credit report. Real estate sellers and listing agents strongly favor verified Pre-Approval letters when reviewing purchase offers.",
  },
  {
    category: "General",
    question: "How long does the mortgage application and closing process take?",
    answer:
      "Our average closing timeframe is 18 to 22 business days from contract submission to clear-to-close. Traditional banks frequently take 35 to 45 days. By using direct automated asset verification, digital appraisal scheduling, and dedicated in-house underwriting teams, we significantly compress the closing timeline.",
  },
  {
    category: "General",
    question: "Will checking my mortgage options or pre-qualifying hurt my credit score?",
    answer:
      "Our initial borrower survey and preliminary qualification use a soft credit inquiry, which has zero impact on your credit score. When you choose to move forward with a formal Pre-Approval application, a standard hard inquiry is performed. Under CFPB rules, multiple mortgage credit inquiries within a 45-day shopping window are treated as a single credit inquiry for scoring purposes.",
  },
  {
    category: "Buying",
    question: "Do I really need a 20% down payment to buy a home?",
    answer:
      "No! That is one of the most common homebuying myths in America. Conventional loans allow down payments as low as 3% for first-time buyers and 5% for repeat buyers. FHA loans require only 3.5% down, and VA and USDA loans offer 100% financing with 0% down. Putting less than 20% down simply requires private mortgage insurance (PMI), which can later be cancelled once you reach 20% equity.",
  },
  {
    category: "Buying",
    question: "What documents are required to obtain a mortgage pre-approval?",
    answer:
      "Typically you will provide: 30 days of recent pay stubs, W-2 forms for the past 2 years, federal tax returns (Form 1040) for the past 2 years if self-employed or claiming commission/rental income, 2 months of bank and asset statements (all pages), and a valid government-issued photo ID.",
  },
  {
    category: "Buying",
    question: "What is earnest money, and does it count toward my down payment?",
    answer:
      "Earnest money is a good-faith deposit (usually 1% to 2% of the purchase price) submitted when your purchase contract is accepted. The funds are held in an independent escrow or attorney trust account during the contingency period. At closing, 100% of your earnest money is credited toward your down payment or closing costs.",
  },
  {
    category: "Refinancing",
    question: "When does it make financial sense to refinance my mortgage?",
    answer:
      "Refinancing generally makes sense if: (1) You can lower your interest rate by 0.75% or more; (2) You want to shorten your loan term (e.g. from 30 years to 15 years) to build equity faster; (3) You have accumulated sufficient equity to eliminate monthly private mortgage insurance (PMI); or (4) You wish to consolidate high-interest revolving consumer debt via a cash-out refinance. Calculate your break-even period: if you will recoup the closing costs within 24–36 months, refinancing is typically advantageous.",
  },
  {
    category: "Refinancing",
    question: "Can I refinance without paying closing costs out of pocket?",
    answer:
      "Yes. Most borrowers elect to roll their closing costs directly into the new loan balance so that zero cash is required out of pocket at closing. Alternatively, lenders can provide a 'lender credit' that offsets closing costs in exchange for a slightly higher interest rate.",
  },
  {
    category: "Credit & Income",
    question: "What minimum credit score is needed for a mortgage?",
    answer:
      "Minimum credit benchmarks vary by program: FHA loans allow scores as low as 580 with 3.5% down (and 500 with 10% down); Conventional loans generally require a 620 minimum; VA loans typically benchmark at 620 (with manual underwriting flexibility); and Jumbo luxury loans typically look for 680 to 720+.",
  },
  {
    category: "Credit & Income",
    question: "How do you calculate income for self-employed or 1099 contractors?",
    answer:
      "Self-employed borrowers and 1099 independent contractors generally qualify using the average net adjusted income from the two most recent federal tax returns (Schedule C or Form 1120S/1065 K-1s). We add back non-cash paper write-offs like depreciation and business vehicle expenses to maximize your qualifying purchasing power.",
  },
  {
    category: "Closing & Fees",
    question: "What are typical closing costs on a home purchase?",
    answer:
      "In the United States, buyer closing costs typically range between 2% and 4% of the total loan amount. These fees consist of lender origination and appraisal fees, third-party title search and lender title insurance, county recording fees and transfer taxes, plus prepaid items like your initial 12 months of homeowners insurance and property tax escrow reserves.",
  },
  {
    category: "Closing & Fees",
    question: "What is an escrow account, and why do I need one?",
    answer:
      "An escrow impound account is an account managed by your loan servicer that collects approximately 1/12th of your estimated annual property taxes and homeowners insurance along with each monthly mortgage payment. When taxes and insurance premiums come due, your servicer pays them directly on your behalf, protecting you from sudden lump-sum tax bills.",
  },
];
