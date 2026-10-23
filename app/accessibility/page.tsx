import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Accessibility Statement | WCAG 2.1 AA Compliance",
  description:
    "Our commitment to digital accessibility for all users, including those with visual, auditory, cognitive, and motor impairments.",
};

export default function AccessibilityPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <Container size="narrow">
        <div className="space-y-8">
          <div className="border-b border-border-subtle pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
              Digital Inclusion
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-navy-midnight">
              Accessibility Statement
            </h1>
            <p className="text-xs text-slate-500">
              Conformance Standard: WCAG 2.1 Level AA Guidelines
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <p>
              {siteConfig.brand.legalName} is committed to ensuring that our website, interactive financial calculators, and mortgage inquiry tools are accessible to all individuals, including people with visual, hearing, cognitive, and mobility impairments.
            </p>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              1. Conformance Standards
            </h2>
            <p>
              We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA published by the World Wide Web Consortium (W3C). These standards explain how to make web content accessible and user-friendly for people with disabilities.
            </p>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              2. Implemented Accessibility Measures
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Keyboard Navigation:</strong> All interactive elements (menus, tabs, forms, sliders) are navigable and operable via standard keyboard controls without mouse dependency.</li>
              <li><strong>Visible Focus Indicators:</strong> High-contrast focus outlines highlight active interactive elements for keyboard and assistive device users.</li>
              <li><strong>Color Contrast:</strong> Text and UI elements maintain rigorous contrast ratios (at least 4.5:1 for standard body text and 3:1 for large headers).</li>
              <li><strong>Screen Reader Support:</strong> Semantic HTML landmarks, ARIA attributes, and explicit form labels ensure clear screen reader announcements.</li>
              <li><strong>Skip to Content:</strong> A direct skip link allows keyboard users to bypass header navigation and jump immediately to primary page content.</li>
            </ul>

            <h2 className="text-base font-bold text-navy-midnight font-heading">
              3. Accessibility Feedback and Assistance
            </h2>
            <p>
              If you experience any difficulty accessing content or operating any feature on this website, or if you need assistance completing a loan pre-approval application, our team is available to assist you via phone or email:
            </p>
            <div className="p-4 rounded-xl bg-ivory-warm border border-border-subtle space-y-1 text-xs">
              <p><strong>Accessibility Coordinator:</strong> Northstar Digital Compliance Desk</p>
              <p><strong>Telephone:</strong> {siteConfig.contact.phoneFormatted} (Telecommunications Relay Service / TDD supported)</p>
              <p><strong>Email:</strong> accessibility@northstarmortgage.com</p>
              <p><strong>Mailing Address:</strong> {siteConfig.contact.address.street}, {siteConfig.contact.address.suite}, {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
