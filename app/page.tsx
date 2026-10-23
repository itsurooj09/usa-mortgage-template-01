import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/config/siteConfig";
import { loanProducts } from "@/content/loans";
import { currentRates, rateMetadata } from "@/content/rates";
import { testimonialsData } from "@/content/testimonials";
import { allFaqs } from "@/content/faqs";
import { MortgagePaymentCalculator } from "@/components/calculators/MortgagePaymentCalculator";
import { Accordion } from "@/components/ui/Accordion";

export default function HomePage() {
  const homeLoanFeatured = loanProducts.slice(0, 6);
  const homeFaqs = allFaqs.slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative bg-navy-midnight text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-navy-light/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-10 pointer-events-none bg-[radial-gradient(#c5a46d_1px,transparent_1px)] [background-size:16px_16px]" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Editorial Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-light/60 border border-brass/30 text-xs font-semibold text-brass-muted">
                <span className="w-2 h-2 rounded-full bg-brass inline-block animate-pulse" />
                <span>NMLS #{siteConfig.brand.nmlsId} • Equal Housing Lender</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
                Clear Paths to Homeownership with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass via-brass-muted to-white">
                  Precision Lending.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
                Experience institutional-grade mortgage advisory paired with frictionless digital approvals. We close conforming, VA, FHA, and Jumbo loans in an average of 19 days.
              </p>

              {/* Hero Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="/get-started"
                  variant="brass"
                  size="lg"
                  className="font-bold text-navy-deep shadow-lg"
                >
                  Start Pre-Approval Survey →
                </Button>
                <Button
                  href="/calculators/mortgage-payment"
                  variant="outline"
                  size="lg"
                  className="border-slate-400 text-white hover:bg-navy-light/50"
                >
                  Explore Payment Calculator
                </Button>
              </div>

              {/* Quick Trust Proof Badges */}
              <div className="pt-6 border-t border-navy-light/30 grid grid-cols-3 gap-4 text-xs text-slate-300">
                <div>
                  <div className="font-bold text-lg text-white font-heading">19 Days</div>
                  <div className="text-slate-400">Avg. Clear-to-Close</div>
                </div>
                <div>
                  <div className="font-bold text-lg text-white font-heading">0% Down</div>
                  <div className="text-slate-400">VA & USDA Financing</div>
                </div>
                <div>
                  <div className="font-bold text-lg text-white font-heading">11 States</div>
                  <div className="text-slate-400">Fully Licensed US Footprint</div>
                </div>
              </div>
            </div>

            {/* Right Hero Interactive Snapshot Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-floating text-navy-midnight border border-border-subtle">
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brass-dark">
                      Quick Rate Snapshot
                    </span>
                    <h3 className="font-bold text-lg text-navy-midnight">
                      Today&apos;s Conforming Benchmark
                    </h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full font-bold">
                    Live Rates
                  </span>
                </div>

                <div className="my-5 p-4 rounded-xl bg-ivory-warm border border-border-subtle flex items-baseline justify-between">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">30-Year Fixed Conforming</div>
                    <div className="font-heading text-3xl font-black text-navy-midnight mt-0.5">
                      {currentRates[0].rate}% <span className="text-xs font-normal text-slate-500">Rate</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-medium">Annual Percentage Rate</div>
                    <div className="font-heading text-2xl font-bold text-brass-dark">
                      {currentRates[0].apr}% <span className="text-xs font-normal text-slate-500">APR</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 mb-6">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>15-Year Fixed Conforming</span>
                    <span className="font-bold text-navy-midnight">{currentRates[1].rate}% / {currentRates[1].apr}% APR</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>FHA 30-Year Fixed (3.5% Down)</span>
                    <span className="font-bold text-navy-midnight">{currentRates[2].rate}% / {currentRates[2].apr}% APR</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>VA 30-Year Fixed (0% Down)</span>
                    <span className="font-bold text-navy-midnight">{currentRates[3].rate}% / {currentRates[3].apr}% APR</span>
                  </div>
                </div>

                <Button
                  href="/get-started"
                  variant="primary"
                  size="md"
                  className="w-full text-white font-bold"
                >
                  Get Your Personalized Rate Quote
                </Button>

                <p className="mt-3 text-[10px] text-slate-400 text-center leading-relaxed">
                  As of {rateMetadata.asOfDate}. Source: Freddie Mac PMMS. Terms apply.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. VERIFIABLE TRUST & LICENSING BAR */}
      <section className="bg-ivory-warm py-8 border-b border-border-subtle">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Institutional Lending Integrity
              </span>
              <p className="text-sm font-semibold text-navy-midnight mt-0.5">
                {siteConfig.brand.legalName} • Fully Licensed Direct Mortgage Banker
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-brass font-bold">✓</span> NMLS Consumer Access Verified
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-brass font-bold">✓</span> Equal Housing Lender
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-brass font-bold">✓</span> Direct Fannie Mae / FHA / VA Correspondent
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-brass font-bold">✓</span> Bank-Level 256-Bit SSL Security
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. LOAN PROGRAMS DIRECTORY */}
      <section className="py-20 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="Tailored Programs"
              title="Financing Structured for Your Life Stage"
              subtitle="From first-time buyer grants to luxury jumbo portfolios, we tailor each loan structure to your exact financial profile."
              className="mb-0"
            />
            <Link
              href="/loan-options"
              className="mt-4 md:mt-0 font-bold text-sm text-navy-midnight hover:text-brass flex items-center gap-1 flex-shrink-0"
            >
              <span>View All 11 Loan Types</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeLoanFeatured.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-xl border border-border-subtle p-7 hover:border-slate-300 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="brass" size="sm">
                      {loan.category}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-400">
                      {loan.metrics.minDownPayment}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-navy-midnight group-hover:text-brass-dark transition-colors">
                    {loan.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 font-medium italic">
                    &quot;{loan.heroTagline}&quot;
                  </p>

                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {loan.shortDescription}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                    {loan.keyBenefits.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-border-subtle flex items-center justify-between">
                  <Link
                    href={`/loan-options/${loan.slug}`}
                    className="text-xs font-bold text-navy-midnight group-hover:text-brass-dark flex items-center gap-1"
                  >
                    <span>Program Details & Limits</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href={loan.recommendedCalculator.href}
                    className="text-xs text-slate-400 hover:text-navy-midnight"
                  >
                    Calculator
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. HOMEBUYER JOURNEY SECTION */}
      <section className="py-20 bg-ivory-warm border-y border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The Northstar Journey"
            title="Four Steps from Pre-Approval to Closing Day"
            subtitle="We removed the traditional friction, lengthy delays, and hidden paperwork surprises from residential lending."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                step: "01",
                title: "Digital Survey",
                desc: "Complete our intuitive 2-minute qualification survey. Soft credit check with zero score impact.",
              },
              {
                step: "02",
                title: "Verified Pre-Approval",
                desc: "Receive a formal underwritten Pre-Approval letter that listing agents respect and prioritize.",
              },
              {
                step: "03",
                title: "Property Appraisal",
                desc: "Fast digital appraisal coordination and automated asset verification to expedite underwriting.",
              },
              {
                step: "04",
                title: "Keys in Hand (19 Days)",
                desc: "Review your final Closing Disclosure (CD) with total fee transparency and wire closing funds.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-border-subtle relative shadow-sm"
              >
                <div className="font-heading font-black text-3xl text-brass/40 mb-3">
                  {item.step}
                </div>
                <h4 className="font-heading font-bold text-lg text-navy-midnight mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/get-started" variant="brass" size="lg" className="font-bold text-navy-deep">
              Start Step 1: Pre-Approval Survey →
            </Button>
          </div>
        </Container>
      </section>

      {/* 5. FEATURED INTERACTIVE MORTGAGE CALCULATOR */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mb-10">
            <SectionHeading
              eyebrow="Real-Time Modeling"
              title="Featured Mortgage Payment Calculator"
              subtitle="Test real purchase scenarios with accurate principal, interest, taxes, insurance, and cancellable PMI calculations."
            />
          </div>

          <MortgagePaymentCalculator />
        </Container>
      </section>

      {/* 6. WHY WORK WITH US (VERIFIABLE BENEFITS) */}
      <section className="py-20 bg-navy-midnight text-white">
        <Container>
          <SectionHeading
            theme="dark"
            align="center"
            eyebrow="The Northstar Difference"
            title="Institutional Power, Boutique Client Care"
            subtitle="Why thousands of homebuyers, real estate brokers, and repeat investors trust Northstar Mortgage."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-navy-dark rounded-xl p-8 border border-navy-light/40 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-brass/10 border border-brass/30 flex items-center justify-center text-brass font-bold text-xl">
                ⚡
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                19-Day Average Closing
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                While traditional banks struggle with 35–45 day turnarounds, our direct in-house underwriting and processing teams deliver rapid clears so you win in competitive bidding situations.
              </p>
            </div>

            <div className="bg-navy-dark rounded-xl p-8 border border-navy-light/40 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-brass/10 border border-brass/30 flex items-center justify-center text-brass font-bold text-xl">
                ⚖
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Zero Hidden Jargon or Fees
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We believe in total financial transparency. Your Loan Estimate and Closing Disclosures are reviewed with you line-by-line so there are never unexpected lender charges at closing.
              </p>
            </div>

            <div className="bg-navy-dark rounded-xl p-8 border border-navy-light/40 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-brass/10 border border-brass/30 flex items-center justify-center text-brass font-bold text-xl">
                ★
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Dedicated Senior Advisory
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                You work directly with a licensed Senior Mortgage Loan Originator, not an anonymous call center operator. Reach your loan officer by direct phone or text throughout your transaction.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. MEET THE LEAD LOAN OFFICER */}
      <section className="py-20 bg-white">
        <Container>
          <div className="bg-ivory-warm rounded-2xl border border-border-subtle p-8 sm:p-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-card border-4 border-white">
                  <Image
                    src={siteConfig.primaryLoanOfficer.avatarUrl}
                    alt={siteConfig.primaryLoanOfficer.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/15 text-navy-midnight text-xs font-semibold">
                  <span>Senior Lending Officer • NMLS #{siteConfig.primaryLoanOfficer.nmlsId}</span>
                </div>

                <h3 className="font-heading font-bold text-3xl text-navy-midnight">
                  Meet {siteConfig.primaryLoanOfficer.name}
                </h3>

                <p className="text-base text-slate-600 leading-relaxed">
                  {siteConfig.primaryLoanOfficer.bio}
                </p>

                <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Experience:</span>
                    <span className="font-bold text-navy-midnight text-sm">
                      {siteConfig.primaryLoanOfficer.experienceYears}+ Years Lending
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Direct Line:</span>
                    <a
                      href={`tel:${siteConfig.primaryLoanOfficer.phone.replace(/[^0-9]/g, "")}`}
                      className="font-bold text-navy-midnight text-sm hover:text-brass"
                    >
                      {siteConfig.primaryLoanOfficer.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Licensed Footprint:</span>
                    <span className="font-bold text-navy-midnight text-sm">
                      {siteConfig.primaryLoanOfficer.licensedStates.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <Button
                    href="/get-started"
                    variant="brass"
                    size="md"
                    className="font-bold text-navy-deep"
                  >
                    Start Pre-Approval with David →
                  </Button>
                  <Button
                    href="/team"
                    variant="outline"
                    size="md"
                    className="border-slate-300 text-navy-midnight"
                  >
                    View Entire Lending Team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="py-20 bg-ivory-warm border-y border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Borrower Experiences"
            title="Trusted by American Homebuyers & Families"
            subtitle="Read verified feedback from clients who navigated purchase and refinance loans with our team."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {testimonialsData.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl border border-border-subtle p-6 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-500 text-sm">
                      {"★".repeat(review.rating)}
                    </div>
                    {review.isDemoReview && (
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        Demo Story
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &quot;{review.quote}&quot;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <div className="font-bold text-sm text-navy-midnight">
                    {review.borrowerName}
                  </div>
                  <div className="text-xs text-slate-500">{review.location}</div>
                  <div className="text-[11px] font-medium text-brass-dark mt-0.5">
                    {review.loanProgram}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 9. FAQS ACCORDION */}
      <section className="py-20 bg-white">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Got Questions?"
            title="Frequently Asked Mortgage Questions"
            subtitle="Straight answers on credit benchmarks, down payments, and closing costs."
          />

          <div className="mt-10">
            <Accordion items={homeFaqs} />
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faqs"
              className="text-sm font-bold text-navy-midnight hover:text-brass underline"
            >
              Browse Complete Knowledge Base & FAQs →
            </Link>
          </div>
        </Container>
      </section>

      {/* 10. FINAL GET STARTED CTA */}
      <section className="py-20 bg-navy-midnight text-white text-center relative overflow-hidden">
        <Container size="narrow">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Fast, Private, Transparent
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white">
              Ready to Lock In Your Mortgage Pre-Approval?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Takes just 2 minutes to complete our borrower questionnaire. No Social Security number required and zero credit score impact.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/get-started"
                variant="brass"
                size="lg"
                className="font-bold text-navy-deep px-8"
              >
                Start Pre-Approval Survey →
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="border-slate-500 text-white hover:bg-navy-light/40"
              >
                Schedule an Advisory Call
              </Button>
            </div>
            <p className="text-xs text-slate-400 pt-4">
              {siteConfig.brand.legalName} • NMLS #{siteConfig.brand.nmlsId} • Equal Housing Lender
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
