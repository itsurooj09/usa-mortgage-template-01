import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy | Financial Privacy & Data Protection",
  description:
    "Review Northstar Mortgage's privacy practices, Gramm-Leach-Bliley Act (GLBA) disclosures, and California Consumer Privacy Act (CCPA) rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <Container size="narrow">
        <div className="space-y-8">
          <div className="border-b border-border-subtle pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
              Legal Compliance
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight">
              Privacy Policy & Financial Privacy Notice
            </h1>
            <p className="text-xs text-slate-500">
              Last Updated: October 2026 • Effective Date: January 1, 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <p>
              This Privacy Policy explains how {siteConfig.brand.legalName} (&quot;Northstar Mortgage,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, maintains, uses, and safeguards non-public personal financial information (NPI) when you access our website, use our mortgage calculation tools, or submit preliminary loan inquiries.
            </p>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              1. What Information We Collect
            </h2>
            <p>
              Under Title V of the Gramm-Leach-Bliley Act (GLBA), we collect non-public personal information about you from the following sources:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Information you provide on borrower inquiries, pre-approval surveys, and contact forms (such as your name, telephone number, email address, property state and ZIP code, estimated home value, down payment, and self-reported credit tier).</li>
              <li>Information about your transactions with us, our affiliates, or independent third parties (such as loan account history, appraisal reports, and title commitments).</li>
              <li>Consumer reporting agencies (such as your credit score, credit profile, and payment history) when you authorize a formal pre-approval.</li>
            </ul>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              2. How We Guard and Safeguard Your Data
            </h2>
            <p>
              We restrict access to non-public personal information about you to those employees, underwriters, and processors who need to know that information to provide mortgage products and closing services to you. We maintain electronic, physical, and procedural safeguards adhering to federal regulations (including 256-bit SSL encryption, firewalls, and restricted database permissions).
            </p>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              3. Information We Do Not Share
            </h2>
            <p>
              <strong>We do not sell your personal information or phone number to third-party marketing aggregators.</strong> We share your information only as permitted by federal law with necessary service providers essential to underwriting your mortgage (such as credit reporting agencies, certified residential real estate appraisers, and title/escrow closing attorneys).
            </p>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              4. California Consumer Privacy Act (CCPA) Notice
            </h2>
            <p>
              If you are a California resident, the California Consumer Privacy Act (CCPA) provides you with specific rights regarding your personal information, including the right to request disclosure of what personal information we collect, the right to request deletion of non-exempt personal information, and the right not to be discriminated against for exercising your privacy rights.
            </p>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              5. Communications and Opt-Out
            </h2>
            <p>
              You may opt out of promotional emails by clicking the &quot;unsubscribe&quot; link in any marketing message. To update your communication preferences, contact our Compliance Department at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-navy-midnight font-bold underline">
                {siteConfig.contact.email}
              </a>{" "}
              or by phone at {siteConfig.contact.phoneFormatted}.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
