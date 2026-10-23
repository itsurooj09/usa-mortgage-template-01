import React, { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Inquiry Received | Thank You | Northstar Mortgage",
  description:
    "Your mortgage inquiry has been securely routed to a licensed loan officer. Review your confirmation details and next steps.",
};

function ThankYouContent({
  searchParams,
}: {
  searchParams: { leadId?: string; name?: string };
}) {
  const leadId = searchParams.leadId || "NS-PENDING";
  const borrowerName = searchParams.name ? decodeURIComponent(searchParams.name) : "Valued Borrower";

  return (
    <div className="bg-white rounded-2xl border border-border-subtle p-8 sm:p-12 shadow-card text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-3xl mx-auto shadow-sm">
        ✓
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
          Inquiry Successfully Routed
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight mt-1">
          Thank You, {borrowerName}!
        </h1>
        <p className="text-base text-slate-600 mt-2 max-w-lg mx-auto">
          We have received your preliminary loan questionnaire. Your dedicated lending officer has been assigned to your file.
        </p>
      </div>

      {/* Confirmation Tracking Card */}
      <div className="max-w-md mx-auto p-4 rounded-xl bg-ivory-warm border border-border-subtle text-xs text-slate-600 space-y-1">
        <div className="font-bold text-navy-midnight text-sm">
          Inquiry Reference ID: <span className="font-mono text-brass-dark">{leadId}</span>
        </div>
        <p>A confirmation email has been dispatched to your provided address.</p>
      </div>

      {/* Next Steps 3-Column Box */}
      <div className="pt-6 border-t border-border-subtle text-left max-w-xl mx-auto">
        <h3 className="font-heading font-bold text-base text-navy-midnight mb-3 text-center">
          What Happens Next:
        </h3>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-navy-midnight text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
              1
            </span>
            <div>
              <strong>Officer File Review:</strong> A licensed loan officer reviews your property goals and self-reported credit tier against conforming and government matrices.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-navy-midnight text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
              2
            </span>
            <div>
              <strong>Strategy Outreach:</strong> We will connect with you via your preferred contact method within 2 business hours to share tailored loan scenarios.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-navy-midnight text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
              3
            </span>
            <div>
              <strong>Pre-Approval Letter:</strong> Once preliminary paystubs are verified, you receive a verified Pre-Approval letter to begin submitting winning offers.
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Contact Line */}
      <div className="pt-6 border-t border-border-subtle text-xs text-slate-500">
        <p>
          Need urgent assistance with an active purchase contract today? Call our direct lending desk at{" "}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
            className="font-bold text-navy-midnight hover:text-brass"
          >
            {siteConfig.contact.phoneFormatted}
          </a>
        </p>
      </div>

      <div className="pt-4 flex flex-wrap justify-center gap-4">
        <Button href="/calculators" variant="outline" size="md">
          Explore Calculators
        </Button>
        <Button href="/" variant="primary" size="md">
          Return to Homepage
        </Button>
      </div>
    </div>
  );
}

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { leadId?: string; name?: string };
}) {
  return (
    <div className="py-16 bg-ivory-warm min-h-screen">
      <Container size="narrow">
        <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading confirmation...</div>}>
          <ThankYouContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  );
}
