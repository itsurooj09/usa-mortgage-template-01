"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config/siteConfig";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { loanProducts } from "@/content/loans";

export function Header() {
  const pathname = usePathname();
  const [activeMega, setActiveMega] = useState<"loans" | "calculators" | "resources" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menus on path change
  useEffect(() => {
    setActiveMega(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle scroll detection for subtle header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMega(null);
        setMobileMenuOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter loan groups
  const homeFinancing = loanProducts.filter((l) => l.category === "Home Financing");
  const buyingAHome = loanProducts.filter((l) => l.category === "Buying a Home");
  const refinancing = loanProducts.filter((l) => l.category === "Refinancing");

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-navy-midnight/95 backdrop-blur-md shadow-lg border-b border-navy-light/40"
          : "bg-navy-midnight border-b border-navy-light/30"
      }`}
    >
      {/* Top Utility Announcement Bar */}
      <div className="hidden lg:block bg-navy-deep/90 border-b border-navy-light/20 text-xs py-2 text-slate-300">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Direct Lending Desk:{" "}
              <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`} className="font-semibold text-white hover:text-brass transition-colors">
                {siteConfig.contact.phoneFormatted}
              </a>
            </span>
            <span className="text-slate-600">|</span>
            <span>NMLS #{siteConfig.brand.nmlsId} • Equal Housing Lender</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/quote" className="hover:text-brass transition-colors flex items-center gap-1">
              <span>Instant Rate Quote</span>
              <span className="text-[10px] bg-navy-light text-brass px-1.5 py-0.2 rounded font-semibold">2 Min</span>
            </Link>
            <Link href="/locations" className="hover:text-white transition-colors">
              Branches & Licenses
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20 flex-nowrap gap-4">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-nowrap" aria-label="Main Navigation">
            {/* Loan Programs Mega Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMega("loans")}
            >
              <button
                type="button"
                onClick={() => setActiveMega(activeMega === "loans" ? null : "loans")}
                aria-expanded={activeMega === "loans"}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                  activeMega === "loans" || pathname.startsWith("/loan-options")
                    ? "text-brass bg-navy-light/40"
                    : "text-slate-200 hover:text-white hover:bg-navy-light/20"
                }`}
              >
                <span>Loan Programs</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeMega === "loans" ? "rotate-180 text-brass" : "text-slate-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Calculators Mega Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMega("calculators")}
            >
              <button
                type="button"
                onClick={() => setActiveMega(activeMega === "calculators" ? null : "calculators")}
                aria-expanded={activeMega === "calculators"}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                  activeMega === "calculators" || pathname.startsWith("/calculators")
                    ? "text-brass bg-navy-light/40"
                    : "text-slate-200 hover:text-white hover:bg-navy-light/20"
                }`}
              >
                <span>Calculators</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeMega === "calculators" ? "rotate-180 text-brass" : "text-slate-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Buy a Home Direct */}
            <Link
              href="/buy-a-home"
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                pathname === "/buy-a-home"
                  ? "text-brass bg-navy-light/40"
                  : "text-slate-200 hover:text-white hover:bg-navy-light/20"
              }`}
            >
              Buy a Home
            </Link>

            {/* Refinance Direct */}
            <Link
              href="/refinance"
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                pathname === "/refinance"
                  ? "text-brass bg-navy-light/40"
                  : "text-slate-200 hover:text-white hover:bg-navy-light/20"
              }`}
            >
              Refinance
            </Link>

            {/* Resources Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMega("resources")}
            >
              <button
                type="button"
                onClick={() => setActiveMega(activeMega === "resources" ? null : "resources")}
                aria-expanded={activeMega === "resources"}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                  activeMega === "resources" || pathname.startsWith("/resources") || pathname === "/faqs" || pathname === "/reviews"
                    ? "text-brass bg-navy-light/40"
                    : "text-slate-200 hover:text-white hover:bg-navy-light/20"
                }`}
              >
                <span>Resources</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeMega === "resources" ? "rotate-180 text-brass" : "text-slate-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* About Us */}
            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                pathname === "/about"
                  ? "text-brass bg-navy-light/40"
                  : "text-slate-200 hover:text-white hover:bg-navy-light/20"
              }`}
            >
              About
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                pathname === "/contact"
                  ? "text-brass bg-navy-light/40"
                  : "text-slate-200 hover:text-white hover:bg-navy-light/20"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="/apply-now"
              variant="outline"
              size="md"
              className="border-slate-400/50 text-white hover:bg-white/10 hover:border-white font-semibold transition-colors"
            >
              Apply Now
            </Button>
            <Button
              href="/quote"
              variant="brass"
              size="md"
              className="font-semibold shadow-sm hover:shadow transition-all"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/quote"
              className="bg-brass text-navy-deep font-semibold text-xs px-3.5 py-2 rounded-md shadow-sm"
            >
              Get a Quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-navy-light focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Loan Programs Mega Menu Dropdown */}
      {activeMega === "loans" && (
        <div
          onMouseLeave={() => setActiveMega(null)}
          className="hidden lg:block absolute top-full left-0 w-full bg-navy-midnight border-b border-navy-light/40 shadow-mega animate-fadeIn"
        >
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Category 1: Home Financing */}
              <div className="col-span-3 space-y-4 border-r border-navy-light/30 pr-6">
                <div className="text-xs font-bold uppercase tracking-wider text-brass flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass inline-block" />
                  Home Financing
                </div>
                <div className="space-y-3">
                  {homeFinancing.map((loan) => (
                    <Link
                      key={loan.id}
                      href={`/loan-options/${loan.slug}`}
                      className="block group"
                    >
                      <div className="text-sm font-semibold text-white group-hover:text-brass transition-colors">
                        {loan.title}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {loan.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category 2: Buying a Home */}
              <div className="col-span-3 space-y-4 border-r border-navy-light/30 pr-6">
                <div className="text-xs font-bold uppercase tracking-wider text-brass flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass inline-block" />
                  Buying a Home
                </div>
                <div className="space-y-3">
                  {buyingAHome.map((loan) => (
                    <Link
                      key={loan.id}
                      href={`/loan-options/${loan.slug}`}
                      className="block group"
                    >
                      <div className="text-sm font-semibold text-white group-hover:text-brass transition-colors">
                        {loan.title}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {loan.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category 3: Refinancing */}
              <div className="col-span-3 space-y-4 border-r border-navy-light/30 pr-6">
                <div className="text-xs font-bold uppercase tracking-wider text-brass flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass inline-block" />
                  Refinancing
                </div>
                <div className="space-y-3">
                  {refinancing.map((loan) => (
                    <Link
                      key={loan.id}
                      href={`/loan-options/${loan.slug}`}
                      className="block group"
                    >
                      <div className="text-sm font-semibold text-white group-hover:text-brass transition-colors">
                        {loan.title}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {loan.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured Loan Advisory Card */}
              <div className="col-span-3 bg-navy-dark rounded-xl p-5 border border-navy-light/40 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brass">
                    Loan Recommendation
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">
                    Not sure which loan fits your goals?
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Compare loan limits, down payments, and rate structures with our comprehensive directory or speak directly with our Senior Lending Advisor.
                  </p>
                </div>
                <div className="mt-5 space-y-2">
                  <Button
                    href="/loan-options"
                    variant="brass"
                    size="sm"
                    className="w-full text-navy-deep font-bold"
                  >
                    View All Loan Programs
                  </Button>
                  <Link
                    href="/contact"
                    className="block text-center text-xs text-slate-300 hover:text-white pt-1"
                  >
                    Talk with an Officer →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calculators Mega Menu Dropdown */}
      {activeMega === "calculators" && (
        <div
          onMouseLeave={() => setActiveMega(null)}
          className="hidden lg:block absolute top-full left-0 w-full bg-navy-midnight border-b border-navy-light/40 shadow-mega animate-fadeIn"
        >
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Calculators List */}
              <div className="col-span-8 grid grid-cols-2 gap-5 pr-8 border-r border-navy-light/30">
                <Link
                  href="/calculators/mortgage-payment"
                  className="p-3.5 rounded-lg bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
                >
                  <div className="text-sm font-bold text-white group-hover:text-brass flex items-center justify-between">
                    <span>Mortgage Payment Calculator</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Calculate complete PITI monthly payment, taxes, insurance, and PMI breakdown.
                  </p>
                </Link>

                <Link
                  href="/calculators/home-affordability"
                  className="p-3.5 rounded-lg bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
                >
                  <div className="text-sm font-bold text-white group-hover:text-brass flex items-center justify-between">
                    <span>Home Affordability Calculator</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Determine maximum purchase price based on household income and debts.
                  </p>
                </Link>

                <Link
                  href="/calculators/refinance"
                  className="p-3.5 rounded-lg bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
                >
                  <div className="text-sm font-bold text-white group-hover:text-brass flex items-center justify-between">
                    <span>Refinance Calculator</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Compare new rate savings, break-even timeline, and cash-out equity options.
                  </p>
                </Link>

                <Link
                  href="/calculators/fha"
                  className="p-3.5 rounded-lg bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
                >
                  <div className="text-sm font-bold text-white group-hover:text-brass flex items-center justify-between">
                    <span>FHA Loan Calculator</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Model 1.75% upfront MIP and monthly HUD premiums with 3.5% down.
                  </p>
                </Link>

                <Link
                  href="/calculators/va"
                  className="p-3.5 rounded-lg bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
                >
                  <div className="text-sm font-bold text-white group-hover:text-brass flex items-center justify-between">
                    <span>VA Loan Calculator</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    0% down payment, funding fee tiers, and zero monthly PMI benefit.
                  </p>
                </Link>

                <Link
                  href="/calculators/closing-costs"
                  className="p-3.5 rounded-lg bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
                >
                  <div className="text-sm font-bold text-white group-hover:text-brass flex items-center justify-between">
                    <span>Closing Costs Calculator</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Itemized Loan Estimate lender fees, title services, and cash to close.
                  </p>
                </Link>

                <Link
                  href="/calculators/debt-to-income"
                  className="p-3.5 rounded-lg bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
                >
                  <div className="text-sm font-bold text-white group-hover:text-brass flex items-center justify-between">
                    <span>Debt-to-Income (DTI) Calculator</span>
                    <span className="text-xs text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Analyze front-end and back-end ratios against underwriting guidelines.
                  </p>
                </Link>

                <Link
                  href="/calculators"
                  className="p-3.5 rounded-lg bg-brass/10 hover:bg-brass/20 border border-brass/30 transition-all group flex flex-col justify-center"
                >
                  <div className="text-sm font-bold text-brass flex items-center justify-between">
                    <span>Explore All 7 Calculators</span>
                    <span>→</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Browse our interactive financial suite designed for US home financing.
                  </p>
                </Link>
              </div>

              {/* Side CTA */}
              <div className="col-span-4 bg-navy-dark rounded-xl p-6 border border-navy-light/40 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brass">
                    Financial Transparency
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1">
                    Real Math, Verified Standards
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Our financial engines calculate authentic amortization schedules and comply with TILA/RESPA disclosure standards.
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    href="/get-started"
                    variant="brass"
                    size="md"
                    className="w-full text-navy-deep font-bold"
                  >
                    Start Pre-Approval Survey
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resources Mega Menu Dropdown */}
      {activeMega === "resources" && (
        <div
          onMouseLeave={() => setActiveMega(null)}
          className="hidden lg:block absolute top-full left-0 w-full bg-navy-midnight border-b border-navy-light/40 shadow-mega animate-fadeIn"
        >
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
            <div className="grid grid-cols-4 gap-6">
              <Link
                href="/quote"
                className="p-4 rounded-xl bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
              >
                <div className="text-sm font-bold text-white group-hover:text-brass">
                  Get an Instant Quote
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Customized rate, monthly payment, and closing breakdown in under 2 minutes.
                </p>
              </Link>

              <Link
                href="/resources"
                className="p-4 rounded-xl bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
              >
                <div className="text-sm font-bold text-white group-hover:text-brass">
                  Mortgage Insights & Blog
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Expert articles on affordability, closing costs, and credit planning.
                </p>
              </Link>

              <Link
                href="/faqs"
                className="p-4 rounded-xl bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
              >
                <div className="text-sm font-bold text-white group-hover:text-brass">
                  Frequently Asked Questions
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Answers on pre-approval, closing timelines, gift funds, and appraisal.
                </p>
              </Link>

              <Link
                href="/reviews"
                className="p-4 rounded-xl bg-navy-dark/60 hover:bg-navy-dark border border-navy-light/30 hover:border-brass/40 transition-all group"
              >
                <div className="text-sm font-bold text-white group-hover:text-brass">
                  Borrower Reviews
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Client stories and experiences across purchase and refinance loans.
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-midnight border-b border-navy-light/40 px-4 pt-4 pb-8 max-h-[85vh] overflow-y-auto space-y-4">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className="py-2 text-white font-semibold text-base border-b border-navy-light/20"
            >
              Home
            </Link>

            {/* Mobile Loan Submenu Toggle */}
            <div className="border-b border-navy-light/20 py-2">
              <button
                type="button"
                onClick={() => setMobileSubmenu(mobileSubmenu === "loans" ? null : "loans")}
                className="w-full flex justify-between items-center text-white font-semibold text-base"
              >
                <span>Loan Programs</span>
                <span>{mobileSubmenu === "loans" ? "−" : "+"}</span>
              </button>
              {mobileSubmenu === "loans" && (
                <div className="pl-3 pt-3 pb-1 space-y-2 text-sm text-slate-300">
                  <Link href="/loan-options" className="block font-bold text-brass">
                    All Loan Programs Overview →
                  </Link>
                  {loanProducts.map((l) => (
                    <Link
                      key={l.id}
                      href={`/loan-options/${l.slug}`}
                      className="block py-1 hover:text-white"
                    >
                      {l.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Calculators Submenu Toggle */}
            <div className="border-b border-navy-light/20 py-2">
              <button
                type="button"
                onClick={() => setMobileSubmenu(mobileSubmenu === "calc" ? null : "calc")}
                className="w-full flex justify-between items-center text-white font-semibold text-base"
              >
                <span>Calculators</span>
                <span>{mobileSubmenu === "calc" ? "−" : "+"}</span>
              </button>
              {mobileSubmenu === "calc" && (
                <div className="pl-3 pt-3 pb-1 space-y-2 text-sm text-slate-300">
                  <Link href="/calculators" className="block font-bold text-brass">
                    Calculator Suite Directory →
                  </Link>
                  <Link href="/calculators/mortgage-payment" className="block py-1 hover:text-white">
                    Mortgage Payment Calculator
                  </Link>
                  <Link href="/calculators/home-affordability" className="block py-1 hover:text-white">
                    Home Affordability Calculator
                  </Link>
                  <Link href="/calculators/refinance" className="block py-1 hover:text-white">
                    Refinance Calculator
                  </Link>
                  <Link href="/calculators/fha" className="block py-1 hover:text-white">
                    FHA Loan Calculator
                  </Link>
                  <Link href="/calculators/va" className="block py-1 hover:text-white">
                    VA Loan Calculator
                  </Link>
                  <Link href="/calculators/closing-costs" className="block py-1 hover:text-white">
                    Closing Costs Calculator
                  </Link>
                  <Link href="/calculators/debt-to-income" className="block py-1 hover:text-white">
                    Debt-to-Income (DTI) Calculator
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/buy-a-home"
              className="py-2 text-white font-semibold text-base border-b border-navy-light/20"
            >
              Buy a Home
            </Link>

            <Link
              href="/refinance"
              className="py-2 text-white font-semibold text-base border-b border-navy-light/20"
            >
              Refinance
            </Link>

            <Link
              href="/quote"
              className="py-2 text-brass font-semibold text-base border-b border-navy-light/20 flex items-center justify-between"
            >
              <span>Get a Quote</span>
              <span className="text-xs bg-brass/20 text-brass px-2 py-0.5 rounded font-bold">Fast</span>
            </Link>

            <Link
              href="/about"
              className="py-2 text-white font-semibold text-base border-b border-navy-light/20"
            >
              About Us
            </Link>

            <Link
              href="/team"
              className="py-2 text-white font-semibold text-base border-b border-navy-light/20"
            >
              Our Lending Team
            </Link>

            <Link
              href="/resources"
              className="py-2 text-white font-semibold text-base border-b border-navy-light/20"
            >
              Blog & Resources
            </Link>

            <Link
              href="/reviews"
              className="py-2 text-white font-semibold text-base border-b border-navy-light/20"
            >
              Client Reviews
            </Link>

            <Link
              href="/faqs"
              className="py-2 text-white font-semibold text-base border-b border-navy-light/20"
            >
              FAQs
            </Link>

            <Link
              href="/locations"
              className="py-2 text-white font-semibold text-base border-b border-navy-light/20"
            >
              Branch Locations
            </Link>

            <Link
              href="/contact"
              className="py-2 text-white font-semibold text-base border-b border-navy-light/20"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-4 space-y-2.5">
            <Button
              href="/get-started"
              variant="brass"
              size="md"
              className="w-full text-navy-deep font-bold"
            >
              Get Pre-Approved
            </Button>
            <Button
              href="/apply-now"
              variant="outline"
              size="md"
              className="w-full border-slate-600 text-slate-200"
            >
              Start Full Application
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
