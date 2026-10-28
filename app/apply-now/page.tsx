import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config/siteConfig";
import { photoLibrary } from "@/content/assets";
import { MortgageSurveyWizard } from "@/components/forms/MortgageSurveyWizard";
import {
  EqualHousingBadge,
  SslEncryptionBadge,
  HeroSslShieldBadge,
  PrivacySecurityGuaranteedBadge,
} from "@/components/ui/TrustBadges";

export const metadata: Metadata = {
  title: "Online Loan Application (Form 1003) | Mortgage Level",
  description:
    "Launch your official Uniform Residential Loan Application (URLA / Form 1003) through Mortgage Level's secure 256-bit encrypted origination portal. Direct correspondent underwriter review in 24 hours.",
};

export default function ApplyNowPage({
  searchParams,
}: {
  searchParams: { purpose?: "buy" | "refinance" | "explore"; price?: string; down?: string };
}) {
  return (
    <div className="bg-ivory-warm min-h-screen">
      {/* 1. Brand-Aligned Hero Header (Navy Midnight #10243A) */}
      <section className="bg-navy-midnight text-white pt-16 pb-20 lg:pt-20 lg:pb-24 px-4 relative overflow-hidden border-b border-navy-light/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A46D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            {/* Top Security & Encryption Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-light/40 border border-slate-700/60 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Direct Correspondent Lending Portal</span>
              <span className="text-slate-500">•</span>
              <span className="text-brass">NMLS #{siteConfig.brand.nmlsId}</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Start Your Official Mortgage Application
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Complete your digital Uniform Residential Loan Application (URLA / Form 1003) online in minutes. Safe, bank-grade encrypted, and reviewed directly by our in-house underwriting desk.
            </p>

            {/* Reassurance Trust Metrics Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-brass font-bold">✓</span>
                <span>256-Bit Bank-Grade SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brass font-bold">✓</span>
                <span>Soft Credit Pull Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brass font-bold">✓</span>
                <span>24-Hour Underwriting Decisions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brass font-bold">✓</span>
                <span>Zero Upfront Application Fees</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Application Workspace: 2-Column Grid */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Documentation Checklist, Badges & Loan Officer Support (5 cols) */}
            <div className="lg:col-span-5 space-y-6">

              {/* Documentation Needed Checklist Card (Matching Requested Reference Items) */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="font-heading font-bold text-lg text-navy-midnight">
                    Documentation Needed for All Borrowers
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To ensure rapid processing and same-day underwriting review, having these primary items ready helps expedite your pre-approval:
                </p>

                <ul className="space-y-4 pt-1 text-sm text-slate-800">
                  <li className="flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-navy-midnight text-brass flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm">
                      ✓
                    </span>
                    <div>
                      <span className="font-bold text-navy-midnight block">
                        Social Security Number
                      </span>
                      <span className="text-xs text-slate-600 block mt-0.5">
                        Required for secure identity verification and credit review. (Initial questionnaire uses soft pull).
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-navy-midnight text-brass flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm">
                      ✓
                    </span>
                    <div>
                      <span className="font-bold text-navy-midnight block">
                        Contact & Employment Information
                      </span>
                      <span className="text-xs text-slate-600 block mt-0.5">
                        Current employer details, position title, and 2-year residential and work history.
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-navy-midnight text-brass flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm">
                      ✓
                    </span>
                    <div>
                      <span className="font-bold text-navy-midnight block">
                        Best Estimates of Income, Assets, & Liabilities
                      </span>
                      <span className="text-xs text-slate-600 block mt-0.5">
                        Approximate annual household earnings, bank account balances for down payment, and monthly debt payments.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Privacy & Security Guaranteed Card with Requested Golden Padlock Badge */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-start">
                  <PrivacySecurityGuaranteedBadge />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mortgage Level operates under rigorous federal regulatory standards (Gramm-Leach-Bliley Act & TILA). Your non-public personal information (NPI) is encrypted end-to-end and strictly protected. We never sell or share borrower data with third-party telemarketers.
                </p>
              </div>

              {/* Dedicated Senior Loan Officer Direct Card */}
              <div className="bg-navy-midnight text-white rounded-2xl p-6 border border-navy-light/40 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brass flex-shrink-0">
                    <Image
                      src={siteConfig.primaryLoanOfficer.avatarUrl}
                      alt={siteConfig.primaryLoanOfficer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-brass block">
                      Dedicated Desk Support
                    </span>
                    <h3 className="font-heading font-bold text-base text-white truncate">
                      {siteConfig.primaryLoanOfficer.name}
                    </h3>
                    <p className="text-xs text-slate-300">
                      Senior Lending Officer • NMLS #{siteConfig.primaryLoanOfficer.nmlsId}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-navy-light/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Direct Desk Phone:</span>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
                      className="text-brass font-bold text-sm hover:underline"
                    >
                      {siteConfig.contact.phoneFormatted}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Direct Email:</span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-white hover:text-brass font-medium"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Equal Housing & SSL Verification Badges */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-6">
                <EqualHousingBadge variant="light" />
                <SslEncryptionBadge variant="light" />
              </div>
            </div>

            {/* Right Column: Embedded Functional Application Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
                <div className="pb-6 mb-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brass block">
                      Interactive Digital URLA
                    </span>
                    <h2 className="font-heading font-black text-xl sm:text-2xl text-navy-midnight mt-0.5">
                      Mortgage Qualification & Application
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span>Secure 256-Bit Session</span>
                  </div>
                </div>

                {/* Embedded Functional Multi-Step Mortgage Survey / Application Wizard */}
                <Suspense
                  fallback={
                    <div className="py-24 text-center text-slate-500 font-medium space-y-3">
                      <div className="w-8 h-8 border-3 border-brass border-t-transparent rounded-full animate-spin mx-auto" />
                      <p>Loading encrypted application portal...</p>
                    </div>
                  }
                >
                  <MortgageSurveyWizard initialPurpose={searchParams.purpose} />
                </Suspense>
              </div>

              {/* Security Shield Banner Under Application Form */}
              <div className="bg-navy-midnight text-white rounded-2xl p-5 border border-navy-light/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <HeroSslShieldBadge className="bg-transparent border-none p-0 shadow-none" />
                  <p className="text-xs text-slate-300">
                    All communications and form data transmitted over this network are protected by SHA-256 TLS 1.3 cryptographic protocols.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 3. 4-Phase Underwriting & Closing Roadmap */}
      <section className="py-16 bg-white border-y border-slate-200">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Transparent Borrowing Workflow
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-navy-midnight">
              What Happens After You Submit Your Application
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Our direct correspondent lending model eliminates third-party broker delays. Here is how your loan progresses from submission to closing:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-ivory-warm border border-slate-200 space-y-3 relative">
              <span className="w-9 h-9 rounded-xl bg-navy-midnight text-brass font-bold text-sm flex items-center justify-center">
                01
              </span>
              <h3 className="font-heading font-bold text-base text-navy-midnight">
                Application Review
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your file is assigned to a dedicated Senior Loan Officer who verifies your financing scenario and customizes your rate options within 24 business hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-ivory-warm border border-slate-200 space-y-3 relative">
              <span className="w-9 h-9 rounded-xl bg-navy-midnight text-brass font-bold text-sm flex items-center justify-center">
                02
              </span>
              <h3 className="font-heading font-bold text-base text-navy-midnight">
                Verified Pre-Approval
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive an underwriter-backed Pre-Approval Letter that gives real estate agents and sellers absolute confidence in your purchasing power.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-ivory-warm border border-slate-200 space-y-3 relative">
              <span className="w-9 h-9 rounded-xl bg-navy-midnight text-brass font-bold text-sm flex items-center justify-center">
                03
              </span>
              <h3 className="font-heading font-bold text-base text-navy-midnight">
                Property Appraisal & Underwriting
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Once your purchase offer or refinance structure is locked, our direct underwriting desk issues your Conditional Approval in under 10 business days.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-ivory-warm border border-slate-200 space-y-3 relative">
              <span className="w-9 h-9 rounded-xl bg-navy-midnight text-brass font-bold text-sm flex items-center justify-center">
                04
              </span>
              <h3 className="font-heading font-bold text-base text-navy-midnight">
                Clear to Close & Keys
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sign your final Closing Disclosure (CD) digitally or in-person with a mobile notary. Funds are disbursed on time with an average 19-day closing window.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Frequently Asked Questions Regarding Applications */}
      <section className="py-16 bg-ivory-warm">
        <Container size="narrow">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Frequently Asked Questions
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-navy-midnight">
              Common Questions About Applying Online
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-2">
              <h3 className="font-heading font-bold text-base text-navy-midnight">
                Will submitting this application harm my credit score?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No. The initial qualification questionnaire utilizes a soft credit inquiry that does not affect your FICO credit score in any way. A formal hard credit pull is only conducted when you explicitly authorize our underwriter to issue your official Loan Estimate.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-2">
              <h3 className="font-heading font-bold text-base text-navy-midnight">
                Can I apply with a co-borrower or spouse?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Yes. You can indicate co-borrower status during the intake questionnaire. Both incomes and qualifying assets will be combined to maximize your purchasing capacity and loan qualification limit.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-2">
              <h3 className="font-heading font-bold text-base text-navy-midnight">
                What if I do not have all my financial paperwork ready right now?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You can still complete the application today with your best estimates of income and assets. Your assigned Loan Officer will follow up with a secure document upload link where you can attach W-2s, pay stubs, and bank statements at your convenience.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-2">
              <h3 className="font-heading font-bold text-base text-navy-midnight">
                Can I apply over the phone instead of online?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Absolutely. Our senior loan team is available by phone at{" "}
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`} className="text-brass-dark font-bold hover:underline">
                  {siteConfig.contact.phoneFormatted}
                </a>{" "}
                from 8:00 AM to 8:00 PM EST, Monday through Saturday. We can complete the entire application with you over the phone.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Statutory Regulatory & NMLS Disclosure Bar */}
      <section className="py-8 bg-white border-t border-slate-200 text-xs text-slate-500">
        <Container>
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <p className="font-semibold text-navy-midnight">
              {siteConfig.brand.legalName} • Equal Housing Lender • NMLS Unique Identifier #{siteConfig.brand.nmlsId}
            </p>
            <p className="leading-relaxed">
              This online application portal is an inquiry and application intake system. An official mortgage commitment requires formal written approval from our underwriting department following receipt and verification of all supporting documentation, appraisal report, and clear title search. Rates, fees, and loan terms are subject to market conditions and regulatory approval.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
