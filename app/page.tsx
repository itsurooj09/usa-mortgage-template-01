"use client";

import React, { useState } from "react";
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
import { photoLibrary } from "@/content/assets";

export default function HomePage() {
  const [activeLoanCategory, setActiveLoanCategory] = useState<"Home Financing" | "Buying a Home" | "Refinancing">("Home Financing");
  const [quickPrice, setQuickPrice] = useState(420000);
  const [quickDownPct, setQuickDownPct] = useState(20);

  // Quick live estimate for hero
  const loanBal = quickPrice - (quickPrice * quickDownPct) / 100;
  const estPAndI = Math.round(loanBal * (0.065 / 12 / (1 - Math.pow(1 + 0.065 / 12, -360))));
  const estTaxAndIns = Math.round((quickPrice * 0.012) / 12 + 1400 / 12);
  const totalQuickEst = estPAndI + estTaxAndIns;

  const currentCategoryLoans = loanProducts.filter((l) => l.category === activeLoanCategory);
  const featuredHeroLoan = currentCategoryLoans[0];
  const secondaryLoans = currentCategoryLoans.slice(1);

  const homeFaqs = allFaqs.slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* SECTION B: HIGH-IMPACT PHOTOGRAPHIC HERO */}
      <section className="relative bg-navy-midnight text-white overflow-hidden min-h-[640px] lg:min-h-[720px] flex items-center">
        {/* Background Image with Controlled Dark Editorial Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src={photoLibrary.hero.mainHome.url}
            alt={photoLibrary.hero.mainHome.alt}
            fill
            priority
            className="object-cover object-center brightness-[0.38] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight via-navy-midnight/85 to-navy-midnight/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight via-transparent to-navy-midnight/50" />
        </div>

        <Container className="relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-deep/80 backdrop-blur-md border border-brass/40 text-xs font-semibold text-brass-muted shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brass inline-block animate-pulse" />
                <span>NMLS #{siteConfig.brand.nmlsId} • Licensed Direct Lending Banker</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Your Next Home Starts With a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass via-brass-muted to-white">
                  Clearer Mortgage Plan.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-sm">
                Transparent American home financing without bureaucratic delays or confusing markups. We deliver verified pre-approvals and average 19-day closing turnarounds across 11 licensed states.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="/get-started"
                  variant="brass"
                  size="lg"
                  className="font-bold text-navy-deep shadow-lg hover:shadow-brass/20"
                >
                  Get Pre-Approved in 2 Mins →
                </Button>
                <Button
                  href="/loan-options"
                  variant="outline"
                  size="lg"
                  className="border-slate-300 text-white hover:bg-white/10 backdrop-blur-xs"
                >
                  Explore All 11 Programs
                </Button>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-xs text-slate-300">
                <div>
                  <div className="font-heading font-black text-2xl text-white">19 Days</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">Average Clear-to-Close</div>
                </div>
                <div>
                  <div className="font-heading font-black text-2xl text-white">0% Down</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">VA & USDA Financing</div>
                </div>
                <div>
                  <div className="font-heading font-black text-2xl text-white">11 States</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">Direct Lending Licenses</div>
                </div>
              </div>
            </div>

            {/* Right Hero: Compact Live Estimate Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-floating text-navy-midnight border border-white/60">
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brass-dark block">
                      Live Estimate Planner
                    </span>
                    <h3 className="font-bold text-lg text-navy-midnight font-heading">
                      Payment Quick Check
                    </h3>
                  </div>
                  <Badge variant="success" size="sm">
                    6.42% Conforming
                  </Badge>
                </div>

                <div className="my-5 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Target Home Price:</span>
                      <span className="font-bold text-navy-midnight">${quickPrice.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={150000}
                      max={1200000}
                      step={10000}
                      value={quickPrice}
                      onChange={(e) => setQuickPrice(Number(e.target.value))}
                      className="w-full accent-navy-midnight cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Down Payment:</span>
                      <span className="font-bold text-navy-midnight">{quickDownPct}% (${Math.round((quickPrice * quickDownPct) / 100).toLocaleString()})</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[3, 5, 10, 20].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setQuickDownPct(pct)}
                          className={`py-1 rounded text-xs font-bold border transition-colors ${
                            quickDownPct === pct
                              ? "bg-navy-midnight text-white border-navy-midnight"
                              : "bg-ivory-warm text-slate-700 border-border-subtle hover:border-slate-300"
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-ivory-warm border border-border-subtle flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase block">
                        Est. Total PITI Payment
                      </span>
                      <span className="font-heading font-black text-3xl text-navy-midnight">
                        ${totalQuickEst.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 font-normal"> / month</span>
                    </div>
                    <div className="text-right text-[11px] text-slate-500">
                      <div>P&I: ${estPAndI.toLocaleString()}</div>
                      <div>Taxes & Ins: ${estTaxAndIns.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <Button
                  href={`/get-started?price=${quickPrice}&down=${Math.round((quickPrice * quickDownPct) / 100)}`}
                  variant="brass"
                  size="md"
                  className="w-full font-bold text-navy-deep shadow-sm"
                >
                  Pre-Approve at This Price →
                </Button>

                <p className="mt-3 text-[10px] text-slate-400 text-center leading-relaxed">
                  As of {rateMetadata.asOfDate}. Standard 30-year fixed conforming assumptions.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION C: MORTGAGE PLANNING TOOLS & DIRECTORY */}
      <section className="py-20 bg-ivory-warm border-b border-border-subtle">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Editorial Left */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-card border-4 border-white">
                <Image
                  src={photoLibrary.interiors.brightLivingRoom.url}
                  alt={photoLibrary.interiors.brightLivingRoom.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-navy-midnight text-white p-5 rounded-xl shadow-floating border border-navy-light/40 max-w-xs">
                <div className="text-xs font-bold text-brass uppercase">Instant Financial Math</div>
                <div className="font-heading font-black text-lg text-white mt-0.5">
                  7 Tested Calculators
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Amortization, DTI underwriting benchmarks, and cash-to-close analysis.
                </p>
              </div>
            </div>

            {/* Content & Tool Routes Right */}
            <div className="lg:col-span-7 space-y-6 lg:pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                Financial Engineering
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy-midnight leading-tight">
                Empower Your Decisions with Real Mathematical Precision.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Before speaking with real estate agents or browsing listings, model your exact purchasing power. We provide tested financial tools that calculate your true housing outlay down to property taxes, insurance, and cancellable PMI.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <Link
                  href="/calculators/mortgage-payment"
                  className="p-4 rounded-xl bg-white border border-border-subtle hover:border-slate-300 hover:shadow-card transition-all group"
                >
                  <div className="font-bold text-sm text-navy-midnight group-hover:text-brass-dark flex items-center justify-between">
                    <span>Payment Calculator</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Full PITI and 30-year amortization table.</p>
                </Link>

                <Link
                  href="/calculators/home-affordability"
                  className="p-4 rounded-xl bg-white border border-border-subtle hover:border-slate-300 hover:shadow-card transition-all group"
                >
                  <div className="font-bold text-sm text-navy-midnight group-hover:text-brass-dark flex items-center justify-between">
                    <span>Affordability Calculator</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Max purchase price from income and debts.</p>
                </Link>

                <Link
                  href="/calculators/refinance"
                  className="p-4 rounded-xl bg-white border border-border-subtle hover:border-slate-300 hover:shadow-card transition-all group"
                >
                  <div className="font-bold text-sm text-navy-midnight group-hover:text-brass-dark flex items-center justify-between">
                    <span>Refinance Savings</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Monthly savings & break-even recoup months.</p>
                </Link>

                <Link
                  href="/calculators/closing-costs"
                  className="p-4 rounded-xl bg-white border border-border-subtle hover:border-slate-300 hover:shadow-card transition-all group"
                >
                  <div className="font-bold text-sm text-navy-midnight group-hover:text-brass-dark flex items-center justify-between">
                    <span>Closing Costs Estimator</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Loan Estimate sections A-H & cash to close.</p>
                </Link>
              </div>

              <div className="pt-2">
                <Button href="/calculators" variant="primary" size="md" className="font-bold">
                  View All 7 Financial Calculators →
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION D: LOAN PROGRAM DISCOVERY (VARIED LAYOUT, NOT REPETITIVE CARDS) */}
      <section className="py-20 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <SectionHeading
              eyebrow="Financing Portfolio"
              title="Tailored Loan Programs for Every Need"
              subtitle="From first-time buyer grants to multi-million dollar jumbo portfolios, choose your category to discover specialized guidelines."
              className="mb-0"
            />
            {/* Category Selector Tabs */}
            <div className="mt-6 md:mt-0 flex bg-ivory-warm p-1 rounded-xl border border-border-subtle">
              {(["Home Financing", "Buying a Home", "Refinancing"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveLoanCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeLoanCategory === cat
                      ? "bg-navy-midnight text-white shadow-sm"
                      : "text-slate-600 hover:text-navy-midnight"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Varied Showcase Layout: 1 Featured Large Visual Panel + Compact Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Featured Showcase Card with Photography */}
            {featuredHeroLoan && (
              <div className="lg:col-span-5 bg-navy-midnight text-white rounded-2xl overflow-hidden border border-navy-light/40 flex flex-col justify-between shadow-card">
                <div className="relative h-60 w-full">
                  <Image
                    src={photoLibrary.programs[featuredHeroLoan.id as keyof typeof photoLibrary.programs]?.url || photoLibrary.hero.daytimeSuburban.url}
                    alt={featuredHeroLoan.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="brass" size="sm">
                      Featured Program
                    </Badge>
                  </div>
                </div>

                <div className="p-7 space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-black text-2xl text-white">
                      {featuredHeroLoan.title}
                    </h3>
                    <p className="text-xs text-brass font-medium italic mt-1">
                      &quot;{featuredHeroLoan.heroTagline}&quot;
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                      {featuredHeroLoan.shortDescription}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 text-xs bg-navy-dark p-3.5 rounded-xl border border-navy-light/40">
                      <div>
                        <span className="text-slate-400 block">Min. Down</span>
                        <span className="font-bold text-white text-sm">{featuredHeroLoan.metrics.minDownPayment}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Credit Guideline</span>
                        <span className="font-bold text-white text-sm">{featuredHeroLoan.metrics.creditScoreGuideline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-navy-light/30">
                    <Link
                      href={`/loan-options/${featuredHeroLoan.slug}`}
                      className="text-xs font-bold text-brass hover:underline flex items-center gap-1"
                    >
                      <span>Explore Guidelines & FAQs</span>
                      <span>→</span>
                    </Link>
                    <Button
                      href={`/get-started?program=${featuredHeroLoan.slug}`}
                      variant="brass"
                      size="sm"
                      className="font-bold text-navy-deep text-xs"
                    >
                      Pre-Approve
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Programs Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {secondaryLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="bg-white rounded-xl border border-border-subtle p-5 hover:border-slate-300 hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-bold text-brass-dark">
                        Min. Down: {loan.metrics.minDownPayment}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {loan.metrics.termOptions}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-navy-midnight">
                      {loan.title}
                    </h4>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {loan.shortDescription}
                    </p>

                    <ul className="mt-3.5 space-y-1 text-xs text-slate-600">
                      {loan.keyBenefits.slice(0, 2).map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-subtle flex justify-between items-center text-xs">
                    <Link
                      href={`/loan-options/${loan.slug}`}
                      className="font-bold text-navy-midnight hover:text-brass"
                    >
                      Details →
                    </Link>
                    <Link
                      href={loan.recommendedCalculator.href}
                      className="text-slate-400 hover:text-navy-midnight"
                    >
                      Calculator
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/loan-options"
              className="text-xs sm:text-sm font-bold text-navy-midnight hover:text-brass underline"
            >
              Browse Complete 11-Program Lending Matrix & Loan Limits →
            </Link>
          </div>
        </Container>
      </section>

      {/* SECTION E: HOMEBUYING JOURNEY (VISUAL TIMELINE WITH PHOTOGRAPHY) */}
      <section className="py-20 bg-ivory-warm border-y border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The Northstar Journey"
            title="Four Steps from Pre-Approval to Closing Day"
            subtitle="We removed traditional retail delays, lengthy paperwork games, and unexpected lender charges."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                step: "01",
                title: "Digital Survey",
                desc: "Complete our intuitive 2-minute qualification survey. Soft credit check with zero score impact.",
                image: photoLibrary.lifestyle.renovationPlanning.url,
              },
              {
                step: "02",
                title: "Verified Pre-Approval",
                desc: "Receive a formal underwritten pre-approval letter that listing agents and sellers respect.",
                image: photoLibrary.consultation.digitalReview.url,
              },
              {
                step: "03",
                title: "Digital Processing",
                desc: "Direct verification of bank assets and electronic appraisal dispatch to accelerate underwriting.",
                image: photoLibrary.consultation.advisoryMeeting.url,
              },
              {
                step: "04",
                title: "Keys in Hand (19 Days)",
                desc: "Review your transparent Closing Disclosure (CD), wire funds, and receive your new keys.",
                image: photoLibrary.lifestyle.happyCoupleKeys.url,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-border-subtle shadow-sm flex flex-col justify-between"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-navy-midnight text-white font-heading font-black text-xs px-2.5 py-1 rounded shadow-sm">
                    Step {item.step}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-heading font-bold text-lg text-navy-midnight mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
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

      {/* SECTION F: FEATURED CALCULATOR WORKSTATION */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mb-10">
            <SectionHeading
              eyebrow="Live Math Engine"
              title="Featured Mortgage Payment Calculator"
              subtitle="Test real purchase scenarios with authentic principal, interest, taxes, insurance, and cancellable PMI calculations."
            />
          </div>
          <MortgagePaymentCalculator />
        </Container>
      </section>

      {/* SECTION G: TRUST, EDITORIAL PHOTOGRAPHY & ADVISORY */}
      <section className="py-20 bg-navy-midnight text-white relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brass">
                Fiduciary Integrity
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Institutional Power with Boutique Client Care.
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                As a direct mortgage banker, we originate, underwrite, and fund loans without bureaucratic middle brokerage markups. When you partner with Northstar, you work with a licensed Senior Lending Officer dedicated to your family&apos;s financial health.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-navy-dark border border-navy-light/40 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-brass/20 text-brass flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Average 19-Day Clear-to-Close</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Our in-house underwriting teams eliminate traditional bank delays so you win competitive bids.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-dark border border-navy-light/40 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-brass/20 text-brass flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    ⚖
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Zero Hidden Fees or Rate Surprises</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Your Loan Estimate and Closing Disclosure are thoroughly reviewed line-by-line under TILA standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Button href="/about" variant="brass" size="md" className="font-bold text-navy-deep">
                  About Our Lending Practice →
                </Button>
                <Button href="/team" variant="outline" size="md" className="border-slate-500 text-white hover:bg-navy-light/40">
                  Meet the Full Team
                </Button>
              </div>
            </div>

            {/* Right Column: Lead Officer Editorial Portrait */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-navy-midnight shadow-floating border border-white/80">
                <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden shadow-card border-2 border-border-subtle mb-5">
                  <Image
                    src={siteConfig.primaryLoanOfficer.avatarUrl}
                    alt={siteConfig.primaryLoanOfficer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                    Senior Vice President of Lending
                  </span>
                  <h3 className="font-heading font-black text-2xl text-navy-midnight">
                    {siteConfig.primaryLoanOfficer.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    NMLS Unique Identifier #{siteConfig.primaryLoanOfficer.nmlsId}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    &quot;Our priority is structuring loans that protect your household liquidity, deliver low monthly payments, and get you to the closing table on time.&quot;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
                  <a
                    href={`tel:${siteConfig.primaryLoanOfficer.phone.replace(/[^0-9]/g, "")}`}
                    className="font-bold text-navy-midnight hover:text-brass"
                  >
                    📞 {siteConfig.primaryLoanOfficer.phone}
                  </a>
                  <Link href="/contact#schedule" className="font-bold text-brass-dark hover:underline">
                    Book Calendar Call ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION H: TESTIMONIALS */}
      <section className="py-20 bg-ivory-warm border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Client Experiences"
            title="Trusted by American Homebuyers & Families"
            subtitle="Verified feedback from borrowers who navigated purchase and refinance loans with our advisory desk."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {testimonialsData.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl border border-border-subtle p-6 flex flex-col justify-between shadow-sm"
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

      {/* SECTION I: FAQS ACCORDION */}
      <section className="py-20 bg-white">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Got Questions?"
            title="Frequently Asked Mortgage Questions"
            subtitle="Clear answers on credit benchmarks, down payment options, and closing timelines."
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

      {/* SECTION J: FINAL GET STARTED CTA */}
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
                className="font-bold text-navy-deep px-8 shadow-lg"
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
