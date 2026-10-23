export interface TestimonialItem {
  id: string;
  borrowerName: string;
  location: string;
  loanProgram: string;
  rating: number; // 5 out of 5
  quote: string;
  date: string;
  isDemoReview: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "review-1",
    borrowerName: "Marcus & Elena Sterling",
    location: "Raleigh, NC",
    loanProgram: "Conventional 30-Year Fixed",
    rating: 5,
    quote:
      "David and his underwriting team cleared our loan in 19 calendar days. In a multi-offer market where sellers demanded a 21-day close, their fast communication and verified pre-approval gave our offer the winning edge.",
    date: "September 2026",
    isDemoReview: true,
  },
  {
    id: "review-2",
    borrowerName: "Captain Jonathan Miller",
    location: "Fayetteville, NC (Fort Liberty)",
    loanProgram: "VA Home Loan (100% Financing)",
    rating: 5,
    quote:
      "As an active duty service member moving cross-country on PCS orders, I needed a team that truly understood VA entitlement and disability funding fee exemptions. Zero down, zero PMI, and seamless digital closing while I was still out-of-state.",
    date: "August 2026",
    isDemoReview: true,
  },
  {
    id: "review-3",
    borrowerName: "Sarah Chen",
    location: "Charlotte, NC",
    loanProgram: "First-Time Homebuyer / Conventional 97",
    rating: 5,
    quote:
      "Buying my first home felt overwhelming until I spoke with this team. They walked me through the 3% down conventional program, broke down the escrow payments line by line, and made sure there were zero surprise fees at the closing table.",
    date: "September 2026",
    isDemoReview: true,
  },
  {
    id: "review-4",
    borrowerName: "Robert & Linda Harrison",
    location: "Charleston, SC",
    loanProgram: "Rate-and-Term Refinance",
    rating: 5,
    quote:
      "We lowered our mortgage rate by 1.35% and removed PMI that was costing us $190 every month. The refinance calculator predicted our exact break-even timeline of 14 months. Highly professional and transparent.",
    date: "July 2026",
    isDemoReview: true,
  },
];
