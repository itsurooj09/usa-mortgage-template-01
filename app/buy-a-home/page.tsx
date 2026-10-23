import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { loanProducts } from "@/content/loans";
import { Accordion } from "@/components/ui/Accordion";
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

            {/* Architectural Showcase Card (Replaces Form) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-brass/40 bg-navy-dark group">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <Image
                    src={photoLibrary.hero.familyPorch.url}
                    alt={photoLibrary.hero.familyPorch.alt}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-navy-midnight/40 to-transparent" />
                </div>

                {/* Floating Program Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-navy-midnight/90 backdrop-blur-md text-brass font-bold text-xs px-3 py-1.5 rounded-full border border-brass/40 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Direct Correspondent
                  </span>
                  <span className="bg-white/95 backdrop-blur-md text-navy-midnight font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                    As Low as 3% Down
                  </span>
                </div>

                <div className="p-6 relative bg-navy-midnight/95 backdrop-blur-md border-t border-navy-light/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                        Average Closing Time
                      </span>
                      <span className="text-2xl font-black text-brass font-heading">
                        19 Days
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                        Offer Contingency
                      </span>
                      <span className="text-2xl font-black text-white font-heading">
                        Zero Delays
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      href="/get-started?purpose=buy"
                      variant="brass"
                      size="md"
                      className="w-full font-bold text-navy-deep justify-center shadow-md"
                    >
                      Start Free Pre-Approval →
                    </Button>
                  </div>
                </div>
              </div>
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

      {/* The 6-Phase Homebuying Roadmap */}
      <section className="py-20 bg-white border-t border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Chronological Guide"
            title="The 6-Phase Homebuyer Roadmap"
            subtitle="Everything you need to navigate from your initial dream to signing on the dotted line."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="p-7 rounded-2xl bg-ivory-warm border border-border-subtle space-y-3">
              <span className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-lg font-heading">
                01
              </span>
              <h4 className="font-heading font-bold text-xl text-navy-midnight">Financial Health & Credit Polish</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Check your credit report for errors, pay down revolving credit balances below 30% utilization, and avoid opening new credit lines or financing automobiles before applying.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-ivory-warm border border-border-subtle space-y-3">
              <span className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-lg font-heading">
                02
              </span>
              <h4 className="font-heading font-bold text-xl text-navy-midnight">Digital Underwritten Pre-Approval</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Obtain a full pre-underwritten approval letter with verified income and assets—giving listing agents absolute confidence your offer is backed by real bank capital.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-ivory-warm border border-border-subtle space-y-3">
              <span className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-lg font-heading">
                03
              </span>
              <h4 className="font-heading font-bold text-xl text-navy-midnight">Targeted Property Search</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Partner with an experienced local real estate agent to tour open houses, analyze neighborhood comps, and determine realistic target offer price points.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-ivory-warm border border-border-subtle space-y-3">
              <span className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-lg font-heading">
                04
              </span>
              <h4 className="font-heading font-bold text-xl text-navy-midnight">Offer Submission & Contract</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Submit your purchase agreement with our loan officer calling the listing agent immediately to vouch for your qualification and eliminate financing anxieties.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-ivory-warm border border-border-subtle space-y-3">
              <span className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-lg font-heading">
                05
              </span>
              <h4 className="font-heading font-bold text-xl text-navy-midnight">Home Inspection & Appraisal</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Complete a comprehensive property inspection to check foundation, plumbing, and HVAC systems, while our desk dispatches an independent licensed appraiser.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-ivory-warm border border-border-subtle space-y-3">
              <span className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-lg font-heading">
                06
              </span>
              <h4 className="font-heading font-bold text-xl text-navy-midnight">Clear-to-Close & Front Door Keys</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Review your final Closing Disclosure, wire your down payment funds to escrow, sign closing documents, and take possession of your brand new home keys!
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Common Homebuying FAQs */}
      <section className="py-20 bg-ivory-warm border-t border-border-subtle">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Guidance"
            title="Homebuying Frequently Asked Questions"
            subtitle="Essential answers to guide your first or next residential real estate purchase."
          />

          <div className="mt-10">
            <Accordion
              items={[
                {
                  question: "How long is my Northstar pre-approval letter valid for?",
                  answer:
                    "Pre-approval letters are typically valid for 90 days. Because our letters are verified with underwritten income and asset data, refreshing your pre-approval after 90 days is fast and only requires providing your most recent pay stub and bank statement.",
                },
                {
                  question: "Can I use gift funds from family for my down payment?",
                  answer:
                    "Yes! Conventional, FHA, and VA loan programs permit 100% of your required down payment and closing costs to be paid as a bona fide gift from immediate family members, provided a standard gift letter and donor transfer statement are documented.",
                },
                {
                  question: "What is Private Mortgage Insurance (PMI) and when does it cancel?",
                  answer:
                    "PMI protects the lender when you put down less than 20% on a conventional loan. On conventional mortgages, PMI automatically cancels once your principal balance reaches 78% of your home's original purchase value, or you can request cancellation once you reach 80% through scheduled payments or home market appreciation.",
                },
                {
                  question: "How much should I budget for closing costs in addition to my down payment?",
                  answer:
                    "Closing costs generally range between 2% and 4% of the total loan amount, covering appraisal fees, title insurance, county recording fees, and initial escrow reserves for property taxes and homeowner's insurance.",
                },
              ]}
            />
          </div>

          <div className="mt-12 text-center">
            <Button
              href="/get-started?purpose=buy"
              variant="brass"
              size="lg"
              className="font-bold text-navy-deep shadow-md"
            >
              Get Pre-Approved to Buy a Home →
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
