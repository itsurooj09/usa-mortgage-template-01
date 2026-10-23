import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "NMLS Licensing & Regulatory Disclosures",
  description:
    "Official mortgage lending licenses, state regulatory approvals, Equal Housing Opportunity notice, and NMLS Consumer Access verification.",
};

export default function LicensingPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <Container size="narrow">
        <div className="space-y-8">
          {/* Header */}
          <div className="border-b border-border-subtle pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
              Regulatory Disclosures
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight">
              NMLS Licensing & State Regulatory Information
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {siteConfig.brand.legalName} is committed to full compliance with federal and state lending regulations, the Real Estate Settlement Procedures Act (RESPA), the Truth in Lending Act (TILA), and the Equal Credit Opportunity Act (ECOA).
            </p>
          </div>

          {/* NMLS Consumer Access Card */}
          <div className="p-6 rounded-2xl bg-ivory-warm border border-border-subtle space-y-3">
            <h2 className="font-heading font-bold text-lg text-navy-midnight">
              National Nationwide Multistate Licensing System (NMLS)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Company NMLS Unique Identifier: <strong className="text-navy-midnight font-mono text-base">#{siteConfig.brand.nmlsId}</strong>
            </p>
            <p className="text-xs text-slate-500">
              To verify our company licenses or individual loan originator credentials, visit the official nationwide database at:
            </p>
            <div>
              <a
                href={siteConfig.brand.nmlsConsumerAccessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-navy-midnight text-white text-xs font-bold hover:bg-navy-dark transition-colors"
              >
                <span>Verify on NMLS Consumer Access</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Equal Housing Lender */}
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <h2 className="font-heading font-bold text-xl text-navy-midnight flex items-center gap-2">
              <span className="text-brass font-serif text-2xl">⌂</span>
              <span>Equal Housing Opportunity</span>
            </h2>
            <p>
              We conduct our business in accordance with the Federal Fair Housing Act and the Equal Credit Opportunity Act. We do not discriminate against any applicant on the basis of race, color, religion, national origin, sex, marital status, age (provided the applicant has the capacity to contract), because all or part of the applicant&apos;s income derives from any public assistance program, or because the applicant has in good faith exercised any right under the Consumer Credit Protection Act.
            </p>
          </div>

          {/* State-by-State License Breakdown Table */}
          <div className="space-y-4 pt-4 border-t border-border-subtle">
            <h2 className="font-heading font-bold text-xl text-navy-midnight">
              State Lending Licenses
            </h2>
            <div className="overflow-x-auto border border-border-subtle rounded-xl shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-navy-midnight text-white">
                  <tr>
                    <th className="py-3 px-4 font-semibold">State</th>
                    <th className="py-3 px-4 font-semibold">License Number</th>
                    <th className="py-3 px-4 font-semibold">Regulatory Agency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-slate-700">
                  {siteConfig.statesLicensed.map((state) => (
                    <tr key={state.code} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-navy-midnight">
                        {state.name} ({state.code})
                      </td>
                      <td className="py-2.5 px-4 font-mono font-medium text-navy-dark">
                        {state.licenseNumber}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">
                        {state.regulator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* State-Specific Disclosures */}
          <div className="space-y-4 pt-4 border-t border-border-subtle text-xs text-slate-600 leading-relaxed">
            <h3 className="font-heading font-bold text-sm text-navy-midnight">
              State-Specific Statutory Notices
            </h3>
            <p>
              <strong>Texas Notice:</strong> COMPLAINTS REGARDING THE SERVICING OF YOUR MORTGAGE SHOULD BE SENT TO THE DEPARTMENT OF SAVINGS AND MORTGAGE LENDING, 2601 NORTH LAMAR, SUITE 201, AUSTIN, TEXAS 78705. A TOLL-FREE CONSUMER HOTLINE IS AVAILABLE AT 1-877-276-5550.
            </p>
            <p>
              <strong>California Notice:</strong> Licensed by the Department of Financial Protection and Innovation under the California Residential Mortgage Lending Act.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
