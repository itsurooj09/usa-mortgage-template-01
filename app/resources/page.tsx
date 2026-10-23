import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Mortgage Resources, Guides & Homebuyer Education",
  description:
    "Expert articles and guides on home affordability, down payment assistance, closing costs, and loan comparisons written by licensed mortgage loan officers.",
};

export default function ResourcesPage() {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-midnight text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Education & Insights
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mt-2 tracking-tight">
              Mortgage Resources & Financial Guides
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              In-depth home financing guides, regulatory explanations, and market perspectives authored by our senior lending team.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white border-b border-border-subtle">
        <Container>
          <div className="bg-ivory-warm rounded-2xl border border-border-subtle overflow-hidden p-6 sm:p-10 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="brass" size="sm">{featuredPost.category}</Badge>
                  <span className="text-xs text-slate-500">{featuredPost.readingTime}</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-navy-midnight hover:text-navy-light transition-colors">
                  <Link href={`/resources/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
                  <span>By <strong>{featuredPost.author.name}</strong></span>
                  <span>•</span>
                  <span>{featuredPost.publishedDate}</span>
                </div>
                <div className="pt-3">
                  <Link
                    href={`/resources/${featuredPost.slug}`}
                    className="inline-flex items-center font-bold text-xs uppercase tracking-wider text-navy-midnight hover:text-brass"
                  >
                    Read Full Article →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl border border-border-subtle overflow-hidden hover:border-slate-300 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <Badge variant="brass" size="sm">{post.category}</Badge>
                      <span className="text-slate-400">{post.readingTime}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-navy-midnight hover:text-brass-dark transition-colors">
                      <Link href={`/resources/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-border-subtle/50 flex items-center justify-between text-xs text-slate-500">
                  <span>{post.publishedDate}</span>
                  <Link
                    href={`/resources/${post.slug}`}
                    className="font-bold text-navy-midnight hover:text-brass"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
