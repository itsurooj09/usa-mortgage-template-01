export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Home Buying" | "Mortgage Rates" | "Refinancing" | "Credit & Budget";
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  publishedDate: string;
  readingTime: string;
  featuredImage: string;
  content: string[]; // array of paragraphs and headers
  keyTakeaways: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-much-house-can-you-afford-in-2026",
    title: "How Much House Can You Afford in 2026? The Realistic Buyer's Guide",
    excerpt: "Break down the 28/36 rule, modern debt-to-income benchmarks, and hidden ownership costs before setting your home shopping budget.",
    category: "Home Buying",
    author: {
      name: "David Vance",
      role: "SVP of Residential Lending, NMLS #847291",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    },
    publishedDate: "October 14, 2026",
    readingTime: "6 min read",
    featuredImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    keyTakeaways: [
      "Understand the difference between what a lender will approve and what your household budget can comfortably sustain.",
      "The classic 28/36 rule limits your total monthly housing cost to 28% of gross monthly income, and all total debt to 36%.",
      "Factor in property taxes, insurance, HOA fees, and maintenance reserves beyond simple principal and interest.",
      "Explore how varying down payment sizes affect monthly private mortgage insurance (PMI).",
    ],
    content: [
      "When embarking on the journey to purchase a home in the United States, the single most critical financial calculation is determining your true purchasing power. While online listing portals highlight attractive property pictures, the monthly financial commitment goes far beyond the advertised listing price.",
      "Lenders traditionally evaluate your borrowing power using two primary Debt-to-Income (DTI) metrics: the Front-End Ratio and the Back-End Ratio. The front-end ratio examines what proportion of your gross monthly income goes toward your complete housing payment (Principal, Interest, Taxes, and Insurance, or PITI). The back-end ratio examines your housing payment combined with all recurring monthly debt obligations, including auto loans, minimum credit card payments, and student debt.",
      "Under standard conforming guidelines established by Fannie Mae and Freddie Mac, lenders look for a front-end ratio around 28% and a back-end ratio of 36% to 43%. However, automated underwriting systems can approve back-end ratios up to 45% or even 50% for borrowers with excellent credit scores, significant cash reserves, and low loan-to-value ratios.",
      "Beyond debt ratios, remember that owning a home entails ongoing operational costs. A general rule of thumb recommended by certified financial planners is to reserve 1% to 2% of the home's value annually for maintenance, repairs, and seasonal upkeep. Utilizing our Home Affordability Calculator allows you to model these variables interactively and find your financial sweet spot.",
    ],
  },
  {
    slug: "conventional-vs-fha-loans-which-fits-your-goals",
    title: "Conventional vs. FHA Loans: Which One Fits Your Financial Goals?",
    excerpt: "Compare mortgage insurance costs, credit score minimums, down payment flexibility, and long-term savings between America's two most popular loan programs.",
    category: "Home Buying",
    author: {
      name: "Marcus Reynolds",
      role: "Senior Mortgage Advisor, NMLS #910244",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    },
    publishedDate: "October 08, 2026",
    readingTime: "5 min read",
    featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    keyTakeaways: [
      "Conventional loans require a 620+ credit score and offer cancellable PMI when you reach 20% equity.",
      "FHA loans allow credit scores down to 580 with 3.5% down, but mortgage insurance remains for the life of the loan in most cases.",
      "Borrowers with higher credit scores (700+) typically save significantly more money long-term with conventional financing.",
      "FHA loans are more forgiving with recent credit issues, higher DTI ratios, and non-occupant co-signers.",
    ],
    content: [
      "Every year, millions of Americans weigh the choice between a Conventional conforming mortgage and an FHA government-insured loan. Both programs provide pathways to homeownership with modest down payments, yet their underlying fee structures and underwriting criteria differ significantly.",
      "The pivotal distinction lies in how mortgage insurance is handled. On a conventional loan, if you put down less than 20%, you pay Private Mortgage Insurance (PMI). Under the federal Homeowners Protection Act, you can request that PMI be dropped once your principal balance drops to 80% of the original home value, and it automatically terminates at 78%. Furthermore, if your home appreciates in market value, you can request a reappraisal to eliminate PMI early.",
      "In contrast, FHA financing requires two types of mortgage insurance: an Upfront Mortgage Insurance Premium (UFMIP) equal to 1.75% of your loan amount, plus an ongoing Annual MIP paid monthly. For borrowers putting down the standard 3.5%, that annual MIP remains on the loan for the entire 30-year term. The only way to remove it is by refinancing into a conventional loan once sufficient equity is achieved.",
      "If your credit score is 680 or above and you have funds for at least 3% to 5% down, a conventional loan is almost always more cost-effective over a 5 to 10-year horizon. However, if your credit score is between 580 and 660, FHA rates and lower risk adjustments often deliver a lower monthly payment. Our team can run a side-by-side total cost analysis to ensure you make the optimal choice.",
    ],
  },
  {
    slug: "veterans-complete-guide-to-va-home-loans",
    title: "A Veteran's Complete Guide to the VA Home Loan Benefit in 2026",
    excerpt: "Unpack the power of 0% down payment, zero monthly PMI, funding fee exemptions, and recent updates to the Blue Water Navy Vietnam Veterans Act.",
    category: "Home Buying",
    author: {
      name: "David Vance",
      role: "SVP of Residential Lending, NMLS #847291",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    },
    publishedDate: "September 29, 2026",
    readingTime: "7 min read",
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80",
    keyTakeaways: [
      "VA loans offer true 100% financing with zero down payment required.",
      "No monthly private mortgage insurance (PMI or MIP) is ever charged on a VA loan.",
      "Veterans with a service-connected disability rating are 100% exempt from the one-time VA funding fee.",
      "There is no statutory cap on loan amount for veterans with full entitlement.",
    ],
    content: [
      "Enacted as part of the original GI Bill in 1944, the VA Home Loan program is arguably the most beneficial residential lending vehicle in the world. Designed to honor the sacrifices of military service members, veterans, and qualifying surviving spouses, the program eliminates the two largest hurdles in real estate: large down payments and costly monthly mortgage insurance.",
      "Unlike conventional loans that penalize borrowers putting down less than 20% with ongoing PMI charges, a VA loan requires zero monthly mortgage insurance regardless of down payment size. On a $400,000 home purchase, eliminating a $180/month PMI fee saves the veteran over $21,000 in unnecessary fees over ten years.",
      "Instead of ongoing mortgage insurance, the Department of Veterans Affairs charges a one-time funding fee that supports the loan guarantee fund. For first-time users putting down 0%, this fee is 2.15% of the loan amount, which can be financed directly into the mortgage. Crucially, any veteran receiving VA compensation for a service-connected disability, or surviving spouses receiving DIC, is completely exempt from paying this fee.",
      "Furthermore, under the Blue Water Navy Vietnam Veterans Act, statutory loan limits were eliminated for veterans with full entitlement. Whether purchasing a $350,000 starter home or an $850,000 executive property, eligible veterans can finance 100% of the purchase price with zero down payment, subject only to lender underwriting and credit approval.",
    ],
  },
  {
    slug: "understanding-closing-costs-what-buyers-must-know",
    title: "Understanding Closing Costs: What Every Buyer Must Know Before Signing",
    excerpt: "Demystify loan origination, title insurance, recording taxes, and prepaid escrow reserves. Learn how to spot unnecessary fees on your Loan Estimate.",
    category: "Credit & Budget",
    author: {
      name: "Marcus Reynolds",
      role: "Senior Mortgage Advisor, NMLS #910244",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    },
    publishedDate: "September 18, 2026",
    readingTime: "5 min read",
    featuredImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    keyTakeaways: [
      "Closing costs typically run 2% to 4% of your total loan amount on top of your down payment.",
      "Your official Loan Estimate (LE) categorizes fees into non-shoppable lender fees, shoppable services, and government recording fees.",
      "Prepaids and escrow reserves represent your own money allocated toward future taxes and insurance.",
      "Sellers can contribute up to 3%–6% toward your closing costs via seller concessions.",
    ],
    content: [
      "One of the most stressful moments for an unprepared homebuyer is discovering that they need thousands of dollars beyond their down payment to close on their home. In the United States, closing costs encompass all third-party administrative, legal, and governmental expenses required to transfer real property and finalize a mortgage lien.",
      "Under TRID (TILA-RESPA Integrated Disclosure) regulations enforced by the Consumer Financial Protection Bureau (CFPB), lenders must deliver a standardized three-page Loan Estimate within three business days of receiving your completed application. The form is categorized into Page 2 Sections: Section A (Origination Charges), Section B (Services You Cannot Shop For), and Section C (Services You Can Shop For).",
      "Pay careful attention to Sections E, F, and G. Section E covers county recording fees and state transfer taxes, which are fixed by local government statute. Sections F and G are 'prepaids' and 'initial escrow payments.' These are not lender fees; they are advance payments of your own homeowners insurance premium (usually 12 months in advance) and property tax reserves deposited into an escrow account so your servicer can pay your county taxes when due.",
      "During purchase negotiations, you and your real estate agent can request seller concessions in your purchase contract. On conventional loans with less than 10% down, sellers can contribute up to 3% of the purchase price toward your closing costs. On FHA and USDA loans, sellers can contribute up to 6%. This strategy can significantly lower the liquid cash you need to bring to the closing table.",
    ],
  },
];
