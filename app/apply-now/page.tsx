import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/siteConfig";
import {
  HeroSslShieldBadge,
  PrivacySecurityGuaranteedBadge,
  EqualHousingBadge,
  SslEncryptionBadge,
} from "@/components/ui/TrustBadges";

export const metadata: Metadata = {
  title: "Online Loan Application (Form 1003) | Northstar Mortgage",
  description:
    "Launch your official Uniform Residential Loan Application (URLA / Form 1003) through Northstar Mortgage's secure 256-bit encrypted origination portal.",
};

export default function ApplyNowPage() {
  const isExternalConfigured = Boolean(siteConfig.navigation.applyNowUrl);

  return (
    <div className="bg-ivory-warm min-h-screen pb-20">
      {/* 1. Header Banner Matching Reference media_1792740672494.png */}
      <section className="bg-[#991B1B] text-white pt-16 pb-20 px-4 text-center relative overflow-hidden shadow-inner">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
          {/* Top Featured SECURE SSL ENCRYPTION Shield Badge */}
          <HeroSslShieldBadge />

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight pt-2">
            Online Loan Application
          </h1>
          <p className="text-sm sm:text-base text-rose-100 max-w-xl mx-auto leading-relaxed">
            Official Uniform Residential Loan Application (URLA / Fannie Mae Form 1003)
          </p>
        </div>
      </section>

      {/* 2. Main Application Card */}
      <Container size="narrow" className="-mt-10 relative z-10">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xl space-y-8">
          {/* Documentation Checklist Matching Reference media_1792740672494.png */}
          <div className="bg-rose-50/60 rounded-2xl p-6 sm:p-8 border border-rose-200/80 space-y-4">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-[#991B1B]">
              Documentation Needed for All Borrowers Includes:
            </h2>

            <ul className="space-y-3.5 text-sm sm:text-base text-slate-800">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#991B1B] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="font-semibold text-slate-900">
                  Social Security Number
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#991B1B] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="font-semibold text-slate-900">
                  Contact & Employment Information
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#991B1B] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="font-semibold text-slate-900">
                  Best Estimates of Income, Assets, & Liabilities
                </span>
              </li>
            </ul>
          </div>

          {/* Secure Launch Portal Box */}
          <div className="p-8 rounded-2xl bg-navy-midnight text-white space-y-5 shadow-lg border border-navy-light/40">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brass flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                256-Bit Bank-Grade Origination System
              </span>
              <span className="text-xs text-slate-400">NMLS #{siteConfig.brand.nmlsId}</span>
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Launch Secure 1003 Application
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Proceed to our fully encrypted digital lending portal to complete your loan application. You can save your progress and resume anytime from your phone or desktop.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {isExternalConfigured ? (
                <a
                  href={siteConfig.navigation.applyNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-bold text-sm sm:text-base px-8 py-4 rounded-xl bg-brass text-navy-deep hover:bg-brass-hover transition-colors shadow-lg"
                >
                  Proceed to Secure Portal ↗
                </a>
              ) : (
                <Button
                  href="/get-started"
                  variant="brass"
                  size="lg"
                  className="font-bold text-navy-deep shadow-lg"
                >
                  Launch Digital Application →
                </Button>
              )}

              <Button
                href="/get-started"
                variant="outline"
                size="lg"
                className="border-slate-500 text-white hover:bg-navy-light/40"
              >
                Or Take 2-Minute Survey (No SSN Required)
              </Button>
            </div>
          </div>

          {/* Golden Padlock Badge Matching Reference media_1792740672494.png */}
          <div className="pt-4 flex justify-center">
            <PrivacySecurityGuaranteedBadge />
          </div>

          {/* Equal Housing & SSL Verification Row Matching Reference media_1792740643933.png */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              <EqualHousingBadge variant="light" />
              <SslEncryptionBadge variant="light" />
            </div>

            <div className="text-center sm:text-right text-xs text-slate-500">
              <p className="font-semibold text-navy-midnight">Prefer Phone Origination?</p>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
                className="text-brass-dark hover:underline font-bold text-sm mt-0.5 inline-block"
              >
                Call {siteConfig.contact.phoneFormatted}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
