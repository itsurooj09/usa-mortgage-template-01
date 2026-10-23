import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { branchLocations } from "@/content/locations";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Branch Locations & Service Areas | Northstar Mortgage",
  description:
    "Explore Northstar Mortgage branch locations and licensed service areas across North Carolina, South Carolina, Florida, Georgia, Texas, and Colorado.",
};

export default function LocationsPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy-midnight text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Nationwide Footprint
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mt-2 tracking-tight">
              Branch Offices & Service Areas
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Find a regional lending center or connect with our licensed loan officers serving homebuyers across {siteConfig.statesLicensed.length} states.
            </p>
          </div>
        </Container>
      </section>

      {/* Branch Directory Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branchLocations.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-2xl border border-border-subtle p-7 hover:border-slate-300 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="brass" size="sm">
                      {branch.stateCode}
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium">
                      NMLS #{branch.nmlsId}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-navy-midnight">
                    {branch.name}
                  </h3>

                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    <p>
                      <strong>Address:</strong><br />
                      {branch.address}
                    </p>
                    <p>
                      <strong>Branch Manager:</strong><br />
                      {branch.manager}
                    </p>
                    <p>
                      <strong>Telephone:</strong><br />
                      <a href={`tel:${branch.phone.replace(/[^0-9]/g, "")}`} className="hover:text-brass font-bold text-navy-midnight">
                        {branch.phone}
                      </a>
                    </p>
                    <p>
                      <strong>Service Radius:</strong><br />
                      {branch.serviceRadius}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
                  <Link
                    href={`/contact?branch=${branch.id}`}
                    className="text-xs font-bold text-navy-midnight hover:text-brass"
                  >
                    Contact Branch →
                  </Link>
                  <Button
                    href="/get-started"
                    variant="brass"
                    size="sm"
                    className="text-xs font-bold text-navy-deep"
                  >
                    Pre-Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* States Licensed List */}
      <section className="py-16 bg-ivory-warm border-t border-border-subtle">
        <Container>
          <div className="max-w-3xl mb-8">
            <h2 className="font-heading font-bold text-2xl text-navy-midnight">
              Complete Licensed State Footprint
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {siteConfig.brand.legalName} is actively licensed by state regulatory authorities in the following jurisdictions:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
            {siteConfig.statesLicensed.map((state) => (
              <div key={state.code} className="p-3 bg-white rounded-lg border border-border-subtle">
                <span className="font-bold text-navy-midnight block">{state.name} ({state.code})</span>
                <span className="text-[11px] text-slate-500 block">Lic. #{state.licenseNumber}</span>
                <span className="text-[10px] text-slate-400 block truncate">{state.regulator}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/licensing" className="text-xs font-bold text-navy-midnight hover:text-brass underline">
              View Detailed State Licensing Disclosures Page →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
