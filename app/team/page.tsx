import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { teamMembers } from "@/content/team";
import { siteConfig } from "@/lib/config/siteConfig";

export const metadata: Metadata = {
  title: "Meet Our Lending Officers & Team",
  description:
    "Connect with licensed residential mortgage loan officers at Northstar Mortgage. Transparent rate advisory, verified pre-approvals, and local market expertise.",
};

export default function TeamPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy-midnight text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Licensed Mortgage Professionals
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mt-2 tracking-tight">
              Meet Your Dedicated Lending Officers
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Every Northstar loan officer is fully licensed via the Nationwide Multistate Licensing System (NMLS). Work with trusted fiduciaries who personally guide your file from initial consultation to clear-to-close.
            </p>
          </div>
        </Container>
      </section>

      {/* Team Directory Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-border-subtle p-7 hover:border-slate-300 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative w-28 h-36 rounded-xl overflow-hidden shadow-sm border border-border-subtle flex-shrink-0">
                      <Image
                        src={member.avatarUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <Badge variant="brass" size="sm">
                        NMLS #{member.nmlsId}
                      </Badge>
                      <h3 className="font-heading font-bold text-xl text-navy-midnight pt-1">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-brass-dark">
                        {member.role}
                      </p>
                      <div className="pt-2 text-xs text-slate-500 space-y-0.5">
                        <p>
                          <strong>Phone:</strong>{" "}
                          <a href={`tel:${member.phone.replace(/[^0-9]/g, "")}`} className="hover:text-navy-midnight">
                            {member.phone}
                          </a>
                        </p>
                        <p>
                          <strong>Email:</strong>{" "}
                          <a href={`mailto:${member.email}`} className="hover:text-navy-midnight">
                            {member.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-border-subtle pt-4">
                    {member.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border-subtle">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Program Specialties
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded text-[11px] bg-ivory-warm border border-border-subtle text-slate-700 font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-slate-500">
                    <strong>Licensed In:</strong> {member.licensedStates.join(", ")}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
                  <Button
                    href={`/get-started?officer=${member.id}`}
                    variant="brass"
                    size="sm"
                    className="font-bold text-navy-deep"
                  >
                    Apply with {member.name.split(" ")[0]}
                  </Button>
                  <Button
                    href="/contact#schedule"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Schedule Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Disclosures section */}
      <section className="py-12 bg-ivory-warm border-t border-border-subtle text-xs text-slate-500">
        <Container>
          <p>
            Verify individual mortgage loan originator licenses at the official NMLS Consumer Access website:{" "}
            <a
              href={siteConfig.brand.nmlsConsumerAccessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass-dark hover:underline font-medium"
            >
              www.nmlsconsumeraccess.org
            </a>. {siteConfig.brand.legalName} is an Equal Housing Lender.
          </p>
        </Container>
      </section>
    </div>
  );
}
