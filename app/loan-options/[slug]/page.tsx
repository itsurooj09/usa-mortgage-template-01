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
              <div className="flex items-center gap-2">
                <Badge variant="brass" size="sm">{loan.category}</Badge>
                <span className="text-xs text-slate-300">NMLS #{siteConfig.brand.nmlsId}</span>
              </div>

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

            {/* Contextual Quick Quote Form */}
            <div className="lg:col-span-5">
              <ContextualLeadForm
                defaultLoanPurpose={isRefi ? "refinance" : "buy"}
                defaultLoanProgram={loan.title}
                headline={`Check Your ${loan.title} Rate`}
                subheadline="Get custom rates and eligibility guidelines from a licensed officer."
              />
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
              <h2 className="font-heading font-bold text-3xl text-navy-midnight">
                Understanding {loan.title}
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                {loan.detailedOverview}
              </p>

              {/* Program Real Estate Imagery Banner */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-card border border-border-subtle my-4">
                <Image
                  src={loanPhoto.url}
                  alt={loanPhoto.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-midnight/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-brass">
                    {loan.title} Representative Architecture
                  </span>
                  <p className="text-sm font-medium drop-shadow mt-0.5">{loanPhoto.title}</p>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="pt-6 border-t border-border-subtle">
                <h3 className="font-heading font-bold text-xl text-navy-midnight mb-4">
                  Potential Program Benefits
                </h3>
                <ul className="space-y-3">
                  {loan.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
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
                <h3 className="font-heading font-bold text-lg text-navy-midnight">
                  Intended Borrower Audience
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  {loan.targetBorrower.map((tb, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brass font-bold">•</span>
                      <span>{tb}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-border-subtle space-y-4 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-navy-midnight">
                  Eligibility Considerations
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  {loan.eligibilityFactors.map((ef, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold">―</span>
                      <span>{ef}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Calculator Card */}
              <div className="bg-navy-midnight text-white rounded-2xl p-6 border border-navy-light/40 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brass">
                  Recommended Tool
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  {loan.recommendedCalculator.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {loan.recommendedCalculator.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={loan.recommendedCalculator.href}
                    className="text-xs font-bold text-brass hover:underline flex items-center gap-1"
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
                <div className="font-heading font-black text-3xl text-brass/40 mb-3">
                  0{step.stepNumber}
                </div>
                <h4 className="font-heading font-bold text-lg text-navy-midnight mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Product FAQs */}
      <section className="py-20 bg-white">
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
              className="font-bold text-navy-deep"
            >
              Start Pre-Approval for {loan.title} →
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
