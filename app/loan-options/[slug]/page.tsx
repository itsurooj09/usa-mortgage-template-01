import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { ContextualLeadForm } from "@/components/forms/ContextualLeadForm";
import { loanProducts } from "@/content/loans";
import { siteConfig } from "@/lib/config/siteConfig";
import { photoLibrary } from "@/content/assets";

function getLoanPhoto(slug: string) {
  switch (slug) {
    case "conventional":
      return photoLibrary.programs.conventional;
    case "fha":
      return photoLibrary.programs.fha;
    case "va":
      return photoLibrary.programs.va;
    case "usda":
      return photoLibrary.programs.usda;
    case "jumbo":
      return photoLibrary.programs.jumbo;
    case "first-time-homebuyer":
      return photoLibrary.programs.firstTime;
    case "rate-and-term-refinance":
      return photoLibrary.lifestyle.renovationPlanning;
    case "cash-out-refinance":
      return photoLibrary.hero.mainHome;
    case "streamline-refinance":
      return photoLibrary.consultation.digitalReview;
    default:
      return photoLibrary.hero.daytimeSuburban;
  }
}

export async function generateStaticParams() {
  return loanProducts.map((loan) => ({
    slug: loan.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const loan = loanProducts.find((l) => l.slug === params.slug);
  if (!loan) return { title: "Loan Option Not Found" };

  return {
    title: `${loan.title} | Guidelines & Pre-Approval | ${siteConfig.brand.name}`,
    description: loan.shortDescription,
    openGraph: {
      title: `${loan.title} - ${siteConfig.brand.name}`,
      description: loan.shortDescription,
    },
  };
}

export default function LoanDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const loan = loanProducts.find((l) => l.slug === params.slug);

  if (!loan) {
    notFound();
  }

  const isRefi = loan.category === "Refinancing";
  const loanPhoto = getLoanPhoto(loan.slug);

  return (
    <div>
      {/* Hero with photographic background */}
      <section className="relative bg-navy-midnight text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={loanPhoto.url}
            alt={loanPhoto.alt}
            fill
            priority
            className="object-cover object-center brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight via-navy-midnight/95 to-navy-midnight/80" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-5xl text-white tracking-tight leading-tight">
                {loan.title}
              </h1>

              <p className="text-lg text-brass font-medium italic">
                &quot;{loan.heroTagline}&quot;
              </p>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                {loan.shortDescription}
              </p>

              {/* Loan Metrics Grid */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-navy-light/40 text-xs">
                <div>
                  <span className="text-slate-400 block">Min. Down Payment</span>
                  <span className="font-bold text-white text-sm font-heading mt-0.5 block">
                    {loan.metrics.minDownPayment}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Credit Guideline</span>
                  <span className="font-bold text-white text-sm font-heading mt-0.5 block">
                    {loan.metrics.creditScoreGuideline}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Max LTV</span>
                  <span className="font-bold text-white text-sm font-heading mt-0.5 block">
                    {loan.metrics.maxLtv}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Available Terms</span>
                  <span className="font-bold text-white text-sm font-heading mt-0.5 block">
                    {loan.metrics.termOptions}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button
                  href={`/get-started?program=${loan.slug}`}
                  variant="brass"
                  size="lg"
                  className="font-bold text-navy-deep shadow-md"
                >
                  Apply for {loan.title} →
                </Button>
                <Button
                  href={loan.recommendedCalculator.href}
                  variant="outline"
                  size="lg"
                  className="border-slate-500 text-white hover:bg-navy-light/40"
                >
                  {loan.recommendedCalculator.title}
                </Button>
              </div>
            </div>

            {/* Hero Visual Card Showcase (Replaces form) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-brass/40 bg-navy-dark group">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <Image
                    src={loanPhoto.url}
                    alt={loanPhoto.alt}
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
                    {loan.metrics.minDownPayment}
                  </span>
                </div>

                <div className="p-6 relative bg-navy-midnight/95 backdrop-blur-md border-t border-navy-light/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                        Closing Speed
                      </span>
                      <span className="text-2xl font-black text-brass font-heading">
                        19 Days Avg.
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                        Credit Minimum
                      </span>
                      <span className="text-2xl font-black text-white font-heading">
                        {loan.metrics.creditScoreGuideline}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      href={`/get-started?program=${loan.slug}`}
                      variant="brass"
                      size="md"
                      className="w-full font-bold text-navy-deep justify-center shadow-md"
                    >
                      Check Eligibility Now →
                    </Button>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
                      className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2.5 rounded-md border border-slate-500 text-slate-200 hover:text-white hover:border-slate-300 transition-colors text-center"
                    >
                      Call Specialist
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview & Target Borrower */}
      <section className="py-20 bg-white border-b border-border-subtle">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                Program Overview
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy-midnight">
                Understanding {loan.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                {loan.detailedOverview}
              </p>

              {/* Program Real Estate Imagery Banner */}
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-card border border-border-subtle my-6">
                <Image
                  src={loanPhoto.url}
                  alt={loanPhoto.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-wider font-bold text-brass">
                    {loan.title} Architectural Standards
                  </span>
                  <p className="text-base font-medium drop-shadow mt-1">{loanPhoto.title}</p>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="pt-6 border-t border-border-subtle">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-navy-midnight mb-4">
                  Potential Program Benefits
                </h3>
                <ul className="space-y-3">
                  {loan.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Target Audience & Eligibility Considerations */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-ivory-warm rounded-2xl p-7 border border-border-subtle space-y-4">
                <h3 className="font-heading font-bold text-xl text-navy-midnight">
                  Intended Borrower Audience
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {loan.targetBorrower.map((tb, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-brass font-bold text-lg leading-none">•</span>
                      <span>{tb}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-border-subtle space-y-4 shadow-sm">
                <h3 className="font-heading font-bold text-xl text-navy-midnight">
                  Eligibility Considerations
                </h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {loan.eligibilityFactors.map((ef, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-slate-400 font-bold">―</span>
                      <span>{ef}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Calculator Card (Link Only - No Embedded Full Form) */}
              <div className="bg-navy-midnight text-white rounded-2xl p-6 border border-navy-light/40 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brass">
                  Financial Planning Tool
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  {loan.recommendedCalculator.title}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {loan.recommendedCalculator.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={loan.recommendedCalculator.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brass hover:underline"
                  >
                    <span>Launch Calculator</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Comprehensive Underwriting Guidelines Matrix */}
      <section className="py-20 bg-ivory-warm border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Underwriting Standards"
            title={`${loan.title} Qualification Guidelines`}
            subtitle="Transparent benchmarks evaluated by our direct underwriting desk during formal review."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-navy-midnight">Credit Profile</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Benchmark requirement: <strong>{loan.metrics.creditScoreGuideline}</strong> representative middle score. Discharged bankruptcies or foreclosures typically require 2 to 4 years of seasoning depending on mitigating circumstances.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-navy-midnight">Debt-to-Income</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Maximum allowable back-end DTI generally caps at 43%–50% with Automated Underwriting System (AUS) approval. Compensating factors include substantial liquid reserves and low loan-to-value ratios.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-navy-midnight">Down Payment & Reserves</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Entry threshold: <strong>{loan.metrics.minDownPayment}</strong>. Eligible funds may include verified personal savings, 401(k) asset loans, or 100% bona fide family gift contributions with formal gift letters.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Required Documentation Checklist */}
      <section className="py-20 bg-white border-b border-border-subtle">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                Preparation Checklist
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy-midnight leading-tight">
                Documents You Need for Fast Approval
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Gathering these items before submitting your application ensures your loan package sails through initial underwriting without document condition delays.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-ivory-warm border border-border-subtle flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-navy-midnight text-brass flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-navy-midnight text-base">Income & Employment Verification</h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Most recent 30 consecutive days of paystubs and past 2 years of W-2 forms. Self-employed borrowers provide 2 years of complete personal and business tax returns with all schedules.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-ivory-warm border border-border-subtle flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-navy-midnight text-brass flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-navy-midnight text-base">Asset & Down Payment Statements</h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Last 60 days of consecutive statements for checking, savings, brokerage, and retirement accounts (all numbered pages including blank ones).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-ivory-warm border border-border-subtle flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-navy-midnight text-brass flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-navy-midnight text-base">Identification & Property Details</h4>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Clear government-issued photo ID (Driver&apos;s License or Passport) and fully executed purchase sales contract with all counteroffers and addenda.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-[440px] sm:h-[500px] rounded-2xl overflow-hidden shadow-card border border-border-subtle">
                <Image
                  src={photoLibrary.consultation.advisoryMeeting.url}
                  alt="Loan officer reviewing documentation with clients"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-navy-midnight text-white p-5 rounded-xl border border-navy-light/40 shadow-xl hidden sm:block max-w-[280px]">
                <div className="text-xs uppercase tracking-wider text-brass font-bold">Paperless Portal</div>
                <div className="text-sm text-slate-200 mt-1">
                  Upload documents securely from your phone with instant automated receipt confirmation.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20 bg-ivory-warm border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Origination Workflow"
            title={`How the ${loan.title} Process Works`}
            subtitle="Transparent milestones from application submission to clear-to-close."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {loan.processSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white rounded-xl p-6 border border-border-subtle relative shadow-sm"
              >
                <div className="font-heading font-black text-3xl text-brass mb-3">
                  0{step.stepNumber}
                </div>
                <h4 className="font-heading font-bold text-lg text-navy-midnight mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Real Estate Property Showcase */}
      <section className="py-20 bg-white border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Architectural Suited Homes"
            title={`Properties Commonly Financed via ${loan.title}`}
            subtitle="Explore representative residential properties funded through our direct lending platform."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="group rounded-2xl overflow-hidden border border-border-subtle bg-white shadow-sm hover:shadow-card transition-all">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={photoLibrary.programs.conventional.url}
                  alt="Suburban family residence"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">Single-Family Residence</span>
                <h4 className="font-heading font-bold text-lg text-navy-midnight">Contemporary Craftsman</h4>
                <p className="text-sm text-slate-600">
                  Ideal for growing households seeking spacious backyards, neighborhood amenities, and top-tier school districts.
                </p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden border border-border-subtle bg-white shadow-sm hover:shadow-card transition-all">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={photoLibrary.hero.daytimeSuburban.url}
                  alt="Modern architectural home"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">Master-Planned Neighborhood</span>
                <h4 className="font-heading font-bold text-lg text-navy-midnight">Modern Suburb Estate</h4>
                <p className="text-sm text-slate-600">
                  Featuring energy-efficient smart building technology, open-concept floorplans, and community park access.
                </p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden border border-border-subtle bg-white shadow-sm hover:shadow-card transition-all">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={photoLibrary.programs.jumbo.url}
                  alt="Luxury modern estate"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">High-Balance Luxury</span>
                <h4 className="font-heading font-bold text-lg text-navy-midnight">Architectural Luxury Home</h4>
                <p className="text-sm text-slate-600">
                  Custom finishes, resort-style outdoor living spaces, and expansive acreage structured with precision financing.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product FAQs */}
      <section className="py-20 bg-ivory-warm">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Common Questions"
            title={`${loan.title} FAQs`}
            subtitle="Answers to the most frequent questions regarding eligibility, mortgage insurance, and closing timelines."
          />

          <div className="mt-10">
            <Accordion items={loan.faqs} />
          </div>

          <div className="mt-12 text-center">
            <Button
              href={`/get-started?program=${loan.slug}`}
              variant="brass"
              size="lg"
              className="font-bold text-navy-deep shadow-md"
            >
              Start Pre-Approval for {loan.title} →
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
