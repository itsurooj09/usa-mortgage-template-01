import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config/siteConfig";
import { Logo } from "../ui/Logo";
import {
  EqualHousingBadge,
  SslEncryptionBadge,
} from "../ui/TrustBadges";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-midnight text-white border-t border-navy-light/40">
      {/* Main Footer Links Columns */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Contact Column */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <Logo size="lg" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mt-3">
              {siteConfig.brand.description}
            </p>
            <div className="pt-2 space-y-2 text-sm text-slate-300">
              <p>
                <strong className="text-white">Corporate HQ:</strong> {siteConfig.contact.address.street}, {siteConfig.contact.address.suite}, {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
              </p>
              <p>
                <strong className="text-white">Phone:</strong>{" "}
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`} className="hover:text-brass">
                  {siteConfig.contact.phoneFormatted}
                </a>
              </p>
              <p>
                <strong className="text-white">Inquiries:</strong>{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brass">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>

            {/* Official Trust Logos from Reference media_1792740643933.png */}
            <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-navy-light/30">
              <EqualHousingBadge variant="dark" />
              <SslEncryptionBadge variant="dark" />
            </div>
          </div>

          {/* Loan Programs Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brass">
              Loan Programs
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/loan-options/conventional" className="hover:text-white transition-colors">Conventional Loans</Link></li>
              <li><Link href="/loan-options/fha" className="hover:text-white transition-colors">FHA Loans</Link></li>
              <li><Link href="/loan-options/va" className="hover:text-white transition-colors">VA Loans (0% Down)</Link></li>
              <li><Link href="/loan-options/usda" className="hover:text-white transition-colors">USDA Rural Loans</Link></li>
              <li><Link href="/loan-options/jumbo" className="hover:text-white transition-colors">Jumbo Luxury Loans</Link></li>
              <li><Link href="/loan-options/first-time-homebuyer" className="hover:text-white transition-colors">First-Time Homebuyer</Link></li>
              <li><Link href="/loan-options/fixed-rate" className="hover:text-white transition-colors">Fixed-Rate Mortgages</Link></li>
              <li><Link href="/loan-options/arm" className="hover:text-white transition-colors">Adjustable-Rate (ARM)</Link></li>
              <li><Link href="/loan-options/cash-out-refinance" className="hover:text-white transition-colors">Cash-Out Refinance</Link></li>
              <li><Link href="/loan-options/rate-and-term-refinance" className="hover:text-white transition-colors">Rate-and-Term Refinance</Link></li>
              <li><Link href="/loan-options/reverse-mortgage" className="hover:text-white transition-colors">Reverse Mortgage (62+)</Link></li>
            </ul>
          </div>

          {/* Calculators Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brass">
              Calculators
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/calculators/mortgage-payment" className="hover:text-white transition-colors">Mortgage Payment</Link></li>
              <li><Link href="/calculators/home-affordability" className="hover:text-white transition-colors">Home Affordability</Link></li>
              <li><Link href="/calculators/refinance" className="hover:text-white transition-colors">Refinance Savings</Link></li>
              <li><Link href="/calculators/fha" className="hover:text-white transition-colors">FHA Loan Calculator</Link></li>
              <li><Link href="/calculators/va" className="hover:text-white transition-colors">VA Loan Calculator</Link></li>
              <li><Link href="/calculators/closing-costs" className="hover:text-white transition-colors">Closing Costs Calculator</Link></li>
              <li><Link href="/calculators/debt-to-income" className="hover:text-white transition-colors">Debt-to-Income (DTI)</Link></li>
              <li className="pt-1">
                <Link href="/calculators" className="font-semibold text-brass hover:underline">
                  All Calculators Overview →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Resources Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brass">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Northstar</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">Our Lending Officers</Link></li>
              <li><Link href="/quote" className="hover:text-white transition-colors">Request a Quote</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors">Borrower Testimonials</Link></li>
              <li><Link href="/faqs" className="hover:text-white transition-colors">Mortgage FAQs</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Articles & Insights</Link></li>
              <li><Link href="/locations" className="hover:text-white transition-colors">Branch Locations</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Our Team</Link></li>
              <li className="pt-2 border-t border-navy-light/30"><Link href="/licensing" className="hover:text-white transition-colors">NMLS & Licensing</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="/accessibility" className="hover:text-white transition-colors">Accessibility Statement</Link></li>
              <li><Link href="/cookie-preferences" className="hover:text-white transition-colors">Cookie Preferences</Link></li>
            </ul>
          </div>
        </div>



        {/* NMLS Disclosures & Statutory Regulatory Notice */}
        <div className="mt-8 pt-8 border-t border-navy-light/30 text-xs text-slate-400 space-y-3 leading-relaxed">
          <p>
            <strong>Licensing & Regulatory Disclosures:</strong> {siteConfig.brand.legalName} is a licensed residential mortgage lender (NMLS Unique Identifier #{siteConfig.brand.nmlsId}). To verify licensing information, visit the nationwide database at{" "}
            <a
              href={siteConfig.brand.nmlsConsumerAccessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass hover:underline font-medium"
            >
              NMLS Consumer Access (www.nmlsconsumeraccess.org)
            </a>.
          </p>
          <p>
            {siteConfig.disclosures.generalRateDisclaimer}
          </p>
          <p>
            {siteConfig.disclosures.calculatorDisclaimer}
          </p>
          <p className="text-slate-500 italic">
            {siteConfig.disclosures.demoNotice}
          </p>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-navy-light/20 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 gap-4">
          <p>
            &copy; {currentYear} {siteConfig.brand.legalName}. All rights reserved. Equal Housing Opportunity.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/licensing" className="hover:text-white">NMLS #{siteConfig.brand.nmlsId}</Link>
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms-of-use" className="hover:text-white">Terms</Link>
            <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
