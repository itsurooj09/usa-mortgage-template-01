import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Contact Us & Schedule an Advisory Call",
  description:
    "Get in touch with Northstar Mortgage Capital. Speak with our direct lending desk, visit our Charlotte headquarters, or schedule an advisory session.",
};

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy-midnight text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Direct Lending Desk
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mt-2 tracking-tight">
              Connect with Our Lending Advisors
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Have questions about rates, loan qualification guidelines, or down payment assistance? Reach out to our team directly.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                  Headquarters & Branch Info
                </span>
                <h2 className="font-heading font-bold text-2xl text-navy-midnight mt-1">
                  Corporate Lending Headquarters
                </h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p>
                    <strong className="text-navy-midnight block">Physical Address:</strong>
                    {siteConfig.contact.address.street}, {siteConfig.contact.address.suite}<br />
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                  </p>

                  <p>
                    <strong className="text-navy-midnight block">Toll-Free Phone:</strong>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
                      className="text-navy-midnight font-bold hover:text-brass"
                    >
                      {siteConfig.contact.phoneFormatted}
                    </a>
                  </p>

                  <p>
                    <strong className="text-navy-midnight block">Direct Email:</strong>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-navy-midnight font-bold hover:text-brass"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </p>

                  <p>
                    <strong className="text-navy-midnight block">Lending Operations Hours:</strong>
                    {siteConfig.contact.hours}
                  </p>
                </div>
              </div>

              {/* Appointment Scheduling Anchor Section */}
              <div id="schedule" className="p-6 rounded-2xl bg-ivory-warm border border-border-subtle space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                  Direct Calendar Booking
                </span>
                <h3 className="font-heading font-bold text-lg text-navy-midnight">
                  Schedule a 15-Minute Strategy Call
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Book a convenient video or phone consultation directly on our Senior Vice President&apos;s calendar.
                </p>
                <div className="pt-2">
                  <a
                    href={siteConfig.primaryLoanOfficer.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-bold text-xs px-4 py-2.5 rounded-md bg-navy-midnight text-white hover:bg-navy-dark transition-colors shadow-sm"
                  >
                    Open Advisory Calendar ↗
                  </a>
                </div>
              </div>

              {/* Licensing Badge */}
              <div className="p-4 rounded-xl border border-border-subtle text-xs text-slate-500">
                <p className="font-semibold text-navy-midnight">Equal Housing Lender</p>
                <p className="mt-0.5">
                  {siteConfig.brand.legalName} • NMLS ID #{siteConfig.brand.nmlsId}
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
