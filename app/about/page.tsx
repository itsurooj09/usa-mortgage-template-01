import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/siteConfig";
import { photoLibrary } from "@/content/assets";

export const metadata: Metadata = {
  title: "About Northstar Mortgage | Premier American Residential Lending",
  description:
    "Learn about Northstar Mortgage Capital, our executive leadership desk, correspondent banking advantages, and our decade-long commitment to transparent home financing.",
};

const leadershipTeam = [
  {
    name: "David Vance",
    role: "Senior Vice President of Residential Lending",
    nmls: "847291",
    experience: "19 Years Experience",
    bio: "David oversees national purchase origination and capital markets pricing. Prior to founding Northstar's retail group, he managed correspondent pipelines for tier-one financial institutions across the Southeast.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sarah Jenkins",
    role: "Chief Underwriting Officer",
    nmls: "629104",
    experience: "16 Years Experience",
    bio: "Sarah directs our in-house credit committee and automated underwriting infrastructure, ensuring fast 24-hour initial turnarounds and consistent credit decisioning.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Marcus Thorne",
    role: "Managing Director of Capital Markets",
    nmls: "518392",
    experience: "22 Years Experience",
    bio: "Marcus structures our agency Fannie Mae, Freddie Mac, and private portfolio secondary pipelines, securing preferred wholesale rate locks directly for borrowers.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Elena Rostova",
    role: "Director of Borrower Experience & Escrow",
    nmls: "931204",
    experience: "14 Years Experience",
    bio: "Elena champions digital title integration, clear-to-close dispatch, and paperless mobile notary closings so families experience effortless closing days.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* 1. High-Impact Photographic Hero */}
      <section className="relative bg-navy-midnight text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
            alt="Northstar Mortgage financial headquarters and modern corporate architectural skyline"
            fill
            priority
            className="object-cover object-center brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-midnight via-navy-midnight/90 to-navy-midnight/70" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-light/40 border border-brass/40 text-brass text-xs font-bold uppercase tracking-wider">
              <span>Established in {siteConfig.brand.foundedYear}</span>
              <span>•</span>
              <span>NMLS #{siteConfig.brand.nmlsId}</span>
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Lending Grounded in Integrity, Clarity, and Direct Capital.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              We established {siteConfig.brand.name} on a straightforward conviction: obtaining a residential mortgage should be transparent, swift, and managed by licensed financial fiduciaries rather than commission-driven sales quotas.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/team" variant="brass" size="lg" className="font-bold text-navy-deep shadow-md">
                Meet Our Advisors →
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-slate-500 text-white hover:bg-white/10">
                Contact Executive Desk
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Key Metrics Bar */}
      <section className="bg-navy-dark border-b border-navy-light/30 py-10 text-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-brass">$4.8B+</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">Residential Loans Funded</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-white">18,500+</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">Families Successfully Housed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-brass">19 Days</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">Avg. Underwriting Turnaround</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-white">48 States</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">Licensed Lending Footprint</div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Founding Story & Direct Correspondent Model */}
      <section className="py-20 lg:py-24 bg-white border-b border-border-subtle">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brass-dark">
                The Correspondent Advantage
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-navy-midnight leading-tight">
                Why Direct Lending Outperforms Traditional Retail Banks & Brokers.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Traditional retail depository banks are notoriously bureaucratic, routing loan files through remote out-of-state underwriting queues that take 45 to 60 days. Third-party mortgage brokers, on the other hand, lack direct funding control and add substantial brokerage fee markups.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                As a <strong>Direct Correspondent Banker</strong>, Northstar funds loans with our own warehouse credit lines and underwrites directly with in-house decision makers. This eliminates the middleman, drives down borrower interest rates, and enables guaranteed 19-day average clear-to-close commitments.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-ivory-warm border border-border-subtle">
                  <div className="font-bold text-navy-midnight text-base">In-House Underwriters</div>
                  <p className="text-xs text-slate-600 mt-1">Direct communication with decision makers, zero bureaucratic delays.</p>
                </div>
                <div className="p-4 rounded-xl bg-ivory-warm border border-border-subtle">
                  <div className="font-bold text-navy-midnight text-base">Direct Capital Lines</div>
                  <p className="text-xs text-slate-600 mt-1">No broker intermediary fees, delivering institutional wholesale pricing.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-[440px] sm:h-[500px] rounded-2xl overflow-hidden shadow-card border border-border-subtle">
                <Image
                  src={photoLibrary.consultation.advisoryMeeting.url}
                  alt={photoLibrary.consultation.advisoryMeeting.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-navy-midnight text-white p-6 rounded-xl border border-navy-light/40 shadow-xl hidden sm:block max-w-[280px]">
                <div className="text-2xl font-black text-brass font-heading">24 Hours</div>
                <div className="text-xs text-slate-300 font-medium mt-1">
                  Average preliminary underwritten loan commitment turnaround.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Our Core Fiduciary Principles */}
      <section className="py-20 bg-ivory-warm border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Our Commitments"
            title="Four Pillars of Ethical Lending"
            subtitle="The core values that govern every file structured on our desk."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-lg font-heading">
                01
              </div>
              <h4 className="font-heading font-bold text-lg text-navy-midnight">Fee Transparency</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Itemized Loan Estimates guaranteed to match your final statutory Closing Disclosure within legal tolerance. No surprise junk fees at closing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-lg font-heading">
                02
              </div>
              <h4 className="font-heading font-bold text-lg text-navy-midnight">Zero Commission Bias</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our loan officers are compensated based on borrower satisfaction ratings and file speed—never on pushing higher-margin loan products.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-lg font-heading">
                03
              </div>
              <h4 className="font-heading font-bold text-lg text-navy-midnight">Paperless Modern Speed</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automated IRS transcript verification, digital bank asset linkage, and mobile notary closings delivered to your kitchen table.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-midnight text-brass flex items-center justify-center font-bold text-lg font-heading">
                04
              </div>
              <h4 className="font-heading font-bold text-lg text-navy-midnight">Equal Opportunity</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Proud members of the Equal Housing Opportunity framework, providing fair, unbiased financing across every community we serve.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Executive Leadership Grid */}
      <section className="py-20 lg:py-24 bg-white border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Executive Team"
            title="Seasoned American Lending Leadership"
            subtitle="Meet the experienced mortgage executives directing our underwriting and capital desks."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {leadershipTeam.map((leader, idx) => (
              <div
                key={idx}
                className="bg-ivory-warm rounded-2xl overflow-hidden border border-border-subtle shadow-sm hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={leader.avatar}
                      alt={leader.name}
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brass-dark block">
                      {leader.role}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-navy-midnight">
                      {leader.name}
                    </h3>
                    <div className="text-xs text-slate-500 font-semibold flex items-center justify-between">
                      <span>NMLS #{leader.nmls}</span>
                      <span>{leader.experience}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border-subtle mt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs font-bold text-navy-midnight hover:text-brass transition-colors pt-3"
                  >
                    <span>Connect with {leader.name.split(" ")[0]}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Community & Real Estate Photography Gallery */}
      <section className="py-20 bg-ivory-warm border-b border-border-subtle">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Real Estate Heritage"
            title="Communities We Proudly Finance"
            subtitle="From first-time suburban neighborhoods to custom luxury estates, we empower sustainable American homeownership."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="rounded-2xl overflow-hidden shadow-sm bg-white border border-border-subtle">
              <div className="relative h-64 w-full">
                <Image
                  src={photoLibrary.hero.daytimeSuburban.url}
                  alt={photoLibrary.hero.daytimeSuburban.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs uppercase font-bold text-brass-dark">Suburban Communities</span>
                <h4 className="font-heading font-bold text-lg text-navy-midnight mt-1">Single-Family Neighborhoods</h4>
                <p className="text-sm text-slate-600 mt-1.5">
                  Financing family homes near excellent schools, parks, and vibrant community centers.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm bg-white border border-border-subtle">
              <div className="relative h-64 w-full">
                <Image
                  src={photoLibrary.lifestyle.happyCoupleKeys.url}
                  alt={photoLibrary.lifestyle.happyCoupleKeys.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs uppercase font-bold text-brass-dark">Homebuyer Milestones</span>
                <h4 className="font-heading font-bold text-lg text-navy-midnight mt-1">First-Time Homeownership</h4>
                <p className="text-sm text-slate-600 mt-1.5">
                  Guiding first-time buyers with low down payment conventional, FHA, and down payment grant programs.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm bg-white border border-border-subtle">
              <div className="relative h-64 w-full">
                <Image
                  src={photoLibrary.programs.jumbo.url}
                  alt={photoLibrary.programs.jumbo.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs uppercase font-bold text-brass-dark">Custom Residences</span>
                <h4 className="font-heading font-bold text-lg text-navy-midnight mt-1">Jumbo & Luxury Estates</h4>
                <p className="text-sm text-slate-600 mt-1.5">
                  Tailored capital structuring for high-balance luxury properties and secondary vacation retreats.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Final Consultation CTA */}
      <section className="py-20 bg-navy-midnight text-white text-center relative overflow-hidden">
        <Container size="narrow" className="relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brass">
            Take The Next Step
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black">
            Ready to Discuss Your Home Financing Goals?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Speak directly with an experienced licensed loan officer or complete our 2-minute digital survey to preview custom loan terms.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button href="/get-started" variant="brass" size="lg" className="font-bold text-navy-deep shadow-md">
              Start Free Pre-Approval →
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="border-slate-500 text-white hover:bg-white/10">
              Schedule Branch Consultation
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
