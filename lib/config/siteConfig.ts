export interface SiteConfig {
  brand: {
    name: string;
    legalName: string;
    tagline: string;
    description: string;
    nmlsId: string;
    nmlsConsumerAccessUrl: string;
    foundedYear: number;
    equalHousingLender: boolean;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    hours: string;
  };
  primaryLoanOfficer: {
    name: string;
    title: string;
    nmlsId: string;
    phone: string;
    email: string;
    bio: string;
    experienceYears: number;
    avatarUrl: string;
    licensedStates: string[];
    calendlyUrl: string;
  };
  navigation: {
    applyNowUrl: string;
    scheduleUrl: string;
    portalUrl: string;
  };
  statesLicensed: Array<{
    code: string;
    name: string;
    licenseNumber: string;
    regulator: string;
  }>;
  disclosures: {
    generalRateDisclaimer: string;
    calculatorDisclaimer: string;
    licensingDisclaimer: string;
    demoNotice: string;
  };
  socialLinks: {
    linkedin?: string;
    facebook?: string;
    x?: string;
    instagram?: string;
    youtube?: string;
  };
  integrations: {
    crmWebhookUrl: string;
    analyticsId?: string;
    rateFeedConfigured: boolean;
    rateFeedLastUpdated: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "Mortgage Level",
    legalName: "Mortgage Level, LLC",
    tagline: "Clear paths to homeownership through precision American mortgage lending.",
    description: "Mortgage Level is a premier residential mortgage lender dedicated to providing transparent loan solutions, competitive rates, and seamless digital closing experiences across the United States.",
    nmlsId: "1948271",
    nmlsConsumerAccessUrl: "https://www.nmlsconsumeraccess.org/",
    foundedYear: 2011,
    equalHousingLender: true,
  },
  contact: {
    phone: "1-800-555-8290",
    phoneFormatted: "(800) 555-8290",
    email: "inquiries@mortgagelevel.com",
    address: {
      street: "1200 Financial Plaza",
      suite: "Suite 450",
      city: "Charlotte",
      state: "NC",
      zip: "28202",
      country: "USA",
    },
    hours: "Monday – Friday: 8:00 AM – 7:00 PM EST | Saturday: 9:00 AM – 2:00 PM EST",
  },
  primaryLoanOfficer: {
    name: "David Vance",
    title: "Senior Vice President of Residential Lending",
    nmlsId: "847291",
    phone: "(800) 555-8290",
    email: "dvance@mortgagelevel.com",
    bio: "With over 18 years of residential mortgage experience, David has guided thousands of American families through conventional, jumbo, VA, and FHA financing. He specializes in tailored loan structuring, transparent rate advisory, and rapid 21-day closing workflows.",
    experienceYears: 18,
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    licensedStates: ["NC", "SC", "FL", "GA", "VA", "TN", "TX", "CA", "CO", "OH", "PA"],
    calendlyUrl: "https://calendly.com",
  },
  navigation: {
    applyNowUrl: "https://apply.northstarmortgage.com/start",
    scheduleUrl: "/contact#schedule",
    portalUrl: "https://portal.northstarmortgage.com",
  },
  statesLicensed: [
    { code: "NC", name: "North Carolina", licenseNumber: "L-1948271-NC", regulator: "NC Commissioner of Banks" },
    { code: "SC", name: "South Carolina", licenseNumber: "MB-1948271-SC", regulator: "SC Board of Financial Institutions" },
    { code: "FL", name: "Florida", licenseNumber: "MLD-1948271", regulator: "FL Office of Financial Regulation" },
    { code: "GA", name: "Georgia", licenseNumber: "GA-1948271", regulator: "GA Department of Banking and Finance" },
    { code: "VA", name: "Virginia", licenseNumber: "MC-1948271", regulator: "VA State Corporation Commission Bureau of Financial Institutions" },
    { code: "TX", name: "Texas", licenseNumber: "SML-1948271", regulator: "TX Department of Savings and Mortgage Lending" },
    { code: "CA", name: "California", licenseNumber: "DFPI-60DBO-19482", regulator: "CA Department of Financial Protection and Innovation" },
    { code: "CO", name: "Colorado", licenseNumber: "CO-1948271", regulator: "CO Division of Real Estate" },
    { code: "OH", name: "Ohio", licenseNumber: "RM.804912.000", regulator: "OH Division of Financial Institutions" },
    { code: "TN", name: "Tennessee", licenseNumber: "TN-1948271", regulator: "TN Department of Financial Institutions" },
    { code: "PA", name: "Pennsylvania", licenseNumber: "PA-1948271", regulator: "PA Department of Banking and Securities" },
  ],
  disclosures: {
    generalRateDisclaimer: "All loan programs, interest rates, terms, and conditions are subject to credit approval, property appraisal, and market conditions. APRs and rates displayed represent indicative benchmark averages as of the stated date and do not constitute an official loan estimate, commitment to lend, or rate lock. Actual rates may vary depending on loan type, down payment, LTV, credit score, and property location.",
    calculatorDisclaimer: "The figures generated by these financial calculators are for illustrative and educational purposes only. They do not represent an official loan estimate, pre-approval, commitment to lend, or a guarantee of eligibility under the Truth in Lending Act (TILA) or Real Estate Settlement Procedures Act (RESPA). Taxes, insurance, and fees are estimates and will vary by municipality and insurer.",
    licensingDisclaimer: "Northstar Mortgage Capital, LLC | NMLS ID #1948271. An Equal Housing Lender. In accordance with Section 8 of RESPA and federal fair housing guidelines, Northstar Mortgage does not discriminate on the basis of race, color, religion, national origin, sex, marital status, or age.",
    demoNotice: "Template 01 Demo Instance. Demonstrating full production UI/UX, verified calculation engines, and lead architecture. Client branding, NMLS credentials, and CRM endpoints are fully configurable via siteConfig.",
  },
  socialLinks: {
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    x: "https://x.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  integrations: {
    crmWebhookUrl: process.env.CRM_WEBHOOK_URL || "",
    analyticsId: process.env.NEXT_PUBLIC_GA_ID,
    rateFeedConfigured: true,
    rateFeedLastUpdated: "2026-10-23",
  },
};
