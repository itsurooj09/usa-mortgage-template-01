import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { loanProducts } from "@/content/loans";
import { ContextualLeadForm } from "@/components/forms/ContextualLeadForm";
import { photoLibrary } from "@/content/assets";

export const metadata: Metadata = {
  title: "Buy a Home | Residential Purchase Mortgages & Fast Pre-Approval",
  description:
    "Explore purchase loan programs: Conventional 3% down, FHA 3.5% down, VA 0% down, and Jumbo luxury loans with rapid 19-day average closing times.",
};

export default function BuyAHomePage() {
  const purchaseLoans = loanProducts.filter(
    (l) => l.category === "Home Financing" || l.category === "Buying a Home"
  );

  return (
    <div>
      {/* Hero with authentic architectural photography */}
      <section className="relative bg-navy-midnight text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={photoLibrary.hero.daytimeSuburban.url}
            alt={photoLibrary.hero.daytimeSuburban.alt}
            fill
            priority
            className="object-cover object-center brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight via-navy-midnight/90 to-navy-midnight/75" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brass">
                Purchase Financing Solutions
              </span>
              <h1 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                Winning Purchase Offers Backed by Verified Pre-Approval.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                In today&apos;s real estate market, listing agents look for certainty. We provide ironclad underwritten pre-approvals and average 19-day closing turnarounds so your offers stand out.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Button href="/get-started?purpose=buy" variant="brass" size="lg" className="font-bold text-navy-deep shadow-lg">
                  Get Pre-Approved to Buy →
                </Button>
                <Button href="/calculators/home-affordability" variant="outline" size="lg" className="border-slate-500 text-white hover:bg-white/10">
                  Affordability Calculator
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ContextualLeadForm
                defaultLoanPurpose="buy"
                headline="Check Home Buying Rates"
                subheadline="Get tailored rates for your desired price point in seconds."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Down Payment Options Matrix */}
      <section className="py-20 bg-ivory-warm border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Budget Flexibility"
            title="How Much Down Payment Do You Really Need?"
            subtitle="Explore flexible pathways to homeownership from 0% down veteran financing to 20% PMI-free conventional loans."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-brass font-heading">0% Down</span>
                <h4 className="font-bold text-lg text-navy-midnight mt-1">VA & USDA Loans</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  100% financing for qualifying military veterans, active duty members, and eligible rural/suburban homebuyers. No monthly PMI on VA!
                </p>
              </div>
              <Link href="/loan-options/va" className="mt-5 text-xs font-bold text-navy-midnight hover:text-brass">
                Learn About VA & USDA →
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-brass font-heading">3% Down</span>
                <h4 className="font-bold text-lg text-navy-midnight mt-1">Conventional 97</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  First-time buyer conforming loans (HomeReady & Home Possible) requiring only 3% down payment with cancellable PMI.
                </p>
              </div>
              <Link href="/loan-options/conventional" className="mt-5 text-xs font-bold text-navy-midnight hover:text-brass">
                Conventional Details →
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-brass font-heading">3.5% Down</span>
                <h4 className="font-bold text-lg text-navy-midnight mt-1">FHA Government</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Flexible credit guidelines (580+ FICO) and 100% gift fund allowance from family for down payment and closing costs.
                </p>
              </div>
              <Link href="/loan-options/fha" className="mt-5 text-xs font-bold text-navy-midnight hover:text-brass">
                FHA Requirements →
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-navy-midnight font-heading">20% Down</span>
                <h4 className="font-bold text-lg text-navy-midnight mt-1">PMI-Free Standard</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Lower monthly payments, zero private mortgage insurance, and optimal pricing tiers for conforming and jumbo loans.
                </p>
              </div>
              <Link href="/calculators/mortgage-payment" className="mt-5 text-xs font-bold text-navy-midnight hover:text-brass">
                Compare PMI Savings →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial Story Section: First-time Homebuyer Milestone */}
      <section className="py-20 bg-white border-b border-border-subtle">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative h-[420px] sm:h-[480px] rounded-2xl overflow-hidden shadow-card border border-border-subtle">
                <Image
                  src={photoLibrary.lifestyle.happyCoupleKeys.url}
                  alt={photoLibrary.lifestyle.happyCoupleKeys.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-navy-midnight text-white p-5 rounded-xl border border-navy-light/40 shadow-xl hidden sm:block max-w-[240px]">
                <div className="text-2xl font-black text-brass font-heading">19 Days</div>
                <div className="text-xs text-slate-300 font-medium mt-1 leading-snug">
                  Average underwriting to clear-to-close turnaround nationwide.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                The Northstar Advantage
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy-midnight leading-tight">
                Turn Pre-Qualification Into a Confident Closing Day.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                A standard pre-qualification relies on self-reported estimates. Northstar takes the extra step of pre-underwriting your tax returns, bank statements, and credit history upfront. When you present an offer, listing agents and sellers view your financing as virtually cash-equivalent.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brass/20 text-navy-midnight flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-midnight text-sm">Pre-Underwritten Commitment</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Underwriter-backed approval letters eliminate financing contingency delays that scare sellers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brass/20 text-navy-midnight flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-midnight text-sm">Dedicated Listing Agent Outreach</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Our loan officers personally call the seller&apos;s agent upon offer submission to vouch for your qualification.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brass/20 text-navy-midnight flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-midnight text-sm">Closing Cost Transparency</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Itemized Loan Estimates guaranteed to match your final Closing Disclosure within statutory tolerances.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button href="/get-started?purpose=buy" variant="brass" size="md" className="font-bold text-navy-deep">
                  Start Your Pre-Approval Now →
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Available Purchase Loan Programs List */}
      <section className="py-20 bg-ivory-warm">
        <Container>
          <SectionHeading
            eyebrow="Directory"
            title="Purchase Loan Programs"
            subtitle="Click into any loan structure to view guidelines, credit benchmarks, and process explanations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {purchaseLoans.map((loan) => (
              <div
                key={loan.id}
                className="p-6 rounded-xl border border-border-subtle hover:border-slate-300 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Badge variant="brass" size="sm">{loan.category}</Badge>
                    <span className="text-xs text-slate-400 font-medium">{loan.metrics.minDownPayment}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-navy-midnight">
                    {loan.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {loan.shortDescription}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-border-subtle flex justify-between items-center">
                  <Link href={`/loan-options/${loan.slug}`} className="text-xs font-bold text-navy-midnight hover:text-brass">
                    View Guidelines →
                  </Link>
                  <Link href={loan.recommendedCalculator.href} className="text-xs text-slate-400 hover:text-navy-midnight">
                    Calculator
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
