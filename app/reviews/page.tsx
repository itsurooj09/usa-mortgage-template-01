import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { testimonialsData } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Borrower Reviews & Experiences | Client Stories",
  description:
    "Read real borrower stories and loan experiences with Northstar Mortgage across conventional, VA, FHA, and refinance transactions.",
};

export default function ReviewsPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy-midnight text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Client Experiences
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mt-2 tracking-tight">
              Borrower Reviews & Stories
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Read how our dedicated loan officers helped American families navigate home purchase and refinance journeys with speed, transparency, and personal care.
            </p>
          </div>
        </Container>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="p-4 mb-10 rounded-xl bg-ivory-warm border border-border-subtle text-xs text-slate-600 flex items-center justify-between">
            <div>
              <strong className="text-navy-midnight">Transparency Notice:</strong> In accordance with FTC guidelines and our demo standards, these client profiles reflect representative demo borrower experiences for template demonstration.
            </div>
            <Link href="/contact" className="text-brass-dark font-bold hover:underline ml-4 flex-shrink-0">
              Submit Your Review →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsData.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl border border-border-subtle p-8 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500 text-base">
                      {"★".repeat(review.rating)}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {review.date}
                    </span>
                  </div>

                  <p className="text-base text-slate-700 leading-relaxed italic">
                    &quot;{review.quote}&quot;
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-navy-midnight">
                      {review.borrowerName}
                    </h3>
                    <div className="text-xs text-slate-500">{review.location}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-navy-midnight text-white">
                      {review.loanProgram}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="font-heading font-bold text-2xl text-navy-midnight">
              Ready to write your homeownership success story?
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              Our team is ready to guide your purchase or refinance with precision and care.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button href="/get-started" variant="brass" size="lg" className="font-bold text-navy-deep">
                Get Pre-Approved Now →
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
