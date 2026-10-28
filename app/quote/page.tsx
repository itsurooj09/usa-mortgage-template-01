import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config/siteConfig";
import { VonkQuoteWizard } from "@/components/forms/VonkQuoteWizard";

export const metadata: Metadata = {
  title: "Get an Instant Mortgage Rate & Payment Quote | Northstar Mortgage",
  description:
    "Receive a customized monthly payment breakdown, current interest rate quote, and program match in under 2 minutes. Free, secure, and zero credit score impact.",
};

export default function QuotePage() {
  return (
    <div className="bg-ivory-warm min-h-screen">
      {/* Top Header Banner */}
      <section className="bg-navy-midnight text-white pt-14 pb-16 px-4 relative overflow-hidden border-b border-navy-light/40">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brass/15 text-brass text-xs font-bold uppercase tracking-wider">
              <span>Instant Rate & Payment Calculator</span>
              <span className="text-slate-500">•</span>
              <span>2-Minute Decision Engine</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Get Your Custom Mortgage Quote
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Answer a few quick questions to preview tailored interest rates, monthly PITI payments, and loan program recommendations.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Form Section */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 8 cols: Interactive Quote Questionnaire */}
            <div className="lg:col-span-8">
              <VonkQuoteWizard />
            </div>

            {/* Right 4 cols: Advisory Support & Trust Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Senior Loan Officer Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-slate-200 flex-shrink-0">
                    <Image
                      src={siteConfig.primaryLoanOfficer.avatarUrl}
                      alt={siteConfig.primaryLoanOfficer.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brass-dark block">
                      Assigned Senior Officer
                    </span>
                    <h3 className="font-heading font-bold text-base text-navy-midnight">
                      {siteConfig.primaryLoanOfficer.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">
                      NMLS #{siteConfig.primaryLoanOfficer.nmlsId}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  &quot;We review every incoming quote request against direct wholesale pricing windows to lock in the lowest possible monthly payment.&quot;
                </p>

                <div className="pt-2 text-xs text-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Direct Office:</span>
                    <a
                      href={`tel:${siteConfig.primaryLoanOfficer.phone.replace(/[^0-9]/g, "")}`}
                      className="font-bold text-navy-midnight hover:text-brass"
                    >
                      {siteConfig.primaryLoanOfficer.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Email Desk:</span>
                    <span className="font-semibold text-navy-midnight">
                      {siteConfig.primaryLoanOfficer.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantees & Disclosures Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3.5 text-xs text-slate-600">
                <h4 className="font-heading font-bold text-sm text-navy-midnight pb-2 border-b border-slate-100">
                  The Northstar Lending Promise
                </h4>

                <div className="flex items-start gap-2.5">
                  <span className="text-brass font-bold text-sm">✓</span>
                  <div>
                    <strong className="text-navy-midnight block">No Credit Impact</strong>
                    <span>Our questionnaire performs a soft inquiry only with zero change to your credit score.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-brass font-bold text-sm">✓</span>
                  <div>
                    <strong className="text-navy-midnight block">Wholesale Direct Rates</strong>
                    <span>Direct correspondent bank pricing with no middleman brokerage markups.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-brass font-bold text-sm">✓</span>
                  <div>
                    <strong className="text-navy-midnight block">256-Bit TLS 1.3 Security</strong>
                    <span>Your financial details are encrypted and protected by strict privacy controls.</span>
                  </div>
                </div>
              </div>

              {/* Regulatory Notice */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                <p>
                  <strong>Equal Housing Lender.</strong> {siteConfig.brand.legalName} • NMLS #{siteConfig.brand.nmlsId}. Quotes are estimates based on self-reported borrower criteria and current secondary market indices.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
