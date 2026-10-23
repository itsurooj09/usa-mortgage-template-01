import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "About Us | Precision Residential Mortgage Lending",
  description:
    "Learn about Northstar Mortgage Capital, our executive leadership, lending philosophy, and commitment to transparent home financing.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-navy-midnight text-white py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Our Story & Heritage
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mt-2 tracking-tight">
              Reinventing Mortgage Lending with Clarity and Speed.
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Founded in {siteConfig.brand.foundedYear}, {siteConfig.brand.name} was established on a simple conviction: securing a home loan should be transparent, swift, and guided by seasoned financial fiduciaries.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                Our Core Principles
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy-midnight">
                Lending Grounded in Integrity, Never Commission Pressure.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Traditional retail banking often prioritizes quarterly volume quotas over long-term borrower success. At Northstar, our originators are licensed advisors committed to structuring financing that aligns with your complete household balance sheet.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brass/20 text-navy-midnight flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-midnight text-base">Direct Correspondent Banker</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      We fund loans with our own capital and underwrite directly, eliminating unnecessary brokerage markups and bureaucratic middle layers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brass/20 text-navy-midnight flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-midnight text-base">Clear-to-Close Speed</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Our modern tech stack integrates automated IRS transcript verification, digital escrow, and instant appraisal dispatch to average 19-day closes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brass/20 text-navy-midnight flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-midnight text-base">Equal Housing Commitment</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      We are proud members of the Equal Housing Opportunity framework, providing fair, unbiased financing across every community we serve.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-96 sm:h-[450px] rounded-2xl overflow-hidden shadow-card border border-border-subtle">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern architectural financial center"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Profile Feature */}
      <section className="py-20 bg-ivory-warm border-y border-border-subtle">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
              Leadership
            </span>
            <h2 className="font-heading font-bold text-3xl text-navy-midnight mt-1">
              Experienced American Mortgage Leadership
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our executive desk brings over four decades of collective residential underwriting and capital markets experience.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-border-subtle max-w-4xl mx-auto shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
              <div className="sm:col-span-4 flex justify-center">
                <div className="relative w-48 h-60 rounded-xl overflow-hidden shadow border-2 border-border-subtle">
                  <Image
                    src={siteConfig.primaryLoanOfficer.avatarUrl}
                    alt={siteConfig.primaryLoanOfficer.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="sm:col-span-8 space-y-3">
                <span className="text-xs font-semibold text-brass-dark uppercase tracking-wider">
                  Senior Vice President of Lending
                </span>
                <h3 className="text-2xl font-bold font-heading text-navy-midnight">
                  {siteConfig.primaryLoanOfficer.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  NMLS Unique Identifier #{siteConfig.primaryLoanOfficer.nmlsId}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {siteConfig.primaryLoanOfficer.bio}
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <Button href="/team" variant="brass" size="sm" className="font-bold text-navy-deep">
                    Meet the Full Team →
                  </Button>
                  <Button href="/contact" variant="outline" size="sm">
                    Contact David
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick CTA */}
      <section className="py-16 bg-navy-midnight text-white text-center">
        <Container size="narrow">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold">
            Ready to discuss your home financing goals?
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Speak directly with an advisor or get pre-approved in under 2 minutes.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href="/get-started" variant="brass" size="md" className="font-bold text-navy-deep">
              Start Pre-Approval
            </Button>
            <Button href="/contact" variant="outline" size="md" className="border-slate-500 text-white">
              Contact Branch
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
