import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { blogPosts } from "@/content/blog";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Northstar Mortgage Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.featuredImage }],
    },
  };
}

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 lg:py-24 bg-white">
      <Container size="narrow">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/resources"
            className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-navy-midnight flex items-center gap-1.5"
          >
            ← Back to All Resources
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="brass" size="sm">{post.category}</Badge>
            <span className="text-xs text-slate-400 font-medium">{post.readingTime}</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-navy-midnight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-border-subtle flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border-subtle">
              <Image
                src={post.author.avatarUrl}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-sm text-navy-midnight">
                {post.author.name}
              </div>
              <div className="text-xs text-slate-500">{post.author.role}</div>
            </div>
            <div className="ml-auto text-xs text-slate-400">
              Published on {post.publishedDate}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="my-10 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-card border border-border-subtle">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Key Takeaways Callout */}
        <div className="my-8 p-6 rounded-xl bg-ivory-warm border-l-4 border-brass space-y-2">
          <h2 className="font-heading font-bold text-base text-navy-midnight">
            Key Financial Takeaways
          </h2>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
            {post.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-brass font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-base leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Contextual Calculator & Action Footer */}
        <div className="mt-14 p-8 rounded-2xl bg-navy-midnight text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="text-xs font-bold uppercase tracking-wider text-brass">
              Apply This to Your Financing
            </span>
            <h3 className="font-heading font-bold text-xl text-white mt-1">
              Ready to calculate your monthly purchasing power?
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Use our interactive calculators or get pre-approved in under 2 minutes.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button href="/calculators" variant="outline" size="sm" className="border-slate-500 text-white">
              Calculators
            </Button>
            <Button href="/get-started" variant="brass" size="sm" className="font-bold text-navy-deep">
              Get Pre-Approved →
            </Button>
          </div>
        </div>
      </Container>
    </article>
  );
}
