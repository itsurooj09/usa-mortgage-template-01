export interface TeamMember {
  id: string;
  name: string;
  role: string;
  nmlsId: string;
  phone: string;
  email: string;
  avatarUrl: string;
  bio: string;
  licensedStates: string[];
  specialties: string[];
  calendlyUrl: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "david-vance",
    name: "David Vance",
    role: "Senior Vice President of Residential Lending",
    nmlsId: "847291",
    phone: "(800) 555-8290",
    email: "dvance@northstarmortgage.com",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    bio: "With over 18 years of residential mortgage experience, David has guided thousands of American families through conventional, jumbo, VA, and FHA financing. He specializes in tailored loan structuring, transparent rate advisory, and rapid 21-day closing workflows.",
    licensedStates: ["NC", "SC", "FL", "GA", "VA", "TN", "TX", "CA", "CO", "OH", "PA"],
    specialties: ["Conforming Purchase", "Jumbo & Luxury", "Veteran VA Financing", "High-Asset Advisory"],
    calendlyUrl: "https://calendly.com",
  },
  {
    id: "marcus-reynolds",
    name: "Marcus Reynolds",
    role: "Senior Mortgage Advisor & First-Time Buyer Specialist",
    nmlsId: "910244",
    phone: "(800) 555-8291",
    email: "mreynolds@northstarmortgage.com",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    bio: "Marcus has dedicated over a decade to demystifying home financing for first-time buyers. He has helped over 1,200 buyers leverage down payment assistance grants and flexible FHA/conventional options.",
    licensedStates: ["NC", "SC", "VA", "GA", "FL"],
    specialties: ["First-Time Buyers", "Down Payment Assistance", "FHA Financing", "Credit Optimization"],
    calendlyUrl: "https://calendly.com",
  },
  {
    id: "amanda-chen",
    name: "Amanda Chen",
    role: "Vice President of Refinance & Portfolio Strategy",
    nmlsId: "1049283",
    phone: "(800) 555-8292",
    email: "achen@northstarmortgage.com",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Amanda oversees our refinance advisory desk, helping existing homeowners optimize their balance sheets through cash-out equity harvesting, debt consolidation, and loan restructuring.",
    licensedStates: ["NC", "SC", "FL", "TX", "CA", "CO"],
    specialties: ["Cash-Out Refinancing", "Debt Consolidation", "Rate-and-Term", "Investor Portfolios"],
    calendlyUrl: "https://calendly.com",
  },
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Director of Mortgage Operations & Underwriting Liaison",
    nmlsId: "1482019",
    phone: "(800) 555-8293",
    email: "smitchell@northstarmortgage.com",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bio: "Leading our processing and underwriting team, Sarah ensures every file moves efficiently from application to Clear-to-Close in under 21 calendar days with zero last-minute document surprises.",
    licensedStates: ["Nationwide Processing Liaison"],
    specialties: ["Underwriting Operations", "Closing Disclosure Verification", "Digital Escrow"],
    calendlyUrl: "https://calendly.com",
  },
];
