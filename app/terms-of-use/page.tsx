import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Terms of Use | Northstar Mortgage",
  description:
    "Terms and conditions governing the use of Northstar Mortgage's website, financial calculators, and preliminary mortgage inquiry services.",
};

export default function TermsOfUsePage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <Container size="narrow">
        <div className="space-y-8">
          <div className="border-b border-border-subtle pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
              Legal Agreement
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight">
              Terms of Use
            </h1>
            <p className="text-xs text-slate-500">
              Last Updated: October 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <p>
              Please read these Terms of Use carefully before accessing or using the website operated by {siteConfig.brand.legalName} (&quot;Northstar Mortgage&quot;). By accessing any portion of our site, you agree to be bound by these terms.
            </p>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              1. Not a Commitment to Lend or Loan Estimate
            </h2>
            <p>
              {siteConfig.disclosures.calculatorDisclaimer}
            </p>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              2. Eligibility and Permitted Use
            </h2>
            <p>
              This website is intended exclusively for residents of the United States who are at least 18 years of age. You agree to provide accurate, truthful information on all inquiry questionnaires and to use this site solely for personal residential financing research.
            </p>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              3. Intellectual Property Rights
            </h2>
            <p>
              All content, design tokens, logos, calculation scripts, text, and visual assets are the exclusive intellectual property of Northstar Mortgage Capital, LLC. Unauthorized reproduction or scraping is strictly prohibited.
            </p>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              4. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of North Carolina and applicable United States federal laws, without regard to conflicts of law provisions.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
