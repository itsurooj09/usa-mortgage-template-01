/**
 * Curated Photographic Asset Library
 * High-resolution, authentic residential architecture, lifestyle, and advisory photography
 * from Unsplash with commercial-safe CDN delivery and descriptive alt tags.
 */

export interface PhotoAsset {
  id: string;
  url: string;
  alt: string;
  title: string;
  category: "hero" | "architecture" | "lifestyle" | "interiors" | "consultation" | "programs";
  aspectRatio?: "landscape" | "portrait" | "wide";
}

export const photoLibrary = {
  hero: {
    mainHome: {
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
      alt: "Spectacular contemporary American luxury home with illuminated pool and manicured lawn at twilight",
      title: "Premier American Residential Estate",
    },
    daytimeSuburban: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
      alt: "Stunning modern architectural residence with lush green lawn under clear blue sky",
      title: "Modern Suburban Architecture",
    },
    familyPorch: {
      url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1800&q=80",
      alt: "Inviting classic American suburban home with porch and front yard garden",
      title: "Classic American Home",
    },
  },
  lifestyle: {
    happyCoupleKeys: {
      url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
      alt: "First-time homebuyers smiling holding keys to their new front door",
      title: "Homeownership Milestone",
    },
    familyOutside: {
      url: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=80",
      alt: "Happy American family playing together in front yard of their suburban home",
      title: "Family Outside Home",
    },
    seniorCouple: {
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      alt: "Mature couple smiling comfortably on their sunny garden patio",
      title: "Senior Homeowners",
    },
    renovationPlanning: {
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern renovated kitchen space with marble countertops and natural light",
      title: "Modern Home Renovation",
    },
  },
  interiors: {
    brightLivingRoom: {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
      alt: "Spacious sunlit living room with high ceilings, hardwood flooring, and contemporary furnishings",
      title: "Sunlit Interior",
    },
    openKitchen: {
      url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      alt: "Gourmet open-concept kitchen with large center island and modern designer lighting",
      title: "Gourmet Open Kitchen",
    },
  },
  consultation: {
    advisoryMeeting: {
      url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      alt: "Professional mortgage advisor reviewing financial documents with clients in modern office",
      title: "Mortgage Advisory Consultation",
    },
    digitalReview: {
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      alt: "Financial analyst examining mortgage rate figures and loan options on tablet and paperwork",
      title: "Financial Analysis & Rate Advisory",
    },
  },
  programs: {
    conventional: {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      alt: "Beautiful white modern home with manicured landscape representing conventional lending",
      title: "Conventional Conforming Homes",
    },
    fha: {
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80",
      alt: "Charming family home in friendly suburban neighborhood representing FHA financing",
      title: "FHA Accessible Purchase",
    },
    va: {
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      alt: "Proud single-story modern Craftsman home representing military veteran VA benefits",
      title: "VA Home Loan Financing",
    },
    usda: {
      url: "https://images.unsplash.com/photo-1505873247407-7a54483b3846?auto=format&fit=crop&w=1000&q=80",
      alt: "Picturesque suburban country home surrounded by green trees representing USDA rural financing",
      title: "USDA Rural & Suburban Homes",
    },
    jumbo: {
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
      alt: "Luxury architectural mansion with infinity pool representing high-balance Jumbo financing",
      title: "Jumbo Luxury Estates",
    },
    firstTime: {
      url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80",
      alt: "Joyful new homeowners with house keys representing first-time homebuyer programs",
      title: "First-Time Homeownership",
    },
  },
};
