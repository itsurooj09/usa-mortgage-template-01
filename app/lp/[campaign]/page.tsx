import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ContextualLeadForm } from "@/components/forms/ContextualLeadForm";
import { siteConfig } from "@/lib/config/siteConfig";

interface CampaignData {
  title: string;
  tagline: string;
  description: string;
  loanType: string;
  defaultPurpose: "buy" | "refinance" | "explore";
  heroImage: string;
  bulletPoints: string[];
}

const CAMPAIGNS: Record<string, CampaignData> = {
  "first-time-homebuyer": {
    title: "First-Time Homebuyer Assistance & Low Down Payment Options",
    tagline: "Purchase your first home with as little as 3% down payment.",
    description: "Explore Fannie Mae HomeReady, Freddie Mac Home Possible, and state grant assistance programs. Clear your loan with certified lending fiduciaries.",
    loanType: "First-Time Homebuyer",
    defaultPurpose: "buy",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    bulletPoints: [
      "Down payment options as low as 3% for qualifying first-time buyers",
      "Gift funds from family members 100% permitted",
      "Cancellable private mortgage insurance once 20% equity is reached",
      "Average 19-day clear-to-close turnaround",
    ],
  },
  "fha-low-down": {
    title: "FHA Home Financing: 3.5% Down Payment & Flexible Credit",
    tagline: "Government-insured homeownership designed for accessible qualification.",
    description: "Qualify with credit scores starting at 580 and enjoy higher debt-to-income allowances. Perfect for buyers building or restoring credit.",
    loanType: "FHA Loan",
    defaultPurpose: "buy",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    bulletPoints: [
      "Minimum 3.5% down payment with 580+ FICO",
      "Higher DTI ratios approved with automated underwriting",
      "Seller can contribute up to 6% toward closing costs",
      "Streamlined refinance options available in future",
    ],
  },
  "va-zero-down": {
    title: "VA Home Loans: 0% Down Payment & Zero Monthly PMI",
    tagline: "Honoring military service members, veterans, and qualifying spouses.",
    description: "Maximize your VA entitlement with true 100% financing, competitive government rates, and exemption from monthly mortgage insurance.",
    loanType: "VA Loan",
    defaultPurpose: "buy",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80",
    bulletPoints: [
      "0% down payment required (100% financing)",
      "Zero monthly private mortgage insurance (PMI / MIP)",
      "100% funding fee waiver for service-connected disability",
      "Direct VA COE pulling in under 5 minutes",
    ],
  },
  "refinance-cash-out": {
    title: "Access Your Home Equity in Cash at Competitive Rates",
    tagline: "Pay off high-interest debt or fund home improvements with your home equity.",
    description: "Replace your existing mortgage with a larger balance to receive cash proceeds directly at closing. Transparent break-even calculations.",
    loanType: "Cash-Out Refinance",
    defaultPurpose: "refinance",
    heroImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    bulletPoints: [
      "Access up to 80% of your home's appraised value in cash",
      "Consolidate high-interest 24% credit cards into one lower monthly payment",
      "Roll closing costs into loan for $0 out-of-pocket settlement",
      "Fast closing in under 21 business days",
    ],
  },
};

export async function generateStaticParams() {
  return [
    { campaign: "first-time-homebuyer" },
    { campaign: "fha-low-down" },
    { campaign: "va-zero-down" },
    { campaign: "refinance-cash-out" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { campaign: string };
}): Promise<Metadata> {
  const data = CAMPAIGNS[params.campaign] || CAMPAIGNS["first-time-homebuyer"];
  return {
    title: `${data.title} | ${siteConfig.brand.name}`,
    description: data.description,
  };
}

export default function AdvertisingLandingPage({
  params,
  searchParams,
}: {
  params: { campaign: string };
  searchParams: { utm_source?: string; utm_medium?: string; utm_campaign?: string };
}) {
  const campaign = CAMPAIGNS[params.campaign] || {
    title: "Check Your Mortgage Pre-Approval Options",
    tagline: "Competitive rates and rapid 19-day closing turnarounds.",
    description: "Find the ideal purchase or refinance loan tailored to your budget and credit profile.",
    loanType: "Mortgage Special",
    defaultPurpose: "buy" as const,
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    bulletPoints: [
      "Soft credit check only — zero impact on your credit score",
      "Competitive national benchmark rates",
      "Verified Pre-Approval letter issued within 24 hours",
      "Direct guidance from licensed Senior Lending Officers",
    ],
  };

  const utmString = [
    searchParams.utm_source ? `source=${searchParams.utm_source}` : "",
    searchParams.utm_campaign ? `campaign=${searchParams.utm_campaign}` : "",
  ].filter(Boolean).join("&");

  return (
    <div className="bg-white min-h-screen">
      {/* Landing Hero */}
      <section className="bg-navy-midnight text-white py-14 lg:py-20 relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <Badge variant="brass" size="sm">{campaign.loanType}</Badge>
                <span className="text-xs text-slate-300">NMLS #{siteConfig.brand.nmlsId}</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                {campaign.title}
              </h1>

              <p className="text-base sm:text-lg text-brass font-medium">
                {campaign.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {campaign.description}
              </p>

              <div className="pt-2 space-y-2.5">
                {campaign.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-brass/20 text-brass flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ✓
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-navy-light/40 flex items-center gap-6 text-xs text-slate-400">
                <span>Equal Housing Lender</span>
                <span>•</span>
                <span>Bank-Grade Encryption</span>
                <span>•</span>
                <span>Zero Credit Score Impact</span>
              </div>
            </div>

            {/* Campaign Focused Lead Form */}
            <div className="lg:col-span-5">
              <ContextualLeadForm
                defaultLoanPurpose={campaign.defaultPurpose}
                defaultLoanProgram={campaign.loanType}
                sourceCampaign={`LP: ${params.campaign}${utmString ? ` (${utmString})` : ""}`}
                headline="Check Custom Rates"
                subheadline="Instant preliminary qualification questionnaire."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust & Guarantee strip */}
      <section className="py-12 bg-ivory-warm border-b border-border-subtle text-center">
        <Container size="narrow">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-600">
            <span>✓ Average 19-Day Clear-to-Close</span>
            <span>✓ Direct Lender Underwriting</span>
            <span>✓ No Hidden Broker Markups</span>
            <span>✓ Transparent Loan Estimates</span>
          </div>
        </Container>
      </section>
    </div>
  );
}
