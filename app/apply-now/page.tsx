import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Start Your Mortgage Application | Secure Loan Portal (Form 1003)",
  description:
    "Launch your official Uniform Residential Loan Application (URLA / Form 1003) via Northstar Mortgage's secure encrypted origination portal.",
};

export default function ApplyNowPage() {
  const isExternalConfigured = Boolean(siteConfig.navigation.applyNowUrl);

  return (
    <div className="py-16 bg-ivory-warm min-h-screen">
      <Container size="narrow">
        <div className="bg-white rounded-2xl border border-border-subtle p-8 sm:p-12 shadow-card space-y-8">
          {/* Header */}
          <div className="border-b border-border-subtle pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
              Uniform Residential Loan Application (URLA / Form 1003)
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight">
              Start Your Official Mortgage Application
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              You are about to launch our secure, bank-encrypted mortgage origination portal. This full application allows our underwriters to verify assets, run tri-merge credit reports, and issue your official Loan Estimate (LE).
            </p>
          </div>

          {/* Secure Launch Box */}
          <div className="p-6 rounded-xl bg-navy-midnight text-white space-y-4">
            <div className="flex items-center gap-2 text-brass text-xs font-bold uppercase tracking-wider">
              <span>🔒 256-Bit Encrypted Origination System</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-white">
              Lender Origination Portal Access
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Click below to proceed to the secure portal. If you need to pause or return later, you will be able to save your progress at any step.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {isExternalConfigured ? (
                <a
                  href={siteConfig.navigation.applyNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-bold text-sm px-6 py-3.5 rounded-md bg-brass text-navy-deep hover:bg-brass-hover transition-colors shadow-md"
                >
                  Proceed to Secure Application Portal ↗
                </a>
              ) : (
                <div className="p-3 bg-navy-light text-slate-200 text-xs rounded border border-navy-light">
                  Lender portal endpoint awaiting production configuration.
                </div>
              )}

              <Button
                href="/get-started"
                variant="outline"
                size="md"
                className="border-slate-500 text-white hover:bg-navy-light/40"
              >
                Or Take Quick 2-Min Survey First
              </Button>
            </div>
          </div>

          {/* Document Preparation Checklist */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-navy-midnight">
              What Documents You&apos;ll Need Handy:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-lg bg-ivory-warm border border-border-subtle flex items-start gap-2.5">
                <span className="text-emerald-700 font-bold">✓</span>
                <div>
                  <strong>Income Verification:</strong> 30 days of recent paystubs with year-to-date earnings.
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-ivory-warm border border-border-subtle flex items-start gap-2.5">
                <span className="text-emerald-700 font-bold">✓</span>
                <div>
                  <strong>Tax Returns:</strong> Last 2 years of W-2s (and 1040 federal returns if self-employed).
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-ivory-warm border border-border-subtle flex items-start gap-2.5">
                <span className="text-emerald-700 font-bold">✓</span>
                <div>
                  <strong>Asset Statements:</strong> 2 months of checking, savings, and retirement/brokerage accounts.
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-ivory-warm border border-border-subtle flex items-start gap-2.5">
                <span className="text-emerald-700 font-bold">✓</span>
                <div>
                  <strong>Identification:</strong> Valid government-issued photo ID (Driver&apos;s License or Passport).
                </div>
              </div>
            </div>
          </div>

          {/* Alternative: Talk or Schedule First */}
          <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              Prefer to complete the application over the phone with an officer? Call{" "}
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
                className="font-bold text-navy-midnight hover:text-brass"
              >
                {siteConfig.contact.phoneFormatted}
              </a>
            </div>
            <Link href="/" className="font-semibold text-navy-midnight hover:underline">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
