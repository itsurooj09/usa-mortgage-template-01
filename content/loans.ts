export interface LoanProduct {
  id: string;
  slug: string;
  title: string;
  category: "Home Financing" | "Buying a Home" | "Refinancing";
  heroTagline: string;
  shortDescription: string;
  detailedOverview: string;
  targetBorrower: string[];
  keyBenefits: string[];
  eligibilityFactors: string[];
  processSteps: { stepNumber: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  recommendedCalculator: {
    title: string;
    href: string;
    description: string;
  };
  metrics: {
    minDownPayment: string;
    creditScoreGuideline: string;
    maxLtv: string;
    termOptions: string;
  };
}

export const loanProducts: LoanProduct[] = [
  {
    id: "conventional",
    slug: "conventional",
    title: "Conventional Loans",
    category: "Home Financing",
    heroTagline: "The premier standard in residential mortgage financing.",
    shortDescription: "Competitive interest rates, flexible down payment options as low as 3%, and cancellable private mortgage insurance (PMI).",
    detailedOverview:
      "Conventional mortgages are backed by private lenders rather than government agencies such as HUD or the VA, and adhere to conforming loan limits established annually by the Federal Housing Finance Agency (FHFA). These loans offer significant flexibility for borrowers with good-to-excellent credit profiles seeking primary residences, vacation homes, or residential income investments.",
    targetBorrower: [
      "Borrowers with credit scores of 620 or higher seeking competitive interest rates",
      "Buyers with 3% to 20%+ down payment funds saved",
      "Homeowners purchasing single-family homes, townhomes, condominiums, or 2-4 unit properties",
      "Investors purchasing rental properties or second homes",
    ],
    keyBenefits: [
      "Low down payment options: as little as 3% down for qualifying first-time buyers",
      "Cancellable PMI: Private mortgage insurance automatically drops once you achieve 20% home equity",
      "Flexible loan terms: 10, 15, 20, and 30-year fixed rate and adjustable-rate structures",
      "No upfront mortgage insurance premiums unlike FHA or USDA loans",
    ],
    eligibilityFactors: [
      "Minimum representative credit score: generally 620+",
      "Maximum debt-to-income (DTI) ratio: typically up to 43%–45% via automated underwriting",
      "Verifiable 2-year employment history and stable W-2 or self-employment income",
      "Conforming loan limit: up to $766,550 for single-family residences in standard US counties",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "Digital Pre-Approval",
        description: "Submit income, asset, and credit information to verify your maximum loan capacity.",
      },
      {
        stepNumber: 2,
        title: "Home Selection & Contract",
        description: "Partner with your real estate agent and submit an offer backed by our verified Pre-Approval letter.",
      },
      {
        stepNumber: 3,
        title: "Underwriting & Appraisal",
        description: "Our dedicated processors verify property appraisal and file documentation smoothly.",
      },
      {
        stepNumber: 4,
        title: "Clear-to-Close",
        description: "Review your final Closing Disclosure (CD), wire closing funds, and sign your promissory deed.",
      },
    ],
    faqs: [
      {
        question: "How does PMI work on a conventional loan?",
        answer: "Unlike FHA mortgage insurance which lasts the life of the loan in most cases, conventional PMI is temporary. Under the Homeowners Protection Act of 1998, you can request cancellation when your principal balance reaches 80% of the original value, and it automatically terminates at 78%.",
      },
      {
        question: "What is the difference between conforming and non-conforming conventional loans?",
        answer: "Conforming loans meet the guidelines and size limits of Fannie Mae and Freddie Mac. Non-conforming loans exceed these limits (jumbo loans) or follow unique portfolio underwriting standards.",
      },
    ],
    recommendedCalculator: {
      title: "Mortgage Payment Calculator",
      href: "/calculators/mortgage-payment",
      description: "Estimate monthly principal, interest, taxes, and PMI for conventional loans.",
    },
    metrics: {
      minDownPayment: "3% (First-time) / 5%",
      creditScoreGuideline: "620+",
      maxLtv: "97%",
      termOptions: "15, 20, 30 Years",
    },
  },
  {
    id: "fha",
    slug: "fha",
    title: "FHA Loans",
    category: "Home Financing",
    heroTagline: "Accessible homeownership backed by the Federal Housing Administration.",
    shortDescription: "A versatile government-insured financing solution featuring lower down payment barriers (3.5%) and flexible credit guidelines.",
    detailedOverview:
      "Insured by the Federal Housing Administration (FHA), an agency within the U.S. Department of Housing and Urban Development (HUD), FHA loans provide an accessible pathway to homeownership. Designed primarily for first-time buyers and those with modest credit scores or limited savings, FHA loans permit higher debt-to-income thresholds and flexible gift fund usage.",
    targetBorrower: [
      "Borrowers with credit scores between 580 and 660",
      "Buyers with savings for a 3.5% down payment",
      "Borrowers with non-traditional credit histories or recent credit recovery",
      "Buyers using family gift funds for 100% of the down payment and closing costs",
    ],
    keyBenefits: [
      "Low down payment requirement: only 3.5% for credit scores 580+",
      "More accommodating credit standards compared to conventional loans",
      "Higher debt-to-income allowances (often up to 50% with compensating factors)",
      "Down payment and closing costs may be 100% gifted by eligible family members",
    ],
    eligibilityFactors: [
      "Minimum 580 credit score for 3.5% down; 500–579 requires 10% down",
      "Property must serve as the borrower's primary residence",
      "Two-year steady employment history",
      "Payment of Upfront Mortgage Insurance Premium (1.75%) and Annual MIP",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "FHA Pre-Qualification",
        description: "Assess income, debts, and credit history to establish purchasing power.",
      },
      {
        stepNumber: 2,
        title: "Property Selection & FHA Appraisal",
        description: "A certified FHA appraiser confirms property value and HUD minimum property health standards.",
      },
      {
        stepNumber: 3,
        title: "FHA Underwriting Approval",
        description: "Direct Endorsement (DE) underwriters clear conditions and verify gift letters.",
      },
      {
        stepNumber: 4,
        title: "Closing & Key Handover",
        description: "Sign closing documents and receive the keys to your new home.",
      },
    ],
    faqs: [
      {
        question: "Can I cancel FHA mortgage insurance premium (MIP)?",
        answer: "For loans originated with less than 10% down payment, FHA annual MIP remains for the entire life of the mortgage. However, many homeowners refinance into a conventional loan once their home equity reaches 20% to eliminate mortgage insurance.",
      },
      {
        question: "Are FHA loans restricted to first-time homebuyers?",
        answer: "No. While popular with first-time buyers, repeat buyers can utilize FHA financing as long as the property will be their primary residence.",
      },
    ],
    recommendedCalculator: {
      title: "FHA Loan Calculator",
      href: "/calculators/fha",
      description: "Calculate Upfront MIP (1.75%) and monthly annual MIP for FHA loans.",
    },
    metrics: {
      minDownPayment: "3.5%",
      creditScoreGuideline: "580+",
      maxLtv: "96.5%",
      termOptions: "15 or 30 Years",
    },
  },
  {
    id: "va",
    slug: "va",
    title: "VA Loans",
    category: "Home Financing",
    heroTagline: "Zero down payment and zero monthly PMI for American military servicemembers.",
    shortDescription: "A military benefit offering 100% financing, competitive interest rates, and no monthly private mortgage insurance.",
    detailedOverview:
      "Guaranteed by the U.S. Department of Veterans Affairs, the VA home loan program is one of the most powerful financial benefits available to active-duty service members, military veterans, and qualifying surviving spouses. Featuring zero required down payment, lenient credit benchmarks, and no recurring monthly mortgage insurance, VA loans honor those who have served our nation.",
    targetBorrower: [
      "Active-duty military members with 90+ continuous days of service during wartime",
      "Military veterans with 181+ days of peacetime active service or 6+ years in National Guard/Reserves",
      "Qualifying surviving spouses of service members",
      "Borrowers with an eligible VA Certificate of Eligibility (COE)",
    ],
    keyBenefits: [
      "0% down payment: 100% financing without requiring home equity upfront",
      "No monthly private mortgage insurance (PMI or MIP), saving hundreds every month",
      "Strict limits on lender closing fees and closing costs",
      "VA Funding Fee is completely waived for veterans with service-connected disabilities",
    ],
    eligibilityFactors: [
      "Valid VA Certificate of Eligibility (COE) — we can pull this directly for you",
      "Satisfactory credit history (typically 620+ benchmark)",
      "Sufficient residual income to cover ongoing household living expenses",
      "Property must be occupied as your primary residence within 60 days of closing",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "COE Verification",
        description: "We obtain your Certificate of Eligibility via the VA WebLGY portal instantly.",
      },
      {
        stepNumber: 2,
        title: "VA Loan Pre-Approval",
        description: "Determine exact purchasing power with residual income calculation.",
      },
      {
        stepNumber: 3,
        title: "VA Minimum Property Standards (MPS) Appraisal",
        description: "An assigned VA appraiser ensures the property is safe, sanitary, and sound.",
      },
      {
        stepNumber: 4,
        title: "Final Closing",
        description: "Complete your zero-down closing with veteran fee protections.",
      },
    ],
    faqs: [
      {
        question: "What is the VA Funding Fee?",
        answer: "The VA funding fee is a one-time federal fee paid directly to the Department of Veterans Affairs to sustain the loan program for future service members. It ranges from 1.25% to 3.3% depending on down payment and previous usage, and can be financed into the loan. Veterans receiving VA disability compensation are 100% exempt.",
      },
      {
        question: "Is there a limit on how much I can borrow with a VA loan?",
        answer: "Under the Blue Water Navy Vietnam Veterans Act of 2019, veterans with full entitlement have no VA loan limits regardless of county conforming thresholds.",
      },
    ],
    recommendedCalculator: {
      title: "VA Loan Calculator",
      href: "/calculators/va",
      description: "Calculate VA funding fee exemptions and zero-PMI monthly payments.",
    },
    metrics: {
      minDownPayment: "0% Down",
      creditScoreGuideline: "620+",
      maxLtv: "100%",
      termOptions: "15 or 30 Years",
    },
  },
  {
    id: "usda",
    slug: "usda",
    title: "USDA Loans",
    category: "Home Financing",
    heroTagline: "100% financing for rural and suburban communities nationwide.",
    shortDescription: "Zero-down-payment mortgages backed by the U.S. Department of Agriculture for eligible rural and suburban properties.",
    detailedOverview:
      "Backed by the USDA Rural Development program, USDA Single-Family Housing Guaranteed loans provide 100% financing for low-to-moderate-income families purchasing primary residences in designated rural and suburban areas. Despite the name, many eligible areas include thriving suburban towns outside major metropolitan borders.",
    targetBorrower: [
      "Moderate-income buyers seeking 100% financing without a down payment",
      "Buyers purchasing homes in USDA-designated rural or qualifying suburban zones",
      "Households within USDA area median income limits (up to 115% of median income)",
      "Borrowers with credit scores of 640 or higher for streamlined automated approval",
    ],
    keyBenefits: [
      "Zero down payment required — 100% loan-to-value financing",
      "Lower annual guarantee fee (0.35%) compared to FHA annual MIP (0.55%)",
      "Upfront guarantee fee (1.00%) is lower than FHA upfront MIP (1.75%)",
      "Competitive fixed interest rates backed by federal guarantee",
    ],
    eligibilityFactors: [
      "Property must be located within a USDA-eligible geographic zone",
      "Household income must not exceed 115% of the local area median income (AMI)",
      "Primary residence occupancy required",
      "Generally 640+ credit score for automated underwriting via GUS",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "Eligibility Check",
        description: "Verify property address and household income against USDA boundaries.",
      },
      {
        stepNumber: 2,
        title: "Lender Pre-Approval",
        description: "Submit documentation to our USDA-approved mortgage team.",
      },
      {
        stepNumber: 3,
        title: "USDA Agency Review",
        description: "After lender approval, the file is submitted to the state USDA office for final guarantee commitment.",
      },
      {
        stepNumber: 4,
        title: "Settlement",
        description: "Sign final papers and close with zero down payment.",
      },
    ],
    faqs: [
      {
        question: "How do I know if a house is USDA eligible?",
        answer: "The USDA maintains an official property eligibility map. Over 97% of the US landmass is designated USDA eligible, including thousands of thriving suburban communities outside major metro centers.",
      },
      {
        question: "Can closing costs be financed into a USDA loan?",
        answer: "Yes, if the property appraises for higher than the purchase price, USDA allows the difference to be applied toward closing costs.",
      },
    ],
    recommendedCalculator: {
      title: "Mortgage Payment Calculator",
      href: "/calculators/mortgage-payment",
      description: "Estimate monthly payments with 0% down and USDA guarantee fees.",
    },
    metrics: {
      minDownPayment: "0% Down",
      creditScoreGuideline: "640+",
      maxLtv: "100%",
      termOptions: "30-Year Fixed",
    },
  },
  {
    id: "jumbo",
    slug: "jumbo",
    title: "Jumbo Loans",
    category: "Home Financing",
    heroTagline: "Tailored luxury financing exceeding conforming loan limits.",
    shortDescription: "High-balance residential financing designed for luxury homes, high-cost real estate markets, and premier properties.",
    detailedOverview:
      "Jumbo loans exceed the conforming baseline limits set annually by the Federal Housing Finance Agency (FHFA) — currently $766,550 in most standard US counties and higher in designated high-cost markets. Designed for premier properties, luxury estates, and high-value urban residences, our jumbo programs feature custom structuring, competitive pricing, and flexible asset-depletion qualification.",
    targetBorrower: [
      "Buyers purchasing high-value primary residences, luxury properties, or vacation homes",
      "Borrowers with strong credit profiles (typically 680–720+)",
      "High-net-worth individuals, business owners, and corporate executives",
      "Buyers seeking loan amounts up to $3,000,000+",
    ],
    keyBenefits: [
      "Loan amounts from $766,551 up to $3,500,000+",
      "Competitive fixed-rate and interest-only ARM structures",
      "Down payment options as low as 10%–15% for qualifying borrowers",
      "Asset depletion and high-asset qualification methods available",
    ],
    eligibilityFactors: [
      "Credit scores typically 680 to 720+ depending on LTV and loan amount",
      "Debt-to-income ratio typically capped at 43%",
      "Post-closing asset reserves: typically 6 to 12 months of PITI payments in liquid or vested accounts",
      "Comprehensive appraisal review often requiring two independent appraisals for $1.5M+ loans",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "Bespoke Pre-Approval",
        description: "Comprehensive review of complex tax returns, K-1s, or asset statements.",
      },
      {
        stepNumber: 2,
        title: "Loan Structuring",
        description: "Select fixed-rate, hybrid ARM, or interest-only structure tailored to your cash flow.",
      },
      {
        stepNumber: 3,
        title: "Luxury Appraisal & Review",
        description: "Certified residential appraisers evaluate luxury property features and architectural value.",
      },
      {
        stepNumber: 4,
        title: "Concierge Closing",
        description: "Seamless digital or in-home closing orchestrated with your title officer.",
      },
    ],
    faqs: [
      {
        question: "What reserve requirements are necessary for a jumbo loan?",
        answer: "Most jumbo lenders require 6 to 12 months of Principal, Interest, Taxes, and Insurance (PITI) in verified liquid or semi-liquid reserves (checking, savings, money market, or 60-70% of retirement/brokerage accounts) after closing.",
      },
      {
        question: "Can I get a jumbo loan with 10% down?",
        answer: "Yes, select jumbo programs permit 10% down on loan amounts up to $1.5M for borrowers with strong credit scores (720+) and healthy asset reserves.",
      },
    ],
    recommendedCalculator: {
      title: "Mortgage Payment Calculator",
      href: "/calculators/mortgage-payment",
      description: "Model high-balance loan payments, property taxes, and custom amortization.",
    },
    metrics: {
      minDownPayment: "10% – 20%",
      creditScoreGuideline: "680+",
      maxLtv: "90%",
      termOptions: "15, 30-Yr Fixed & 7/1, 10/1 ARM",
    },
  },
  {
    id: "first-time-homebuyer",
    slug: "first-time-homebuyer",
    title: "First-Time Homebuyer Loans",
    category: "Buying a Home",
    heroTagline: "Step-by-step guidance, grant programs, and low-down-payment paths.",
    shortDescription: "Specialized mortgage programs offering down payment assistance, low down payments, and patient advisory for first-time buyers.",
    detailedOverview:
      "Navigating your very first home purchase can feel complex. Our First-Time Homebuyer program blends low-down-payment loan products (Conventional 97, HomeReady, Home Possible, and FHA) with available state down payment assistance grants, closing cost credits, and step-by-step advisory from pre-qualification to key handover.",
    targetBorrower: [
      "Individuals who have not owned a primary residence in the past 3 years",
      "Buyers with savings starting at 3% down payment",
      "Borrowers looking to combine financing with down payment assistance (DPA) grants",
      "Buyers seeking clear education on inspection, escrow, and closing costs",
    ],
    keyBenefits: [
      "Down payments as low as 3% on conventional and 3.5% on FHA",
      "Access to state and municipal down payment assistance programs",
      "Flexible qualification guidelines for student loans and income sources",
      "Reduced private mortgage insurance rates on Fannie Mae HomeReady / Freddie Mac Home Possible",
    ],
    eligibilityFactors: [
      "First-time homebuyer status (no home ownership in prior 36 months)",
      "Completion of a certified homebuyer education course when utilizing special DPA programs",
      "Credit score of 620+ for conventional or 580+ for FHA",
      "Income within area median thresholds for select grant programs",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "First-Time Buyer Consultation",
        description: "Review your budget, credit score, and grant eligibility with a licensed loan officer.",
      },
      {
        stepNumber: 2,
        title: "Budget-First Pre-Approval",
        description: "Establish a comfortable monthly payment target before shopping with real estate agents.",
      },
      {
        stepNumber: 3,
        title: "Making an Offer with Confidence",
        description: "Submit strong offers with an officer who calls the listing agent to endorse your file.",
      },
      {
        stepNumber: 4,
        title: "Celebration Closing",
        description: "Receive your final keys with clear understanding of all escrow and tax accounts.",
      },
    ],
    faqs: [
      {
        question: "Who qualifies as a first-time homebuyer?",
        answer: "Under HUD and Fannie Mae definitions, an individual who has had no ownership interest in a primary residence during the 3-year period preceding the purchase date qualifies as a first-time homebuyer.",
      },
      {
        question: "Can I use gift funds for my down payment?",
        answer: "Yes! Both conventional and FHA programs permit 100% of your down payment and closing costs to come as a bona fide gift from family members.",
      },
    ],
    recommendedCalculator: {
      title: "Home Affordability Calculator",
      href: "/calculators/home-affordability",
      description: "Discover exactly how much home you can afford based on your income and debts.",
    },
    metrics: {
      minDownPayment: "3% – 3.5%",
      creditScoreGuideline: "580 – 620+",
      maxLtv: "97%",
      termOptions: "30-Year Fixed",
    },
  },
  {
    id: "fixed-rate",
    slug: "fixed-rate",
    title: "Fixed-Rate Mortgages",
    category: "Buying a Home",
    heroTagline: "Predictable, unchanging monthly principal and interest payments.",
    shortDescription: "The gold standard of peace of mind. Your principal and interest payment remains identical every single month for 15, 20, or 30 years.",
    detailedOverview:
      "A fixed-rate mortgage locks in your interest rate and monthly principal and interest payment for the entire life of your loan. Regardless of how economic conditions, inflation, or the Federal Reserve adjust benchmark interest rates in the future, your payment will never fluctuate. Ideal for homeowners planning to establish long-term roots.",
    targetBorrower: [
      "Homeowners who plan to stay in their home for 5 to 30 years",
      "Buyers seeking budgeting stability and zero interest rate risk",
      "Borrowers choosing between 15-year rapid equity buildup or 30-year low monthly payments",
    ],
    keyBenefits: [
      "Total payment security: Principal and interest payment never changes",
      "Protection from rising interest rate cycles and market volatility",
      "Simple, easy-to-understand terms with straightforward amortization",
      "Option to pay down principal early without prepayment penalties",
    ],
    eligibilityFactors: [
      "Standard conforming, FHA, VA, or jumbo underwriting standards apply",
      "Employment stability and steady debt-to-income profile",
      "Credit scores starting from 580 (FHA) or 620 (Conventional)",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "Term Selection",
        description: "Choose 15-year for lowest interest and fast equity, or 30-year for lower monthly payment.",
      },
      {
        stepNumber: 2,
        title: "Rate Lock",
        description: "Lock in your interest rate with 30, 45, or 60-day price protection.",
      },
      {
        stepNumber: 3,
        title: "Processing & Final Approval",
        description: "Direct verification of title, appraisal, and homeowners insurance.",
      },
      {
        stepNumber: 4,
        title: "Settlement",
        description: "Lock in your unchanging monthly schedule at closing.",
      },
    ],
    faqs: [
      {
        question: "Why does my total monthly payment sometimes change if I have a fixed rate?",
        answer: "While your Principal and Interest (P&I) is permanently locked, local property taxes and homeowners insurance premiums adjust over time in your escrow account.",
      },
      {
        question: "Should I choose a 15-year or 30-year fixed rate?",
        answer: "A 30-year fixed provides lower monthly payments and cash-flow breathing room. A 15-year fixed offers lower interest rates and saves tens of thousands in lifetime interest, but requires higher monthly payments.",
      },
    ],
    recommendedCalculator: {
      title: "Mortgage Payment Calculator",
      href: "/calculators/mortgage-payment",
      description: "Compare 15-year vs. 30-year amortization and lifetime interest savings.",
    },
    metrics: {
      minDownPayment: "3% – 5%",
      creditScoreGuideline: "620+",
      maxLtv: "97%",
      termOptions: "10, 15, 20, 25, 30 Years",
    },
  },
  {
    id: "arm",
    slug: "arm",
    title: "Adjustable-Rate Mortgages (ARM)",
    category: "Buying a Home",
    heroTagline: "Lower introductory interest rates for strategic financial horizons.",
    shortDescription: "Secure lower initial interest rates during the first 5, 7, or 10 years, perfect for planned moves, rapid career growth, or market transitions.",
    detailedOverview:
      "A hybrid adjustable-rate mortgage (ARM) provides an introductory fixed-rate period — commonly 5, 7, or 10 years — during which your interest rate is lower than prevailing 30-year fixed mortgages. After the initial term, the rate adjusts periodically according to an established market index (such as SOFR) plus a predetermined margin, protected by strict lifetime adjustment caps.",
    targetBorrower: [
      "Homebuyers who anticipate moving, upsizing, or relocating within 5 to 7 years",
      "Professionals anticipating significant income growth in the near term",
      "Borrowers seeking lower monthly payments during the initial homeownership years",
      "Buyers planning to refinance before the initial fixed-rate period concludes",
    ],
    keyBenefits: [
      "Lower introductory rate compared to comparable 30-year fixed loans",
      "Higher initial purchasing power and monthly savings during the first 5 to 10 years",
      "Lifetime caps limit how much your interest rate can adjust annually and over time",
      "Pay down principal faster during the lower-rate period",
    ],
    eligibilityFactors: [
      "Credit scores typically 640+",
      "Underwriting qualification typically evaluated at the higher fully indexed rate for safety",
      "Adequate income reserves to handle potential rate adjustments",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "Horizon Planning",
        description: "Align your loan fixed period (5/1, 7/1, or 10/1) with your expected occupancy timeframe.",
      },
      {
        stepNumber: 2,
        title: "Cap & Margin Review",
        description: "Review initial, periodic, and lifetime rate adjustment caps for total transparency.",
      },
      {
        stepNumber: 3,
        title: "Underwriting & Clear-to-Close",
        description: "Validate assets and property appraisal efficiently.",
      },
      {
        stepNumber: 4,
        title: "Low Initial Payment Commencement",
        description: "Enjoy substantial monthly savings during your fixed intro term.",
      },
    ],
    faqs: [
      {
        question: "How are ARM adjustment caps structured?",
        answer: "A standard 5/1 ARM often has a 2/2/5 cap structure: the rate can change by at most 2% on the first adjustment, at most 2% on subsequent annual adjustments, and never more than 5% above the starting rate over the loan's lifetime.",
      },
      {
        question: "What happens when the introductory period expires?",
        answer: "You can choose to keep the loan as it adjusts, pay it off, sell the home, or refinance into a new fixed-rate mortgage prior to adjustment.",
      },
    ],
    recommendedCalculator: {
      title: "Mortgage Payment Calculator",
      href: "/calculators/mortgage-payment",
      description: "Compare introductory ARM payments against standard 30-year fixed rates.",
    },
    metrics: {
      minDownPayment: "5%",
      creditScoreGuideline: "640+",
      maxLtv: "95%",
      termOptions: "5/1, 7/1, 10/1 SOFR ARM",
    },
  },
  {
    id: "cash-out-refinance",
    slug: "cash-out-refinance",
    title: "Cash-Out Refinance",
    category: "Refinancing",
    heroTagline: "Convert accrued home equity into liquid capital for what matters most.",
    shortDescription: "Replace your existing mortgage with a larger loan to access your home equity in cash for debt consolidation, home renovations, or investments.",
    detailedOverview:
      "Home values across the United States have reached historic highs, creating substantial home equity for existing homeowners. A cash-out refinance replaces your current mortgage with a new, larger loan balance, paying off the old mortgage and delivering the remaining difference to you in a lump sum at closing.",
    targetBorrower: [
      "Homeowners with substantial equity (typically 20% or more) seeking liquid capital",
      "Borrowers consolidating high-interest credit cards (20%–28% APR) into a single low-rate payment",
      "Homeowners funding major property renovations, additions, or energy efficiency upgrades",
      "Families financing higher education, college tuition, or emergency liquidity needs",
    ],
    keyBenefits: [
      "Lower interest rates compared to personal loans, credit cards, or retail contractor financing",
      "Consolidate multiple monthly payments into one manageable mortgage obligation",
      "Interest paid may be tax-deductible when funds are used for substantial home improvements (consult your CPA)",
      "Access up to 80% of your home's appraised market value (100% on VA cash-out)",
    ],
    eligibilityFactors: [
      "Minimum 20% equity remaining after the new loan is funded (maximum 80% LTV)",
      "Credit score generally 620+ for conventional, 580+ for FHA, 620+ for VA",
      "Standard debt-to-income qualification guidelines (typically under 43%–45%)",
      "Waiting period: typically 6 months of seasoning on current title",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "Equity Assessment",
        description: "Determine your home's current estimated value and existing mortgage balance.",
      },
      {
        stepNumber: 2,
        title: "Cash-Out Structuring",
        description: "Select the cash payout amount that achieves your goals while maintaining healthy equity.",
      },
      {
        stepNumber: 3,
        title: "Appraisal & Title Verification",
        description: "A licensed appraiser confirms current market value.",
      },
      {
        stepNumber: 4,
        title: "Wire Payout & Closing",
        description: "Existing mortgage is paid in full; remaining cash proceeds are wired to your bank account after standard 3-day right of rescission.",
      },
    ],
    faqs: [
      {
        question: "What is the 3-day right of rescission?",
        answer: "Federal law under the Truth in Lending Act guarantees a 3-business-day cooling-off period on refinances of primary residences. Funds are disbursed on the 4th business day after closing documents are signed.",
      },
      {
        question: "How much cash can I take out?",
        answer: "Conventional guidelines permit borrowing up to 80% of your home's appraised value minus your existing mortgage balance. VA loans permit up to 100% LTV for eligible veterans.",
      },
    ],
    recommendedCalculator: {
      title: "Refinance Calculator",
      href: "/calculators/refinance",
      description: "Calculate cash-out proceeds, new monthly payment, and debt consolidation savings.",
    },
    metrics: {
      minDownPayment: "20% Equity Retained",
      creditScoreGuideline: "620+",
      maxLtv: "80% (100% VA)",
      termOptions: "15, 20, 30 Years",
    },
  },
  {
    id: "rate-and-term-refinance",
    slug: "rate-and-term-refinance",
    title: "Rate-and-Term Refinance",
    category: "Refinancing",
    heroTagline: "Lower your interest rate, reduce monthly payments, or shorten your loan term.",
    shortDescription: "Optimize your current mortgage by restructuring your interest rate, switching from an ARM to a fixed rate, or paying off your home years sooner.",
    detailedOverview:
      "A rate-and-term refinance changes the interest rate, the loan duration (term), or both, without withdrawing additional cash equity from the property. Whether you are looking to lower your monthly overhead, eliminate PMI, or shorten a 30-year term to a 15-year to retire debt-free, our streamlined refinance workflow minimizes closing time and friction.",
    targetBorrower: [
      "Homeowners whose current interest rate is higher than prevailing market rates",
      "Borrowers with an existing ARM approaching its first adjustment date",
      "Homeowners seeking to eliminate private mortgage insurance (PMI)",
      "Borrowers moving from a 30-year term to a 15-year term to save tens of thousands in interest",
    ],
    keyBenefits: [
      "Immediate reduction in monthly mortgage payment and annual housing outlay",
      "Substantial lifetime interest savings by securing lower APR or shorter term",
      "Opportunity to eliminate monthly PMI if your home has appreciated to 80% LTV",
      "Transition from variable ARM risk to fixed-rate security",
    ],
    eligibilityFactors: [
      "Current on mortgage payments with no 30-day late payments in the past 12 months",
      "Sufficient home equity (typically 3%–5% minimum equity for conventional)",
      "Clear tangible net benefit demonstrated under CFPB underwriting rules",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "Break-Even Analysis",
        description: "We calculate your monthly savings and break-even timeframe down to the penny.",
      },
      {
        stepNumber: 2,
        title: "Rate Lock & Streamlined Upload",
        description: "Lock your target rate and upload digital paystubs and insurance.",
      },
      {
        stepNumber: 3,
        title: "Appraisal Waiver Check",
        description: "Many rate-and-term refinances qualify for an automated Property Inspection Waiver (PIW), saving $600 and 2 weeks.",
      },
      {
        stepNumber: 4,
        title: "Closing & Payment Skip",
        description: "Sign closing documents, skip up to one month's mortgage payment, and begin lower monthly billing.",
      },
    ],
    faqs: [
      {
        question: "What is considered a good break-even period?",
        answer: "Most financial advisors recommend a break-even period of 24 to 36 months or less. If your monthly savings recoup all closing costs within two to three years and you plan to stay in the home longer, refinancing makes clear financial sense.",
      },
      {
        question: "Can I roll closing costs into the new loan?",
        answer: "Yes, closing costs can typically be rolled into the new loan amount so you bring zero cash out of pocket to the closing table.",
      },
    ],
    recommendedCalculator: {
      title: "Refinance Calculator",
      href: "/calculators/refinance",
      description: "Analyze monthly payment savings, lifetime interest reduction, and exact break-even months.",
    },
    metrics: {
      minDownPayment: "3% – 5% Equity",
      creditScoreGuideline: "620+",
      maxLtv: "97%",
      termOptions: "10, 15, 20, 30 Years",
    },
  },
  {
    id: "reverse-mortgage",
    slug: "reverse-mortgage",
    title: "Reverse Mortgage (HECM)",
    category: "Refinancing",
    heroTagline: "Unlock home equity without required monthly mortgage payments for seniors 62+.",
    shortDescription: "A specialized FHA-insured Home Equity Conversion Mortgage (HECM) allowing mature homeowners to convert equity into cash flow or a growing credit line.",
    detailedOverview:
      "Insured by the Federal Housing Administration (FHA), a Home Equity Conversion Mortgage (HECM) allows homeowners aged 62 and older to access a portion of their home equity without making required monthly principal and interest payments. The borrower retains title and ownership of their home, while the loan is repaid only when the borrower permanently moves, sells the home, or passes away.",
    targetBorrower: [
      "Homeowners aged 62 or older who own their home outright or have substantial equity (typically 50%+)",
      "Retirees seeking to supplement fixed pension or Social Security income",
      "Seniors establishing a growing line of credit for future healthcare or long-term care reserves",
      "Homeowners desiring to eliminate their existing monthly mortgage payment",
    ],
    keyBenefits: [
      "No required monthly mortgage payments (borrower must maintain property taxes, insurance, and maintenance)",
      "Flexible disbursement options: lump sum, monthly tenure payments, or an appreciating line of credit",
      "Non-recourse protection: You or your heirs can never owe more than the home's fair market value at sale",
      "You retain title and remain the owner of your home for life",
    ],
    eligibilityFactors: [
      "Youngest titleholder must be age 62 or older",
      "Property must be your principal residence",
      "Mandatory completion of independent third-party HUD-approved housing counseling",
      "Financial assessment demonstrating ability to maintain property taxes, homeowners insurance, and HOA dues",
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "HUD-Approved Counseling",
        description: "Complete an independent counseling session with a certified non-profit counselor to ensure informed decision-making.",
      },
      {
        stepNumber: 2,
        title: "Application & Financial Assessment",
        description: "We structure your tenure, lump sum, or line of credit options.",
      },
      {
        stepNumber: 3,
        title: "FHA Appraisal",
        description: "An FHA-approved appraiser establishes current fair market value.",
      },
      {
        stepNumber: 4,
        title: "Settlement & Funding",
        description: "Pay off any existing mortgage; receive your initial funds or active line of credit.",
      },
    ],
    faqs: [
      {
        question: "Does the bank take ownership of my home?",
        answer: "No. This is a common misconception. You retain full title and deed to your property, exactly like any standard mortgage. The lender simply holds a lien. You or your heirs sell the property upon passing and keep any remaining equity.",
      },
      {
        question: "What happens to my heirs?",
        answer: "Because HECM reverse mortgages are non-recourse loans insured by HUD, your heirs can never be held personally liable for any loan balance that exceeds the home value. They can choose to keep the home by paying off 95% of the appraised value, or sell the home and retain the excess equity.",
      },
    ],
    recommendedCalculator: {
      title: "Mortgage Calculators Overview",
      href: "/calculators",
      description: "Explore all financial calculators and consult our HECM lending specialist.",
    },
    metrics: {
      minDownPayment: "50%+ Equity Required",
      creditScoreGuideline: "Financial Assessment",
      maxLtv: "Principal Limit Factor",
      termOptions: "Life of Borrower",
    },
  },
];
