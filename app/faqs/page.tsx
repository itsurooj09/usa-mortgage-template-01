"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { allFaqs } from "@/content/faqs";

export default function FaqsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "General", "Buying", "Refinancing", "Credit & Income", "Closing & Fees"];

  const filteredFaqs =
    selectedCategory === "All"
      ? allFaqs
      : allFaqs.filter((f) => f.category === selectedCategory);

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-midnight text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Knowledge Base
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mt-2 tracking-tight">
              Frequently Asked Mortgage Questions
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Clear, transparent answers to help you navigate mortgage pre-approval, underwriting criteria, down payments, and closing fees.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQs Main Section */}
      <section className="py-20 bg-white">
        <Container size="narrow">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-border-subtle">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? "bg-navy-midnight text-white shadow-sm"
                    : "bg-ivory-warm text-navy-dark hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion Component */}
          <Accordion items={filteredFaqs} />

          {/* Still Have Questions Box */}
          <div className="mt-16 p-8 rounded-2xl bg-ivory-warm border border-border-subtle text-center space-y-4">
            <h3 className="font-heading font-bold text-xl text-navy-midnight">
              Still have a specific question about your scenario?
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Every borrower profile has unique nuances. Talk directly with a licensed loan officer for individualized guidance.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button href="/contact" variant="brass" size="md" className="font-bold text-navy-deep">
                Contact Our Lending Desk
              </Button>
              <Button href="/get-started" variant="outline" size="md">
                Start Pre-Approval Survey
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
