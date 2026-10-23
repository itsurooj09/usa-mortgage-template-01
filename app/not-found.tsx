import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-24 bg-ivory-warm min-h-[75vh] flex items-center justify-center">
      <Container size="narrow">
        <div className="bg-white rounded-2xl border border-border-subtle p-8 sm:p-12 shadow-card text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/15 text-navy-midnight text-xs font-bold uppercase tracking-wider">
            <span>404 Error • Page Not Found</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl text-navy-midnight">
            Looking for a Mortgage Page?
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            The page or route you requested might have been moved, renamed, or is temporarily unavailable. Let&apos;s guide you back to the right financing tool.
          </p>

          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs max-w-lg mx-auto">
            <Link
              href="/"
              className="p-3 rounded-lg border border-border-subtle hover:bg-ivory-warm font-bold text-navy-midnight"
            >
              Homepage
            </Link>
            <Link
              href="/loan-options"
              className="p-3 rounded-lg border border-border-subtle hover:bg-ivory-warm font-bold text-navy-midnight"
            >
              Loan Programs
            </Link>
            <Link
              href="/calculators"
              className="p-3 rounded-lg border border-border-subtle hover:bg-ivory-warm font-bold text-navy-midnight"
            >
              7 Calculators
            </Link>
            <Link
              href="/contact"
              className="p-3 rounded-lg border border-border-subtle hover:bg-ivory-warm font-bold text-navy-midnight"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-4">
            <Button href="/get-started" variant="brass" size="md" className="font-bold text-navy-deep">
              Start Pre-Approval Survey →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
