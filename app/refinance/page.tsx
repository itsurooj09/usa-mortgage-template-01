import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { photoLibrary } from "@/content/assets";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Refinance Your Mortgage | Rate Reduction & Cash-Out Equity",
  description:
    "Optimize your existing home financing. Lower monthly payments, eliminate PMI, or access home equity in cash with transparent break-even advisory.",
};

export default function RefinancePage() {
  return (
    <div>
      {/* Hero with photographic background */}
      <section className="relative bg-navy-midnight text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={photoLibrary.hero.mainHome.url}
            alt={photoLibrary.hero.mainHome.alt}
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
                Mortgage Refinance Advisory
              </span>
              <h1 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                Put Your Home Equity to Work with Precision Refinancing.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Whether you want to lower your monthly interest rate, eliminate costly PMI, shorten your term to retire debt-free, or access cash for home renovations, our advisors calculate your exact break-even timeline down to the penny.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Button href="/get-started?purpose=refinance" variant="brass" size="lg" className="font-bold text-navy-deep shadow-lg">
                  Calculate Refinance Savings →
                </Button>
                <Button href="/calculators/refinance" variant="outline" size="lg" className="border-slate-500 text-white hover:bg-white/10">
                  Interactive Refinance Tool
                </Button>
              </div>
            </div>

            {/* Visual Showcase Card (Replaces Form) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-brass/40 bg-navy-dark group">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <Image
                    src={photoLibrary.interiors.brightLivingRoom.url}
                    alt={photoLibrary.interiors.brightLivingRoom.alt}
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
                    Appraisal Waiver Eligible
                  </span>
                  <span className="bg-white/95 backdrop-blur-md text-navy-midnight font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                    Up to 80% Cash-Out LTV
                  </span>
                </div>

                <div className="p-6 relative bg-navy-midnight/95 backdrop-blur-md border-t border-navy-light/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                        Average Monthly Savings
                      </span>
                      <span className="text-2xl font-black text-brass font-heading">
                        $385 / mo
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                        Recoup Timeline
                      </span>
                      <span className="text-2xl font-black text-white font-heading">
                        14 Months
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      href="/get-started?purpose=refinance"
                      variant="brass"
                      size="md"
                      className="w-full font-bold text-navy-deep justify-center shadow-md"
                    >
                      Check My Refinance Eligibility →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Refinance Strategies */}
      <section className="py-20 bg-ivory-warm border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Refinance Goals"
            title="Strategic Financial Objectives"
            subtitle="Explore how restructuring your loan terms delivers tangible monthly and lifetime benefits."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-7 border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-brass/15 text-navy-midnight font-bold flex items-center justify-center text-lg mb-4">
                  ↓$
                </div>
                <h3 className="font-heading font-bold text-xl text-navy-midnight">
                  Lower Monthly Payments
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Reduce your interest rate or extend your loan duration to immediately increase monthly disposable cash flow.
                </p>
              </div>
              <Link href="/loan-options/rate-and-term-refinance" className="mt-6 text-xs font-bold text-navy-midnight hover:text-brass">
                Rate-and-Term Refinance →
              </Link>
            </div>

            <div className="bg-white rounded-xl p-7 border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-brass/15 text-navy-midnight font-bold flex items-center justify-center text-lg mb-4">
                  $$$
                </div>
                <h3 className="font-heading font-bold text-xl text-navy-midnight">
                  Cash-Out Home Equity
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Convert accrued home equity into liquid capital to consolidate high-interest credit cards or fund extensive home additions.
                </p>
              </div>
              <Link href="/loan-options/cash-out-refinance" className="mt-6 text-xs font-bold text-navy-midnight hover:text-brass">
                Cash-Out Refinance Guide →
              </Link>
            </div>

            <div className="bg-white rounded-xl p-7 border border-border-subtle shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-brass/15 text-navy-midnight font-bold flex items-center justify-center text-lg mb-4">
                  ⏱
                </div>
                <h3 className="font-heading font-bold text-xl text-navy-midnight">
                  Shorten Term to 15 Years
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Switch from a 30-year to a 15-year fixed mortgage to pay off your home 15 years earlier and save tens of thousands in interest.
                </p>
              </div>
              <Link href="/calculators/refinance" className="mt-6 text-xs font-bold text-navy-midnight hover:text-brass">
                Model 15-Year Savings →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial Equity & Renovation Feature */}
      <section className="py-20 bg-white border-b border-border-subtle">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                Strategic Equity Extraction
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy-midnight leading-tight">
                Reinvest Your Appreciated Equity Back Into What Matters.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Over the past several years, homeowners across the United States have accumulated historic levels of home equity. Cash-out refinancing allows you to tap up to 80% of your home&apos;s appraised value at low fixed mortgage rates—often a fraction of personal loan or credit card APRs.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-ivory-warm border border-border-subtle">
                  <div className="text-xl font-black text-navy-midnight font-heading">Up to 80%</div>
                  <div className="text-xs text-slate-600 mt-1">Conforming Cash-Out Loan-to-Value (LTV)</div>
                </div>
                <div className="p-4 rounded-xl bg-ivory-warm border border-border-subtle">
                  <div className="text-xl font-black text-brass-dark font-heading">Tax-Deductible*</div>
                  <div className="text-xs text-slate-600 mt-1">Interest may be deductible when used for capital home improvements</div>
                </div>
              </div>

              <div className="pt-2">
                <Button href="/get-started?purpose=refinance" variant="brass" size="md" className="font-bold text-navy-deep">
                  Explore Cash-Out Options →
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-[400px] sm:h-[460px] rounded-2xl overflow-hidden shadow-card border border-border-subtle">
                <Image
                  src={photoLibrary.lifestyle.renovationPlanning.url}
                  alt={photoLibrary.lifestyle.renovationPlanning.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Refinance Tool Preview Banner (Links to dedicated calculator page) */}
      <section className="py-20 bg-ivory-warm border-b border-border-subtle">
        <Container>
          <div className="bg-navy-midnight text-white rounded-3xl p-8 sm:p-12 border border-navy-light/40 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brass">
                  Financial Workstation
                </span>
                <h3 className="font-heading font-black text-3xl sm:text-4xl text-white">
                  Model Your Break-Even Period & Lifetime Savings
                </h3>
                <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
                  Use our specialized interactive Refinance Calculator to model your new PITI payment, compare monthly savings against closing costs, and generate an itemized PDF report.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Button
                    href="/calculators/refinance"
                    variant="brass"
                    size="lg"
                    className="font-bold text-navy-deep shadow-md"
                  >
                    Open Refinance Calculator →
                  </Button>
                  <Button
                    href="/mortgage-rates"
                    variant="outline"
                    size="lg"
                    className="border-slate-500 text-white hover:bg-white/10"
                  >
                    View Today&apos;s Refi Rates
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-navy-dark/90 rounded-2xl p-6 border border-navy-light/30 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brass">
                  Rule of Thumb
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  When Is It Worth It?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  If lowering your interest rate by 0.75% to 1.0% allows you to recoup all closing costs within 24 to 36 months, refinancing delivers substantial long-term wealth accumulation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Refinancing Comparison Matrix */}
      <section className="py-20 bg-white border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Structure Comparison"
            title="Choose the Right Refinancing Strategy"
            subtitle="Understand how each refinancing vehicle addresses distinct personal finance objectives."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-7 rounded-2xl bg-ivory-warm border border-border-subtle space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">Option A</span>
              <h4 className="font-heading font-bold text-xl text-navy-midnight">Rate-and-Term Refinance</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Replaces your existing note with a lower market interest rate or modifies term duration (e.g. from 30 to 15 years) without extracting additional cash out.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 border-t border-border-subtle">
                <li>✓ Lowers monthly housing expenses immediately</li>
                <li>✓ Eliminates existing FHA or conventional PMI</li>
                <li>✓ Lowest interest rate pricing tier</li>
              </ul>
            </div>

            <div className="p-7 rounded-2xl bg-ivory-warm border border-border-subtle space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">Option B</span>
              <h4 className="font-heading font-bold text-xl text-navy-midnight">Cash-Out Equity Refinance</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Taps accumulated home equity by taking out a new loan for more than your current mortgage balance, pocketing the cash difference at closing.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 border-t border-border-subtle">
                <li>✓ Consolidate high-interest credit cards (20%+ APR)</li>
                <li>✓ Fund major capital home additions or ADUs</li>
                <li>✓ Up to 80% LTV on primary single-family homes</li>
              </ul>
            </div>

            <div className="p-7 rounded-2xl bg-ivory-warm border border-border-subtle space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">Option C</span>
              <h4 className="font-heading font-bold text-xl text-navy-midnight">VA / FHA Streamline Refi</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                An expedited government refinance option requiring minimal underwriting, no appraisal in most cases, and no income verification paperwork.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 border-t border-border-subtle">
                <li>✓ No appraisal required in majority of files</li>
                <li>✓ Minimal employment or income documentation</li>
                <li>✓ Fastest clear-to-close turnaround (often &lt; 14 days)</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Refinance FAQs */}
      <section className="py-20 bg-ivory-warm">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Guidance"
            title="Refinancing Frequently Asked Questions"
            subtitle="Straightforward answers to the most common questions about restructuring your mortgage."
          />

          <div className="mt-10">
            <Accordion
              items={[
                {
                  question: "How do I calculate my true break-even period?",
                  answer:
                    "Divide your total out-of-pocket closing costs by your monthly payment savings. For example, if your closing costs are $3,600 and your new rate reduces your monthly payment by $200, your break-even point is 18 months ($3,600 ÷ $200 = 18). If you plan to remain in your home longer than 18 months, refinancing is financially advantageous.",
                },
                {
                  question: "Can I roll closing costs into my new mortgage balance?",
                  answer:
                    "Yes! Most conventional and government refinance programs allow you to roll closing costs and escrow prepayments into your new loan principal, meaning you bring $0 out-of-pocket cash to the closing table.",
                },
                {
                  question: "Do I always need a full home appraisal to refinance?",
                  answer:
                    "Not always. Fannie Mae and Freddie Mac automated underwriting systems frequently issue Property Inspection Waivers (PIWs) for conventional rate-and-term refinances when sufficient market sales data exists. FHA and VA streamline programs also frequently waive appraisal requirements.",
                },
                {
                  question: "How long after buying my home can I refinance?",
                  answer:
                    "For a rate-and-term refinance, there is typically no waiting period on conventional loans. For a cash-out refinance, lenders generally require 6 to 12 months of ownership seasoning on title before tapping accumulated equity.",
                },
              ]}
            />
          </div>

          <div className="mt-12 text-center">
            <Button
              href="/get-started?purpose=refinance"
              variant="brass"
              size="lg"
              className="font-bold text-navy-deep shadow-md"
            >
              Start Refinance Pre-Approval →
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
